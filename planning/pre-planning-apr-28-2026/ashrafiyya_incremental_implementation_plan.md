# Ashrafiyya Website Incremental Implementation Plan

## Goal
Incrementally migrate the current hard-coded event/content areas of the Ashrafiyya GitHub Pages site to a data-driven architecture that:
- preserves the existing design and layout,
- keeps the site fully functional after every commit,
- makes routine event updates manageable by non-technical users through Google Sheets,
- uses repo JSON as the runtime source of truth,
- adds scheduled/manual sync later only after local data-driven rendering is stable.

This plan is intentionally structured to force pause points and small commits.

---

## Non-negotiable rules for the implementing agent

1. **Never break the live site between commits.**
2. **Stop at every phase boundary** and wait for the user to review and commit.
3. **Each commit must be the smallest practical logical unit** that keeps the site working.
4. **Do not migrate multiple branches/sections at once** until the pattern is proven on one subsection.
5. **Do not introduce Google sync before local repo-driven rendering is stable.**
6. **Do not let sheet data control layout/styling.**
7. **Do not delete legacy hard-coded content for a section until its dynamic replacement is confirmed working.**
8. **Prefer JSON over CSV** for runtime and generated repo data.
9. **Protect last known good data** during sync; failed syncs must not wipe good files.

---

## Recommended implementation strategy
Use a **progressive migration** strategy:
- first prepare the data layer,
- then add rendering helpers,
- then migrate one subsection/slot,
- then add past events for that subsection,
- then repeat the pattern across the rest of the site,
- only after that add Google sync automation,
- finally add optional editor-triggered sync.

---

## Working assumptions
- Main branch and deployment process already exist.
- Existing HTML/CSS/JS files should remain as the baseline.
- The current visual layout should remain unchanged unless a developer intentionally changes it.
- The first migrated subsection should be one of the simplest current program slots, ideally in Ashrafiyya Health or another branch with clearly understood current/past behavior.

---

## Suggested directory additions
These files/directories are expected over time:

```text
/data/
  program-slots.json
  events.json
  videos.json
  meta.json
/scripts/
  sync-google-sheet.mjs          (later)
/docs/
  content-schema.md              (optional)
/.github/workflows/
  sync-content.yml               (later)
```

---

# Phase 0 — Baseline safety checkpoint

## Objective
Create a safe starting point and document the current behavior before changing functionality.

## Scope
- No behavior changes.
- Optional screenshots/manual notes of current pages and sections.
- Optional backup copy of current `index.html` content in a scratch/reference note if needed.

## Changes in this phase
- None required in production code unless the implementer wants to add a short internal migration note file.

## Verification
- Site behaves exactly as before.

## Stop here
Pause for user review.

## Suggested commit message
If code/docs changed:
`docs: add migration baseline notes for event automation refactor`

If no files changed:
No commit needed.

---

# Phase 1 — Introduce repo data files without using them yet

## Objective
Add the new data layer to the repository with no runtime impact.

## Scope
- Create `/data/` directory.
- Add initial JSON files that mirror the current content structure.
- Do not wire the site to use them yet.

## Changes in this phase
Create minimal placeholder or mirrored files such as:
- `data/program-slots.json`
- `data/events.json`
- `data/videos.json`
- `data/meta.json`

### Initial content guidance
- `program-slots.json` should define fixed current slots and their default/fallback content.
- `events.json` should contain current scheduled events and past events as raw data entries.
- `videos.json` should contain current recorded resource entries.
- `meta.json` should include versioning metadata such as last updated timestamp and schema version.

## Important rule
These data files are **not yet used at runtime**. They are only introduced as repo assets.

## Verification
- No visible site changes.
- Files exist and validate as valid JSON.

## Stop here
Pause. Let the user inspect the proposed data structure and commit.

## Suggested commit message
`feat: add initial content data files for future event rendering`

---

# Phase 2 — Define slot IDs and content mapping rules in code comments/docs

## Objective
Lock down the identifiers and mapping logic before adding rendering.

## Scope
- Establish stable slot IDs for each current slot/subsection.
- Document how each current slot maps to a branch and fallback template.
- No visible site change.

## Changes in this phase
Add a small developer-facing mapping note, either as:
- comments in the data files,
- a dedicated markdown file, or
- carefully documented constants in JS.

### Examples of stable slot IDs
- `health_heart_of_care`
- `health_rise_to_respond`
- `circles_kayfiyyat_salat`
- `itqan_al_durr`

## Why this phase exists
The slot-based model is central to correct fallback behavior. Identifiers must be stable before rendering logic is added.

## Verification
- No visible site changes.
- Slot IDs and branch mappings are explicit and understandable.

## Stop here
Pause for approval of naming and structure.

## Suggested commit message
`chore: define stable slot identifiers for data-driven program rendering`

---

# Phase 3 — Add data-loading utilities with no rendering switch yet

## Objective
Introduce JS utilities to load repo JSON safely while leaving the current page fully hard-coded.

## Scope
- Add fetch helpers.
- Add validation/normalization helpers.
- Do not yet replace any visible section content.

## Changes in this phase
In `script.js` or a new JS module:
- add `fetchJsonWithTimeout` helper,
- add `loadContentData` helper,
- add minimal validation for required JSON structure,
- add graceful logging and failure handling.

## Important rule
The page must still render entirely from current hard-coded HTML after this phase.

## Verification
- Existing site still looks the same.
- Console shows no fatal errors.
- Data files can be fetched successfully from the browser when requested.

## Stop here
Pause for commit.

## Suggested commit message
`feat: add safe repo JSON loading utilities for future dynamic content`

---

# Phase 4 — Add rendering templates/helpers for one subsection only, still not live

## Objective
Prepare reusable rendering functions for one subsection without yet replacing visible content.

## Scope
- Build template functions for one selected subsection/slot.
- Keep legacy HTML visible.
- Dynamic output may be rendered only in a hidden/dev-only container or behind a temporary feature flag.

## Choose one pilot subsection
Use the simplest subsection first. Recommended: one current slot in Ashrafiyya Health.

## Changes in this phase
Add functions such as:
- `renderCurrentSlot(slot, activeEvent)`
- `renderEventDetails(details)`
- `renderButton(button)`

But do not yet remove or replace the production HTML for that subsection.

## Verification
- Existing site remains unchanged.
- Dynamic output can be compared in dev tools or in a temporary hidden/test container.

## Stop here
Pause and verify the generated markup matches the current styling expectations.

## Suggested commit message
`feat: add template render helpers for pilot current-event slot`

---

# Phase 5 — Migrate one current slot to repo-driven rendering with fallback to default template

## Objective
Complete the first real visible migration for **one** current slot only.

## Scope
- Replace hard-coded content for one current slot/subsection with runtime-rendered output from repo JSON.
- Preserve the exact visual styling.
- Implement fallback to the slot’s default template when no active event exists.

## Changes in this phase
- Add a dedicated mount point/container for the pilot slot in `index.html`.
- Keep the surrounding layout unchanged.
- Remove only the hard-coded content for that one slot after confirming the dynamic renderer matches it.
- Use `program-slots.json` + `events.json` to decide whether to render:
  - active scheduled event, or
  - default fallback template.

## Critical logic
The slot must behave like this:
- active event found and not past → show event
- otherwise → show default slot template and default button

## Verification
Test both scenarios if possible:
1. with an active event assigned,
2. with no active event assigned.

The subsection must never go blank.

## Stop here
Pause for user review and commit before touching any other subsection.

## Suggested commit message
`feat: render pilot current program slot from repo data with default fallback`

---

# Phase 6 — Add past-events rendering for the same pilot branch/subsection

## Objective
Migrate the matching past-events behavior for the same pilot area.

## Scope
- Only the corresponding past-events grouping for the pilot branch.
- Do not touch all branches yet.

## Changes in this phase
- Add rendering logic for past-event cards using repo data.
- Filter events whose end time is in the past.
- Group correctly under the pilot branch’s past-events section.
- Preserve current card styling.

## Important rule
Do not migrate recorded resources yet.
Do not migrate other branches yet.

## Verification
- The pilot branch’s past event list renders correctly.
- The current slot still falls back correctly when no active event exists.
- No duplicate cards from legacy + dynamic rendering.

## Stop here
Pause and commit.

## Suggested commit message
`feat: render pilot branch past events from repo data`

---

# Phase 7 — Migrate the remaining current slots one at a time

## Objective
Repeat the proven current-slot pattern across the remaining current program slots.

## Scope
- One slot/subsection per commit.
- Do not batch multiple unrelated slots unless they are tiny and truly inseparable.

## Changes in this phase
For each slot:
1. ensure slot template/default exists in `program-slots.json`,
2. ensure event data exists in `events.json`,
3. add/activate the render mount,
4. remove corresponding legacy hard-coded content only after dynamic rendering matches.

## Verification per slot
- active state renders correctly,
- default/fallback state renders correctly,
- button state is correct,
- visual styling matches existing card styles.

## Stop here after each slot
Pause after each migrated slot.

## Suggested commit message pattern
`feat: migrate <slot-id> current slot to repo-driven rendering`

Example:
`feat: migrate health_rise_to_respond current slot to repo-driven rendering`

---

# Phase 8 — Migrate remaining past-events groups one branch at a time

## Objective
Convert the rest of the past-events section to repo-driven rendering.

## Scope
- One branch grouping per commit where practical.

## Changes in this phase
For each branch:
- replace hard-coded past event markup with dynamic rendering,
- preserve existing card grouping and styling,
- ensure items are sorted deterministically.

## Verification per branch
- correct branch grouping,
- no missing events,
- no duplicate legacy/dynamic content,
- no styling regressions.

## Stop here after each branch
Pause for commit.

## Suggested commit message pattern
`feat: migrate <branch> past events to repo-driven rendering`

---

# Phase 9 — Migrate recorded resources/videos one branch at a time

## Objective
Move YouTube embeds and notes links into `videos.json` and render them dynamically.

## Scope
- One branch column/group at a time if needed.
- Preserve the current recorded resources layout.

## Changes in this phase
- Move video metadata into `videos.json`.
- Add renderer for video items, thumbnails, embed URLs, and notes links.
- Preserve existing scrollbar behavior and column layout.

## Verification
- embeds work,
- notes links work,
- layout and custom scrollbars still behave correctly,
- no duplicate legacy items remain.

## Stop here after each branch group if helpful
Pause and commit.

## Suggested commit message pattern
`feat: migrate <branch> recorded resources to repo-driven rendering`

---

# Phase 10 — Refactor and clean up after full local migration

## Objective
Clean up the codebase only after all target sections are data-driven from repo JSON.

## Scope
- Remove dead legacy markup and helper code no longer needed.
- Keep changes minimal and purely cleanup-oriented.

## Changes in this phase
- delete obsolete hard-coded content that has been fully replaced,
- remove temporary feature flags/test containers if used,
- simplify JS where safe,
- ensure data-driven rendering is now the only active content path for migrated sections.

## Verification
- full site still works,
- no visual regressions,
- no missing content,
- no stray duplicate containers.

## Stop here
Pause and commit.

## Suggested commit message
`refactor: remove legacy hard-coded event markup after full local migration`

---

# Phase 11 — Add local schema validation for repo data

## Objective
Reduce the chance of bad content entering runtime rendering.

## Scope
- Add lightweight validation for repo JSON structure.
- Can be runtime validation and/or a small validation script.

## Changes in this phase
- Add required field checks for slots/events/videos.
- Fail gracefully in browser if optional data is missing.
- Optionally add a node validation script for local/dev use.

## Verification
- good data passes,
- bad data is caught with clear error messaging,
- site still handles failures gracefully.

## Stop here
Pause and commit.

## Suggested commit message
`feat: add validation for repo content data files`

---

# Phase 12 — Add Google Sheet sync script locally, but not scheduled yet

## Objective
Prepare the sync tool without enabling automation immediately.

## Scope
- Add a script that fetches Google Sheet data and writes repo JSON.
- Do not enable scheduled Actions yet.

## Changes in this phase
Create a script such as `scripts/sync-google-sheet.mjs` that:
- fetches published Google Sheet data,
- parses rows,
- validates expected columns,
- maps rows into `program-slots.json`, `events.json`, `videos.json`, and/or generated equivalents,
- writes output files,
- refuses to overwrite good files with invalid output.

## Important rule
This phase is about local/manual sync capability only.

## Verification
- run the script locally,
- confirm generated JSON matches expected schema,
- confirm site renders properly from synced files.

## Stop here
Pause and commit before enabling CI automation.

## Suggested commit message
`feat: add local Google Sheet sync script for content data`

---

# Phase 13 — Add manual GitHub Actions workflow_dispatch sync

## Objective
Allow a maintainer to manually trigger Google-to-repo sync from GitHub.

## Scope
- Add workflow file.
- Manual trigger only at first.
- No schedule yet.

## Changes in this phase
Create `.github/workflows/sync-content.yml` with:
- `workflow_dispatch`,
- environment setup,
- execution of the sync script,
- commit/push only when content changes,
- permissions limited to the minimum needed.

## Critical safety rule
If the sync fails or output is invalid, the workflow must fail without replacing the last known good repo data.

## Verification
- manually trigger workflow,
- confirm files update only when changed,
- confirm site continues working after workflow-generated content update.

## Stop here
Pause and commit.

## Suggested commit message
`feat: add manual GitHub Actions workflow for content sync`

---

# Phase 14 — Add scheduled sync 1–4 times per day

## Objective
Automate regular content syncs.

## Scope
- Add scheduled trigger(s) to the existing workflow.
- Prefer a conservative schedule first, such as 2 times per day.

## Changes in this phase
Add cron schedule(s), for example:
- twice per day initially,
- later increase to four times per day only if necessary.

## Recommended starting point
Twice daily is a good first default. Increase only if the team truly needs fresher syncs.

## Verification
- workflow syntax valid,
- scheduled trigger present,
- manual trigger still works,
- no change to runtime dependency model.

## Stop here
Pause and commit.

## Suggested commit message
`feat: schedule automated Google content sync workflow`

---

# Phase 15 — Add optional Google Sheet “Sync Website Now” trigger

## Objective
Allow a sheet editor to trigger a GitHub sync without needing GitHub access.

## Scope
- Optional phase.
- Should only be done after the core sync path is stable.

## Changes in this phase
- Add Google Apps Script bound to the Sheet.
- Add custom menu/button such as `Website Sync -> Sync Now`.
- Use Script Properties to store the GitHub credential/endpoint config.
- Trigger the GitHub workflow safely.

## Important rule
This is convenience automation, not the primary sync mechanism.

## Verification
- editor can trigger workflow,
- workflow runs successfully,
- no credentials are exposed in sheet cells,
- site continues using repo JSON at runtime.

## Stop here
Pause and commit related documentation or script references as appropriate.

## Suggested commit message
For the site repo, only if repo files are added:
`docs: add optional Google Apps Script sync trigger integration notes`

---

# Phase 16 — Final hardening and operational documentation

## Objective
Make the system maintainable for humans.

## Scope
- Add maintainer docs.
- Add editor docs.
- Document recovery steps.

## Changes in this phase
Add concise docs covering:
- content schema,
- slot model,
- how fallback/default templates work,
- how to run local sync,
- how to trigger manual sync,
- what to do if Google sync fails,
- what to do if repo JSON needs manual correction.

## Verification
- another person can follow the docs,
- operational ownership no longer depends on one developer.

## Stop here
Pause and commit.

## Suggested commit message
`docs: add maintainer and editor guide for content sync workflow`

---

## Recommended implementation order summary

1. Baseline safety check.
2. Add repo data files.
3. Define slot IDs/mapping.
4. Add JSON loading helpers.
5. Add renderer helpers for one pilot slot.
6. Migrate one current slot.
7. Migrate its past-events group.
8. Repeat for remaining current slots.
9. Repeat for remaining past-event groups.
10. Migrate recorded resources.
11. Cleanup/refactor.
12. Add validation.
13. Add local sync script.
14. Add manual GitHub workflow.
15. Add scheduled sync.
16. Add optional Apps Script trigger.
17. Add docs.

---

## Practical notes for the implementing agent

### A. Prefer pilot-first migration
Do not try to migrate all sections simultaneously.
Prove the pattern on one slot first.

### B. Preserve HTML structure where possible
Use existing classes and card structure so CSS remains unchanged.

### C. Keep default templates in repo-controlled data/code
Do not rely on the sheet alone for fallback behavior.

### D. Always test the fallback state
For every current slot, verify both:
- active event present,
- no active event present.

### E. Be careful with dates/timezones
Use a clear strategy for event start/end comparisons so items move to past at the correct time.

### F. Never delete legacy content too early
Only remove hard-coded markup after the dynamic equivalent has been verified.

---

## Minimum review checklist after every phase
The agent must stop and prompt the user to verify:
- Does the site still load?
- Did any styling regress?
- Is any content duplicated?
- Is the migrated section behaving correctly?
- Is the fallback/default state correct?
- Is the commit scope minimal and logical?

If any answer is no, fix before proceeding to the next phase.

---

## Final outcome expected after full plan completion
At the end of this plan, the site should:
- remain hosted as a static GitHub Pages site from a public repo,
- use repo JSON as its runtime content source,
- preserve the current design system,
- support non-technical content editing via Google Sheets,
- sync content safely on a schedule and on demand,
- preserve fallback/default current-slot templates,
- automatically move expired current events into past events at render time or via derived logic,
- no longer depend on one developer for routine event updates.
