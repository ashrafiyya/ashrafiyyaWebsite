/**
 * Fetches Events and/or Videos tabs from a Google Sheet (CSV export) and
 * updates data/events.json and data/videos.json after validation.
 *
 * Requires the sheet to be viewable by anyone with the link (or equivalent
 * access that allows /export?format=csv).
 *
 * Usage (from repo root):
 *   ASHRAFIYYA_GOOGLE_SHEET_ID=... ASHRAFIYYA_SYNC_EVENTS_TAB_GID=... ASHRAFIYYA_SYNC_VIDEOS_TAB_GID=... node scripts/sync-google-sheet.mjs
 *
 * Options:
 *   --dry-run    Build staging files and validate; do not modify data/
 *   --allow-empty  Allow replacing events or videos with an empty array when
 *                  the sheet tab has no data rows (dangerous; use with care)
 *
 * @see docs/google-sheet-sync.md
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(REPO_ROOT, 'data');
const STAGING_DIR = path.join(DATA_DIR, '.sync-staging');

function parseCSV(text) {
  text = text.replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let field = '';
  let i = 0;
  let inQuotes = false;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ',') {
      row.push(field);
      field = '';
      i++;
      continue;
    }
    if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i++;
      continue;
    }
    if (c === '\r') {
      i++;
      continue;
    }
    field += c;
    i++;
  }
  row.push(field);
  const nonEmpty = row.some(function (cell) { return String(cell).trim() !== ''; });
  if (nonEmpty || rows.length === 0) {
    rows.push(row);
  }
  return rows;
}

function buildHeaderIndex(headerRow) {
  const map = Object.create(null);
  headerRow.forEach(function (cell, idx) {
    const k = String(cell || '').trim().toLowerCase();
    if (k) map[k] = idx;
  });
  return map;
}

function cell(row, map, key) {
  const i = map[key];
  if (i === undefined || i >= row.length) return '';
  if (row[i] == null) return '';
  return String(row[i]).trim();
}

function parseBool(raw, ctx) {
  if (raw === '' || raw == null) return false;
  const s = String(raw).trim().toLowerCase();
  if (s === 'true' || s === '1' || s === 'yes' || s === 'y') return true;
  if (s === 'false' || s === '0' || s === 'no' || s === 'n') return false;
  throw new Error(`${ctx}: visible must be true/false, yes/no, or 1/0 (got ${JSON.stringify(raw)})`);
}

function parseJsonColumn(raw, ctx, optional) {
  if (raw === '' || raw == null) {
    if (optional) return undefined;
    return undefined;
  }
  try {
    return JSON.parse(String(raw));
  } catch (e) {
    throw new Error(`${ctx}: invalid JSON: ${e.message}`);
  }
}

function optionalNumber(raw, ctx) {
  if (raw === '' || raw == null) return undefined;
  const n = Number(String(raw).trim());
  if (Number.isNaN(n)) throw new Error(`${ctx}: sort_order must be a number`);
  return n;
}

function rowsToEvents(rows) {
  if (rows.length === 0) return [];
  const header = buildHeaderIndex(rows[0]);
  const need = ['event_id', 'branch', 'title', 'visible'];
  need.forEach(function (k) {
    if (header[k] === undefined) {
      throw new Error(`Events CSV missing required column: ${k}`);
    }
  });
  const events = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.every(function (c) { return String(c || '').trim() === ''; })) continue;

    const eventId = cell(row, header, 'event_id');
    if (!eventId || eventId.startsWith('#')) continue;

    const visible = parseBool(cell(row, header, 'visible'), `event ${eventId}.visible`);
    const evt = {
      event_id: eventId,
      branch: cell(row, header, 'branch'),
      title: cell(row, header, 'title'),
      visible: visible
    };

    const slotId = cell(row, header, 'slot_id');
    if (slotId) evt.slot_id = slotId;

    const venue = cell(row, header, 'venue');
    if (venue) evt.venue = venue;

    const start = cell(row, header, 'start');
    const end = cell(row, header, 'end');
    if (start || end) {
      evt.start = start;
      evt.end = end;
    }

    const descJson = cell(row, header, 'description_json');
    const descPlain = cell(row, header, 'description');
    if (descJson) {
      evt.description = parseJsonColumn(descJson, `event ${eventId}.description_json`, false);
    } else if (descPlain) {
      evt.description = descPlain;
    }

    const details = parseJsonColumn(cell(row, header, 'details_json'), `event ${eventId}.details_json`, true);
    if (details !== undefined) evt.details = details;

    const button = parseJsonColumn(cell(row, header, 'button_json'), `event ${eventId}.button_json`, true);
    if (button !== undefined) evt.button = button;

    const sortOrder = optionalNumber(cell(row, header, 'sort_order'), `event ${eventId}.sort_order`);
    if (sortOrder !== undefined) evt.sort_order = sortOrder;

    events.push(evt);
  }
  return events;
}

function rowsToVideos(rows) {
  if (rows.length === 0) return [];
  const header = buildHeaderIndex(rows[0]);
  const need = ['video_id', 'branch', 'title', 'youtube_url', 'embed_url', 'visible'];
  need.forEach(function (k) {
    if (header[k] === undefined) {
      throw new Error(`Videos CSV missing required column: ${k}`);
    }
  });
  const videos = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.every(function (c) { return String(c || '').trim() === ''; })) continue;

    const videoId = cell(row, header, 'video_id');
    if (!videoId || videoId.startsWith('#')) continue;

    const visible = parseBool(cell(row, header, 'visible'), `video ${videoId}.visible`);
    let sortOrder = optionalNumber(cell(row, header, 'sort_order'), `video ${videoId}.sort_order`);
    if (sortOrder === undefined) sortOrder = 10;

    const v = {
      video_id: videoId,
      branch: cell(row, header, 'branch'),
      title: cell(row, header, 'title'),
      youtube_url: cell(row, header, 'youtube_url'),
      embed_url: cell(row, header, 'embed_url'),
      visible: visible,
      sort_order: sortOrder
    };

    const thumb = cell(row, header, 'thumbnail_url');
    if (thumb) v.thumbnail_url = thumb;

    const notes = parseJsonColumn(cell(row, header, 'notes_json'), `video ${videoId}.notes_json`, true);
    if (notes !== undefined) v.notes = notes;

    videos.push(v);
  }
  return videos;
}

async function fetchExportCsv(spreadsheetId, gid) {
  const url = 'https://docs.google.com/spreadsheets/d/' + encodeURIComponent(spreadsheetId) +
    '/export?format=csv&gid=' + encodeURIComponent(String(gid));
  const res = await fetch(url, { redirect: 'follow' });
  const text = await res.text();
  if (!res.ok) {
    throw new Error('HTTP ' + res.status + ' fetching sheet CSV: ' + url);
  }
  if (/^\s*</.test(text) && (text.includes('<!DOCTYPE') || text.includes('<html'))) {
    throw new Error(
      'Sheet CSV export returned HTML. Share the spreadsheet so anyone with the link can ' +
        'view it, and confirm ASHRAFIYYA_SYNC_*_TAB_GID matches the tab (see URL gid=...).'
    );
  }
  return text;
}

function readJsonFile(absPath) {
  return JSON.parse(fs.readFileSync(absPath, 'utf8'));
}

function writeJson(absPath, obj) {
  fs.writeFileSync(absPath, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function copyFileSyncSafe(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

function runValidator() {
  const r = spawnSync(process.execPath, [path.join(REPO_ROOT, 'scripts', 'validate-content.mjs')], {
    cwd: REPO_ROOT,
    env: { ...process.env, ASHRAFIYYA_VALIDATE_DATA_DIR: STAGING_DIR },
    stdio: 'inherit'
  });
  if (r.status !== 0) {
    console.error('sync-google-sheet: validation failed; data/ not modified.');
    process.exit(r.status || 1);
  }
}

function countEventsOrVideos(filePath, key) {
  try {
    const data = readJsonFile(filePath);
    return Array.isArray(data[key]) ? data[key].length : 0;
  } catch (e) {
    return 0;
  }
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(`sync-google-sheet.mjs — pull events/videos from Google Sheets CSV export

Environment:
  ASHRAFIYYA_GOOGLE_SHEET_ID        Spreadsheet ID from /d/<ID>/edit
  ASHRAFIYYA_SYNC_EVENTS_TAB_GID    Tab ID for Events (gid in tab URL), or omit to keep existing events.json
  ASHRAFIYYA_SYNC_VIDEOS_TAB_GID    Tab ID for Videos, or omit to keep existing videos.json
  ASHRAFIYYA_SYNC_ALLOW_EMPTY=1     Same as --allow-empty

Options:
  --dry-run       Validate only; do not write data/*.json
  --allow-empty   Allow sheet to produce zero events or zero videos when prior file had rows

See docs/google-sheet-sync.md for column headers and examples.
`);
    process.exit(0);
  }

  const dryRun = argv.includes('--dry-run');
  const allowEmpty = argv.includes('--allow-empty') || process.env.ASHRAFIYYA_SYNC_ALLOW_EMPTY === '1';

  const sheetId = process.env.ASHRAFIYYA_GOOGLE_SHEET_ID;
  const eventsGid = process.env.ASHRAFIYYA_SYNC_EVENTS_TAB_GID || '';
  const videosGid = process.env.ASHRAFIYYA_SYNC_VIDEOS_TAB_GID || '';

  if (!sheetId) {
    console.error('sync-google-sheet: set ASHRAFIYYA_GOOGLE_SHEET_ID');
    process.exit(1);
  }
  if (!eventsGid && !videosGid) {
    console.error('sync-google-sheet: set at least one of ASHRAFIYYA_SYNC_EVENTS_TAB_GID or ASHRAFIYYA_SYNC_VIDEOS_TAB_GID');
    process.exit(1);
  }

  const oldEventCount = countEventsOrVideos(path.join(DATA_DIR, 'events.json'), 'events');
  const oldVideoCount = countEventsOrVideos(path.join(DATA_DIR, 'videos.json'), 'videos');

  if (fs.existsSync(STAGING_DIR)) {
    fs.rmSync(STAGING_DIR, { recursive: true });
  }
  fs.mkdirSync(STAGING_DIR, { recursive: true });

  copyFileSyncSafe(path.join(DATA_DIR, 'program-slots.json'), path.join(STAGING_DIR, 'program-slots.json'));

  if (eventsGid) {
    console.log('sync-google-sheet: fetching Events tab…');
    const csv = await fetchExportCsv(sheetId, eventsGid);
    const rows = parseCSV(csv);
    const events = rowsToEvents(rows);
    if (!allowEmpty && events.length === 0 && oldEventCount > 0) {
      console.error('sync-google-sheet: refusing to write zero events while data/events.json has rows. Use --allow-empty to override.');
      process.exit(1);
    }
    writeJson(path.join(STAGING_DIR, 'events.json'), { schema_version: 1, events: events });
  } else {
    copyFileSyncSafe(path.join(DATA_DIR, 'events.json'), path.join(STAGING_DIR, 'events.json'));
    console.log('sync-google-sheet: Events tab skipped; copied data/events.json to staging');
  }

  if (videosGid) {
    console.log('sync-google-sheet: fetching Videos tab…');
    const csv = await fetchExportCsv(sheetId, videosGid);
    const rows = parseCSV(csv);
    const videos = rowsToVideos(rows);
    if (!allowEmpty && videos.length === 0 && oldVideoCount > 0) {
      console.error('sync-google-sheet: refusing to write zero videos while data/videos.json has rows. Use --allow-empty to override.');
      process.exit(1);
    }
    writeJson(path.join(STAGING_DIR, 'videos.json'), { schema_version: 1, videos: videos });
  } else {
    copyFileSyncSafe(path.join(DATA_DIR, 'videos.json'), path.join(STAGING_DIR, 'videos.json'));
    console.log('sync-google-sheet: Videos tab skipped; copied data/videos.json to staging');
  }

  let meta = { schema_version: 1, generated_at: null, source: 'manual', files: {} };
  try {
    meta = readJsonFile(path.join(DATA_DIR, 'meta.json'));
  } catch (e) { /* use seed */ }
  meta.generated_at = new Date().toISOString();
  meta.source = 'sheet';
  if (!meta.files || typeof meta.files !== 'object') meta.files = {};
  meta.files['events.json'] = { schema_version: 1 };
  meta.files['videos.json'] = { schema_version: 1 };
  meta.files['program-slots.json'] = { schema_version: 1 };
  writeJson(path.join(STAGING_DIR, 'meta.json'), meta);

  console.log('sync-google-sheet: running validate-content.mjs on staging…');
  runValidator();

  if (dryRun) {
    console.log('sync-google-sheet: --dry-run OK (staging left at data/.sync-staging/; data/ not modified)');
    return;
  }

  const wrote = [];
  if (eventsGid) {
    copyFileSyncSafe(path.join(STAGING_DIR, 'events.json'), path.join(DATA_DIR, 'events.json'));
    wrote.push('events.json');
  }
  if (videosGid) {
    copyFileSyncSafe(path.join(STAGING_DIR, 'videos.json'), path.join(DATA_DIR, 'videos.json'));
    wrote.push('videos.json');
  }
  copyFileSyncSafe(path.join(STAGING_DIR, 'meta.json'), path.join(DATA_DIR, 'meta.json'));
  wrote.push('meta.json');
  console.log('sync-google-sheet: updated data/' + wrote.join(', '));
}

main().catch(function (e) {
  console.error('sync-google-sheet:', e.message || e);
  process.exit(1);
});
