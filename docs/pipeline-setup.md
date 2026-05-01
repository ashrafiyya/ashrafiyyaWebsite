# End-to-end pipeline setup

This is the **single source of truth for standing up the content pipeline from scratch.** Follow it once, in order. Everything else in `docs/` is reference material that this guide links to. Existing operators only need [`editing-content.md`](editing-content.md).

```text
Editor -> Google Sheet -> CSV export -> sync-google-sheet.mjs
                                             |
                                             v
                                     validate-content.mjs
                                             |
                                             v
                              data/events.json + data/videos.json
                                             |
                                             v
                                  GitHub commit + Pages deploy
                                             |
                                             v
                          script.js fetches data and renders index.html
```

## Prerequisites

- A GitHub repository hosting this site, with **GitHub Pages** enabled on the branch you deploy from (typically `main`).
- A Google account that can create + own a spreadsheet for editorial content.
- **Node.js 20+** locally (only needed if you also want to run the sync script from your machine).
- Editor / Owner access to the repository's GitHub Actions, Variables, and Secrets.

## Step 1 — Create the Google Sheet

1. Create a **new blank spreadsheet** in Google Drive. Name it something stable, e.g. `Ashrafiyya — Site Content`.
2. Rename the default tab to **`Events`**, then add a second tab named **`Videos`** (left-click the `+` next to the tab list, then double-click the tab name).
3. In **`Events`** row 1, paste this header (one cell per column, in this exact order):

   ```
   event_id	branch	title	visible	slot_id	start	end	venue	description	description_json	details_json	button_json	sort_order
   ```

   Tip: paste it into A1 with **Edit → Paste special → Paste values only** so Sheets splits it into 13 columns.
4. In **`Videos`** row 1, paste this header:

   ```
   video_id	branch	title	youtube_url	embed_url	visible	sort_order	thumbnail_url	notes_json
   ```
5. **Freeze the header row** in both tabs (View → Freeze → 1 row). Optional but strongly recommended for editors.
6. Field meanings, accepted values, and worked examples live in [`google-sheet-sync.md`](google-sheet-sync.md) ("Events tab" and "Videos tab" tables) and the deeper schema is in [`content-schema.md`](content-schema.md). Don't copy data from the existing `data/*.json` into the sheet — the next sync would overwrite the sheet's own ordering.

### Optional: seed the sheet from the current site

If you are migrating an already-deployed site:

1. Open `data/events.json` and `data/videos.json` in the repo.
2. For each entry, add one row to the matching sheet tab using the column meanings from [`google-sheet-sync.md`](google-sheet-sync.md). For JSON columns (`details_json`, `button_json`, `notes_json`, `description_json`), paste the inner object/array exactly as it appears in the JSON file.
3. Run a **dry run** (Step 5) and compare the staged output against the live `data/*.json`. They should match (modulo key ordering). Resolve any differences in the sheet, then proceed.

## Step 2 — Share the spreadsheet

The sync script downloads each tab via Google's CSV export endpoint, which requires the file to be readable without a Google sign-in.

1. Click **Share** (top right).
2. Under **General access**, pick **Anyone with the link**.
3. Set the role to **Viewer**. Click **Done**.

> If your security model forbids a public link, alternatives are: (a) **File → Publish to the web** (publishes a CSV per tab), or (b) authenticate the script with a service account and the Google Sheets API. Both require code changes; raise it with a maintainer.

## Step 3 — Capture the spreadsheet ID and tab GIDs

You'll need three identifiers:

| What | Where to find it | Example |
| --- | --- | --- |
| **Spreadsheet ID** | URL `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit` | `1AbCDef…XYZ` |
| **Events GID** | While the **Events** tab is selected, the URL ends with `…#gid=`**`NUMBER`** | `0` (the default tab) or e.g. `1234567890` |
| **Videos GID** | Same trick with the **Videos** tab selected | e.g. `9876543210` |

Save them somewhere safe; you'll paste them into GitHub in the next step.

## Step 4 — Configure GitHub repository settings

In the repository: **Settings → Secrets and variables → Actions**.

1. Add a **Variable** (preferred) or **Secret** named **`ASHRAFIYYA_GOOGLE_SHEET_ID`** with the spreadsheet ID. (Use a Secret if your security policy requires it; the workflow checks Variables first, then Secrets.)
2. Add a **Variable** named **`ASHRAFIYYA_SYNC_EVENTS_TAB_GID`** with the Events GID.
3. Add a **Variable** named **`ASHRAFIYYA_SYNC_VIDEOS_TAB_GID`** with the Videos GID.
4. Confirm **Settings → Actions → General → Workflow permissions** is set to **Read and write permissions** (the workflow needs to push commits with the bot account).

The workflow will refuse to run if it can't find a sheet ID and at least one tab GID.

## Step 5 — First sync (dry run)

This proves the pipeline end-to-end without writing to `main` or to `data/`.

1. Go to the repo's **Actions** tab.
2. Open **Sync content from Google Sheet** in the left rail.
3. Click **Run workflow**, leave `sheet_id`, `events_gid`, `videos_gid`, and `allow_empty` blank, set **`dry_run: true`**, and confirm.
4. Watch the run:
   - **Validate current repo data (baseline)** must pass.
   - **Resolve sheet inputs** prints the resolved IDs (or fails loudly if a Variable is missing).
   - **Run sync script** must end with `--dry-run OK (staging left at data/.sync-staging/; data/ not modified)`.
5. If it fails, fix the row(s) in the sheet that the validator complained about and re-dispatch with `dry_run: true` until it's clean.

## Step 6 — First real sync

Repeat Step 5 with **`dry_run: false`**. The workflow will:

1. Validate baseline `data/`.
2. Fetch each tab as CSV, map rows to JSON in `data/.sync-staging/`.
3. Re-validate the staged JSON against [`content-schema.md`](content-schema.md) (including `index.html` mount IDs).
4. Copy staging into `data/` and update `data/meta.json` with `generated_at` + `source: "sheet"`.
5. Commit only `data/events.json`, `data/videos.json`, `data/meta.json` as `github-actions[bot]` and push.
6. GitHub Pages redeploys; the live site picks up the new content within a minute or two.

If the run shows "No content changes after sync." that means the sheet matched what was already in `data/`. That's expected on subsequent dispatches when nothing has been edited.

## Step 7 — Enable the schedule

The `schedule:` block is already in the workflow (`cron: "0 11,23 * * *"` UTC — twice per day, ~7 AM and ~7 PM ET). It activates automatically as soon as the workflow file is on the default branch. To pause it:

1. Edit `.github/workflows/sync-content.yml`.
2. Comment out the `schedule:` block.
3. Commit. (`workflow_dispatch` keeps working.)

To change the cadence, edit the cron expression. Twice per day is a deliberate ceiling: enough for editor latency, low enough to keep noisy commit history out of `main`.

## Step 8 — (Optional) Add the in-sheet "Sync now" button

Skip this step until the GitHub Actions sync has run successfully at least once and you trust it. Then follow [`sheet-trigger-button.md`](sheet-trigger-button.md) end-to-end. The Apps Script needs:

- A fine-grained PAT with **Actions: Read & write** scope on this repo (set an expiration; treat it as a rotated credential).
- Five Apps Script Properties: `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`, `GITHUB_WORKFLOW_FILE`, `GITHUB_TOKEN`.

Result: an **`Ashrafiyya Sync → Sync to website now`** menu inside the spreadsheet that triggers the same workflow with the same safety guarantees.

## Step 9 — Hand off to editors

Send editors **only** [`editing-content.md`](editing-content.md). They don't need to know about the validator, the sync script, the workflow file, or the GitHub repo. Make sure they have:

- Edit access to the spreadsheet.
- (If used) Permission to run the Apps Script menu (no extra setup; the menu appears for any user with edit access, after the script is authorized once).

## Day-to-day rhythm

| Actor | What they do | When |
| --- | --- | --- |
| **Editor** | Add/edit rows in the sheet | Anytime |
| **GitHub Actions cron** | Pull the sheet, validate, commit, deploy | Twice per day at 11:00 / 23:00 UTC |
| **Maintainer (manual)** | Click **Run workflow** for an immediate sync | When an editor needs an urgent update |
| **Maintainer (manual)** | Click **Run workflow** with `dry_run: true` | Before changing the workflow, the schema, or after a suspicious sheet edit |

Editors get same-day publishing without dev involvement. Maintainers retain a hard veto via the validator and via the workflow's "refuse to write zero rows" safety.

## Local sync (rare)

You will normally never need to run the sync from your laptop — the workflow is the canonical path. But for debugging:

```bash
ASHRAFIYYA_GOOGLE_SHEET_ID="…" \
ASHRAFIYYA_SYNC_EVENTS_TAB_GID="…" \
ASHRAFIYYA_SYNC_VIDEOS_TAB_GID="…" \
node scripts/sync-google-sheet.mjs --dry-run
```

Drop `--dry-run` to write to `data/`. Always finish with:

```bash
node scripts/validate-content.mjs
```

before committing. Full reference: [`google-sheet-sync.md`](google-sheet-sync.md).

## Troubleshooting flowchart

```text
Sync workflow failed?
  ├── "Sheet CSV export returned HTML"
  │     → Re-share spreadsheet as "Anyone with the link" (Step 2),
  │       or confirm the GID matches the right tab (Step 3).
  │
  ├── Validator errors (event/video missing field, bad JSON, bad URL)
  │     → Open the row the message points at; fix in the sheet; re-dispatch.
  │       Do NOT edit data/*.json manually.
  │
  ├── "refusing to write zero events/videos…"
  │     → A whole tab came back empty. If that's intentional, dispatch with
  │       allow_empty=true. Otherwise check the sheet for a deleted header row
  │       or a sharing change.
  │
  ├── Resolve sheet inputs: "No sheet ID provided"
  │     → ASHRAFIYYA_GOOGLE_SHEET_ID Variable/Secret is missing (Step 4).
  │
  └── Apps Script menu errors with HTTP 401/403/404
        → PAT expired/insufficient scope, wrong owner/repo Script Property,
          or the workflow file was renamed. See sheet-trigger-button.md.

Live site shows a blank slot or missing event?
  ├── Open DevTools console — look for "[ashrafiyya-content]" warnings.
  │     They name the slot/event/video that didn't mount.
  ├── Check data/*.json on the deployed branch — does the entry exist with
  │     visible: true?
  └── For events specifically: an event flips out of "active" the instant
        end < now. That's by design; the slot reverts to its default template
        in program-slots.json.
```

## Where to look for everything else

- Field-by-field rules: [`content-schema.md`](content-schema.md)
- Sync script + workflow internals: [`google-sheet-sync.md`](google-sheet-sync.md)
- Apps Script details: [`sheet-trigger-button.md`](sheet-trigger-button.md)
- Editor cheat sheet: [`editing-content.md`](editing-content.md)
- Code conventions, recipes, recovery: [`maintainer-guide.md`](maintainer-guide.md)
