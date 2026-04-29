# Content Schema and Rendering Contract

This document is the source-of-truth contract for the data files under
[`/data/`](../data/) and the rules the runtime renderer must follow. It exists
so that future contributors and any automated sync pipeline (Google Sheets,
GitHub Actions, etc.) cannot accidentally break the live site.

## Files

| File | Purpose | Editable by sheet sync? |
| --- | --- | --- |
| [`data/program-slots.json`](../data/program-slots.json) | Permanent current-program slots, fallback/default templates, default registration buttons | No (developer-controlled) |
| [`data/events.json`](../data/events.json) | Time-bound scheduled and past events bound to a slot/branch | Yes |
| [`data/videos.json`](../data/videos.json) | Recorded resources rendered in the Recorded Resources section | Yes |
| [`data/meta.json`](../data/meta.json) | Schema version metadata, last-sync timestamp, sync source | Yes (sync writer only) |

All files declare a top-level `schema_version` integer. Bumping
`schema_version` requires a coordinated change in code and the sync writer.

## Branch IDs

Branches map directly to the existing `program-card-v4` cards in the Programs
and Previous Programs sections.

| Branch ID | Display name | Notes |
| --- | --- | --- |
| `health` | Ashrafiyya Health | Islamic Medical Ethics & Healthcare Training |
| `circles` | Ashrafiyya Circles | Traditional Islamic Learning |
| `itqan` | Ashrafiyya Itqān | Advanced Islamic Studies |

Branch IDs are stable. Renaming the display name does not change the ID.

## Slot IDs

Slot IDs are stable identifiers for permanent current-program slots. They are
chosen by developers and must not be changed once shipped, because past
`events.json` entries reference them.

| Slot ID | Branch | Visual position |
| --- | --- | --- |
| `health_heart_of_care` | `health` | Programs > Ashrafiyya Health > first item |
| `health_rise_to_respond` | `health` | Programs > Ashrafiyya Health > second item |
| `circles_kayfiyyat_salat` | `circles` | Programs > Ashrafiyya Circles > first item |
| `itqan_al_durr` | `itqan` | Programs > Ashrafiyya Itqān > first item |

### Slot rendering order

Slots within a branch are ordered by `sort_order` ascending, then by `slot_id`
as a tiebreaker. Sort order values are spaced (10, 20, 30, …) so new slots can
be inserted later without renumbering everything.

## Slot record shape (`program-slots.json`)

```jsonc
{
  "slot_id": "health_heart_of_care",   // required, stable, unique
  "branch": "health",                  // required, must match a known branch
  "section": "programs",               // required, currently always "programs"
  "sort_order": 10,                    // required, integer
  "is_enabled": true,                  // required; if false, slot is not rendered
  "title": "The Heart of Care",        // required
  "description": "...",                // optional, plain text
  "default_details": [                 // optional, rendered as detail rows
    { "label": "Status", "value": "More Coming Soon" }
  ],
  "default_button": {                  // optional, rendered as the slot CTA
    "text": "Details & Registration Coming Soon",
    "href": "#",                       // required if default_button is present
    "target": "_blank",                // optional
    "rel": "noopener noreferrer",      // optional
    "style": "insta-link-light",       // optional, must be an allowed style
    "is_placeholder": true             // optional, true marks the button as
                                        // visually disabled / non-functional
  },
  "default_template_html": "<div ..."  // optional, dev-only reference snippet
}
```

`default_template_html` is **not** a runtime template engine input. It exists so
renderer development can compare generated markup against the exact prior
hard-coded HTML for a slot. The runtime must build markup from structured
fields, not from this string.

## Event record shape (`events.json`)

```jsonc
{
  "event_id": "string",                // required, unique
  "slot_id": "health_rise_to_respond", // required when the event occupies a slot
  "branch": "health",                  // required
  "title": "...",                      // required
  "description": "...",                // optional, plain text
  "start": "2026-05-10T18:30:00Z",     // ISO 8601 UTC; required for scheduled events
  "end":   "2026-05-11T00:00:00Z",     // ISO 8601 UTC; required for scheduled events
  "venue": "Al-Falah Center",          // optional
  "details": [                         // optional, rendered as detail rows
    { "label": "Date", "value": "Sunday, May 10, 2026" },
    { "label": "Time", "value": "2:30 PM - 8:00 PM EST" },
    { "label": "Venue", "value": "Al-Falah Center" }
  ],
  "button": {                          // optional, same shape as default_button
    "text": "Details & Registration",
    "href": "https://...",
    "target": "_blank",
    "rel": "noopener noreferrer",
    "style": "insta-link-light"
  },
  "visible": true,                     // required; false hides the event
  "sort_order": 10                     // optional, used for past-event ordering
}
```

### Event lifecycle

For a given slot:

1. Pick the event with `slot_id === slot.slot_id`, `visible === true`, and
   whose time window contains the current moment, defined as
   `start <= now <= end`. Ties are broken by largest `start`.
2. If no such event exists, the slot renders its **default template**:
   `title`, `description`, `default_details`, and `default_button`.
3. Once `now > end`, the event becomes a **past event** for its `branch` and
   appears in Previous Programs. The slot must immediately revert to step 2.
4. Past events are sorted by `end` descending, then by `sort_order` ascending,
   then by `event_id`.

The renderer never deletes a slot from the page. A slot with no active event
always falls back to its default template; a slot with `is_enabled: false`
renders nothing.

## Video record shape (`videos.json`)

```jsonc
{
  "video_id": "string",                // required, unique
  "branch": "health",                  // required
  "title": "Heart of Care: Shifting Paradigms", // required
  "youtube_url": "https://www.youtube.com/watch?v=...", // required
  "embed_url": "https://www.youtube.com/embed/...",     // required
  "thumbnail_url": "https://img.youtube.com/vi/.../maxresdefault.jpg", // optional
  "notes": [                           // optional list of related notes/links
    {
      "label": "Shifting Paradigms",
      "href": "resources/shifting-paradigms/"
    }
  ],
  "visible": true,                     // required
  "sort_order": 10                     // required
}
```

Videos are grouped into the Recorded Resources columns by `branch` and ordered
by `sort_order` ascending, then `video_id`.

## Allowed button styles

`button.style` and `default_button.style` must be one of:

- `insta-link-light` (current site default)
- `insta-link` (dark variant)

Any other value must be ignored by the renderer and logged. Editors cannot add
new style names; doing so requires a code change.

## Rendering boundaries

These rules are non-negotiable.

1. The renderer must build all markup from structured fields. It must not
   inject editor-provided HTML.
2. CSS class names, layout, card structure, and section architecture are
   developer-controlled. Sheet data cannot change them.
3. URLs (`href`, `youtube_url`, etc.) must be validated as `http(s)://`,
   `mailto:`, or repo-relative paths. Anything else is rejected and the slot
   falls back to its default state.
4. Text fields are rendered as text content, not HTML. Minimal inline emphasis
   may be allowed later only via a vetted, code-controlled allowlist.
5. If `events.json` or `videos.json` cannot be loaded or fails validation, the
   renderer must keep the last-known-good legacy / default content visible and
   log the failure. Empty or malformed content must never blank the page.
6. Default slot templates live in [`data/program-slots.json`](../data/program-slots.json)
   and are repo-controlled. They are the safety net when scheduled events end.

## Date and timezone rules

- `start` and `end` are stored in ISO 8601 UTC.
- `details` rows can carry a human-friendly localized string for display, but
  the lifecycle decision is always made from `start`/`end` UTC.
- Comparisons use the user's current `Date.now()`. No timezone math beyond
  parsing ISO strings is allowed at the renderer layer.

## Sync responsibilities

When the Google Sheet sync (added in later phases) writes to these files:

- It must validate the entire output against this schema before writing.
- It must refuse to overwrite a non-empty file with empty or invalid content.
- It must update [`data/meta.json`](../data/meta.json) with the new
  `generated_at` timestamp and `source` (`sheet` vs. `manual`).
- It must never modify [`data/program-slots.json`](../data/program-slots.json)
  defaults; only the developer can change those.
