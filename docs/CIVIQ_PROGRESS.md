# CIVIQ Progress Tracker
*Last updated: April 1, 2026*

---

## Project Status: ACTIVE ✅
**Current Phase: Phase 3 — Admin Screens Part 2**

---

## Tech Stack (Locked)
```
Frontend:     React + Vite + JavaScript (JSX)
Styling:      Tailwind CSS v3 (darkMode: 'class')
Routing:      React Router DOM v7.13.1 (v6-compatible API)
HTTP:         Axios
Font:         Inter (Google Fonts)
Icons:        Inline SVG (no external library)
State/Auth:   React Context API
Mock Data:    src/data/mockData.js (frontend phase)
Backend:      Node.js + Express (to be built after frontend)
Database:     MongoDB + Mongoose
Auth:         JWT
Maps:         Leaflet.js + React Leaflet
Repo:         github.com/hashmiarsa/civiq (main branch)
```

---

## Repository Structure (Current)
```
civiq/
  frontend/
    src/
      components/
        Avatar.jsx          ✅ Built
        Badge.jsx           ✅ Built
        Button.jsx          ✅ Built (4 variants, loading spinner)
        Card.jsx            ✅ Built
        DashboardLayout.jsx ✅ Built
        Input.jsx           ✅ Built
        Navbar.jsx          ✅ Built (sign out wired — fixed Phase 2)
        PlaceholderPage.jsx ✅ Built
        Sidebar.jsx         ✅ Built
        Toast.jsx           ✅ Built
      pages/
        auth/
          Login.jsx         ✅ Built (redesigned Phase 2 — split layout)
        admin/
          AdminDashboard.jsx      ✅ Built (Phase 2)
          AdminProjects.jsx       ✅ Built (Phase 2)
          AdminProjectDetail.jsx  ✅ Built (Phase 2)
          AdminConflicts.jsx      ⬜ Placeholder
          AdminConflictDetail.jsx ⬜ Placeholder
          AdminMap.jsx            ⬜ Placeholder
          AdminComplaints.jsx     ⬜ Placeholder
          AdminComplaintDetail.jsx⬜ Placeholder
          AdminAudit.jsx          ⬜ Placeholder
          AdminUsers.jsx          ⬜ Placeholder
          AdminUserDetail.jsx     ⬜ Placeholder
          AdminSettings.jsx       ⬜ Placeholder
        officer/            ⬜ All 11 files — placeholder shells
        supervisor/         ⬜ All 4 files — placeholder shells
        citizen/            ⬜ All 9 files (Header + Footer + Layout + 6 pages)
      router/
        AppRouter.jsx       ✅ Built (all 33 routes, role guards, layout wrappers)
      context/
        AuthContext.jsx     ✅ Built (login/logout/useAuth/localStorage)
      data/
        mockData.js         ✅ Built (all dummy data)
      hooks/
        useNavigation.js    ✅ Built
        useAuth.js          ✅ Exists
        useToast.js         ✅ Exists
      services/
        api.js              ✅ Exists (empty — Phase 11)
        auth.js             ✅ Exists (empty — Phase 11)
        complaints.js       ✅ Exists (empty — Phase 11)
        conflicts.js        ✅ Exists (empty — Phase 11)
        projects.js         ✅ Exists (empty — Phase 11)
      utils/
        clashDetection.js   ✅ Exists (empty — Phase 9)
        mcdm.js             ✅ Exists (empty — Phase 8)
  backend/                  ✅ Scaffolded (Phase 7-10 will build)
  docs/
    CIVIQ_MASTER_CONTEXT.md          ✅
    CIVIQ_COLOR_SYSTEM_2.md          ✅
    CIVIQ_PROGRESS.md                ✅ (this file)
    CIVIQ_TASKS.md                   ✅
    CIVIQ_FIRST_PROMPTS.md           ✅
    SYSTEM_DESIGN_CIVIQ.md           ✅
    URBAN_NEXUS_SCREEN_INVENTORY.md  ✅
```

---

## Component Library — COMPLETE ✅
```
Component           Status    Notes
──────────────────────────────────────────────────────
Button              ✅ Done   4 variants (primary/secondary/danger/ghost)
                              3 sizes (sm/md/lg), loading spinner
Badge               ✅ Done
Input               ✅ Done
Card                ✅ Done   ProjectCard + StatCard exported
Sidebar             ✅ Done   Admin/Officer/Supervisor nav configs built in
Avatar              ✅ Done   AvatarGroup + AvatarWithName exported
Toast               ✅ Done   ToastContainer + useToast exported
Navbar              ✅ Done   Sign out fully wired (fixed Phase 2)
DashboardLayout     ✅ Done   Dark mode toggle + collapse built in
PlaceholderPage     ✅ Done
```

---

## Phase Progress
```
BLOCK 1 — FRONTEND
─────────────────────────────────────────────────────
Phase 1  Auth + Layouts + mockData + Router     ✅ Complete
Phase 2  Admin Screens Part 1 (3 screens)       ✅ Complete
Phase 3  Admin Screens Part 2 (9 screens)       🔄 In progress
Phase 4  Officer Screens (11 screens)           ⬜ Not started
Phase 5  Supervisor + Citizen (10 screens)      ⬜ Not started

BLOCK 2 — BACKEND
─────────────────────────────────────────────────────
Phase 6  Database Design (documentation)        ⬜ Not started
Phase 7  Auth + Users APIs                      ⬜ Not started
Phase 8  Projects + MCDM Engine                 ⬜ Not started
Phase 9  Clash Detection Engine                 ⬜ Not started
Phase 10 Complaints + Audit + Notifications     ⬜ Not started

BLOCK 3 — CONNECT
─────────────────────────────────────────────────────
Phase 11 Wire frontend to real backend          ⬜ Not started

BLOCK 4 — FINISH
─────────────────────────────────────────────────────
Phase 12 Testing                                ⬜ Not started
Phase 13 Deployment                             ⬜ Not started
```

---

## Screens Status

### Admin (12 screens)
```
Screen                  Status            Route
────────────────────────────────────────────────────────
Dashboard               ✅ Built          /admin/dashboard
Projects List           ✅ Built          /admin/projects
Project Detail          ✅ Built          /admin/projects/:id
Conflicts List          ⬜ Placeholder    /admin/conflicts
Conflict Detail         ⬜ Placeholder    /admin/conflicts/:id
City Map                ⬜ Placeholder    /admin/map
Complaints List         ⬜ Placeholder    /admin/complaints
Complaint Detail        ⬜ Placeholder    /admin/complaints/:id
Audit Log               ⬜ Placeholder    /admin/audit
User Management         ⬜ Placeholder    /admin/users
User Detail             ⬜ Placeholder    /admin/users/:id
Settings                ⬜ Placeholder    /admin/settings
```

### Officer (11 screens)
```
Screen                  Status            Route
────────────────────────────────────────────────────────
Dashboard               ⬜ Placeholder    /officer/dashboard
My Projects List        ⬜ Placeholder    /officer/projects
New Project Form        ⬜ Placeholder    /officer/projects/new
Project Detail          ⬜ Placeholder    /officer/projects/:id
Clash Response          ⬜ Placeholder    /officer/projects/:id/respond
Conflicts List          ⬜ Placeholder    /officer/conflicts
Conflict Detail         ⬜ Placeholder    /officer/conflicts/:id
City Map                ⬜ Placeholder    /officer/map
Complaints List         ⬜ Placeholder    /officer/complaints
Complaint Detail        ⬜ Placeholder    /officer/complaints/:id
Settings                ⬜ Placeholder    /officer/settings
```

### Supervisor (4 screens)
```
Screen                  Status            Route
────────────────────────────────────────────────────────
Dashboard               ⬜ Placeholder    /supervisor/dashboard
My Tasks                ⬜ Placeholder    /supervisor/tasks
Task Detail             ⬜ Placeholder    /supervisor/tasks/:id
Settings                ⬜ Placeholder    /supervisor/settings
```

### Citizen Website (6 pages)
```
Screen                  Status            Route
────────────────────────────────────────────────────────
Home                    ⬜ Placeholder    /home
City Explorer           ⬜ Placeholder    /projects
Project Detail          ⬜ Placeholder    /projects/:id
Report a Problem        ⬜ Placeholder    /report
Track Complaint         ⬜ Placeholder    /track
404 Not Found           ⬜ Placeholder    /*
```

### Shared
```
Login                   ✅ Built          /login
                           Split layout — navy left, white right
                           Credentials working, sign out wired
```

---

## Mock Data Summary (src/data/mockData.js)
```
Users:        5 total
              1 admin       — admin@civiq.in / civiq123
              2 officers    — officer.pwd@civiq.in / civiq123
                              officer.jal@civiq.in / civiq123
              2 supervisors — supervisor.pwd@civiq.in / civiq123
                              supervisor.jal@civiq.in / civiq123

Projects:     8 total
              Mix of: pending / approved / active / rejected
              Departments: PWD, Jal Nigam, PVVNL, Parks
              All Ghaziabad locations, Indian names

Conflicts:    3 total
              1 unresolved, 1 pending_response, 1 resolved

Complaints:   6 total with CNR IDs (CNR-100421 to CNR-100426)
              Mix of: submitted / acknowledged / in_progress / resolved

Audit Logs:   5 entries
Notifications: 4 entries
```

---

## Phase 1 — Decisions and Notes
```
1. Login redesigned in Phase 2 — split layout (navy left, white right)
   Supabase-inspired. CiviqLogo + tagline + stats on left.
   Form on right — email, password, sign in button, help text.

2. Navbar sign out wired in Phase 2
   logout() + navigate('/login') connected correctly

3. CitizenHeader, CitizenFooter, CitizenLayout live in:
   src/pages/citizen/ — NOT src/components/
   Import paths in citizen pages reflect this

4. App.jsx only renders AppRouter — no extra BrowserRouter anywhere
   BrowserRouter lives inside AppRouter.jsx only

5. PlaceholderPage is in src/components/PlaceholderPage.jsx
   All unbuilt pages still import it — do not move or rename

6. All dashboard pages show role-correct sidebar and navbar
   Dark mode toggle works and persists via localStorage
   Role guard works — wrong role URL redirects to own dashboard
```

---

## Phase 2 — Decisions and Notes
```
1. AppRouter updated — AdminLayout, OfficerLayout, SupervisorLayout
   wrapper components added. Each reads user from useAuth() and
   wires onNavigate to React Router navigate(). Active sidebar item
   set per route via activeItem prop.

2. Admin Dashboard — 4-column master grid system
   Stats row: 4 equal columns
   Content: Charts spans cols 1-3, Activity spans col 4 (rows 2+3)
   Clash alerts spans cols 1-3 (row 3)
   All right edges align perfectly — grid principle enforced

3. Admin Projects List — horizontal list cards
   Ward filter removed — replaced with Timeline filter
   (Starting this month / Next 3 months / Overdue)
   Status badge separated from dept+type badges with dividers
   Phased tag near title with tooltip explaining multi-phase meaning
   MCDM score color: green ≥75, amber ≥60, red below 60

4. Admin Project Detail — single scroll, stacked grid layout
   ROW 1: MCDM card (3fr) + Map placeholder (2fr)
   ROW 2: Project details full width (2-col info grid inside)
   ROW 3: Audit trail full width
   No independent column scrolling — one page scroll only
   Approve/Reject — in-memory state only, never writes to mockData.js
   Reject modal — requires reason text before confirming
   Override MCDM — placeholder button (Phase 3 feature)

5. Card visual system established:
   Stat cards: #F8FAFC bg + #5E6AD2 top border (2px)
   Content cards: #FFFFFF bg + border + subtle box-shadow
   Dark mode: all cards fully adapted with correct dark values

6. Design rule added: design discussion mandatory before every screen
   No screen gets built without Arsa approving direction first
```

---

## Phase 3 — What Next Chat Must Do
```
Build remaining 9 Admin screens:

1.  Conflicts List (/admin/conflicts)
    Filter: Status / Department / Severity
    Conflict cards: two project names, two depts, MCDM comparison,
    days since detected, status badge
    Click → /admin/conflicts/:id

2.  Conflict Detail (/admin/conflicts/:id)
    Two project panels side by side (A vs B)
    MCDM score comparison bars
    Map placeholder showing overlap zone
    Timeline panel — both date ranges
    Admin resolution actions:
      Option 1: Approve Both (coordination note)
      Option 2: Reject One (reason + suggested date)
    In-memory state only — never write to mockData.js

3.  City Map (/admin/map)
    Full-area map placeholder (Leaflet in Phase 3 backend)
    Colored legend by project type
    Filter panel: Department / Type / Status
    Project list on side — click highlights on map

4.  Complaints List (/admin/complaints)
    Stats row: Total / Unresolved / Overdue / Resolved this month
    Filter: Department / Status
    Complaint rows: CNR ID, type, location, dept, days filed, status
    Overdue complaints highlighted red

5.  Complaint Detail (/admin/complaints/:id)
    CNR ID + issue type + description + department + date
    Status timeline: Submitted → Acknowledged → In Progress → Resolved
    Map placeholder with pin location
    Admin actions: Send reminder / Add note / Escalate

6.  Audit Log (/admin/audit)
    Filter: User / Action type / Date range
    Log entries: Who / What / Resource / When
    Override actions highlighted differently
    Export CSV button (downloads mockData as CSV)

7.  User Management (/admin/users)
    Filter: Department / Role / Status
    User list: avatar initials, name, role badge, dept, email, status
    Create New User button → modal form
    Toggle active/inactive on mockData state

8.  User Detail (/admin/users/:id)
    Profile section: name, role, dept, email, status
    Projects involved list
    Edit / Deactivate buttons (update local state)

9.  Settings (/admin/settings)
    Profile section: name editable, email display only
    Security: change password form (mock — show success)
    Preferences: dark mode toggle, notification preferences

ALL screens must follow:
  — Design discussion first, code after approval
  — Same grid system and card visual system as Phase 2
  — Same font sizes and spacing established in Phase 2
  — Dark mode fully handled on every element
  — mockData.js never mutated — in-memory state only
  — Single scroll pages — no independent column scrolling
```

---

## Design Decisions — Locked Forever
```
1.  No UI library — pure React + Tailwind
2.  Dark mode: Tailwind class strategy — .dark on document.documentElement
3.  Citizen website: light mode ONLY — never dark, never toggle
4.  Inter font only — no other fonts ever
5.  No gradients anywhere in UI
6.  No card shadows — subtle box-shadow only on content cards
    (0 1px 4px rgba(0,0,0,0.04-0.05)) — not decorative, just depth
7.  No left colored border on project cards
8.  Single accent color: #5E6AD2 throughout — never multiple accents
9.  Stat cards: ALL same top border (#5E6AD2, 2px) — never per-card colors
10. Only Active Clashes stat gets red number — not decorative
11. True gray text (#6B7280 / #9CA3AF) — NOT blue-tinted slate
12. Sidebar bg = Page bg = #F7F7F7 light / #0F0F0F dark (Linear unified)
13. Supabase pill active nav style on sidebar — no left border
14. Dark mode badge colors: deep dark bg + muted text — never saturated
15. Files are .jsx (JavaScript not TypeScript)
16. Tailwind v3 only — never v4
17. mockData.js = single source of truth for all frontend dummy data
18. Central mock data approach — replacing with API calls in Phase 11
    only requires changing one import per screen
19. LOGO_SIZE = 34 — single source of truth for icon and wordmark height
20. Progress bars always #5E6AD2 — never green even at 100%
21. Badge colors muted in dark mode — never bright saturated
22. Content card: white floats on #F7F7F7 page bg (light)
                  #1C1C1F floats on #0F0F0F page bg (dark)
23. Grid system mandatory — all layouts use CSS grid with explicit columns
    No ad-hoc flexbox layouts for page-level structure
24. Single page scroll — no independent column scrolling on any screen
25. MCDM score color: green ≥75, amber ≥60, red <60
26. Status badge always separated from dept+type badges — different visual
    column with dividers — status gets prominence, not mixed with category
27. Ward filter removed from Admin views — replaced with Timeline filter
    Admin thinks in time, not geography at ward level
28. Approve/Reject always in-memory React state — never mutate mockData.js
29. Design discussion mandatory before every screen — no exceptions
    Arsa approves direction before any code is written
30. Login page: light mode only, always — even if dashboard is dark
```

---

## How To Use This File
```
Before each chat:
  Paste this file + CIVIQ_MASTER_CONTEXT.md + that phase task block
  For frontend chats: also paste URBAN_NEXUS_SCREEN_INVENTORY.md
                      and CIVIQ_COLOR_SYSTEM_2.md
  For backend chats:  also paste SYSTEM_DESIGN_CIVIQ.md

After each chat:
  Update phase status from ⬜ to ✅
  Update screen statuses from ⬜ Placeholder to ✅ Built
  Update Current Phase line at top
  Update Last updated date
  Add any new decisions to Design Decisions section
  Add any notes from that phase to a new phase notes block
```