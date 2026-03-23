# CIVIQ — Progress Tracker
> Update this file at the end of every session.
> This is the GPS of the project — tells any new Claude session
> exactly where to continue without re-explanation.
> Last updated: Session 2

---

## CURRENT STATUS

```
Phase:        Component Building
Last done:    Button component — verified working on Stackblitz
Next up:      Badge / Status Pill component
Blocker:      None
```

---

## OVERALL PROJECT PHASES

```
PHASE 0 — Planning and Design           ✅ COMPLETE
PHASE 1 — Component Library             🔄 IN PROGRESS (1 of 8 done)
PHASE 2 — Dashboard Shell               ⬜ NOT STARTED
PHASE 3 — Admin Screens                 ⬜ NOT STARTED
PHASE 4 — Officer Screens               ⬜ NOT STARTED
PHASE 5 — Supervisor Screens            ⬜ NOT STARTED
PHASE 6 — Citizen Website               ⬜ NOT STARTED
PHASE 7 — Backend Connection            ⬜ NOT STARTED
PHASE 8 — Testing                       ⬜ NOT STARTED
PHASE 9 — Deployment                    ⬜ NOT STARTED
PHASE 10 — Final Year Project Extras    ⬜ NOT STARTED
```

---

## PHASE 0 — Planning and Design ✅ COMPLETE

```
✅ Product definition locked (CIVIQ_FINAL_PRODUCT_DEFINITION.md)
✅ Project name and brand decided — CIVIQ
✅ North star defined — "Plan together. Build once."
✅ 4 users fully defined — Admin, Officer, Supervisor, Citizen
✅ Core flow designed end to end
✅ Clash detection engine designed (3 dimensions, 4 steps)
✅ MCDM brain designed (7 criteria, weights, all inputs)
✅ Location system designed (3 tiers, split screen)
✅ Admin override system designed (4 categories)
✅ Buffer system designed (by type + size)
✅ 33 screens inventoried (CIVIQ_SCREEN_INVENTORY.md)
✅ Design system defined (typography, spacing, radius, shadows)
✅ Color system locked (CIVIQ_COLOR_SYSTEM.md)
   — Accent: #5E6AD2 periwinkle indigo (Linear's exact color)
   — Philosophy: 90% gray · 7% accent · 3% status
   — Full dark mode for every component
✅ Inspirations locked (Linear, Railway, Vercel, Notion)
✅ All 5 MD files created and saved
```

---

## PHASE 1 — Component Library 🔄 IN PROGRESS

### Approach
```
Each component gets two files:
  ComponentName.tsx     — the actual reusable component
  ComponentShowcase.tsx — visual preview of all variants

Each component is previewed and verified in Stackblitz
before moving to the next one.

After all 8 components done → move to Phase 2 (shell).
```

### Component 1 — Button ✅ DONE
```
Files:    Button.tsx + ButtonShowcase.tsx
Verified: Yes — confirmed working in Stackblitz
          Correct #5E6AD2 accent color visible

Variants:
  primary     — #5E6AD2 bg, white text
  secondary   — white bg, gray border
  ghost       — transparent bg
  tinted      — #ECEEFE bg, #5E6AD2 text
  destructive — #DC2626 bg, white text

Sizes:        sm · md · lg
States:       default · hover · active · disabled · loading
Dark mode:    fully implemented
Extras:       iconLeft, iconRight, shortcut label, fullWidth
Exports:      PrimaryButton, SecondaryButton, GhostButton,
              TintedButton, DestructiveButton, IconButton
```

### Component 2 — Badge / Status Pill ⬜ NEXT
```
Files needed:   Badge.tsx + BadgeShowcase.tsx
Status:         Not started

Variants needed (from color system):
  approved    — #DCFCE7 bg · #15803D text (light)
  pending     — #FEF3C7 bg · #B45309 text (light)
  rejected    — #FEE2E2 bg · #B91C1C text (light)
  ongoing     — #DBEAFE bg · #1D4ED8 text (light)
  completed   — #F4F4F5 bg · #71717A text (light)
  active      — #ECEEFE bg · #5E6AD2 text (light)
  clash       — #FEE2E2 bg · #B91C1C text (light)

Project type variants:
  road        — #FFF0E8 bg · #C2410C text (light)
  water       — #DBEAFE bg · #1D4ED8 text (light)
  electricity — #FEFCE8 bg · #A16207 text (light)
  sewage      — #F5F3FF bg · #6D28D9 text (light)
  parks       — #DCFCE7 bg · #15803D text (light)
  other       — #F4F4F5 bg · #71717A text (light)

Sizes:        sm · md
Dark mode:    all variants
```

### Component 3 — Input Field ⬜
```
Files needed:   Input.tsx + InputShowcase.tsx
Status:         Not started

Variants needed:
  default, hover, focus, error, disabled
  with label, with hint text, with error message
  with left icon, with right icon
  password type (show/hide toggle)
  textarea variant
```

### Component 4 — Card ⬜
```
Files needed:   Card.tsx + CardShowcase.tsx
Status:         Not started

Variants needed:
  default, hover (clickable), selected, danger (clash)
  project card, stat card, simple wrapper card
```

### Component 5 — Sidebar Navigation Item ⬜
```
Files needed:   NavItem.tsx + NavItemShowcase.tsx
Status:         Not started

Variants needed:
  default, hover, active (with left accent border)
  with icon, with badge count
  section label separator
```

### Component 6 — Avatar ⬜
```
Files needed:   Avatar.tsx + AvatarShowcase.tsx
Status:         Not started

Variants needed:
  with image, initials fallback
  sizes: sm · md · lg
  with online indicator dot
  stacked group variant
```

### Component 7 — Stat Card ⬜
```
Files needed:   StatCard.tsx + StatCardShowcase.tsx
Status:         Not started

Variants needed:
  neutral value, accented value, danger value
  with trend indicator (up/down)
  with label
```

### Component 8 — Toast Notification ⬜
```
Files needed:   Toast.tsx + ToastShowcase.tsx
Status:         Not started

Variants needed:
  success, error, warning, info
  with left colored border
  dismiss button
  auto dismiss timer
```

---

## PHASE 2 — Dashboard Shell ⬜ NOT STARTED

```
Files needed:
  Sidebar.tsx         — full sidebar with nav items
  Navbar.tsx          — top bar with bell, dark mode, avatar
  DashboardLayout.tsx — wrapper combining sidebar + navbar + content

Requirements:
  Dark mode toggle wired globally (class on <html>)
  React Router v6 setup for all routes
  Role-based shell — Admin, Officer, Supervisor see different nav
  Sidebar 240px wide · Navbar 56px tall
  Content area fills remaining space
  Sidebar active state highlights current route
```

---

## PHASE 3 — Admin Screens ⬜ NOT STARTED

```
Approach: Discuss content + layout first, then build
          Use already-built components throughout
          Real API calls from day one — no mocked data

12 screens in order:
  ⬜ 1.  Admin Dashboard
  ⬜ 2.  Projects List
  ⬜ 3.  Project Detail (approve/reject/MCDM/map)
  ⬜ 4.  Conflicts List
  ⬜ 5.  Conflict Detail (resolution tools)
  ⬜ 6.  City Map
  ⬜ 7.  Complaints Monitor
  ⬜ 8.  Complaint Detail
  ⬜ 9.  Audit Log
  ⬜ 10. User Management
  ⬜ 11. User Detail
  ⬜ 12. Profile and Settings
```

---

## PHASE 4 — Officer Screens ⬜ NOT STARTED

```
10 screens in order:
  ⬜ 1.  Officer Dashboard
  ⬜ 2.  Projects List
  ⬜ 3.  Project Submission Form (7 sections — most complex screen)
  ⬜ 4.  Project Detail
  ⬜ 5.  Clash Response View
  ⬜ 6.  Conflicts List
  ⬜ 7.  Conflict Detail
  ⬜ 8.  City Map (read only)
  ⬜ 9.  Complaints List
  ⬜ 10. Complaint Detail
```

---

## PHASE 5 — Supervisor Screens ⬜ NOT STARTED

```
4 screens in order:
  ⬜ 1. Supervisor Dashboard
  ⬜ 2. My Tasks List
  ⬜ 3. Task Detail (progress update + map)
  ⬜ 4. Profile and Settings
```

---

## PHASE 6 — Citizen Website ⬜ NOT STARTED

```
6 pages — separate from dashboard, light mode only:
  ⬜ 1. Landing Page
  ⬜ 2. City Explorer (map + list split screen)
  ⬜ 3. Project Detail (read only)
  ⬜ 4. Report Form (complaint + CNR ID)
  ⬜ 5. Track Report (CNR timeline)
  ⬜ 6. 404 Not Found

Shared:
  ⬜ Login Page
```

---

## PHASE 7 — Backend Connection ⬜ NOT STARTED

```
Note: Backend (Urban Nexus) already works.
      Only needs to be connected to new frontend.

Tasks:
  ⬜ Environment variables setup (.env)
  ⬜ API base URL config
  ⬜ Zustand store setup (auth state, user role)
  ⬜ React Query setup (all API calls)
  ⬜ JWT auth flow (login → token → role-based redirect)
  ⬜ Socket.io realtime connection
  ⬜ Leaflet map integration
  ⬜ Cloudinary file upload integration
  ⬜ Every screen connected to real API
  ⬜ No mocked data anywhere
```

---

## PHASE 8 — Testing ⬜ NOT STARTED

```
  ⬜ Full user flow: Officer submits → Admin approves → Supervisor updates
  ⬜ Clash detection with real overlapping coordinates
  ⬜ MCDM scoring with real inputs
  ⬜ Citizen complaint + CNR tracking
  ⬜ Dark mode on every screen
  ⬜ Mobile basic responsiveness check
  ⬜ Role-based access — each user can only see their screens
```

---

## PHASE 9 — Deployment ⬜ NOT STARTED

```
  ⬜ Deploy backend — Railway or Render (free tier)
  ⬜ Deploy frontend — Vercel or Netlify (free tier)
  ⬜ Connect frontend to deployed backend URL
  ⬜ Environment variables on deployment platform
  ⬜ Test live deployment end to end
```

---

## PHASE 10 — Final Year Project Extras ⬜ NOT STARTED

```
  ⬜ Project report / documentation
  ⬜ PPT presentation for viva
  ⬜ Demo video (screen recording walkthrough)
  ⬜ README.md for GitHub repo
```

---

## FILES BUILT SO FAR

```
COMPONENTS:
  Button.tsx            ✅ complete — all variants, verified
  ButtonShowcase.tsx    ✅ complete — visual preview

MD FILES:
  CIVIQ_MASTER_CONTEXT.md           ✅ updated Session 2
  CIVIQ_COLOR_SYSTEM.md             ✅ complete Session 2
  CIVIQ_FINAL_PRODUCT_DEFINITION.md ✅ complete Session 1
  CIVIQ_SCREEN_INVENTORY.md         ✅ complete Session 1
  CIVIQ_PROGRESS.md                 ✅ created Session 2
```

---

## SESSION HISTORY

### Session 1 — Planning
```
Completed:
  Full product definition
  4 users, core flow, clash detection
  MCDM brain, location system
  33 screen inventory
  Initial design system
  Initial color system (old — cyan accent)

Outcome: All planning MD files created
```

### Session 2 — Design System + Component 1
```
Completed:
  Color system completely reworked
    Old cyan #00C8E0 → new indigo #5E6AD2
    Linear exact accent adopted
    Full dark mode added for every component
    Philosophy locked: 90% gray · 7% accent · 3% status
    CIVIQ_COLOR_SYSTEM.md written from scratch
  Button component built and verified
    Button.tsx + ButtonShowcase.tsx
    Verified working in Stackblitz
    Correct indigo accent visible on screen
  All 5 MD files established and organized
  Master context updated

Next session starts at:
  Phase 1 — Component 2 — Badge.tsx
```

---

## HOW TO UPDATE THIS FILE

```
At the end of every session:
1. Mark completed items with ✅
2. Update "CURRENT STATUS" section at top
3. Add new session entry to SESSION HISTORY
4. List any new files created under FILES BUILT
5. Note any new locked decisions
6. Set "Next session starts at" clearly
```

---

*Progress file — update every session.*
*This file + 4 others = complete project context for any new Claude session.*
