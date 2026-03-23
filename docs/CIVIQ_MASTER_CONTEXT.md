# CIVIQ — Master Context
> Primary handoff document for every new chat session.
> Read this completely before doing anything.
> Every decision made so far is recorded here.
> Last updated: Session 2 — Components phase begun.

---

## FIRST THING TO READ IN ANY NEW SESSION

```
This is one of 5 project files. All 5 must be available:

FILE 1 — CIVIQ_MASTER_CONTEXT.md        ← you are reading this
         Project identity, users, flow, design system, locked decisions

FILE 2 — CIVIQ_COLOR_SYSTEM.md
         Every color, every component, CSS variables, Tailwind config
         Light mode + dark mode complete

FILE 3 — CIVIQ_FINAL_PRODUCT_DEFINITION.md
         Deep execution detail — MCDM scoring, clash detection,
         buffer system, override rules, data sources, form design

FILE 4 — CIVIQ_SCREEN_INVENTORY.md
         All 33 screens — every section, every content block,
         navigation structure per user role

FILE 5 — CIVIQ_PROGRESS.md
         What is done, what is pending, current phase,
         files built so far, decisions from latest session

Do not start work without reading all 5 files.
Ask the student to paste any missing file before proceeding.
```

---

## WHO YOU ARE TALKING TO

A final year computer science student building a smart city
infrastructure coordination platform as their final year project.
They already built a working version called Urban Nexus with a
previous Claude session. The backend works. The UI was bad and
system design was lacking so they restarted from scratch.
Planning is complete. Currently in the component building phase.

---

## THE PROJECT — CIVIQ

### Name and Brand
```
Old name:      Urban Nexus (abandoned — do not reference)
New name:      CIVIQ
Full meaning:  City Infrastructure Vision Intelligence Quotient
Simple:        Civic + IQ — the intelligence behind civic infrastructure
Tagline:       Plan together. Build once.
One liner:     A smart coordination platform for city infrastructure departments.

Logo:
  Geometric road intersection plus sign
  Navy arms #0D2145
  Accent dot center #5E6AD2
  Mixed case wordmark: CiViQ
  Lowercase i letters have accent square dots
```

### North Star
```
CIVIQ exists because city departments plan in silos,
causing the same roads to be dug up multiple times —
wasting public money and making citizens suffer for months.
```

### Elevator Pitch
```
CIVIQ helps city departments like PWD, Jal Nigam and
electricity board coordinate their projects before they start.
So the same road is never dug up twice.
```

---

## TECH STACK

```
Frontend:   React + Vite + Tailwind CSS
Backend:    Node.js + Express
Database:   MongoDB + Mongoose
Maps:       Leaflet.js + Turf.js
Realtime:   Socket.io
Storage:    Cloudinary
Auth:       JWT
Animation:  Framer Motion
Icons:      Lucide React
Forms:      React Hook Form + Yup
State:      Zustand + React Query v5
```

---

## FOUR USERS — COMPLETE ROLES

### ADMIN (Municipal Coordinator — 1 for whole city)
```
Single job: Detect clashes and coordinate departments before ground work begins.

Can do:
  See ALL projects from ALL departments
  Approve or reject any project
  See MCDM scores and clash alerts
  Resolve clashes (approve both OR reject one)
  Override MCDM with logged reason (4 categories only)
  Manage all users (create, deactivate)
  See complete audit log
  See department performance analytics

Cannot do:
  Assign supervisors (Officer's job only)
  Submit projects
```

### OFFICER (Department Head — 1 per department)
```
Single job: Submit department projects and track approval status.

Can do:
  Submit projects for own department only
  See own department projects and status
  Get notified when project has a clash
  Respond to clash rejections (accept or custom date)
  Assign supervisors from own department only
  See department conflict notifications

Cannot do:
  Approve projects (Admin only)
  Resolve clashes (Admin only)
  See other departments' internal details
```

### SUPERVISOR (Field Staff — many per department)
```
Single job: Update progress on assigned projects.

Can do:
  See only assigned projects
  Update progress percentage
  View project details and location
  See project on map

Cannot do:
  Submit, approve, assign, resolve anything
```

### CITIZEN (Public — no login)
```
Single job: See what work is happening and report problems.

Can do:
  View approved and ongoing projects on public map
  Filter by area
  File complaint with location pin
  Get CNR tracking ID
  Track complaint by CNR ID

Cannot do:
  Login to system
  See pending or rejected projects
  See internal department data
```

---

## CORE FLOW

```
Officer submits project
        ↓
System auto-runs MCDM scoring (7 criteria)
        ↓
System auto-checks geographic + time + work type clashes
        ↓
Admin sees pending project + MCDM score + clash alerts
        ↓
Admin decides:

APPROVE BOTH              APPROVE ONE           REJECT ONE
coordination note +       no clash —            lower MCDM score
adjusted dates            straightforward       system suggests next date
both active,              project active        Officer: ACCEPT or CUSTOM DATE
sequential execution                            (must be equal or later)
                                                system rechecks
                                                loop until clean
        ↓
Officer assigns Supervisor from own department
        ↓
Supervisor updates progress
        ↓
If completes early → system notifies next waiting project
        ↓
Citizen sees approved/ongoing on public map
```

---

## CLASH DETECTION ENGINE

### 3 Dimensions — ALL must be true for clash
```
1. Geographic overlap — buffered zones intersect
2. Time overlap — date ranges overlap
3. Work type conflict — types incompatible per matrix
```

### Clash Detection Process (4 steps)
```
Step 1: Same city + same ward? NO → skip
Step 2: Buffered zones intersect? (Turf.js) NO → skip
Step 3: Date ranges overlap? NO → skip
Step 4: Work type conflict matrix? → CLASH RAISED
```

### Buffer Formula
```
Total buffer = Base buffer (by type) + Size buffer (by area sqm)

Base buffer:
  Road reconstruction: 30m    Road resurfacing: 20m
  Water pipeline: 15m         Sewage: 20m
  Electrical overhead: 10m    Electrical underground: 15m
  Parks: 10m                  Other: 15m

Size buffer:
  0–5,000 sqm:        +0m
  5,000–20,000 sqm:   +10m
  20,000–50,000 sqm:  +20m
  50,000–100,000 sqm: +30m
  above 100,000 sqm:  +40m
```

### Work Type Conflict Matrix
```
              ROAD    WATER   ELECTRIC  SEWAGE  PARKS
ROAD           ✗       ✗        ~         ✗       ~
WATER          ✗       ✗        ✓         ✗       ✓
ELECTRIC       ~       ✓        ✗         ✓       ✓
SEWAGE         ✗       ✗        ✓         ✗       ✓
PARKS          ~       ✓        ✓         ✓       ✗

✗ = Always clash   ~ = Conditional   ✓ = Compatible
```

### Location System (3 tiers)
```
Tier 1 — Named road: search name + start/end points → corridor auto-generated
Tier 2 — Unnamed road: pin drop + length → capsule auto-generated
Tier 3 — Area project: pin drop + shape selector (circle/corridor/rectangle/custom)

Split screen always: form left + live map right
3 input ways always available: type address / click map / GPS
Auto detection fills: ward, zone, address, facilities, population
Shape = visualization only. Coordinates + buffer = clash detection.
```

---

## MCDM BRAIN — 7 CRITERIA

```
CRITERIA                         WEIGHT    INPUT SOURCE
──────────────────────────────────────────────────────────
1. Condition Severity             26%      Officer + complaint DB
2. Population & Facility Impact   21%      System (map auto)
3. Seasonal Compatibility         16%      System (auto calculated)
4. Execution Readiness            16%      Officer + system history
5. Citizen Disruption During Work 10%      Officer
6. Infrastructure Age              8%      Officer (one year field)
7. Economic Value                  3%      System (map auto)
──────────────────────────────────────────────────────────
```

### MCDM Form Questions (what officer fills)
```
Q1: Infrastructure condition (Critical/Poor/Fair/Good)
Q2: Incidents reported (accidents/collapse/flooding/none)
Q3: Year of last major work
Q4: Tender status (complete/in process/planning)
Q5: Contractor assigned (yes/no)
Q6: Road closure (full/partial/none)
Q7: Utility disruption (water/electricity/drainage/gas/none)
Q8: Disruption duration in days
```

### Admin Override — 4 Categories Only
```
1. Declared Emergency (disaster declaration number required)
2. Legal Mandate (case number required)
3. State/Central Government Directive (official reference required)
4. Safety Escalation (report reference required)

If none fit: 100 char minimum reason + flagged for review + logged permanently
```

---

## SCREEN INVENTORY SUMMARY

### Architecture
```
Dashboard (Admin/Officer/Supervisor):
  SPA — shell loads once, content area changes dynamically
  Sidebar always left + Navbar always top
  React Router manages URLs without reload

Citizen website (Public):
  Multi-page website — header + footer on every page
  No sidebar, no shell, no login
  Light mode only always
  Each page has own shareable URL
```

### Screen Count Per User
```
Admin:      12 views   (in dashboard shell)
Officer:    10 views   (in dashboard shell)
Supervisor:  4 views   (in dashboard shell)
Citizen:     6 pages   (public website)
Shared:      1 screen  (login)
─────────────────────────────────────
Total:      33 screens
```

Full content of every screen is in CIVIQ_SCREEN_INVENTORY.md

---

## DESIGN SYSTEM

### Font
```
Inter only — no other font ever
Weights: 400 · 500 · 600 · 700
Import: Google Fonts
```

### Type Scale
```
Display:    48px · 700 · -0.03em · lh 1.1  (website hero only)
H1:         24px · 600 · -0.02em · lh 1.2  (page titles)
H2:         20px · 600 · -0.01em · lh 1.3  (section headings)
H3:         16px · 500 ·  0em    · lh 1.4  (card titles)
H4:         14px · 500 ·  0em    · lh 1.4  (sub sections)
Body Large: 15px · 400 ·  0em    · lh 1.6  (website paragraphs)
Body:       14px · 400 ·  0em    · lh 1.5  (dashboard body)
Button:     14px · 500 ·  0em    · lh 1.0
Label:      12px · 500 · +0.06em · lh 1.0  UPPERCASE always
Input:      13px · 400 ·  0em    · lh 1.5
Badge:      11px · 500 · +0.02em · lh 1.0
Caption:    12px · 400 ·  0em    · lh 1.4
Nav Item:   14px · 400/500 · 0em · lh 1.0
Minimum:    11px — never go below
```

### Color Philosophy
```
Inspired by Linear app.
90% gray scale — backgrounds, borders, text
 7% accent #5E6AD2 — primary buttons, active states, links
 3% status colors — only when communicating meaning

Never pure #000000 or #FFFFFF for surfaces.
Cool blue-tinted grays throughout.
Accent is identical in light and dark mode.
Color only when it means something.

Full color system is in CIVIQ_COLOR_SYSTEM.md
```

### Key Colors (Quick Reference)
```
Accent:       #5E6AD2   (periwinkle indigo — Linear's exact color)
Accent Hover: #4A56C1   (light) / #6E7ADE (dark)
Brand Navy:   #0D2145   (logo + citizen footer only)
bg-base:      #FAFAFA   (light) / #141414 (dark)
bg-subtle:    #F4F4F5   (light) / #1C1C1F (dark)
bg-surface:   #FFFFFF   (light) / #232326 (dark)
border:       #E4E4E7   (light) / #27272A (dark)
text-primary: #09090B   (light) / #FAFAFA (dark)
text-muted:   #71717A   (both modes)
```

### Spacing
```
Base: 8px
Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96px
Sidebar width: 240px
Navbar height: 56px
Content padding: 32px
Card padding: 16px
Max width (website): 1200px
```

### Border Radius
```
4px   — badge, tag, tooltip
6px   — button, input, dropdown
8px   — card, popover
12px  — modal, drawer
16px  — feature card (website)
999px — avatar, toggle, pill, progress bar
```

### Shadows
```
Cards:     none — use border instead
Dropdowns: 0 4px 12px rgba(0,0,0,0.08)
Modals:    0 8px 24px rgba(0,0,0,0.12)
Dark mode: higher opacity (0.30 / 0.40)
```

### Inspirations
```
LINEAR (linear.app)
  Taken: entire color philosophy, dashboard feel,
         cool blue-tinted grays, accent used sparingly

RAILWAY (railway.app)
  Taken: button design, border radius scale,
         icon + text combinations, overall confidence

VERCEL (vercel.com)
  Taken: typography — negative tracking on headings,
         font weight discipline, minimal decoration

NOTION (notion.so)
  Taken: spacing generosity, readable body text

CITIZEN WEBSITE reference:
  Clean light government portal, modern not dark
  Citizens are general public, not developers
```

---

## STACKBLITZ SETUP — CURRENT WORKING CONFIG

```
Project type: React + Vite + TypeScript
Files are .tsx not .jsx

Setup steps for new Stackblitz session:
1. Open saved project URL (do not create new every time)
   Save the URL after first setup — bookmark it

2. If fresh setup needed:
   npm install -D tailwindcss@3 postcss autoprefixer
   npx tailwindcss init -p

3. tailwind.config.js — exact working version:
   export default {
     darkMode: 'class',
     content: [
       './index.html',
       './src/App.tsx',
       './src/Button.tsx',
       './src/ButtonShowcase.tsx',
       './src/main.tsx',
     ],
     theme: { extend: {} },
     plugins: [],
   }
   NOTE: Use explicit file paths, not glob pattern.
   NOTE: Vite 8 + Tailwind v3 glob scanning has a bug.
   NOTE: Add each new component file to content array.

4. src/index.css:
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   * { font-family: 'Inter', sans-serif; }

5. npm run dev
   Warning "No utility classes detected" is a false alarm.
   Preview will still work correctly.

6. Save files with Ctrl+S after every change.
```

---

## IMPORTANT DECISIONS — ALL LOCKED

```
1.  Project rebuilt from scratch — do not reference Urban Nexus code
2.  Backend already works — only frontend needs rebuilding
3.  No UI library — pure React + Tailwind from scratch
4.  Dark mode using Tailwind 'class' strategy — .dark class on root
5.  Citizen website = light mode ONLY, never dark
6.  Dashboard = light mode default with dark mode toggle in navbar
7.  Inter font everywhere — no other fonts
8.  No gradients anywhere in UI
9.  No shadows on cards — use borders only
10. Shape on map = visualization only
    Coordinates + buffer = clash detection math
11. Admin cannot assign supervisors (Officer only)
12. No sign up on login page (Admin creates all accounts)
13. Buffer is system-defined — officer cannot change it
14. Dependency criteria removed from MCDM (unreliable)
15. Urgency reason text removed from MCDM (can't be scored)
16. Accent changed from cyan #00C8E0 to indigo #5E6AD2
    Reason: cyan felt too techy/neon, not minimal enough
    New accent matches Linear's exact production color
17. Color philosophy: 90% gray · 7% accent · 3% status
    Color is information, not decoration
18. Files are .tsx not .jsx (Stackblitz TypeScript template)
19. Tailwind v3 only — v4 causes conflicts with Vite 8
20. Explicit file paths in Tailwind content array (not glob)
    Reason: Vite 8 + Tailwind v3 glob scanning bug
```

---

## HOW TO START ANY NEW SESSION

```
Step 1 — Read all 5 files before doing anything
Step 2 — Check CIVIQ_PROGRESS.md for exact current state
Step 3 — Confirm understanding to student:
          - What CIVIQ is (one sentence)
          - Current phase
          - What was last completed
          - What needs to be done next
Step 4 — Continue from exactly where progress file says
Step 5 — After session, remind student to update CIVIQ_PROGRESS.md
```

---

*Master context locked. Session 2.*
*Do not make decisions that contradict anything above.*
*When in doubt — refer to the North Star:*
*"Plan together. Build once."*
