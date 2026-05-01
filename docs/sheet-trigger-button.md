# Optional: Google Sheet → "Sync now" menu button (Apps Script)

This is **optional convenience automation** on top of the manual and scheduled GitHub Actions runs documented in [`google-sheet-sync.md`](google-sheet-sync.md). Enable it only after the GitHub workflow is reliably running (Phases 17 and 18).

The Apps Script below adds an **`Ashrafiyya Sync` → `Sync to website now`** menu inside the spreadsheet, so an editor can trigger the existing GitHub Actions workflow without leaving Sheets. The script does **not** replace any safety: it simply calls `workflow_dispatch` for `.github/workflows/sync-content.yml`, which still runs validation and refuses bad data.

## What this needs

- A GitHub fine-grained personal access token (PAT) **scoped to the repo** with permission **Actions: Read and write** (and `Contents: Read` if your repo also requires it for dispatch).
- Apps Script **Script Properties** to store credentials. **Never put the token in a sheet cell or in the script source.**
- The repo Variables / Secret already configured per [`google-sheet-sync.md`](google-sheet-sync.md), so the workflow has its sheet ID and tab GIDs by default.

> ⚠️ **Permissions warning.** A PAT with Actions write can dispatch any workflow on the repo. Generate one with the narrowest possible scope, set an expiration, and rotate it on a schedule. Do not paste it into the spreadsheet, the script source, or chat history.

## One-time setup

1. Open the Google Sheet → **Extensions → Apps Script**.
2. Replace the contents of `Code.gs` with the script in the next section.
3. **Project Settings → Script Properties → Add script property** for each of:
   - `GITHUB_OWNER` — e.g. `ashrafiyya`
   - `GITHUB_REPO` — e.g. `ashrafiyyaWebsite`
   - `GITHUB_BRANCH` — branch the workflow lives on (`main`)
   - `GITHUB_WORKFLOW_FILE` — `sync-content.yml`
   - `GITHUB_TOKEN` — the fine-grained PAT
4. Save the script. Reload the spreadsheet. The custom menu **`Ashrafiyya Sync`** appears next to **Help**.
5. From that menu, run **`Sync to website now`** once. Approve the OAuth consent screen for `UrlFetchApp` access. Re-run; you should see a confirmation dialog.

To preview without committing, run **`Sync (dry run)`** instead.

## Apps Script source (`Code.gs`)

```javascript
const REQUIRED_PROPS = [
  'GITHUB_OWNER',
  'GITHUB_REPO',
  'GITHUB_BRANCH',
  'GITHUB_WORKFLOW_FILE',
  'GITHUB_TOKEN'
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Ashrafiyya Sync')
    .addItem('Sync to website now', 'syncNow')
    .addItem('Sync (dry run)', 'syncDryRun')
    .addToUi();
}

function syncNow() { dispatchSync_({ dry_run: false }); }
function syncDryRun() { dispatchSync_({ dry_run: true }); }

function dispatchSync_(extraInputs) {
  const props = PropertiesService.getScriptProperties();
  const missing = REQUIRED_PROPS.filter(function (k) { return !props.getProperty(k); });
  if (missing.length) {
    SpreadsheetApp.getUi().alert(
      'Sheet Sync setup incomplete',
      'Add these Script Properties: ' + missing.join(', '),
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }

  const owner = props.getProperty('GITHUB_OWNER');
  const repo = props.getProperty('GITHUB_REPO');
  const branch = props.getProperty('GITHUB_BRANCH');
  const workflow = props.getProperty('GITHUB_WORKFLOW_FILE');
  const token = props.getProperty('GITHUB_TOKEN');

  const url = 'https://api.github.com/repos/' +
    encodeURIComponent(owner) + '/' + encodeURIComponent(repo) +
    '/actions/workflows/' + encodeURIComponent(workflow) + '/dispatches';

  const inputs = Object.assign({
    allow_empty: false,
    dry_run: false
  }, extraInputs || {});

  const payload = { ref: branch, inputs: serializeInputs_(inputs) };

  const res = UrlFetchApp.fetch(url, {
    method: 'post',
    muteHttpExceptions: true,
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    payload: JSON.stringify(payload)
  });

  const code = res.getResponseCode();
  if (code === 204) {
    const runsUrl = 'https://github.com/' + owner + '/' + repo + '/actions/workflows/' + workflow;
    SpreadsheetApp.getUi().alert(
      'Sync requested',
      (inputs.dry_run ? 'Dry-run dispatched.' : 'Sync dispatched.') +
        ' Check progress at:\n' + runsUrl,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }

  SpreadsheetApp.getUi().alert(
    'Sync request failed',
    'GitHub returned HTTP ' + code + ':\n' + res.getContentText().slice(0, 1500),
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

// workflow_dispatch only accepts string inputs; cast booleans for the API.
function serializeInputs_(inputs) {
  const out = {};
  Object.keys(inputs).forEach(function (k) {
    const v = inputs[k];
    if (v == null) return;
    out[k] = (typeof v === 'boolean') ? String(v) : String(v);
  });
  return out;
}
```

## What the workflow uses by default

The Apps Script does **not** pass `sheet_id`, `events_gid`, or `videos_gid`. Those default to the repo **Variables** (and Secret) configured per [`google-sheet-sync.md`](google-sheet-sync.md):

- `ASHRAFIYYA_GOOGLE_SHEET_ID`
- `ASHRAFIYYA_SYNC_EVENTS_TAB_GID`
- `ASHRAFIYYA_SYNC_VIDEOS_TAB_GID`

Editors therefore can't accidentally point the workflow at a different spreadsheet from Sheets. The button only switches the existing pipeline on or off, with `dry_run` as the only optional toggle.

## Operational rules

- Treat this menu strictly as **convenience for the same workflow** that already runs on schedule. If the menu and the schedule disagree, treat the schedule as authoritative.
- If `Sync to website now` reports a failure (HTTP 4xx/5xx, validation error, or zero-row refusal), do **not** edit `data/*.json` directly. Fix the spreadsheet and re-run, or escalate to a developer.
- Rotate `GITHUB_TOKEN` in Script Properties on the cadence your security policy requires. Updating the property takes effect on the next dispatch — no script edit needed.
- If you add or rename inputs in `.github/workflows/sync-content.yml`, mirror the change in `dispatchSync_` so editors keep getting the intended defaults.

## Removing the button

Delete the Apps Script project from the spreadsheet (Extensions → Apps Script → ⋮ → Remove project). The custom menu disappears on the next reload, and the GitHub workflow is unaffected.
