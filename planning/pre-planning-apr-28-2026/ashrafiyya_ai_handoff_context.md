# Ashrafiyya Website Automation Handoff Context

## Purpose of this handoff
This document summarizes the technical and product decisions made in the chat so another AI agent can continue implementation planning or execution without re-deriving the requirements.

---

## Current website setup
- Static website hosted on **GitHub Pages** from a **public GitHub repository**.
- Custom domain is already in use.
- The site currently relies on manually edited `index.html`, `style.css`, and `script.js`.
- Event data, past event data, and recorded resource YouTube embeds are currently **hard-coded** in `index.html`.
- Current styling and layout are already established and must remain stable unless a developer intentionally changes them.

### Current developer-maintained responsibilities
The current maintainer manually updates the website to:
1. Add new upcoming and ongoing events.
2. Move current events to past events once the date passes.
3. Add YouTube embed URLs and related code for recorded resources from event videos.

---

## Core business problem
The team should not be blocked by one developer for routine content updates. Non-technical people need a simple way to update event content while preserving:
- site uptime,
- existing styling consistency,
- GitHub Pages/public repo constraints,
- zero paid backend/database hosting.

---

## Final architecture decisions from this chat

### 1. Hosting/runtime model
- The website **must remain** on a **public GitHub repository** and continue using **GitHub Pages**.
- The website **must not depend on Google Sheets or Google Drive at page-load time**.
- The website should load its runtime content from **JSON (or CSV, but JSON is preferred)** stored **inside the repository itself**.

### 2. Editing model
- Non-technical editors should update content in a **Google Sheet** (or equivalent Google Drive-backed source).
- Google is used as the **editing source**, not the runtime dependency.
- The repo keeps a **synced snapshot** of the content so the website continues working even if Google is unavailable.

### 3. Sync model
- A **GitHub Actions workflow** should sync Google data into repo JSON **1–4 times per day**.
- The preferred runtime behavior is:
  - site reads repo JSON first and only,
  - scheduled/manual sync updates repo JSON from Google.
- The sync should also be manually triggerable.

### 4. Fallback/resilience model
- The canonical runtime source for the site is the repo JSON.
- If Google is down, the sync may fail, but the website should still function using the **last known good JSON committed in the repo**.
- Sync failures must **not overwrite good repo data with empty/invalid data**.

### 5. Styling/control boundary
The following remain **developer-controlled**:
- styling/CSS,
- layout,
- component structure,
- section architecture,
- responsive behavior,
- creation of new pages/sections,
- schema changes requiring new rendering behavior.

The following become **non-technical editable content**:
- event titles,
- event descriptions,
- event dates/times,
- venues,
- registration URLs,
- YouTube URLs,
- notes URLs,
- visibility flags,
- sort order,
- basic content metadata supported by the approved schema.

### 6. Content must be data-only, not presentation
- Google Sheet content should be treated as **data only**.
- Editors should **not** be allowed to define arbitrary HTML, CSS, or layout.
- Rendering should map approved data fields into **predefined templates** controlled in code.

---

## Critical behavioral requirement: slot-based current events
The current-events portion of the site should **not** be modeled as a simple free-form list.

Instead, each current program area/subsection should be modeled as a **fixed slot** with:
- a permanent identity,
- a default/fallback template,
- optional scheduled event data that temporarily overrides the default content.

### Why this matters
Some current sections/subsections already have a built-in “coming soon” or placeholder/default state. When a scheduled event ends and moves to past events, the current slot should **revert** to its default content instead of going blank.

### Required behavior
For each current section/subsection slot:
1. If there is an active scheduled event assigned to the slot, render the scheduled event.
2. If the scheduled event becomes past, move it to the correct past-events list.
3. After that, immediately restore the slot’s default content.
4. The slot’s registration button must also revert to the default button configuration.

### This is non-negotiable
When a current event moves to past events for its respective section:
- the current event details must be replaced with the default template details for that slot,
- the registration button must revert to the default template’s button text/link/state.

---

## Current site structure relevant to migration
The site already contains a structured Programs section and Previous Programs section.

### Branches currently present
- Ashrafiyya Health
- Ashrafiyya Circles
- Ashrafiyya Itqān

### Current program/card behavior
- Some cards/subsections behave like standing program slots with a placeholder/default state.
- Some cards/subsections contain active or scheduled event content.
- Previous events are shown separately in past-event cards grouped by branch.
- Recorded resources are shown separately with YouTube embeds and optional notes links.

### Consequence for migration
The migration should preserve the current visual structure, but gradually replace hard-coded content with data-driven rendering.

---

## Preferred data model direction

### Recommended repo files
- `data/program-slots.json`
- `data/events.json`
- `data/videos.json`
- `data/meta.json`

### Recommended conceptual split

#### A. Program slots (developer-controlled defaults)
These define the permanent current slots and their fallback/default content.

Example fields:
- `slot_id`
- `branch`
- `section`
- `title`
- `description`
- `default_details`
- `default_button`
- `sort_order`
- `is_enabled`

#### B. Events (sheet-synced time-bound items)
These define scheduled items that temporarily occupy current slots or later appear in past-events lists.

Example fields:
- `event_id`
- `slot_id`
- `branch`
- `title`
- `description`
- `start`
- `end`
- `venue`
- `details`
- `button`
- `visible`
- `sort_order`

#### C. Videos / recorded resources
These define recorded resources shown in the Recorded Resources area.

Example fields:
- `video_id`
- `branch`
- `title`
- `youtube_url`
- `thumbnail_url`
- `notes_url`
- `notes_label`
- `visible`
- `sort_order`

---

## Preferred runtime rendering behavior
- The site loads repo JSON.
- JS derives:
  - current/upcoming/ongoing state,
  - past state,
  - per-slot fallback behavior,
  - grouping by branch.
- Templates remain code-controlled.
- Invalid/missing data should fail gracefully.

---

## Preferred sync behavior

### Sync source
- Google Sheet (or Google Drive file if ultimately chosen, but Google Sheet is preferred for non-technical editing).

### Sync destination
- Repo JSON files committed into the GitHub repository.

### Sync mechanism
- GitHub Actions scheduled job running 1–4 times per day.
- Also support manual trigger.

### Optional editor-initiated sync
A user with spreadsheet edit access may be able to trigger sync via:
- Google Apps Script bound to the sheet,
- custom menu/button like “Sync Website Now,”
- Apps Script calling a GitHub workflow trigger endpoint.

This is optional and can be added later.

---

## Non-negotiable implementation constraints
These must be followed by any AI agent or developer executing the work.

### Incremental delivery
- All work must be done in **small, logically grouped, non-breaking increments**.
- The website must remain functional after each commit.
- Do **not** do a large rewrite in one shot.

### Forced pause points
- The plan must explicitly include **stop points** where the implementing agent pauses and lets the user:
  - verify behavior,
  - make a commit,
  - optionally push the branch.

### Commit discipline
- Each commit must contain the **minimum logical set of changes** needed for one safe step.
- Each commit must have a suggested helpful message.
- Avoid combining unrelated changes.

### Safety and rollback
- New dynamic behavior should be introduced in a way that preserves fallback to existing behavior until that specific subsection/section is fully migrated.
- The migration should favor feature flags, progressive enhancement, or side-by-side preparation where useful.

---

## Migration philosophy agreed in chat
The migration should proceed in layers, similar to the examples discussed by the user:
1. Introduce repo data files first.
2. Then migrate one small subsection/slot first.
3. Then add default template data for that subsection/slot.
4. Then render current content for that subsection from data.
5. Then add past-events rendering for that subsection.
6. Then expand to other subsections/sections.
7. Then add Google sync after local data-driven rendering is already stable.

This order is important because it minimizes breakage and makes review easier.

---

## Strong recommendations to preserve quality
- Prefer **JSON over CSV** for runtime data.
- Use schema validation during sync.
- Never allow a failed sync to delete or corrupt the last good repo snapshot.
- Keep default slot templates in repo-controlled files/code, not only in the sheet.
- Keep branch/slot identifiers stable and explicit.
- Use deterministic sort order rather than relying on sheet row order alone.

---

## What the next AI agent should produce/do
The next AI agent should help create and/or execute:
1. A detailed, commit-by-commit implementation plan.
2. Data schemas for slot templates, events, videos, and sync metadata.
3. A safe staged migration path from hard-coded HTML to data-driven rendering.
4. A GitHub Actions sync design.
5. Optional Google Apps Script trigger design later, only after core migration is stable.

---

## Final summary of the chosen direction
The chosen approach is:
- Keep the site static on GitHub Pages.
- Make the **repo JSON** the site’s primary content source.
- Use **Google Sheets** only as a non-technical editing source.
- Sync Google data into repo JSON on a schedule/manual trigger.
- Preserve styling and structure in code.
- Model current content as fixed **slots with default fallback templates**.
- When a scheduled current event expires, move it to past events and restore the slot’s default content and button.
- Implement everything incrementally with small, reviewable, non-breaking commits.
