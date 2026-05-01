# Maintainer guide

For developers responsible for the Ashrafiyya site code, the data pipeline, and the GitHub Actions sync. Editors should read [`editing-content.md`](editing-content.md) instead.

> Setting up the pipeline from scratch (new spreadsheet, new repo Variables, first sync) is covered in [`pipeline-setup.md`](pipeline-setup.md). This guide covers everything that comes after.

## Architecture in one screen

- **Static GitHub Pages site** served from this repo.
- **Renderer** (`script.js`) loads `data/*.json` at runtime and replaces empty mount shells (`data-program-slot`, `data-past-event-id`, `data-video-id`) in `index.html` with generated DOM. Field-by-field rules are in [`content-schema.md`](content-schema.md).
- **Editor source of truth** is a Google Sheet. A Node script (`scripts/sync-google-sheet.mjs`) downloads CSV exports of two tabs, maps rows to JSON, validates with `scripts/validate-content.mjs`, and writes `data/events.json`, `data/videos.json`, and `data/meta.json`. `data/program-slots.json` is **never** sheet-controlled.
- **Automation** is `.github/workflows/sync-content.yml`: `workflow_dispatch` + `cron: "0 11,23 * * *"` UTC. See [`google-sheet-sync.md`](google-sheet-sync.md).

```text
Google Sheet                ┌────────────────────┐
  Events tab CSV  ──────────▶ scripts/sync-…mjs  │
  Videos tab CSV  ──────────▶ + validate-…mjs    │
                             └─────────┬──────────┘
                                       │ writes
                                       ▼
                        data/events.json, data/videos.json, data/meta.json
                                       │
                                       │ commit + push
                                       ▼
                                  GitHub Pages
                                       │
                                       ▼
        index.html shells  ←  script.js  ←  fetch('data/*.json')
```

## Local development

```bash
# Serve the site (any static server works):
python3 -m http.server 8080
# Then open http://localhost:8080
```

The renderer fetches `data/*.json` over HTTP, so opening `index.html` directly via `file://` may fail in some browsers. Use a local server.

## Validation

```bash
node scripts/validate-content.mjs
```

Run before every commit that touches `data/`, after a manual sync, and before opening a PR. Exits non-zero with a list of failures on stderr. See [`content-schema.md`](content-schema.md) for what each rule checks.

To validate an alternate directory (used internally by the sync script's staging):

```bash
ASHRAFIYYA_VALIDATE_DATA_DIR=/abs/path/to/staging node scripts/validate-content.mjs
```

## Running the sync locally

```bash
ASHRAFIYYA_GOOGLE_SHEET_ID="…" \
ASHRAFIYYA_SYNC_EVENTS_TAB_GID="…" \
ASHRAFIYYA_SYNC_VIDEOS_TAB_GID="…" \
node scripts/sync-google-sheet.mjs --dry-run
```

`--dry-run` validates against `data/.sync-staging/` (gitignored) without touching `data/`. Drop the flag to write. Full reference: [`google-sheet-sync.md`](google-sheet-sync.md).

## Triggering the GitHub Actions sync

- **Manual**: GitHub → **Actions → Sync content from Google Sheet → Run workflow**. Use `dry_run: true` for the first try after any change to the workflow or to the sheet structure.
- **Scheduled**: `cron: "0 11,23 * * *"` UTC. Disable temporarily by commenting out the `schedule:` block.
- **From the spreadsheet** (optional): see [`sheet-trigger-button.md`](sheet-trigger-button.md).

Required repo settings before the schedule is useful:

- **Variable** (or **Secret**) `ASHRAFIYYA_GOOGLE_SHEET_ID`
- **Variables** `ASHRAFIYYA_SYNC_EVENTS_TAB_GID` and/or `ASHRAFIYYA_SYNC_VIDEOS_TAB_GID`

## Recipes

### Add a new current program slot

1. In `data/program-slots.json`, add an object with a new `slot_id` (lowercase, snake_case), correct `branch`, `sort_order`, and any `default_*` fields. Slot IDs are forever — don't reuse old ones.
2. In `index.html`, add `<div class="program-item" data-program-slot="<new_slot_id>"></div>` in the matching branch's `.programs-list`.
3. Update the **Slot IDs** table in [`content-schema.md`](content-schema.md).
4. Run `node scripts/validate-content.mjs`. Smoke-test the page locally.
5. Tell editors the new `slot_id` so they can target it from the Events tab.

### Add a new past event without using the sheet

Append the event to `data/events.json` (matching the existing schema), tag the corresponding event card in `index.html` with `data-past-event-id="<event_id>"`, run the validator, commit. The next sheet sync will reconcile the file as long as the row is also added to the sheet — otherwise it will be removed.

> If you only need a one-off backfill, prefer adding the row to the sheet and triggering a sync. That keeps the source of truth in one place.

### Add a new branch (e.g. a fourth program area)

This is a code change, not a sheet change.

1. Add the branch to `BRANCHES` in `scripts/validate-content.mjs`.
2. Add the branch to the **Branch IDs** table in [`content-schema.md`](content-schema.md) and update the editor cheat-sheet in [`editing-content.md`](editing-content.md).
3. Add the new section's HTML scaffolding in `index.html` (program card, past-events block, recorded-resources column).
4. Add slots in `data/program-slots.json` and matching shells in `index.html` per the recipe above.
5. Validate, smoke-test, deploy, then notify editors.

### Recover from a bad sync (or bad manual edit)

1. **Do not** edit `data/*.json` to "fix" the sheet output. Fix the sheet first.
2. If the workflow has already pushed bad data, run `git revert <sha>` on the offending commit on `main` (or whichever branch GitHub Pages serves). Push.
3. Re-run validation against the reverted tree: `node scripts/validate-content.mjs`. It must pass before the page recovers.
4. Once the sheet is fixed, dispatch the workflow again. The sync script will refuse to overwrite a non-empty file with zero rows, so you generally cannot blank the site by accident.

### Rotate the Apps Script PAT (if the optional menu is in use)

In the Apps Script project: **Project Settings → Script Properties → `GITHUB_TOKEN` → Edit**. Save the new value. The next dispatch picks it up — no script edit and no redeploy needed. Revoke the old PAT in GitHub after confirming the new one works.

## Code conventions

- **No build step.** Everything is hand-written ES5-ish JavaScript living in `script.js`. Keep it that way unless the next maintainer explicitly opts into a bundler.
- **Renderer never uses `innerHTML`** with editor data. The only inline formatting allowed in editor data is the rich-text segment allowlist (`{ "em": "..." }`, `{ "text": "..." }`) implemented in `appendRichText`. Adding more requires a code change in both the renderer and [`content-schema.md`](content-schema.md).
- **URLs** must pass `isSafeHref` (http(s), `mailto:`, repo-relative paths, or `#`). The renderer drops anything else.
- **Mount shells** in `index.html` are intentionally empty `<div>`s. If you put fallback HTML inside them, the script will replace it on every load, which can flash unstyled content on slow networks.
- **Schema bumps** (`schema_version`) require coordinated changes in `script.js`, `scripts/validate-content.mjs`, `scripts/sync-google-sheet.mjs`, and the docs. There is no migration tooling — keep schema changes additive whenever possible.

## Pre-merge checklist

- [ ] `node scripts/validate-content.mjs` passes.
- [ ] If you touched `index.html`, every `data-program-slot`, `data-past-event-id`, and `data-video-id` references an item that exists in the data files (the validator catches this).
- [ ] If you bumped `schema_version`, you also updated the validator, sync script, and docs in the same PR.
- [ ] If you added a new branch / slot / mount type, the editor docs ([`editing-content.md`](editing-content.md)) reflect it.
- [ ] No PAT, secret, or sheet ID is committed.

## Where to look when something breaks

| Symptom | First place to look |
| --- | --- |
| A card on the site is blank | DevTools console for `[ashrafiyya-content]` warnings; check the matching `data/*.json` entry exists and `visible: true`. |
| GitHub Actions sync fails on `validate-content.mjs` | Sync run log lists each failing row. Fix in the sheet, re-dispatch. Repo `data/` is unchanged. |
| Sync run log says "refusing to write zero events…" | The sheet returned no rows. Confirm sharing, the right `gid`, and that you didn't accidentally clear the tab. Use `--allow-empty` only if the empty result is intentional. |
| Apps Script menu errors with HTTP 401/403/404 | PAT expired, missing **Actions: Read & write** scope, wrong `GITHUB_OWNER` / `GITHUB_REPO` / `GITHUB_BRANCH` Script Property, or the workflow file was renamed. |
| Recorded-resources column scrollbar broken after a video added | The post-mount `refreshScrollbars()` step in the recorded-resources mount IIFE in `script.js` should fire automatically; verify the `[data-video-id]` shell is inside `.video-scroll-container`. |
