# Ashrafiyya site documentation

This folder is the source of truth for how content reaches the live site at [ashrafiyya.com](https://ashrafiyya.com). Pick the doc that matches what you're trying to do.

## I just need to update events or recorded videos

Read **[`editing-content.md`](editing-content.md)**. You will only touch the Google Sheet.

## I am a developer or maintainer

Start with **[`maintainer-guide.md`](maintainer-guide.md)** for the day-to-day workflow (deploys, recovering from a bad sync, adding a new program slot or branch). When you need details about a field, jump to:

- [`content-schema.md`](content-schema.md) — the data contract for `data/program-slots.json`, `data/events.json`, `data/videos.json`, `data/meta.json`, plus the local validator.
- [`google-sheet-sync.md`](google-sheet-sync.md) — the local sync script and the manual + scheduled GitHub Actions workflow.
- [`sheet-trigger-button.md`](sheet-trigger-button.md) — optional Apps Script menu inside the spreadsheet.

## File map

```text
data/
  program-slots.json   # developer-controlled defaults for current program slots
  events.json          # scheduled and past events (sheet sync writes this)
  videos.json          # recorded resources (sheet sync writes this)
  meta.json            # schema version, last-sync timestamp, source
docs/
  README.md                  (this file)
  editing-content.md         # editor-facing how-to
  maintainer-guide.md        # developer-facing how-to
  content-schema.md          # field-by-field reference
  google-sheet-sync.md       # local + Actions sync details
  sheet-trigger-button.md    # optional Apps Script menu
scripts/
  validate-content.mjs       # node scripts/validate-content.mjs
  sync-google-sheet.mjs      # node scripts/sync-google-sheet.mjs
.github/workflows/
  sync-content.yml           # workflow_dispatch + cron sync
```
