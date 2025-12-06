# Ashrafiyya Site

Static site for Ashrafiyya programs, branches, recorded resources, and donations. Event content is data-driven via `events.json` and auto-rendered into `index.html` by a generator script and a nightly GitHub Actions workflow.

## Repository layout
- `index.html` — main page; program and previous-program sections are auto-generated between markers:
  - `<!-- AUTO-GENERATED:PROGRAMS-START --> ... <!-- AUTO-GENERATED:PROGRAMS-END -->`
  - `<!-- AUTO-GENERATED:PREVIOUS-START --> ... <!-- AUTO-GENERATED:PREVIOUS-END -->`
- `style.css`, `script.js` — styling and front-end behavior.
- `events.json` — single source of truth for all events (active and previous) per branch.
- `tools/generate-events.js` — Node script that reads `events.json`, applies date logic, and rewrites the marked sections in `index.html`.
- `.github/workflows/auto-archive-events.yml` — nightly job to run the generator and push changes.

## Event data model (`events.json`)
- `timezone`: evaluation timezone; currently `America/New_York`.
- `branches`: array with:
  - `id`, `name`, `subtitle`, `previousLabel`
  - `events.active`: array of active events.
    - Required: `title`
    - Optional: `summary` or `description` (array), `descriptionExtra` (array), `expandable` (bool), `date` (YYYY-MM-DD), `time`, `venue`, `notes`, `ctaText`, `ctaUrl`, `status` (`placeholder` to force disabled CTA, `ongoing` to show Status row).
  - `events.previous`: array of past events.
    - Recommended: `title`, `date` (YYYY-MM-DD), plus optional `speaker`, `venue`, `notes`.

### Date logic
- If `date` is in the past (by at least one day in `America/New_York`), the event is moved from `active` to `previous`.
- Events dated today or in the future remain active.
- If a branch has zero active events after moving past items, a placeholder event is auto-inserted with a disabled CTA (“More Coming Soon”).
- CTAs without a valid URL are automatically deactivated.

## Generating content locally
Requirements: Node.js 18+

```bash
node tools/generate-events.js
```

This rewrites the two marked sections in `index.html` based on `events.json`.

## Nightly automation (GitHub Actions)
- Workflow: `.github/workflows/auto-archive-events.yml`
- Schedule: `0 5 * * *` (05:00 UTC nightly) plus manual dispatch.
- Steps: checkout → Node 18 → run generator → commit `index.html` + `events.json` if changes → push.

## Updating events
1) Edit `events.json` to add/update/remove events.
2) Run `node tools/generate-events.js` locally to refresh `index.html`.
3) Commit and push. The nightly workflow will continue to roll past events into the Previous section automatically.

## Notes and conventions
- Keep date strings in `YYYY-MM-DD`.
- Use `status: "placeholder"` on active items to show “Coming Soon” with the button text “Details and Registration Coming Soon”; the button stays styled/active but the URL is omitted.
- Use `status: "ongoing"` to show a Status row without date sensitivity.
- Descriptions:
  - `summary`: single paragraph.
  - `description` + `descriptionExtra` with `expandable: true` for “Read More” sections.
- Styling is preserved by reusing existing classes; avoid structural changes inside the generated regions.***

