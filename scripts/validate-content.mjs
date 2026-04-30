/**
 * Validates repo content JSON and index.html mount IDs.
 * Run from repo root: node scripts/validate-content.mjs
 *
 * Optional: ASHRAFIYYA_VALIDATE_DATA_DIR — absolute or relative path to a folder
 * containing program-slots.json, events.json, videos.json, and meta.json (used
 * by scripts/sync-google-sheet.mjs staging). index.html is always read from
 * the repo root.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const DATA_DIR = process.env.ASHRAFIYYA_VALIDATE_DATA_DIR
  ? path.resolve(process.env.ASHRAFIYYA_VALIDATE_DATA_DIR)
  : path.join(REPO_ROOT, 'data');

const BRANCHES = new Set(['health', 'circles', 'itqan']);
const ALLOWED_BUTTON_STYLES = new Set(['insta-link-light', 'insta-link']);

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function isSafeHref(href) {
  if (typeof href !== 'string' || !href) return false;
  if (/^javascript:/i.test(href)) return false;
  if (href === '#') return true;
  if (/^https?:\/\//i.test(href)) return true;
  if (/^mailto:/i.test(href)) return true;
  if (/^[a-zA-Z0-9_./\-?#]/.test(href)) return true;
  return false;
}

function readJson(relName) {
  const full = path.join(DATA_DIR, relName);
  let raw;
  try {
    raw = fs.readFileSync(full, 'utf8');
  } catch (e) {
    throw new Error(`Cannot read ${relName}: ${e.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Invalid JSON in ${relName}: ${e.message}`);
  }
}

function validateIsoInstant(label, value, errors) {
  if (value == null) return;
  if (typeof value !== 'string') {
    errors.push(`${label} must be a string`);
    return;
  }
  const ms = Date.parse(value);
  if (Number.isNaN(ms)) {
    errors.push(`${label} is not a parseable ISO 8601 date: ${JSON.stringify(value)}`);
  }
}

function validateDescription(ctx, value, errors) {
  if (value == null) return;
  if (typeof value === 'string') return;
  if (!Array.isArray(value)) {
    errors.push(`${ctx}: description must be a string or array of segments`);
    return;
  }
  value.forEach(function (seg, i) {
    if (typeof seg === 'string') return;
    if (!isPlainObject(seg)) {
      errors.push(`${ctx}: description segment[${i}] must be string or object`);
      return;
    }
    const keys = Object.keys(seg);
    if (keys.length === 1 && typeof seg.em === 'string') return;
    if (keys.length === 1 && typeof seg.text === 'string') return;
    errors.push(`${ctx}: description segment[${i}] must be string, { "em": "..." }, or { "text": "..." }`);
  });
}

function validateButton(ctx, button, errors) {
  if (!isPlainObject(button)) {
    errors.push(`${ctx}: button must be an object`);
    return;
  }
  if (typeof button.text !== 'string' || !button.text) {
    errors.push(`${ctx}: button.text missing`);
  }
  if (typeof button.href !== 'string' || !button.href) {
    errors.push(`${ctx}: button.href missing`);
  } else if (!isSafeHref(button.href)) {
    errors.push(`${ctx}: button.href is not an allowed URL`);
  }
  if (button.style != null && !ALLOWED_BUTTON_STYLES.has(button.style)) {
    errors.push(`${ctx}: button.style must be one of: ${[...ALLOWED_BUTTON_STYLES].join(', ')}`);
  }
}

function validateDetailRows(ctx, rows, errors) {
  if (!Array.isArray(rows)) {
    errors.push(`${ctx}: details must be an array`);
    return;
  }
  rows.forEach(function (row, i) {
    if (!isPlainObject(row)) {
      errors.push(`${ctx}: details[${i}] must be an object`);
      return;
    }
    if (typeof row.label !== 'string' || !row.label) {
      errors.push(`${ctx}: details[${i}].label missing`);
    }
    if (typeof row.value !== 'string') {
      errors.push(`${ctx}: details[${i}].value must be a string`);
    }
  });
}

function validateProgramSlots(data, errors) {
  if (!isPlainObject(data)) {
    errors.push('program-slots.json: root must be an object');
    return new Set();
  }
  if (data.schema_version !== 1) {
    errors.push(`program-slots.json: unsupported schema_version ${data.schema_version}`);
  }
  if (!Array.isArray(data.slots)) {
    errors.push('program-slots.json: slots must be an array');
    return new Set();
  }

  const seen = new Set();
  const slotIds = new Set();

  data.slots.forEach(function (slot, idx) {
    const p = `slot[${idx}]`;
    if (!isPlainObject(slot)) {
      errors.push(`${p}: not an object`);
      return;
    }
    if (typeof slot.slot_id !== 'string' || !slot.slot_id) {
      errors.push(`${p}: slot_id missing`);
      return;
    }
    if (seen.has(slot.slot_id)) {
      errors.push(`${p}: duplicate slot_id ${slot.slot_id}`);
      return;
    }
    seen.add(slot.slot_id);
    slotIds.add(slot.slot_id);

    if (typeof slot.branch !== 'string' || !BRANCHES.has(slot.branch)) {
      errors.push(`slot ${slot.slot_id}: branch must be one of: ${[...BRANCHES].join(', ')}`);
    }
    if (typeof slot.section !== 'string' || slot.section !== 'programs') {
      errors.push(`slot ${slot.slot_id}: section must be "programs"`);
    }
    if (typeof slot.sort_order !== 'number' || Number.isNaN(slot.sort_order)) {
      errors.push(`slot ${slot.slot_id}: sort_order must be a number`);
    }
    if (typeof slot.is_enabled !== 'boolean') {
      errors.push(`slot ${slot.slot_id}: is_enabled must be a boolean`);
    }
    if (typeof slot.title !== 'string' || !slot.title) {
      errors.push(`slot ${slot.slot_id}: title missing`);
    }

    validateDescription(`slot ${slot.slot_id}`, slot.description, errors);

    if (slot.default_details != null) {
      validateDetailRows(`slot ${slot.slot_id}.default_details`, slot.default_details, errors);
    }
    if (slot.default_button != null) {
      validateButton(`slot ${slot.slot_id}.default_button`, slot.default_button, errors);
    }
  });

  return slotIds;
}

function validateEvents(data, slotIds, errors) {
  if (!isPlainObject(data)) {
    errors.push('events.json: root must be an object');
    return new Set();
  }
  if (data.schema_version !== 1) {
    errors.push(`events.json: unsupported schema_version ${data.schema_version}`);
  }
  if (!Array.isArray(data.events)) {
    errors.push('events.json: events must be an array');
    return new Set();
  }

  const seen = new Set();
  const eventIds = new Set();

  data.events.forEach(function (evt, idx) {
    const p = `event[${idx}]`;
    if (!isPlainObject(evt)) {
      errors.push(`${p}: not an object`);
      return;
    }
    if (typeof evt.event_id !== 'string' || !evt.event_id) {
      errors.push(`${p}: event_id missing`);
      return;
    }
    if (seen.has(evt.event_id)) {
      errors.push(`${p}: duplicate event_id ${evt.event_id}`);
      return;
    }
    seen.add(evt.event_id);
    eventIds.add(evt.event_id);

    if (typeof evt.branch !== 'string' || !BRANCHES.has(evt.branch)) {
      errors.push(`event ${evt.event_id}: branch must be one of: ${[...BRANCHES].join(', ')}`);
    }
    if (typeof evt.title !== 'string' || !evt.title) {
      errors.push(`event ${evt.event_id}: title missing`);
    }
    if (typeof evt.visible !== 'boolean') {
      errors.push(`event ${evt.event_id}: visible must be a boolean`);
    }

    if (evt.slot_id != null) {
      if (typeof evt.slot_id !== 'string' || !slotIds.has(evt.slot_id)) {
        errors.push(`event ${evt.event_id}: slot_id ${JSON.stringify(evt.slot_id)} does not match any slot in program-slots.json`);
      }
    }

    const hasStart = evt.start != null;
    const hasEnd = evt.end != null;
    if (hasStart !== hasEnd) {
      errors.push(`event ${evt.event_id}: start and end must both be present or both absent`);
    }
    if (hasStart) {
      validateIsoInstant(`event ${evt.event_id}.start`, evt.start, errors);
      validateIsoInstant(`event ${evt.event_id}.end`, evt.end, errors);
      const s = Date.parse(evt.start);
      const e = Date.parse(evt.end);
      if (!Number.isNaN(s) && !Number.isNaN(e) && e < s) {
        errors.push(`event ${evt.event_id}: end is before start`);
      }
    }

    validateDescription(`event ${evt.event_id}`, evt.description, errors);

    if (evt.details != null) {
      validateDetailRows(`event ${evt.event_id}.details`, evt.details, errors);
    }
    if (evt.button != null) {
      validateButton(`event ${evt.event_id}.button`, evt.button, errors);
    }
    if (evt.sort_order != null && typeof evt.sort_order !== 'number') {
      errors.push(`event ${evt.event_id}: sort_order must be a number`);
    }
  });

  return eventIds;
}

function validateVideoNotes(ctx, notes, errors) {
  if (!Array.isArray(notes)) {
    errors.push(`${ctx}: notes must be an array`);
    return;
  }
  notes.forEach(function (n, i) {
    if (!isPlainObject(n)) {
      errors.push(`${ctx}[${i}]: must be an object`);
      return;
    }
    if (typeof n.label !== 'string' || !n.label) {
      errors.push(`${ctx}[${i}]: label missing`);
    }
    if (typeof n.href !== 'string' || !n.href) {
      errors.push(`${ctx}[${i}]: href missing`);
    } else if (!isSafeHref(n.href)) {
      errors.push(`${ctx}[${i}]: href is not an allowed URL`);
    }
    if (n.target != null && typeof n.target !== 'string') {
      errors.push(`${ctx}[${i}]: target must be a string`);
    }
    if (n.rel != null && typeof n.rel !== 'string') {
      errors.push(`${ctx}[${i}]: rel must be a string`);
    }
  });
}

function validateVideos(data, errors) {
  if (!isPlainObject(data)) {
    errors.push('videos.json: root must be an object');
    return new Set();
  }
  if (data.schema_version !== 1) {
    errors.push(`videos.json: unsupported schema_version ${data.schema_version}`);
  }
  if (!Array.isArray(data.videos)) {
    errors.push('videos.json: videos must be an array');
    return new Set();
  }

  const seen = new Set();
  const videoIds = new Set();

  data.videos.forEach(function (video, idx) {
    const p = `video[${idx}]`;
    if (!isPlainObject(video)) {
      errors.push(`${p}: not an object`);
      return;
    }
    if (typeof video.video_id !== 'string' || !video.video_id) {
      errors.push(`${p}: video_id missing`);
      return;
    }
    if (seen.has(video.video_id)) {
      errors.push(`${p}: duplicate video_id ${video.video_id}`);
      return;
    }
    seen.add(video.video_id);
    videoIds.add(video.video_id);

    if (typeof video.branch !== 'string' || !BRANCHES.has(video.branch)) {
      errors.push(`video ${video.video_id}: branch must be one of: ${[...BRANCHES].join(', ')}`);
    }
    if (typeof video.title !== 'string' || !video.title) {
      errors.push(`video ${video.video_id}: title missing`);
    }
    if (typeof video.embed_url !== 'string' || !video.embed_url) {
      errors.push(`video ${video.video_id}: embed_url missing`);
    } else if (!isSafeHref(video.embed_url)) {
      errors.push(`video ${video.video_id}: embed_url is not an allowed URL`);
    }
    if (typeof video.youtube_url !== 'string' || !video.youtube_url) {
      errors.push(`video ${video.video_id}: youtube_url missing`);
    } else if (!isSafeHref(video.youtube_url)) {
      errors.push(`video ${video.video_id}: youtube_url is not an allowed URL`);
    }
    if (typeof video.visible !== 'boolean') {
      errors.push(`video ${video.video_id}: visible must be a boolean`);
    }
    if (typeof video.sort_order !== 'number' || Number.isNaN(video.sort_order)) {
      errors.push(`video ${video.video_id}: sort_order must be a number`);
    }
    if (video.thumbnail_url != null) {
      if (typeof video.thumbnail_url !== 'string' || !isSafeHref(video.thumbnail_url)) {
        errors.push(`video ${video.video_id}: thumbnail_url must be an allowed URL string`);
      }
    }
    if (video.notes != null) {
      validateVideoNotes(`video ${video.video_id}.notes`, video.notes, errors);
    }
  });

  return videoIds;
}

function validateMeta(data, errors) {
  if (data == null) return;
  if (!isPlainObject(data)) {
    errors.push('meta.json: root must be an object');
    return;
  }
  if (data.schema_version !== 1) {
    errors.push(`meta.json: unsupported schema_version ${data.schema_version}`);
  }
}

function extractMountIds(html, attr) {
  const re = new RegExp(`${attr}="([^"]+)"`, 'g');
  const ids = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    ids.push(m[1]);
  }
  return ids;
}

function validateIndexHtml(slotIds, eventIds, videoIds, errors) {
  const full = path.join(REPO_ROOT, 'index.html');
  let html;
  try {
    html = fs.readFileSync(full, 'utf8');
  } catch (e) {
    errors.push(`index.html: cannot read: ${e.message}`);
    return;
  }

  const slotsInHtml = extractMountIds(html, 'data-program-slot');
  slotsInHtml.forEach(function (id) {
    if (!slotIds.has(id)) {
      errors.push(`index.html: data-program-slot="${id}" has no matching slot in program-slots.json`);
    }
  });

  const eventsInHtml = extractMountIds(html, 'data-past-event-id');
  eventsInHtml.forEach(function (id) {
    if (!eventIds.has(id)) {
      errors.push(`index.html: data-past-event-id="${id}" has no matching event in events.json`);
    }
  });

  const videosInHtml = extractMountIds(html, 'data-video-id');
  videosInHtml.forEach(function (id) {
    if (!videoIds.has(id)) {
      errors.push(`index.html: data-video-id="${id}" has no matching video in videos.json`);
    }
  });
}

const errors = [];

let slotsData;
let eventsData;
let videosData;

try {
  slotsData = readJson('program-slots.json');
} catch (e) {
  errors.push(e.message);
  slotsData = {};
}
try {
  eventsData = readJson('events.json');
} catch (e) {
  errors.push(e.message);
  eventsData = {};
}
try {
  videosData = readJson('videos.json');
} catch (e) {
  errors.push(e.message);
  videosData = {};
}

let metaData = null;
try {
  metaData = readJson('meta.json');
} catch (e) {
  errors.push(e.message);
}

const slotIds = validateProgramSlots(slotsData, errors);
const eventIds = validateEvents(eventsData, slotIds, errors);
const videoIds = validateVideos(videosData, errors);
validateMeta(metaData, errors);

validateIndexHtml(slotIds, eventIds, videoIds, errors);

if (errors.length) {
  console.error('validate-content: FAILED with ' + errors.length + ' error(s):\n');
  errors.forEach(function (e) { console.error('  - ' + e); });
  process.exit(1);
}

console.log('validate-content: OK (program-slots.json, events.json, videos.json, meta.json, index.html mounts)');
