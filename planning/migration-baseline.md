# Migration Baseline (Phase 0)

This file captures the current state of the Ashrafiyya site immediately before the
content automation migration begins. It exists so that future phases can be compared
against a known-good starting point.

## Files involved at baseline

- `index.html` (725 lines): contains all hard-coded current Programs, Previous
  Programs, and Recorded Resources markup.
- `style.css`: established visual contract for `.program-card-v4`, `.program-item`,
  `.event-details`, `.event-card`, `.button-container`, `.video-item`, and the
  recorded-resource columns.
- `script.js`: smooth scrolling, layout recalculation, expandable descriptions, and
  the custom recorded-resource scrollbars.

## Programs section (current slots, in visual order)

1. Ashrafiyya Health
   - The Heart of Care — default/coming-soon state with placeholder button.
   - Rise to Respond: Heartsaver Course for Sisters — active scheduled event with
     Zeffy registration link.
2. Ashrafiyya Circles
   - A Study of Kayfiyyat Ṣalāt al-Nabī ﷺ — coming-soon state with placeholder
     button.
3. Ashrafiyya Itqān
   - Al-Durr Study Program — ongoing, invite-only, with `mailto:` Inquire button.

## Previous Programs section (current groupings)

- Ashrafiyya Health past events: Rise to Respond entries and one Heart of Care entry.
- Ashrafiyya Circles past events: Islahi Majlis, Hierarchy of Knowledges, Urdu
  Islahi Majlis.
- Ashrafiyya Itqān past events: Ulama Majlis.

## Recorded Resources section (current columns)

- Ashrafiyya Health column: Heart of Care videos with notes link to Shifting
  Paradigms resource.
- Ashrafiyya Circles column: Hierarchy of Knowledges (with Tartib Al-Ulum notes
  PDF) and Introduction to Tasawwuf.
- Ashrafiyya Itqān column: not present at baseline.

## Migration entry conditions

- The site loads as a static GitHub Pages app from this repo with no runtime
  data-fetching dependencies.
- No `data/`, `scripts/`, or `.github/workflows/` directories exist yet.
- All content updates currently require editing `index.html` directly.

## Pause

This phase intentionally introduces no production code changes. The next phase
adds the `data/` directory and JSON files without wiring them to the runtime.
