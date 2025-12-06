#!/usr/bin/env node
/**
 * Auto-generates active and previous events sections in index.html
 * using events.json as source of truth.
 *
 * Timezone-sensitive comparisons use the configured timezone
 * (America/New_York) to decide when an event has passed.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EVENTS_PATH = path.join(ROOT, 'events.json');
const INDEX_PATH = path.join(ROOT, 'index.html');

const PROGRAMS_START = '<!-- AUTO-GENERATED:PROGRAMS-START -->';
const PROGRAMS_END = '<!-- AUTO-GENERATED:PROGRAMS-END -->';
const PREVIOUS_START = '<!-- AUTO-GENERATED:PREVIOUS-START -->';
const PREVIOUS_END = '<!-- AUTO-GENERATED:PREVIOUS-END -->';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getTodayValue(timeZone) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const lookup = key => Number(parts.find(p => p.type === key).value);
  return Date.UTC(lookup('year'), lookup('month') - 1, lookup('day'));
}

function dateValueFromISO(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  if ([y, m, d].some(Number.isNaN)) return null;
  return Date.UTC(y, m - 1, d);
}

function formatDate(iso, timeZone) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const monthName = months[m - 1];
  return `${monthName} ${d}, ${y}`;
}

function detailRow(label, value) {
  return `          <div class="detail-row"><strong>${label}</strong><span> ${value}</span></div>`;
}

function renderProgramEvent(event, index, total, timeZone) {
  const descriptionBlocks = [];

  if (event.expandable && Array.isArray(event.description) && event.description.length) {
    const extras = (event.descriptionExtra || []).map(
      p => `                <p class="description-extra">${p}</p>`
    ).join('\n');
    descriptionBlocks.push(
`            <div class="expandable-description">
              <div class="description-content">
                <p>${event.description[0]}</p>
${extras}
              </div>
              <button class="read-more-btn">Read More</button>
            </div>`
    );
  } else if (event.description && event.description.length) {
    descriptionBlocks.push(`            <p>${event.description[0]}</p>`);
  } else if (event.summary) {
    descriptionBlocks.push(`            <p>${event.summary}</p>`);
  }

  const details = [];
  const formattedDate = formatDate(event.date, timeZone);
  if (formattedDate) details.push(detailRow('Date', formattedDate));
  if (event.time) details.push(detailRow('Time', event.time));
  if (event.venue) details.push(detailRow('Venue', event.venue));
  if (event.status === 'ongoing') details.push(detailRow('Status', 'Ongoing'));
  if (event.status === 'placeholder') details.push(detailRow('Status', 'Coming Soon'));
  if (event.notes) details.push(detailRow('Notes', event.notes));

  const hasDetails = details.length > 0;
  const hasUrl = Boolean(event.ctaUrl && event.ctaUrl.trim());
  const btnText = event.status === 'placeholder'
    ? 'Details and Registration Coming Soon'
    : (event.ctaText || 'Details and Registration Coming Soon');
  const href = hasUrl ? event.ctaUrl : 'javascript:void(0)';
  const targetAttrs = hasUrl ? ' target="_blank" rel="noopener noreferrer"' : '';
  const btnClasses = 'insta-link insta-link-light';

  return `
          <div class="program-item">
            <h4>${event.title}</h4>
${descriptionBlocks.join('\n')}
${hasDetails ? `            <div class="event-details">
${details.join('\n')}
            </div>` : ''}
            <div class="button-container">
              <a class="${btnClasses}" href="${href}"${targetAttrs}>${btnText}</a>
            </div>
${index < total - 1 ? '            <span class="divider">◆</span>' : ''}
          </div>`;
}

function renderProgramsSection(branches, timeZone) {
  return branches.map(branch => {
    const events = branch.events.active || [];
    const eventHtml = events.map((event, idx) =>
      renderProgramEvent(event, idx, events.length, timeZone)
    ).join('\n');

    return `      <div class="program-card-v4">
        <h3>${branch.name}<br><small>${branch.subtitle}</small></h3>
        <div class="programs-list">
${eventHtml}
        </div>
      </div>`;
  }).join('\n\n');
}

function renderPreviousEvents(branches, timeZone) {
  const items = branches.map((branch, idx) => {
    const events = branch.events.previous || [];
    const cards = events.map(ev => {
      const rows = [
        detailRow('Event', ev.title),
      ];
      if (ev.speaker) rows.push(detailRow('Speaker', ev.speaker));
      const formattedDate = formatDate(ev.date, timeZone);
      if (formattedDate) rows.push(detailRow('Date', formattedDate));
      if (ev.venue) rows.push(detailRow('Venue', ev.venue));
      if (ev.notes) rows.push(detailRow('Notes', ev.notes));

      return `              <div class="event-card">
${rows.join('\n')}
              </div>`;
    }).join('\n');

    return `          <div class="program-item">
            <h4>${branch.name}</h4>
            <div class="event-details-multi">
              <div class="event-intro">Past ${branch.previousLabel} Events:</div>
${cards}
            </div>
${idx < branches.length - 1 ? '            <span class="divider">◆</span>' : ''}
          </div>`;
  }).join('\n\n');

  return `      <div class="previous-programs-card">
        <h3>Previous Events<br><small>Past Programs by Branch</small></h3>
        <div class="programs-list">
${items}
        </div>
      </div>`;
}

function replaceSection(content, startToken, endToken, replacement) {
  const start = content.indexOf(startToken);
  const end = content.indexOf(endToken);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Could not find markers ${startToken} / ${endToken} in index.html`);
  }
  const before = content.slice(0, start + startToken.length);
  const after = content.slice(end);
  const formatted = `\n${replacement}\n`;
  return `${before}${formatted}${after}`;
}

function ensureActiveSlots(branch) {
  const active = branch.events.active || [];
  if (active.length === 0) {
    active.push({
      title: 'More Coming Soon',
      summary: 'Stay tuned for upcoming programs.',
      status: 'placeholder',
      ctaText: 'More Coming Soon',
    });
  }
  branch.events.active = active;
}

function sortPrevious(branch) {
  branch.events.previous = (branch.events.previous || []).slice().sort((a, b) => {
    const aVal = dateValueFromISO(a.date) ?? -Infinity;
    const bVal = dateValueFromISO(b.date) ?? -Infinity;
    return bVal - aVal;
  });
}

function main() {
  const data = readJson(EVENTS_PATH);
  const timeZone = data.timezone || 'America/New_York';
  const todayValue = getTodayValue(timeZone);

  data.branches.forEach(branch => {
    const active = branch.events.active || [];
    const previous = branch.events.previous || [];

    const stillActive = [];
    const moved = [];

    active.forEach(ev => {
      const dateValue = dateValueFromISO(ev.date);
      if (dateValue !== null && dateValue < todayValue) {
        moved.push(ev);
      } else {
        stillActive.push(ev);
      }
    });

    branch.events.active = stillActive;
    branch.events.previous = previous.concat(moved);

    sortPrevious(branch);
    ensureActiveSlots(branch);
  });

  const programsHtml = renderProgramsSection(data.branches, timeZone);
  const previousHtml = renderPreviousEvents(data.branches, timeZone);

  let indexContent = fs.readFileSync(INDEX_PATH, 'utf8');
  indexContent = replaceSection(indexContent, PROGRAMS_START, PROGRAMS_END, programsHtml);
  indexContent = replaceSection(indexContent, PREVIOUS_START, PREVIOUS_END, previousHtml);
  fs.writeFileSync(INDEX_PATH, indexContent, 'utf8');
  console.log('Events updated successfully.');
}

main();

