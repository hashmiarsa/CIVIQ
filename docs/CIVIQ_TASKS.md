# CIVIQ_TASKS.md
> One file. All phases. Copy the relevant block into each chat.
> Never paste the entire file — only the current phase block.

---

## PHASE 1 — Frontend: Auth + Layouts

**Your single job this chat:**
Build the Login screen, all 3 dashboard shells, citizen header/footer, AppRouter, AuthContext, and mockData.js with realistic dummy data.

**You are NOT doing:**
Building any actual screen content (dashboard stats, project lists etc). Just the shells, routing, auth, and mock data.

**Files you have access to:**
- All components: Button, Badge, Input, Card, Sidebar, Navbar, DashboardLayout, Avatar, Toast
- frontend/src/router/AppRouter.jsx (empty)
- frontend/src/context/AuthContext.jsx (empty)
- frontend/src/data/mockData.js (empty)
- frontend/src/pages/auth/Login.jsx (empty)
- Color system MD for exact colors
- Screen inventory MD for shell structure

**Your tasks:**

Task 1 — Fill mockData.js
  Create realistic dummy data for all roles:
  - 1 admin user, 2 officers, 2 supervisors
  - 8 projects (mix of pending/approved/active/rejected)
  - 3 conflicts
  - 6 complaints with CNR IDs
  - 5 audit log entries
  - 4 notifications
  Make data feel real — Ghaziabad locations, Indian names, real department names

Task 2 — AuthContext.jsx
  - Store current user (role, name, department)
  - login() function — checks against mockData users, stores in localStorage
  - logout() function
  - useAuth() hook to access context anywhere

Task 3 — Login Page (/login)
  - CIVIQ logo + wordmark
  - Email input
  - Password input
  - Login button with spinner state
  - Error message if wrong credentials
  - After login: redirect based on role
    Admin → /admin/dashboard
    Officer → /officer/dashboard
    Supervisor → /supervisor/dashboard
  - No sign up link (Admin creates accounts)
  - Light mode only

Task 4 — AppRouter.jsx
  - React Router DOM setup
  - Protected routes (redirect to /login if not logged in)
  - Role-based routing (admin can't access /officer routes)
  - All 33 routes defined even if pages are empty placeholders
  - Default redirect: / → /login

Task 5 — Admin Dashboard Shell
  - DashboardLayout with Admin sidebar links:
    Dashboard / Projects / Conflicts / City Map /
    Complaints / Audit Log / User Management / Settings
  - Navbar: notification bell + dark mode toggle + avatar dropdown
  - Admin name and role at sidebar bottom
  - Dark mode working via Tailwind class strategy

Task 6 — Officer Dashboard Shell
  - DashboardLayout with Officer sidebar links:
    Dashboard / My Projects / Conflicts / City Map /
    Complaints / Settings
  - Same navbar as admin
  - Officer name, department, role at sidebar bottom

Task 7 — Supervisor Dashboard Shell
  - DashboardLayout with Supervisor sidebar links:
    Dashboard / My Tasks / Settings
  - Same navbar
  - Supervisor name, department, role at sidebar bottom

Task 8 — Citizen Header + Footer
  - Header: CIVIQ logo + nav links (Home / Projects / Report / Track)
  - City name: Ghaziabad Municipal Corporation
  - Footer: logo + links + copyright
  - Light mode only, never dark

**Done means:**
- Login works with mock credentials (admin@civiq.in / civiq123)
- Role-based redirect works after login
- All 3 dashboard shells render with correct sidebar links
- Dark mode toggle works on dashboard
- Citizen header and footer render correctly
- All 33 routes exist in AppRouter (even if pages show placeholder text)

**After this chat:**
Update CIVIQ_PROGRESS.md — mark Phase 1 complete

---

## PHASE 2 — Frontend: Admin Screens Part 1

**Your single job this chat:**
Build Admin Dashboard, Projects List, and Project Detail screens with mock data.

**You are NOT doing:**
Conflicts, Map, Complaints, Audit, Users screens. Those are Phase 3.

**Files you have access to:**
- All components + completed shells from Phase 1
- mockData.js with all dummy data
- Screen inventory MD for exact content of each screen
- Color system MD for styling

**Your tasks:**

Task 1 — Admin Dashboard (/admin/dashboard)
  Stats cards row:
    Total Projects / Active Clashes / Pending Approvals / Citizen Complaints
  Charts section:
    Projects by Department (bar chart — use simple CSS bars, no chart library)
    Department Performance (completion rates)
  Clash Alerts section:
    List of unresolved clashes from mockData
    Each: two department names, severity, days pending
    Click → navigate to /admin/conflicts/:id
  Recent Activity Feed:
    Last 10 actions from mockData auditLogs
  Seasonal Warning:
    If any road project in monsoon months → show warning banner

Task 2 — Projects List (/admin/projects)
  Search bar (filter mockData by title)
  Filter bar: Department / Type / Status / Ward
  Project cards showing:
    Name / Department badge / Type badge / Status badge /
    Start+end dates / MCDM score / Clash indicator
  Click card → /admin/projects/:id
  All filters work on mockData (no API)

Task 3 — Project Detail (/admin/projects/:id)
  Two column layout:
    Left: all project info (title, dept, type, dates, cost, contractor, supervisor)
    Right: location map placeholder (grey box with ward label — Leaflet comes in backend phase)
  MCDM Score section:
    Overall score shown as number
    Progress bar for each of 7 criteria with label and score
  Clash Alert banner if project has clash
  Audit trail for this project
  Admin Action Bar:
    Approve button → updates mockData status to approved
    Reject button → opens reason input modal → updates mockData
    (Override MCDM button → placeholder for now)

**Done means:**
- Dashboard loads with real mock data in every section
- Projects list filters work correctly
- Project detail shows all sections
- Approve/Reject updates status in mock data and reflects on screen
- Navigation between all 3 screens works

**After this chat:**
Update CIVIQ_PROGRESS.md — mark Phase 2 complete

---

## PHASE 3 — Frontend: Admin Screens Part 2

**Your single job this chat:**
Build remaining 9 Admin screens: Conflicts, Map, Complaints, Audit Log, User Management.

**You are NOT doing:**
Any Officer, Supervisor, or Citizen screens.

**Files you have access to:**
- All components + shells + Phase 1 and 2 screens
- mockData.js
- Screen inventory MD
- Color system MD

**Your tasks:**

Task 1 — Conflicts List (/admin/conflicts)
  Filter bar: Status / Department / Severity
  Conflict cards:
    Two project names / Two departments / Overlap description /
    MCDM score comparison / Days since detected / Status badge
  Click → /admin/conflicts/:id

Task 2 — Conflict Detail (/admin/conflicts/:id)
  Two project panels side by side (Project A vs Project B)
  MCDM score bars for both side by side
  System recommendation highlighted
  Map panel: placeholder box showing overlap zone label
  Timeline panel: both date ranges shown visually
  Resolution History if previously looped
  Admin Resolution Actions:
    Option 1 — Approve Both: coordination note input + confirm
    Option 2 — Reject One: rejection reason + confirm
    Actions update mockData conflict status

Task 3 — City Map (/admin/map)
  Use Leaflet.js (install: npm install leaflet react-leaflet)
  Show all projects as colored markers/polygons from mockData
  Color by type: Road=Orange, Water=Blue, Electricity=Yellow,
                 Sewage=Purple, Parks=Green, Other=Grey
  Clash zones: overlapping projects highlighted red
  Filter panel: Department / Type / Status / Ward
  Click marker → side drawer with quick project info + link to detail

Task 4 — Complaints Monitor (/admin/complaints)
  Stats row: Total / Unresolved / Overdue / Resolved this month
  Filter bar: Department / Status / Ward
  Complaints list with CNR ID, type, location, dept, days filed, status
  Overdue complaints highlighted red
  Click → /admin/complaints/:id

Task 5 — Complaint Detail (/admin/complaints/:id)
  Two column layout:
    Left: CNR ID, issue type, description, department, date, photos placeholder
    Right: map with pin at complaint location (Leaflet)
  Status timeline: Submitted → Acknowledged → In Progress → Resolved
  Admin actions: Send reminder button / Add note button / Escalate button

Task 6 — Audit Log (/admin/audit)
  Filter bar: User / Department / Action type / Date range
  Log entries: Who / What / Which resource / When / Department
  Override actions highlighted orange
  Export CSV button (just download mockData as CSV)

Task 7 — User Management (/admin/users)
  Create New User button → opens modal form
  Filter: Department / Role / Status
  Users list: Avatar, name, role badge, department, email, last active, status
  Create User Modal: Name / Email / Role / Department / Temp password
  Toggle active/inactive on mockData

Task 8 — User Detail (/admin/users/:id)
  Profile section with all details
  Projects involved list
  Activity summary
  Edit / Deactivate / Reset password buttons (update mockData)

Task 9 — Admin Settings (/admin/settings)
  Profile section: avatar placeholder, name editable, email display
  Security: change password form (mock — just show success toast)
  Preferences: dark mode toggle, notification preferences

**Done means:**
- All 9 screens render with mock data
- Conflict resolution updates mockData
- Leaflet map shows colored project markers
- User management CRUD works on mockData
- All admin navigation complete — 12 screens total done

**After this chat:**
Update CIVIQ_PROGRESS.md — mark Phase 3 complete

---

## PHASE 4 — Frontend: Officer Screens

**Your single job this chat:**
Build all 10 Officer screens including the full project submission form.

**You are NOT doing:**
Supervisor or Citizen screens.

**Files you have access to:**
- All components + shells
- mockData.js
- Screen inventory MD — read Officer section carefully
- Product definition MD — read Section 10-12 for form detail
- Color system MD

**Your tasks:**

Task 1 — Officer Dashboard (/officer/dashboard)
  Stats: My Projects / Pending Approval / Active Clashes / Dept Complaints
  Recent 5 projects with status badges
  Clash alerts for department projects
  Overdue complaint alerts

Task 2 — Officer Projects List (/officer/projects)
  New Project button → /officer/projects/new
  Filter: Type / Status / Date range
  Only shows current officer's projects from mockData

Task 3 — Project Submission Form (/officer/projects/new)
  This is the most complex screen. Build it carefully.
  
  Progress indicator showing all 7 sections at top
  
  Section 0: Phase selection
    Standalone / New phased / Continue existing
  
  Section 1: Basic Identity
    Title / Type dropdown / Description
  
  Section 2: Location (split screen always)
    Left side: form fields
    Right side: Leaflet map (interactive)
    Work area type: Along a road OR Specific location
    Three input buttons: Type address / Click map / Use GPS
    Shape selector: Circle / Corridor / Rectangle / Custom
    Auto-detection panel (mock — show fake detected ward/zone/address)
    Live clash preview (check mockData for overlapping projects)
  
  Section 3: Timeline
    Start date / End date / Duration auto-calculated
  
  Section 4: Budget
    Cost / Budget source / Tender number / Contractor name + firm
  
  Section 5: MCDM inputs (8 questions — all from Product Definition MD)
    Q1: Infrastructure condition (radio)
    Q2: Incidents (checkboxes)
    Q3: Last work year (number input)
    Q4: Tender status (radio)
    Q5: Contractor assigned (radio)
    Q6: Road closure (radio)
    Q7: Utility disruption (checkboxes)
    Q8: Disruption days (number)
  
  Section 6: Team
    Supervisor dropdown (only officer's dept supervisors from mockData)
  
  Section 7: Documents
    PDF upload area (required) — just store filename in mockData
    Photos upload (optional)
  
  On submit:
    Calculate mock MCDM score (use the formula from Product Definition)
    Add to mockData projects
    Show success: score + clash preview
    Redirect to /officer/projects/:id

Task 4 — Officer Project Detail (/officer/projects/:id)
  Same layout as Admin Project Detail BUT:
    No Approve/Reject buttons
    Has Assign Supervisor button (dropdown, own dept only)
    Has Edit button if status is pending
    Clash alert with link
    Suggested date shown if rejected → link to respond view

Task 5 — Clash Response (/officer/projects/:id/respond)
  Rejection summary (which project, why, which took priority)
  Suggested date panel with Accept button
  Custom date picker (minimum = suggested date, enforced)
  After picking: show mock clash recheck result

Task 6 — Officer Conflict Detail (/officer/conflicts/:id)
  View only version of Admin Conflict Detail
  No resolution buttons
  Can see MCDM comparison and map

Task 7 — Officer City Map (/officer/map)
  Same Leaflet map as Admin
  Read only — no admin actions
  Shows all approved/active projects

Task 8 — Officer Complaints List (/officer/complaints)
  Department's complaints only from mockData
  Update status button per complaint

Task 9 — Officer Complaint Detail (/officer/complaints/:id)
  Same layout as Admin complaint detail BUT:
    Officer can update status
    Officer adds resolution note
    No escalate/reminder buttons

Task 10 — Officer Settings (/officer/settings)
  Same as Admin settings

**Done means:**
- All 10 Officer screens built
- Project submission form all 7 sections work
- MCDM score calculated on submit
- Clash response flow works with date enforcement
- All officer navigation complete

**After this chat:**
Update CIVIQ_PROGRESS.md — mark Phase 4 complete

---

## PHASE 5 — Frontend: Supervisor + Citizen

**Your single job this chat:**
Build all 4 Supervisor screens and all 6 Citizen pages.

**You are NOT doing:**
Any changes to Admin or Officer screens.

**Files you have access to:**
- All components + shells
- mockData.js
- Screen inventory MD — read Supervisor and Citizen sections
- Color system MD

**SUPERVISOR TASKS:**

Task 1 — Supervisor Dashboard (/supervisor/dashboard)
  Stats: Total assigned / In progress / Completed / Upcoming deadlines
  3 most urgent task cards with progress bars and deadlines
  Deadline alerts: projects ending within 7 days highlighted

Task 2 — Tasks List (/supervisor/tasks)
  Filter: Status / Date range
  Task cards: name, dept, dates, progress bar, status, days remaining
  Only shows projects assigned to this supervisor from mockData

Task 3 — Task Detail (/supervisor/tasks/:id)
  Project info: title, dept, type, dates, description
  Location map: Leaflet map read only with project marker
  Progress Update:
    Current percentage shown
    Slider or number input to update (0-100)
    Save button → updates mockData
    Progress history log (who updated, what %, when)
  Documents section: PDF download link
  Assigned by: officer name

Task 4 — Supervisor Settings (/supervisor/settings)
  Own profile / change password / dark mode toggle

**CITIZEN TASKS:**

Task 5 — Home / Landing Page (/)
  Hero section: headline + subheadline
  Three action cards:
    Explore Projects → /projects
    Report a Problem → /report
    Track Your Complaint → /track
  Clean, light mode only, no dark mode ever
  Citizen header and footer from Phase 1

Task 6 — City Explorer (/projects)
  Search bar with autocomplete (filter mockData)
  Split screen:
    Left: project cards list (approved/active only)
    Right: Leaflet map with colored markers
  Filter: type / status / department
  Click card or marker → /projects/:id

Task 7 — Citizen Project Detail (/projects/:id)
  Project header: name, dept, type, status
  Dates and description
  Disruption warnings if applicable
  Location map read only
  NO cost, MCDM score, or internal data shown
  Back button → /projects

Task 8 — File Complaint (/report)
  Step 1: Select department
  Step 2: Select issue type
  Step 3: Location (split screen, Leaflet map + address input + GPS button)
  Step 4: Description text area
  Step 5: Photo upload (optional)
  Submit → generate mock CNR ID → show success screen
    CNR displayed prominently
    Copy to clipboard button
    Go to Track page button

Task 9 — Track Complaint (/track)
  CNR input field + Track button
  After valid CNR from mockData:
    Complaint summary
    Status timeline: Submitted → Acknowledged → In Progress → Resolved
    Location map with pin
    Resolution note if resolved

Task 10 — 404 Page (*)
  Friendly message
  Back to Home button
  Report a Problem button

**Done means:**
- All 4 Supervisor screens work with mock data
- Progress update saves to mockData and reflects immediately
- All 6 Citizen pages render correctly
- Complaint submission generates CNR and shows success
- Complaint tracking works with mockData CNR IDs
- Citizen pages are light mode only — dark mode toggle never appears
- Full frontend complete — all 33 screens done

**After this chat:**
Update CIVIQ_PROGRESS.md — mark Phase 5 complete
Frontend phase DONE. Ready for backend.

---

## PHASE 6 — Database Design

**Your single job this chat:**
Design every MongoDB collection and schema completely on paper.
Zero code. Pure thinking and documentation.

**You are NOT doing:**
Writing any actual code. No models, no routes, nothing.

**Files you have access to:**
- Master context MD
- Product definition MD (read sections 10-13 carefully)
- Progress MD

**Your tasks:**

Task 1 — Design Users collection
  Every field, type, required/optional, default values
  Indexes needed
  Relationships to other collections

Task 2 — Design Projects collection
  Every field including all MCDM input fields
  Location subdocument with all coordinate fields
  Status enum values
  Relationships: officer ref, supervisor ref, conflicts ref

Task 3 — Design Conflicts collection
  Both project references
  Admin resolution subdocument
  Officer response subdocument
  Status flow enum

Task 4 — Design Complaints collection
  CNR ID auto-generation logic
  Location subdocument
  Status enum and flow

Task 5 — Design AuditLog collection
  Every action type that gets logged
  What data gets stored per action type

Task 6 — Design Notifications collection
  Recipient reference
  All notification types that exist in the system

Task 7 — Design Static Config
  Not a collection — stored as JS config file
  Buffer values / conflict matrix / seasonal calendar / lifecycle values
  (Already exists in backend/src/config/staticConfig.js — verify it matches product definition)

Task 8 — Document all indexes
  Which fields need indexes for performance
  Which fields need unique indexes
  Which fields need compound indexes

Task 9 — Document all relationships
  Draw the relationship map in text format
  User → Projects (one to many)
  Project → Conflicts (many to many)
  etc.

**Done means:**
  A complete CIVIQ_DATABASE_DESIGN.md file created
  Every collection fully documented
  All field types, constraints, indexes written
  Relationships clearly mapped

**After this chat:**
  Save CIVIQ_DATABASE_DESIGN.md to your docs folder
  Update CIVIQ_PROGRESS.md — mark Phase 6 complete

---

## PHASE 7 — Backend Part 1: Auth + Users

**Your single job this chat:**
Build working auth system and user management APIs.
Test every route in Postman before finishing.

**You are NOT doing:**
Projects, conflicts, complaints routes. Those are later phases.

**Files you have access to:**
- Master context MD
- Progress MD
- Database design MD
- Existing files: backend/src/models/User.js, auth.js middleware,
  authController.js, usersController.js, auth routes, users routes

**Your tasks:**

Task 1 — Verify User model
  Check User.js matches database design MD exactly
  Fix any missing fields

Task 2 — Verify auth middleware
  protect middleware — JWT verification
  authorize middleware — role checking
  Test both work correctly

Task 3 — Auth routes working
  POST /api/auth/login → returns token + user object
  GET  /api/auth/me    → returns current user (protected)

Task 4 — Users routes working (admin only)
  GET    /api/users         → all users list
  POST   /api/users         → create new user
  PUT    /api/users/:id     → update user
  PUT    /api/users/:id/toggle → activate/deactivate

Task 5 — Run seed file
  cd backend && npm install
  npm run seed
  Verify 5 users created in MongoDB

Task 6 — Postman testing (test every route)
  Login with admin@civiq.in / civiq123 → get token
  Use token in all subsequent requests
  Test GET /api/auth/me → correct user returned
  Test GET /api/users → all users returned
  Test POST /api/users → new user created
  Test wrong role → 403 returned
  Test no token → 401 returned

**Done means:**
  All auth routes return correct responses
  Role protection works (403 for wrong role)
  Token required protection works (401 for no token)
  Seed data exists in MongoDB
  All routes tested in Postman

**After this chat:**
Update CIVIQ_PROGRESS.md — mark Phase 7 complete

---

## PHASE 8 — Backend Part 2: Projects + MCDM

**Your single job this chat:**
Build project submission API with auto MCDM scoring working end to end.

**You are NOT doing:**
Clash detection (Phase 9). Complaints, audit (Phase 10).

**Files you have access to:**
- Master context MD
- Product definition MD (sections 11 for MCDM detail)
- Progress MD + Database design MD
- Existing: Project model, projectsController, projects routes,
  mcdmEngine.js, staticConfig.js

**Your tasks:**

Task 1 — Verify Project model
  Check all fields match database design
  Add any missing fields

Task 2 — Verify MCDM engine (mcdmEngine.js)
  All 7 criteria calculating correctly
  Weights match: 26/21/16/16/10/8/3
  Test with the example from Product Definition MD:
    Vijay Nagar Road — expected score ~82.7

Task 3 — Projects routes working
  GET  /api/projects     → filtered by role automatically
                           Admin: all projects
                           Officer: own department only
                           Supervisor: assigned projects only
  GET  /api/projects/:id → single project with populated refs
  POST /api/projects     → officer only, auto MCDM calculation
  PUT  /api/projects/:id → update project
  PUT  /api/projects/:id/approve → admin only
  PUT  /api/projects/:id/reject  → admin only, with suggested date
  PUT  /api/projects/:id/progress → supervisor only

Task 4 — Postman testing
  Submit a project as officer → verify MCDM score returned
  Approve as admin → verify status changes
  Reject as admin → verify suggested date returned
  Try submitting as admin → verify 403
  Update progress as supervisor → verify percentage saves

**Done means:**
  Project submission works end to end
  MCDM score calculated correctly on every submission
  Role filtering works on GET /api/projects
  Approve/reject/progress updates work
  All tested in Postman

**After this chat:**
Update CIVIQ_PROGRESS.md — mark Phase 8 complete

---

## PHASE 9 — Backend Part 3: Clash Detection

**Your single job this chat:**
Build the clash detection engine and conflict resolution APIs.

**You are NOT doing:**
Complaints, notifications, audit (Phase 10).

**Files you have access to:**
- Master context MD
- Product definition MD (sections 8 and 13 — clash detection detail)
- Progress MD + Database design MD
- Existing: Conflict model, conflictsController, conflicts routes,
  clashDetection.js service

**Your tasks:**

Task 1 — Verify Conflict model
  All fields match database design
  Both project refs, admin resolution subdoc, officer response subdoc

Task 2 — Verify clash detection engine (clashDetection.js)
  4-step process implemented correctly:
    Step 1: Same ward check
    Step 2: Geographic buffer overlap (haversine distance)
    Step 3: Time overlap check
    Step 4: Work type conflict matrix check
  Buffer calculation formula matches product definition exactly
  getSuggestedStartDate formula correct (end date + buffer days)

Task 3 — Integrate clash detection into project submission
  When POST /api/projects runs:
    After MCDM calculation
    Run clash detection against all existing projects
    If clashes found → create Conflict documents
    Update project.hasClash = true
    Return clash count in response

Task 4 — Conflicts routes working
  GET /api/conflicts              → all conflicts (admin sees all, officer sees own dept)
  PUT /api/conflicts/:id/resolve  → admin only, approve both OR reject lower
  PUT /api/conflicts/:id/respond  → officer only, accept or custom date
                                    Custom date validation: must be >= suggested date
                                    After response: recheck clashes with new date

Task 5 — Postman testing
  Submit two clashing projects → verify conflict created automatically
  Resolve as admin (reject lower) → verify suggested date calculated
  Respond as officer (custom date too early) → verify 400 error returned
  Respond as officer (valid date) → verify recheck runs

**Done means:**
  Clash detection runs automatically on every project submission
  Conflict documents created correctly
  Resolution flow works end to end
  Date validation enforced (cannot pick earlier than suggested)
  All tested in Postman

**After this chat:**
Update CIVIQ_PROGRESS.md — mark Phase 9 complete

---

## PHASE 10 — Backend Part 4: Complaints + Audit

**Your single job this chat:**
Build complaints system, audit logging middleware, and notifications.

**You are NOT doing:**
Any frontend changes. No touching projects or conflicts routes.

**Files you have access to:**
- Master context MD
- Progress MD + Database design MD
- Existing: Complaint model, AuditLog model, Notification model,
  all controllers and routes for these, notificationService.js

**Your tasks:**

Task 1 — Complaints routes working
  GET  /api/complaints     → admin sees all, officer sees own dept
  GET  /api/complaints/:id → also works with CNR ID (not just MongoDB _id)
  POST /api/complaints     → public route, no auth needed, auto-generates CNR
  PUT  /api/complaints/:id → officer only, update status + resolution note

Task 2 — CNR ID generation
  Format: CNR-XXXXXX (6 digits)
  Auto-generated on creation
  Must be unique
  Verify tracking by CNR ID works (citizen track complaint flow)

Task 3 — Audit logging middleware
  Create middleware that auto-logs every important action:
    project created / approved / rejected
    conflict resolved
    complaint status updated
    user created / deactivated
    MCDM override used
  Attach to all relevant routes
  isOverride flag set correctly for override actions

Task 4 — Notifications routes working
  GET /api/notifications       → own notifications only
  PUT /api/notifications/read-all → mark all as read

Task 5 — Notification triggers working
  Clash detected → notify officer
  Project approved → notify officer
  Project rejected → notify officer with suggested date
  Early completion → notify next project officer

Task 6 — Postman testing
  Submit complaint without auth → verify CNR returned
  Track by CNR ID → verify complaint found
  Update status as officer → verify audit log created
  Check notifications after project approval → verify notification exists

**Done means:**
  Complaint submission and tracking by CNR works
  Audit log captures every important action automatically
  Notifications created on all trigger events
  Full backend complete — all APIs working

**After this chat:**
Update CIVIQ_PROGRESS.md — mark Phase 10 complete
Backend phase DONE. Ready for connect phase.

---

## PHASE 11 — Connect Frontend to Backend

**Your single job this chat:**
Replace all mockData imports with real API calls. Make the full app work end to end.

**You are NOT doing:**
Building new screens. Only replacing mock data with real API calls.

**Files you have access to:**
- Master context MD
- Progress MD
- frontend/src/services/ files (api.js, auth.js, projects.js etc)
- All screen files

**Your tasks:**

Task 1 — Setup axios base (frontend/src/services/api.js)
  Base URL from VITE_API_URL env variable
  JWT token attached automatically to every request
  401 response → auto redirect to login
  Error handling

Task 2 — Auth service (frontend/src/services/auth.js)
  login() → POST /api/auth/login
  logout() → clear token
  getMe() → GET /api/auth/me
  Update AuthContext to use real API instead of mockData

Task 3 — Projects service (frontend/src/services/projects.js)
  All CRUD functions hitting real API
  Replace all mockData.projects references across all screens

Task 4 — Conflicts service (frontend/src/services/conflicts.js)
  All conflict functions hitting real API
  Replace all mockData.conflicts references

Task 5 — Complaints service (frontend/src/services/complaints.js)
  All complaint functions hitting real API
  Replace all mockData.complaints references

Task 6 — Users and notifications
  Wire up user management screens to real API
  Wire up notification bell to real API

Task 7 — End to end testing
  Login → works with real MongoDB user
  Submit project → MCDM score returned from real engine
  Two clashing projects → conflict appears automatically
  Citizen complaint → real CNR generated
  Track complaint → real status shown

**Done means:**
  Zero mockData references left in any screen
  Full app works end to end with real backend
  All roles work correctly with real auth

**After this chat:**
Update CIVIQ_PROGRESS.md — mark Phase 11 complete

---

## PHASE 12 — Testing

**Your single job this chat:**
Test every critical flow in the complete application.

**Your tasks:**

Task 1 — Auth testing
  Correct login → correct dashboard
  Wrong password → error shown
  Wrong role URL → redirected
  Token expiry → redirected to login

Task 2 — MCDM testing
  Submit project → verify score matches manual calculation
  Different inputs → verify score changes correctly
  Monsoon season project → verify low seasonal score

Task 3 — Clash detection testing
  Two road projects same ward same dates → clash raised
  Two compatible projects (water + parks) → no clash
  Different wards → no clash
  Different dates → no clash

Task 4 — Conflict resolution testing
  Admin rejects lower → officer notified
  Officer picks date too early → blocked
  Officer picks valid date → recheck runs
  Clean date → admin can approve

Task 5 — Role access testing
  Officer cannot access /admin routes → 403
  Supervisor cannot submit projects → 403
  Citizen cannot see pending projects → not shown

Task 6 — Citizen flow testing
  Complaint submission → CNR generated
  Track by CNR → status shown correctly
  Public map → only approved/active projects visible

**Done means:**
  All 6 test areas pass
  No broken routes or screens
  Role protection verified

**After this chat:**
Update CIVIQ_PROGRESS.md — mark Phase 12 complete

---

## PHASE 13 — Deployment

**Your single job this chat:**
Deploy the complete CIVIQ application live on the internet before defense.

**Files you have access to:**
- Master context MD
- Progress MD
- Full codebase

**Your tasks:**

Task 1 — MongoDB Atlas setup
  Create free cluster on mongodb.com/atlas
  Create database user with password
  Whitelist all IPs (0.0.0.0/0)
  Get connection string → update backend .env MONGO_URI

Task 2 — Deploy backend on Render
  Go to render.com → New Web Service
  Connect GitHub repo
  Root directory: backend
  Build command: npm install
  Start command: npm start
  Add environment variables:
    MONGO_URI → Atlas connection string
    JWT_SECRET → strong secret key
    JWT_EXPIRES_IN → 7d
    NODE_ENV → production
  Deploy → get live backend URL

Task 3 — Run seed on production
  After backend deploys successfully
  Temporarily add seed route or run via Render shell
  Verify demo users exist in Atlas

Task 4 — Deploy frontend on Vercel
  Go to vercel.com → New Project
  Connect GitHub repo
  Root directory: frontend
  Build command: npm run build
  Add environment variable:
    VITE_API_URL → your Render backend URL + /api
  Deploy → get live frontend URL

Task 5 — End to end live testing
  Open live Vercel URL
  Login as admin@civiq.in / civiq123
  Submit a project → verify MCDM works live
  Check all roles work

Task 6 — Note all URLs
  Frontend: https://civiq.vercel.app (or similar)
  Backend:  https://civiq-backend.onrender.com (or similar)
  Save both in README.md

**Done means:**
  Both frontend and backend live on internet
  Demo login works on live URL
  CIVIQ is ready for defense presentation

**After this chat:**
Update CIVIQ_PROGRESS.md — mark Phase 13 complete
CIVIQ is complete.
