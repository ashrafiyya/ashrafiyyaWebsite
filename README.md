# Ashrafiyya Website

A modern, responsive website for Ashrafiyya built with React, TypeScript, and Vite. This website showcases programs across three branches: Ashrafiyya Health, Ashrafiyya Circles, and Ashrafiyya Itqān.

## About This Project

This is a single-page application that displays:
- Current programs and events
- Previous programs history
- Branch information
- Social media links
- Donation options

The site automatically moves expired programs to the "Previous Programs" section every night at 2:00 AM EST.

## Technology Stack

- **React 19.2** - User interface framework
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **GitHub Pages** - Hosting platform
- **GitHub Actions** - Automated deployment and quality checks

---

## First-Time Setup (For Developers)

**1. Enable GitHub Pages:**
   - Go to repository Settings > Pages
   - Under "Source", select "GitHub Actions"
   - Click "Save"

**2. Push to Deploy:**
   ```bash
   git push origin main
   ```

**3. View Your Site:**
   - Check the Actions tab for deployment status
   - Site will be live at: `https://yourusername.github.io/repository-name/`

That's it! All future pushes to `main` will automatically deploy.

---

## How to Update Content (For Non-Technical Users)

All content is stored in simple text files in the `src/data/` folder. You can edit these files to update the website content.

### Important Files

- `src/data/programs.ts` - Current active programs
- `src/data/previousPrograms.ts` - Past events
- `src/data/branches.ts` - Branch descriptions
- `src/data/socialLinks.ts` - Social media links
- `src/data/videos.ts` - YouTube video links
- `src/data/donationMethods.ts` - Donation buttons

---

## Step-by-Step Guide: Adding a New Program

### Step 1: Open the Programs File

1. Navigate to: `src/data/programs.ts`
2. Open the file in any text editor

### Step 2: Find the Correct Branch

The file contains three sections for the three branches:
- **Ashrafiyya Health** (starts around line 5)
- **Ashrafiyya Circles** (starts around line 37)
- **Ashrafiyya Itqān** (starts around line 71)

### Step 3: Add Your Program

Find the branch section where you want to add the program. Look for the `programs: [` line, and add your program inside the square brackets.

**Example - Adding a new program to Ashrafiyya Health:**

```typescript
{
  id: "my-new-program",
  title: "My New Program Title",
  descriptions: [
    "First paragraph describing the program.",
    "Second paragraph with more details.",
  ],
  eventDetails: [
    { label: "Date", value: "February 15, 2026" },
    { label: "Time", value: "7:00 PM - 9:00 PM" },
    { label: "Venue", value: "Location Name" },
  ],
  registrationLink: "https://example.com/register",
  registrationText: "Register Now",
},
```

### Step 4: Fill in the Details

- **id**: A unique identifier (use lowercase with hyphens, like "my-program")
- **title**: The program name as it will appear on the website
- **descriptions**: An array of paragraphs (each in quotes, separated by commas)
- **eventDetails**: Information about the event
  - **Date**: The event date (format: "Month DD, YYYY")
  - **Time**: The event time (format: "H:MM AM/PM - H:MM AM/PM")
  - **Venue**: Where the event will be held
- **registrationLink**: URL where people can register (or leave it out if not ready)
- **registrationText**: Text shown on the registration button

### Step 5: Important Rules

1. Each program must be inside curly braces `{ }`
2. Programs are separated by commas
3. Text must be in quotes `"like this"`
4. Don't forget commas between programs
5. If you want the program to auto-expire, include a "Date" field

### Step 6: Save the File

After making changes, save the file. The website will need to be rebuilt and redeployed (see "Deployment" section below).

---

## Step-by-Step Guide: Removing a Program

### Step 1: Open the Programs File

Navigate to: `src/data/programs.ts`

### Step 2: Find the Program to Remove

Search for the program by its title or id.

### Step 3: Delete the Entire Program Block

Delete everything from the opening `{` to the closing `}`, including the comma after it.

**Before:**
```typescript
{
  id: "old-program",
  title: "Old Program",
  // ... rest of program
},
{
  id: "program-to-keep",
  title: "Keep This One",
  // ...
},
```

**After:**
```typescript
{
  id: "program-to-keep",
  title: "Keep This One",
  // ...
},
```

### Step 4: Check for Commas

Make sure:
- Programs are still separated by commas
- No comma after the last program in the list
- No extra commas left behind

### Step 5: Save the File

Save your changes.

---

## Step-by-Step Guide: Updating an Existing Program

### Step 1: Open the Programs File

Navigate to: `src/data/programs.ts`

### Step 2: Find the Program

Search for the program by its title or id.

### Step 3: Edit the Content

Change any field you want:

**Changing the title:**
```typescript
title: "New Updated Title",
```

**Changing the date:**
```typescript
{ label: "Date", value: "March 20, 2026" },
```

**Changing the description:**
```typescript
descriptions: [
  "Updated first paragraph.",
  "Updated second paragraph.",
],
```

**Changing the registration link:**
```typescript
registrationLink: "https://newlink.com/register",
```

### Step 4: Save the File

Save your changes.

---

## Step-by-Step Guide: Making a Program "Coming Soon"

If an event doesn't have a date yet, you can make it show as "Coming Soon":

### Step 1: Find the Program

Open `src/data/programs.ts` and find your program.

### Step 2: Remove the Registration Link

Delete or comment out the `registrationLink` line:

```typescript
// registrationLink: "https://example.com",  // Removed
```

### Step 3: Update the Event Details

Change to:
```typescript
eventDetails: [{ label: "Status", value: "Coming Soon" }],
```

### Step 4: Update the Button Text

```typescript
registrationText: "Details & Registration Coming Soon",
```

### Complete Example:

```typescript
{
  id: "future-program",
  title: "Future Program",
  descriptions: [
    "Program description here.",
  ],
  eventDetails: [{ label: "Status", value: "Coming Soon" }],
  registrationText: "Details & Registration Coming Soon",
},
```

---

## Step-by-Step Guide: Adding a Past Event

### Step 1: Open the Previous Programs File

Navigate to: `src/data/previousPrograms.ts`

### Step 2: Find the Correct Branch

Find the branch section (Health, Circles, or Itqān).

### Step 3: Add the Event

Add your event to the `events: [` array at the TOP (most recent events first):

```typescript
{
  id: "past-event-unique-id",
  event: "Event Name",
  date: "December 10, 2025",
  venue: "Location Name",
},
```

### Step 4: Optional Fields

You can also include:
- **speaker**: "Speaker Name"
- **notes**: "By invite only" or other notes

### Step 5: Save the File

Save your changes.

---

## Step-by-Step Guide: Updating Social Media Links

### Step 1: Open the Social Links File

Navigate to: `src/data/socialLinks.ts`

### Step 2: Find the Platform

Find the social media platform you want to update (whatsapp, telegram, instagram, facebook, x, youtube).

### Step 3: Update the Link

Change the `href` value:

```typescript
href: "https://instagram.com/yournewhandle",
```

### Step 4: Save the File

Save your changes.

---

## Step-by-Step Guide: Adding a Video

### Step 1: Get the YouTube Video ID

From a YouTube URL like: `https://www.youtube.com/watch?v=ABC123XYZ`

The video ID is: `ABC123XYZ`

### Step 2: Open the Videos File

Navigate to: `src/data/videos.ts`

### Step 3: Find the Correct Branch

Choose which branch (health or circles).

### Step 4: Add the Video

Add to the `videos: [` array:

```typescript
{
  id: "my-video-unique-id",
  title: "Video Title",
  youtubeId: "ABC123XYZ",
  embedUrl: "https://www.youtube.com/embed/ABC123XYZ?si=XXXXXXXX&rel=0",
  watchUrl: "https://www.youtube.com/watch?v=ABC123XYZ",
  thumbnailUrl: "https://img.youtube.com/vi/ABC123XYZ/maxresdefault.jpg",
},
```

**Note:** Replace `ABC123XYZ` with your actual video ID in all places.

### Step 5: Save the File

Save your changes.

---

## Common Mistakes to Avoid

### 1. Missing Commas

**Wrong:**
```typescript
{
  id: "program1"
  title: "Program 1"  // Missing comma
}
```

**Right:**
```typescript
{
  id: "program1",
  title: "Program 1",
}
```

### 2. Missing Quotes

**Wrong:**
```typescript
title: My Program,  // No quotes
```

**Right:**
```typescript
title: "My Program",
```

### 3. Unmatched Brackets

Every `{` needs a matching `}`
Every `[` needs a matching `]`

### 4. Extra Commas

**Wrong:**
```typescript
{
  id: "last-program",
  title: "Last Program",
},  // Extra comma - this is the last one
]
```

**Right:**
```typescript
{
  id: "last-program",
  title: "Last Program",
}  // No comma after the last item
]
```

### 5. Wrong Date Format

The automation looks for dates in this format:
- **Right:** "January 08, 2026"
- **Right:** "January 8, 2026"
- **Wrong:** "01/08/2026"
- **Wrong:** "8 Jan 2026"

---

## Testing Your Changes

After making changes, you should test them:

### Option 1: Test Locally (Requires Setup)

```bash
npm install      # First time only
npm run dev      # Starts development server
```

Open your browser to `http://localhost:5173` to see the site.

### Option 2: Push to GitHub and Check

After committing and pushing your changes, GitHub Pages will automatically rebuild the site (takes 2-5 minutes).

---

## Deployment

### Automatic Deployment to GitHub Pages

The site automatically deploys when you push changes to the `main` branch. Here's what happens:

**Step 1: Quality Checks (Must Pass)**
- TypeScript type checking
- Code linting (ESLint)
- Unit tests

**Step 2: Build**
- Compiles TypeScript
- Bundles React application
- Optimizes for production

**Step 3: Deploy**
- Uploads to GitHub Pages
- Site goes live (takes 2-5 minutes)

**If any quality check fails, deployment is blocked.**

### Viewing Deployment Status

1. Go to your GitHub repository
2. Click the "Actions" tab
3. See the "Deploy to GitHub Pages" workflow
4. View logs for any errors

### Manual Deployment Trigger

You can manually trigger a deployment:

1. Go to GitHub repository
2. Click "Actions" tab
3. Select "Deploy to GitHub Pages"
4. Click "Run workflow"

### Local Build (Testing)

To test the production build locally:

```bash
npm run build       # Build for production
npm run preview     # Preview the build locally
```

This creates a `dist/` folder with the production-ready files.

### GitHub Pages Configuration

**Required Settings (One-Time Setup):**

1. Go to GitHub repository Settings
2. Click "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"
4. Save

That's it! The workflows handle everything else automatically.

---

## Program Auto-Expiry (Automation)

The website has automation that runs every night at 2:00 AM EST to automatically manage expired programs.

### What the Automation Does

Every day at 2:00 AM EST, the system:
1. Checks all programs in `src/data/programs.ts` for expired dates
2. Moves expired programs to `src/data/previousPrograms.ts`
3. For "Rise to Respond", replaces with "Coming Soon" version (keeps it visible)
4. For other programs, removes them entirely from current programs
5. Automatically commits and pushes changes to GitHub
6. GitHub Pages redeploys the site (takes 2-5 minutes)

### How to Make a Program Auto-Expire

Simply include a "Date" field in the program's `eventDetails`:

```typescript
{
  id: "my-program",
  title: "My Program",
  eventDetails: [
    { label: "Date", value: "January 15, 2026" },  // Required for auto-expiry
    { label: "Time", value: "7:00 PM" },
    { label: "Venue", value: "Location" },
  ],
  // ...
}
```

**Rules:**
- Programs expire at 11:59 PM EST on their event date
- Without a "Date" field, programs never auto-expire
- Supported date formats: "January 08, 2026", "Jan 8, 2026", etc.
- The "Date" label must be exactly "Date" (case-sensitive)

### Testing the Automation Locally

Before pushing changes, you can test what would happen:

```bash
npm run check-expired
```

This is safe - it shows what would be moved without actually committing changes.

### Manual Trigger (GitHub)

To run the automation immediately (without waiting for 2:00 AM):

1. Go to your GitHub repository
2. Click the "Actions" tab
3. Select "Check and Move Expired Programs"
4. Click "Run workflow" button

### Special Case: Rise to Respond

When a "Rise to Respond: Heartsaver Course for Sisters" event expires:
- The event moves to previous programs
- BUT it's also replaced with a "Coming Soon" version in current programs:

```typescript
{
  id: "rise-to-respond",
  title: "Rise to Respond: Heartsaver Course for Sisters",
  descriptions: ["A sister-led initiative..."],
  eventDetails: [{ label: "Status", value: "More Coming Soon" }],
  registrationText: "Details & Registration Coming Soon",
}
```

This keeps the program visible while you plan the next session.

### Viewing Automation History

See what the automation has done:

```bash
git log --grep="automated"
```

Or on GitHub: Go to Actions tab and view workflow runs.

### Disabling Automation

To temporarily disable:

1. Open `.github/workflows/check-expired-programs.yml`
2. Comment out the schedule section:
```yaml
# schedule:
#   - cron: '0 7 * * *'
```
3. Commit and push

To permanently remove: Delete the workflow file.

### Troubleshooting Automation

**Program didn't move automatically:**
- Check that it has a "Date" field in eventDetails
- Verify the date has passed (in EST timezone)
- Look at GitHub Actions tab for error logs

**Automation isn't running:**
- Verify `.github/workflows/check-expired-programs.yml` exists
- Check that GitHub Actions are enabled for your repository
- Look at Actions tab for workflow runs

**Changes not showing on website:**
- Wait 2-5 minutes for GitHub Pages to redeploy
- Check Actions tab for deployment status
- Clear your browser cache

---

## File Structure

```
.github/
└── workflows/               # GitHub Actions (automatic deployment)
    ├── deploy.yml           # Deployment workflow
    ├── ci.yml               # Pull request checks
    └── check-expired-programs.yml  # Program expiry automation

src/
├── data/                    # Content files (EDIT THESE)
│   ├── programs.ts          # Current programs
│   ├── previousPrograms.ts  # Past events
│   ├── branches.ts          # Branch info
│   ├── socialLinks.ts       # Social media links
│   ├── videos.ts            # YouTube videos
│   └── donationMethods.ts   # Donation options
│
├── components/              # React components (DON'T EDIT)
├── sections/                # Page sections (DON'T EDIT)
├── types/                   # TypeScript types (DON'T EDIT)
└── lib/                     # Utilities (DON'T EDIT)

scripts/
└── check-expired-programs.js  # Automation script
```

**For content updates, only edit files in `src/data/`**

**GitHub Actions workflows automatically handle:**
- Quality checks (typecheck, lint, tests)
- Building the application
- Deploying to GitHub Pages
- Moving expired programs (daily at 2:00 AM EST)

---

## Getting Help

If you make a mistake:

1. **Check the terminal** for error messages
2. **Look for missing commas** or quotes
3. **Compare with existing entries** to see the pattern
4. **Undo your changes** and try again
5. **Ask for help** from someone technical

Common error messages:
- "Unexpected token" = Missing comma or quote
- "Cannot find" = Wrong file path or name
- "Parse error" = Syntax mistake (check brackets and commas)

---

## Development Commands

```bash
npm install          # Install dependencies (first time only)
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run lint         # Check code quality
npm run typecheck    # Check TypeScript types
npm run check-expired # Manually check for expired programs
```

---

## Browser Support

The website works on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## Contact & Support

- **Email:** admin@ashrafiyya.com
- **Technical Documentation:** See `AUTOMATION.md` and `REFACTORING_SUMMARY.md`

---

## License

Copyright 2025 Ashrafiyya. All Rights Reserved.

