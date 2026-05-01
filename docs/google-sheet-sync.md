# Google Sheet → repo JSON (local sync)

The script [`scripts/sync-google-sheet.mjs`](../scripts/sync-google-sheet.mjs) downloads **CSV exports** of one or two tabs from a spreadsheet and rebuilds `data/events.json` and/or `data/videos.json` after the same checks as [`scripts/validate-content.mjs`](../scripts/validate-content.mjs).

It does **not** read or write [`data/program-slots.json`](../data/program-slots.json) (developer-controlled defaults only).

## Sharing

1. In Google Sheets: **File → Share → Anyone with the link** (Viewer), *or* publish if your workflow prefers that.
2. Copy the spreadsheet ID from the URL:  
   `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`
3. Open each tab you will sync; the **gid** is in the URL as `gid=…` (use that number per tab).

## Environment variables

| Variable | Purpose |
| --- | --- |
| `ASHRAFIYYA_GOOGLE_SHEET_ID` | Required. Spreadsheet ID from the URL. |
| `ASHRAFIYYA_SYNC_EVENTS_TAB_GID` | Optional. Tab IDs for **Events**. If omitted, existing `data/events.json` is copied into staging unchanged. |
| `ASHRAFIYYA_SYNC_VIDEOS_TAB_GID` | Optional. Tab IDs for **Videos**. If omitted, existing `data/videos.json` is copied unchanged. |

At least one of the two `*_TAB_GID` variables must be set.

Optional:

- `ASHRAFIYYA_SYNC_ALLOW_EMPTY=1` — allow a tab with no data rows to replace a non-empty JSON file (dangerous).

## Commands

From the repo root:

```bash
ASHRAFIYYA_GOOGLE_SHEET_ID="YOUR_ID" \
ASHRAFIYYA_SYNC_EVENTS_TAB_GID="1234567890" \
ASHRAFIYYA_SYNC_VIDEOS_TAB_GID="9876543210" \
node scripts/sync-google-sheet.mjs
```

Preview without writing `data/`:

```bash
... env vars ... node scripts/sync-google-sheet.mjs --dry-run
```

Staging output is written under `data/.sync-staging/` (gitignored), validated with `ASHRAFIYYA_VALIDATE_DATA_DIR` pointing at that folder, then copied into `data/` when not `--dry-run`.

## Events tab (CSV columns)

Header row **first**; column names are matched case-insensitively.

| Column | Required | Notes |
| --- | --- | --- |
| `event_id` | yes | Stable unique id. Rows with empty `event_id` or starting with `#` are skipped. |
| `branch` | yes | One of `health`, `circles`, `itqan`. |
| `title` | yes | |
| `visible` | yes | `true` / `false`, `yes` / `no`, `1` / `0`. |
| `slot_id` | no | Must match a `slot_id` in `program-slots.json` when set. |
| `start` | no | ISO 8601 UTC if used (e.g. `2026-05-10T18:30:00Z`). |
| `end` | no | If either `start` or `end` is set, both should be set; validator enforces pairing and order. |
| `venue` | no | |
| `description` | no | Plain text. |
| `description_json` | no | If set, parsed as JSON (e.g. rich-text segment array). Overrides `description` when present. |
| `details_json` | no | JSON array of `{ "label", "value" }` objects. |
| `button_json` | no | JSON object: `text`, `href`, optional `target`, `rel`, `style`. |
| `sort_order` | no | Number. |

## Videos tab (CSV columns)

| Column | Required | Notes |
| --- | --- | --- |
| `video_id` | yes | |
| `branch` | yes | `health`, `circles`, or `itqan`. |
| `title` | yes | |
| `youtube_url` | yes | Watch or live URL; must pass URL allowlist in validator. |
| `embed_url` | yes | YouTube embed URL. |
| `visible` | yes | Boolean as for events. |
| `sort_order` | no | Defaults to `10` if empty. |
| `thumbnail_url` | no | |
| `notes_json` | no | JSON array of `{ "label", "href", ... }` (see schema). |

## Safety

- If a fetched tab produces **zero rows** and the existing `data/events.json` or `data/videos.json` had items, the script **exits without updating** `data/`, unless `--allow-empty` or `ASHRAFIYYA_SYNC_ALLOW_EMPTY=1`.
- [`data/meta.json`](../data/meta.json) is updated with `generated_at` and `source: "sheet"` after a successful sync (full ingest path still validates against `program-slots.json` and [`index.html`](../index.html) mount IDs).

After changing JSON, run:

```bash
node scripts/validate-content.mjs
```

## GitHub Actions: manual sync

`.github/workflows/sync-content.yml` runs the same script on demand.

1. Open **Actions → Sync content from Google Sheet → Run workflow**.
2. Optionally set `sheet_id`, `events_gid`, `videos_gid`. If left blank, the workflow falls back to repo **Variables** (`ASHRAFIYYA_GOOGLE_SHEET_ID`, `ASHRAFIYYA_SYNC_EVENTS_TAB_GID`, `ASHRAFIYYA_SYNC_VIDEOS_TAB_GID`) or, for the sheet ID, a repo **Secret** of the same name.
3. Set `dry_run` to validate without committing, or `allow_empty` to permit zero-row replacements.

The job:

- Validates repo data **before** the sync (fails fast on pre-existing issues).
- Runs `scripts/sync-google-sheet.mjs` with the resolved environment.
- Re-validates the updated `data/` (skipped on dry runs).
- Commits **only** `data/events.json`, `data/videos.json`, `data/meta.json` and pushes when changes are detected.
- Uses `permissions: { contents: write }` and the default `GITHUB_TOKEN`; no extra credentials are required so long as the spreadsheet is link-shared.

If a tab is private or sharing changes, the sync step exits non-zero with a clear message and the workflow fails without touching `data/`.
