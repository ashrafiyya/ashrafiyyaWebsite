# Editing content (no code required)

This guide is for editors who add or update **events** and **recorded videos** through the Ashrafiyya Google Sheet. You never edit the website code.

> If the spreadsheet has not been created yet, ask the maintainer to follow [`pipeline-setup.md`](pipeline-setup.md) first.

## What you control from the sheet

| Sheet tab | Affects on the site | Notes |
| --- | --- | --- |
| **Events** | Active scheduled event card under each program slot, and the **Previous Programs** lists | Past = `end` time has passed. The site flips a card to "past" automatically. |
| **Videos** | The **Recorded Resources** YouTube columns | Two columns today: Ashrafiyya Health, Ashrafiyya Circles. |

You **do not** edit:

- Program titles or default descriptions (e.g. "The Heart of Care", "Al-Durr Study Program") — those live in code.
- Section layout, fonts, colors, or button styles.
- The `Past Health/Circles/Itqan Events:` headings.

If you need to change any of those, contact a developer.

## Common tasks

### 1. Add an upcoming event

1. Open the Google Sheet → **Events** tab.
2. Add a new row at the top (or anywhere — sort order doesn't matter for active events).
3. Fill in:
   - **`event_id`** — short stable ID, e.g. `rise_to_respond_2026_05_10_al_falah`. Lower-case letters, digits, and underscores only. Once shipped, **do not change it**.
   - **`branch`** — `health`, `circles`, or `itqan`.
   - **`slot_id`** — the program slot it belongs to (`health_heart_of_care`, `health_rise_to_respond`, `circles_kayfiyyat_salat`, or `itqan_al_durr`). Leave blank for general past events that don't take over a slot.
   - **`title`** — what the card heading should say.
   - **`start` / `end`** — date and time in **UTC ISO format** (e.g. `2026-05-10T18:30:00Z`). If unsure, ask a developer; or use a converter and double-check the time on the live site.
   - **`venue`** — optional plain text.
   - **`details_json`** — JSON list shown as the "Date / Time / Venue" rows in the card. Example: `[{"label":"Date","value":"Sunday, May 10, 2026"},{"label":"Time","value":"2:30 PM - 8:00 PM EST"},{"label":"Venue","value":"Al-Falah Center"}]`
   - **`button_json`** — JSON for the registration link, e.g. `{"text":"Details & Registration","href":"https://www.zeffy.com/...","target":"_blank","rel":"noopener noreferrer","style":"insta-link-light"}`
   - **`visible`** — `true`.
4. Save. The site updates within ~12 hours, or sooner if a developer triggers an immediate sync.

### 2. Mark an event as cancelled or hidden

Set the row's **`visible`** column to `false`. The card disappears on the next sync; the row stays in the sheet for history.

### 3. Add a past event you forgot

Same as adding an upcoming event, but use a `start` and `end` in the past. Once `end < now`, the site automatically lists it under **Previous Programs** for the matching `branch`. Use the same `details_json` style as the existing past-event rows so the card looks consistent.

### 4. Add or replace a recorded video

1. Open the Google Sheet → **Videos** tab.
2. New row:
   - **`video_id`** — e.g. `health_shifting_paradigms`. Stable; do not change later.
   - **`branch`** — `health`, `circles`, or `itqan`.
   - **`title`** — heading shown above the video.
   - **`youtube_url`** — the **watch** URL, e.g. `https://www.youtube.com/watch?v=ABC123`.
   - **`embed_url`** — YouTube **embed** URL: open the video on YouTube → **Share → Embed** → copy the `src="..."` link only.
   - **`thumbnail_url`** — optional; for YouTube use `https://img.youtube.com/vi/<VIDEO_ID>/maxresdefault.jpg`.
   - **`visible`** — `true`.
   - **`sort_order`** — number; smaller numbers float to the top of the column.
   - **`notes_json`** — optional links to PDFs / handouts under the video, e.g. `[{"label":"Shifting Paradigms","href":"resources/shifting-paradigms/"}]`.
3. Save.

### 5. Reorder cards inside a column

Change the **`sort_order`** number on the rows you want reordered (lower = higher up). Spacing the values (10, 20, 30, …) makes future inserts easier.

## What "the sheet syncs to the site" actually means

Twice per day a robot reads your sheet, checks every row against the rules above, and updates the live site if everything looks valid. If something is wrong (a missing `event_id`, a malformed `details_json`, an empty branch name), the robot **stops and changes nothing**. The site keeps showing the last known good content.

If you need a sync sooner than the next scheduled run, ask a developer to dispatch the workflow (or use the optional **Ashrafiyya Sync → Sync to website now** menu inside the sheet, if it has been set up).

## Things to **never** do

- ❌ Don't change a published `event_id` or `video_id`. The site uses them as stable references; renaming breaks history.
- ❌ Don't paste HTML into any cell. Plain text only. The renderer escapes HTML on purpose for security.
- ❌ Don't add new branch names beyond `health`, `circles`, and `itqan`. Anything else is rejected by validation.
- ❌ Don't blank out a column header row. Headers are how the sync script knows which column is which.
- ❌ Don't manually edit anything inside the GitHub repository (`data/events.json`, `data/videos.json`). The sheet is the source of truth; manual edits will be overwritten by the next sync.

## When something looks wrong on the site

1. Wait for the next sync if you just edited the sheet (it can take up to ~12 hours by default).
2. Check the row you edited — typos in `branch`, `visible`, or JSON columns are the most common cause of a card disappearing.
3. If a developer says the sync workflow failed, fix the row that was reported and re-trigger it. **Do not edit the JSON files in the GitHub repo by hand.**
4. If you can't tell what's wrong, contact a developer. The full validation rules live in [`content-schema.md`](content-schema.md).
