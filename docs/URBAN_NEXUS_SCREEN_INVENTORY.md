# Urban Nexus — Complete Screen Inventory
> Every screen for every user. Locked and final.
> This is what gets designed in Figma. Exactly these screens. Nothing more, nothing less.

---

## Architecture Decision — Two Separate Experiences

```
AUTHENTICATED USERS (Admin, Officer, Supervisor):
→ SPA Dashboard
→ Single shell loads once after login
→ Sidebar always visible on left
→ Navbar always visible on top
→ Only content area changes dynamically
→ No page reloads ever
→ Framer Motion handles transitions
→ React Router manages URLs
→ Professional dashboard feel

CITIZENS (Public):
→ Multi page public website
→ Header and footer on every page
→ No login required
→ No sidebar, no dashboard shell
→ Clean, open, accessible feel
→ Mobile friendly
→ Each page has its own shareable URL
→ Subtle progress bar loader on page load
→ Logo fades in on landing page
```

---

## Loading States

```
WEBSITE:
Subtle progress bar at top when page loads
Logo fades in smoothly on landing page
No separate full splash screen

DASHBOARD:
Login button shows spinner while authenticating
Content area shows skeleton loaders while data fetches
No separate loading screen
Fast and dynamic always
```

---

## SHARED — 1 Screen

### Login Page
```
URL: /login
Who sees it: Admin, Officer, Supervisor
Citizen never sees this page

Content:
  Urban Nexus logo
  Email input
  Password input
  Login button (shows spinner while authenticating)
  Forgot password link

After login:
  Admin     → Admin Dashboard
  Officer   → Officer Dashboard
  Supervisor→ Supervisor Dashboard

Loading state:
  Button spinner while API call runs
  Error message if credentials wrong
```

---

## ADMIN — 12 Views

All views render inside the dashboard shell.
Shell contains: Sidebar (left) + Navbar (top) + Content area.
Only content area changes between views.

### Navbar contains:
```
Notification bell with unread count dropdown
Dark mode toggle
Admin avatar with profile/logout dropdown
```

### Sidebar contains:
```
Urban Nexus logo
Navigation links:
  Dashboard
  Projects
  Conflicts
  City Map
  Complaints
  Audit Log
  User Management
  Settings
Admin name and role at bottom
Logout button
```

---

### 1. Dashboard
```
URL: /dashboard
Single job: Morning overview — see everything important at a glance

Content:
  Stats cards row:
    Total Projects (all departments)
    Active Clashes (needing resolution)
    Pending Approvals (waiting for Admin)
    Citizen Complaints (total unresolved)

  Charts section:
    Projects by Department (bar chart)
    Department Performance — on time completion rates

  Clash Alerts section:
    List of unresolved clashes
    Each shows: two department names, severity, days pending
    Click → goes to Conflict Detail

  Complaint Summary:
    Departments with overdue complaints highlighted
    Quick reminder button per department

  Recent Activity Feed:
    Last 10 actions across the system
    Who did what and when

  Seasonal Warnings:
    If any road project submitted in monsoon season
    System flags it here
```

---

### 2. Projects List
```
URL: /projects
Single job: Browse and find any project across all departments

Content:
  Search bar
  Filter bar:
    Department / Type / Status / Ward / Date range
  Project cards grid or list toggle
  Each card shows:
    Project name
    Department badge
    Type badge
    Status badge
    Start and end dates
    MCDM score
    Clash indicator if clashed
  Click card → Project Detail
  Pagination or infinite scroll
```

---

### 3. Project Detail
```
URL: /projects/:id
Single job: Review one project completely and take approval action

Content:
  Project header:
    Title, department, type, status badge
    Phase label if phased project
    Link to parent project if Phase 2 or later

  Two column layout:
    Left — Project Information:
      Description
      Submitted by officer name
      Submission date
      Start and end dates
      Estimated cost
      Budget source
      Contractor name and firm
      Assigned supervisor

    Right — Location Map:
      Project polygon on map
      Read only
      Ward and zone labels
      Nearby facilities marked

  MCDM Score Section:
    Overall score: 82.7 / 100
    Breakdown bar for each criteria:
      Condition Severity
      Population and Facility Impact
      Seasonal Compatibility
      Execution Readiness
      Citizen Disruption
      Infrastructure Age
      Economic Value

  Clash Alert (if exists):
    Warning banner
    Which project it clashes with
    Click → Conflict Detail

  Audit Trail:
    All actions taken on this project
    Who approved, rejected, commented

  Admin Action Bar:
    Approve button (green)
    Reject button (red) — opens reason input
    Override MCDM button — opens 4 category selector
```

---

### 4. Conflicts List
```
URL: /conflicts
Single job: See all detected clashes and their resolution status

Content:
  Filter bar:
    Status (unresolved / resolved / pending response)
    Department
    Severity
  Conflict cards:
    Each shows:
      Two project names
      Two department names
      Overlap area description
      Date overlap period
      MCDM score comparison (quick view)
      Days since detected
      Current status badge
  Click card → Conflict Detail
```

---

### 5. Conflict Detail
```
URL: /conflicts/:id
Single job: Resolve one clash between two projects

Content:
  Two project panels side by side:
    Left: Project A (higher MCDM score)
    Right: Project B (lower MCDM score)
    Each shows: name, dept, type, dates, MCDM score

  MCDM Comparison:
    Score bars for both projects side by side
    System recommendation highlighted:
    "System recommends: Approve Project A,
     Reject Project B — suggested date: 15 April"

  Map Panel:
    Both project polygons on map
    Overlap zone highlighted in red
    Ward and location labels

  Timeline Panel:
    Both project date ranges on timeline
    Overlap period highlighted

  Resolution History:
    If this clash has been through the loop before
    Shows previous rejection and response dates

  Admin Resolution Actions:
    OPTION 1: Approve Both
      Coordination note input (required)
      Adjusted date for lower priority project
      Confirm button

    OPTION 2: Reject One
      System suggested date shown
      Rejection reason input (required)
      Confirm button

    Override MCDM:
      4 category dropdown
      Reference number input
      Written reason (min 100 chars)
      Acknowledgment checkbox
```

---

### 6. City Map
```
URL: /map
Single job: See all projects geographically across the city

Content:
  Full screen Leaflet map
  All projects as colored polygons:
    Road: Orange
    Water: Blue
    Electricity: Yellow
    Sewage: Purple
    Parks: Green
    Other: Grey

  Clash zones:
    Overlapping projects highlighted red
    Pulsing animation on active clashes

  Filter panel (collapsible):
    Department
    Project type
    Status
    Ward

  Click polygon:
    Side drawer opens
    Quick project info
    Link to Project Detail
    Link to Conflict Detail if clashed

  Legend panel:
    Color guide
    Status guide
```

---

### 7. Complaints Monitor
```
URL: /complaints
Single job: Monitor all citizen complaints across departments

Content:
  Stats row:
    Total complaints
    Unresolved count
    Overdue count (red)
    Resolved this month

  Filter bar:
    Department / Status / Ward / Date range

  Complaints list:
    Each row shows:
      CNR ID
      Issue type
      Location (ward and road)
      Department assigned
      Date filed
      Days since filed
      Status badge
    Overdue complaints highlighted in red
    Send reminder button per row

  Click row → Complaint Detail
```

---

### 8. Complaint Detail
```
URL: /complaints/:id
Single job: See full complaint detail and send reminder if needed

Content:
  Two column layout:
    Left — Complaint Information:
      CNR tracking ID
      Issue type
      Description by citizen
      Department assigned
      Date and time filed
      Photos uploaded by citizen
      Officer who acknowledged
      Resolution note when resolved

    Right — Location Map:
      Pin at exact complaint location
      Nearby projects in that area
      Ward name and zone
      Address

  Status Timeline:
    ● Submitted    — date and time
    ● Acknowledged — date and time
    ○ In Progress
    ○ Resolved

  Admin Actions:
    Send reminder to department button
    Add internal note button
    Escalate to high priority button
```

---

### 9. Audit Log
```
URL: /audit
Single job: Complete history of every action in the system

Content:
  Filter bar:
    User / Department / Action type / Date range

  Log entries list:
    Each entry shows:
      Who (user name and role)
      What (action description)
      Which resource (project name or complaint CNR)
      When (date and time)
      Department

  Override actions:
    Specially highlighted in orange
    Shows override category and reason

  Export button:
    Download as CSV for records
```

---

### 10. User Management
```
URL: /users
Single job: See all system users and manage accounts

Content:
  Create New User button (top right)
  Filter bar:
    Department / Role / Status (active/inactive)

  Users list:
    Each row shows:
      Avatar and name
      Role badge
      Department
      Email
      Last active date
      Status badge (active/deactivated)
    Click row → User Detail

  Create User Modal/Form:
    Name
    Email
    Role (Officer or Supervisor)
    Department assignment
    Temporary password
```

---

### 11. User Detail
```
URL: /users/:id
Single job: See one user's full profile and activity

Content:
  Profile section:
    Avatar, name, role, department, email
    Account created date
    Last active date
    Status badge

  Projects involved:
    All projects this user submitted (if Officer)
    All projects assigned to them (if Supervisor)
    Each with current status

  Activity summary:
    Total projects submitted
    Completion rate
    Recent actions

  Admin Actions:
    Edit user details button
    Deactivate account button (with confirmation)
    Reset password button
```

---

### 12. Profile and Settings
```
URL: /settings
Single job: Manage own account

Content:
  Profile section:
    Avatar upload
    Name (editable)
    Email (display only)
    Role and department (display only)

  Security section:
    Change password form
    Current password
    New password
    Confirm new password

  Preferences section:
    Dark mode toggle
    Notification preferences
```

---

## OFFICER — 10 Views

Same SPA dashboard shell as Admin.
Sidebar shows Officer specific navigation only.

### Sidebar contains:
```
Urban Nexus logo
Navigation links:
  Dashboard
  My Projects
  Conflicts
  City Map
  Complaints
  Settings
Officer name, department, and role at bottom
Logout button
```

---

### 1. Officer Dashboard
```
URL: /dashboard (officer shell)
Single job: Quick overview of department status

Content:
  Stats cards:
    My Projects total
    Pending Approval count
    Active Clashes count
    Department Complaints unresolved

  My Recent Projects:
    Last 5 submitted projects
    Each with status badge
    Click → Project Detail

  Clash Alerts:
    Any clashes on department projects
    Click → Conflict Detail

  Complaint Alerts:
    Overdue complaints in department
    Quick link to Complaints List
```

---

### 2. Projects List
```
URL: /projects
Single job: See all department projects

Content:
  New Project button (top right)
  Filter bar:
    Type / Status / Date range
  Project cards:
    Same as Admin but department filtered
    Only shows own department projects
  Click card → Project Detail
```

---

### 3. Project Submission Form
```
URL: /projects/new
Single job: Submit a new project

Content:
  Progress indicator showing all 7 sections
  
  Section 0: Phase Selection
    Standalone / New phased / Continue existing

  Section 1: Basic Identity
    Title, Type, Description

  Section 2: Location
    Work area type selector:
      Along a road OR Specific location
    Split screen ALWAYS:
      Left: form fields
      Right: live map synced
    Three input ways always available:
      Type address / Click map / GPS
    Shape selector (if specific location):
      Circle / Corridor / Rectangle / Custom
    Size controls
    Auto detection verification panel
    Live clash preview

  Section 3: Timeline
    Start date, End date
    Duration auto calculated

  Section 4: Budget
    Estimated cost, Budget source,
    Tender number, Contractor name and firm

  Section 5: MCDM Priority Assessment
    Q1: Infrastructure condition
    Q2: Incidents reported
    Q3: Last major work year
    Q4: Tender status
    Q5: Contractor assigned
    Q6: Road closure
    Q7: Utility disruption
    Q8: Disruption duration days

  Section 6: Team
    Assign supervisor dropdown
    (own department supervisors only)

  Section 7: Documents
    Project document PDF (required)
    Site photos (optional)
    Approval letter (optional)

  Submit button
  After submit: score shown + clash preview
```

---

### 4. Project Detail
```
URL: /projects/:id
Single job: See full project status and assign supervisor

Content:
  Same as Admin Project Detail BUT:
    No Approve/Reject buttons
    Has Assign Supervisor button
    Has Edit button (if still pending)
    Shows clash alert with link
    Shows suggested date if rejected
    Go to Clash Response if rejection pending
```

---

### 5. Clash Response View
```
URL: /projects/:id/respond
Single job: Respond to Admin's rejection with new date

Content:
  Rejection summary:
    Which project was rejected
    Admin's rejection reason
    Which project took priority (and its MCDM score)

  Suggested date panel:
    System suggested start date
    Explanation of how date was calculated
    Accept Suggested Date button

  Custom Date panel:
    Date picker
    Minimum date enforced = suggested date
    Cannot pick earlier than suggestion
    Propose Custom Date button

  Clash preview:
    After picking date → system checks immediately
    Shows if new date is clean or has new clash
```

---

### 6. Conflicts List
```
URL: /conflicts
Single job: See all clashes involving department projects

Content:
  Same as Admin Conflicts List BUT:
    Only shows clashes involving own department
    No resolution actions
    View only
```

---

### 7. Conflict Detail
```
URL: /conflicts/:id
Single job: Understand a clash involving own project

Content:
  Same as Admin Conflict Detail BUT:
    No resolution action buttons
    View only
    Can see MCDM comparison
    Can see map overlap
    Can see system recommendation
    Cannot approve or reject
```

---

### 8. City Map
```
URL: /map
Single job: See all approved city projects before planning new submission

Content:
  Same as Admin City Map BUT:
    Read only — no admin actions
    Can see all approved and ongoing projects
    Helps Officer plan around existing work
    Click polygon → quick info drawer only
    No approval or conflict resolution from map
```

---

### 9. Complaints List
```
URL: /complaints
Single job: Manage citizen complaints for own department

Content:
  Filter bar: Status / Ward / Date range
  Complaint cards:
    CNR ID, issue type, location,
    date filed, days since filed, status
  Update Status button per complaint
  Click → Complaint Detail
```

---

### 10. Complaint Detail
```
URL: /complaints/:id
Single job: See and update one complaint

Content:
  Same complaint info as Admin view BUT:
    Officer can update status:
      Mark as Acknowledged
      Mark as In Progress
      Mark as Resolved
    Officer adds resolution note when resolving
    No escalate or reminder buttons (Admin only)
```

---

### Profile and Settings
```
URL: /settings
Same as Admin Profile and Settings
Own profile, change password, preferences
```

---

## SUPERVISOR — 4 Views

Simplified dashboard shell.
Minimal sidebar — only what Supervisor needs.

### Sidebar contains:
```
Urban Nexus logo
Navigation links:
  Dashboard
  My Tasks
  Settings
Supervisor name, department, role at bottom
Logout button
```

---

### 1. Supervisor Dashboard
```
URL: /dashboard (supervisor shell)
Single job: Quick overview of assigned work

Content:
  Stats cards:
    Total assigned projects
    In progress count
    Completed count
    Upcoming deadlines (next 7 days)

  Task cards preview:
    3 most urgent assigned projects
    Each shows progress bar and deadline
    Click → Task Detail

  Deadline alerts:
    Projects ending within 7 days highlighted
```

---

### 2. My Tasks List
```
URL: /tasks
Single job: See all assigned projects

Content:
  Filter bar: Status / Date range
  Task cards:
    Each card shows:
      Project name
      Department
      Start and end dates
      Progress bar (current percentage)
      Status badge
      Days remaining
  Click card → Task Detail
```

---

### 3. Task Detail
```
URL: /tasks/:id
Single job: View project details and update progress

Content:
  Project information:
    Title, department, type
    Start and end dates
    Description
    Phase info if phased

  Location Map:
    Project polygon read only
    Helps supervisor navigate to site
    Ward, zone, address shown

  Progress Update:
    Current progress percentage shown
    Input to update percentage (0-100)
    Save Progress button
    Progress history log:
      Who updated, what percentage, when

  Documents:
    Project document PDF download
    Site photos view

  Assigned by:
    Officer name who assigned this task
```

---

### 4. Profile and Settings
```
URL: /settings
Single job: Manage own account

Content:
  Own profile details
  Change password
  Dark mode toggle
```

---

## CITIZEN — 6 Pages

Completely separate from dashboard.
Multi page public website.
Header and footer on every page.
No login required anywhere.

### Header contains:
```
Urban Nexus logo (links to landing)
Navigation: Home / Projects / Report / Track
City name: Ghaziabad Municipal Corporation
```

### Footer contains:
```
Urban Nexus logo
Ghaziabad Municipal Corporation info
Links: About / Help / Privacy
Copyright
```

### Loading:
```
Subtle progress bar at top on page load
Logo fades in smoothly on landing
No separate splash screen
```

---

### 1. Landing Page
```
URL: /
Single job: Welcome citizen and direct them to what they need

Content:
  Hero section:
    Headline: "Know what is being built in your city"
    Subheadline: "Ghaziabad's infrastructure — transparent and live"

  Three action cards:
    🗺️ Explore Projects
       See ongoing and approved work near you
       [Explore Now button]

    📢 Report a Problem
       File a complaint about road, water, electricity
       [Report Now button]

    🔍 Track Your Complaint
       Enter your CNR ID to check status
       [Track Now button]

  Clean, minimal, fast
  No stats or feeds on landing
```

---

### 2. City Explorer
```
URL: /projects
Single job: Find and explore infrastructure projects by area

Content:
  Search bar at top:
    "Search by area, road, or ward..."
    Autocomplete suggestions

  Split screen layout:
    Left panel — Project List:
      Results count: "5 projects in Laxmi Nagar"
      Project cards:
        Project name
        Department badge
        Type badge
        Status badge
        Start and end dates
        Road closure warning if applicable
      Click card → Project Detail page

    Right panel — Map:
      Map zooms to searched area
      Colored polygons for each project
      Hover polygon → name and quick info tooltip
      Click polygon → same as clicking list card
      Goes to Project Detail page

  Filter bar:
    Project type / Status / Department
```

---

### 3. Project Detail
```
URL: /projects/:id
Single job: See full information about one project

Content:
  Project header:
    Name, department, type, status badge

  Information section:
    Start and end dates
    Expected completion
    Description of work
    Phase info if phased project

  Disruption warnings (if applicable):
    ⚠️ Road will be fully closed during work
    ⚠️ Water supply will be disrupted for 8 days

  Location map:
    Project polygon
    Address and ward
    Nearby facilities marked

  Back button → City Explorer

  No admin actions
  Read only for citizen
```

---

### 4. Report Form
```
URL: /report
Single job: File a citizen complaint

Content:
  Step 1: Select Department
    PWD (Roads) / Jal Nigam (Water) /
    PVVNL (Electricity) / Parks / Other

  Step 2: Select Issue Type
    Pothole / Streetlight / Water Leak /
    Drainage / Garbage / Other

  Step 3: Location
    Split screen:
      Left: address input
      Right: map with pin drop
    Three ways: type / click map / GPS
    Auto detects address from pin

  Step 4: Description
    Free text input
    Max 500 characters

  Step 5: Photo Upload
    Optional
    Max 3 photos

  Submit button
    Shows loading spinner
    On success:
      CNR tracking ID displayed prominently
      CNR-XXXXXX
      "Save this ID to track your complaint"
      Copy to clipboard button
      Go to Track page button
```

---

### 5. Track Report
```
URL: /track
Single job: Check status of a filed complaint

Content:
  CNR ID input:
    "Enter your tracking ID"
    Format hint: CNR-XXXXXX
    Track button

  After valid CNR entered:
    Complaint summary:
      Issue type
      Department
      Location
      Date filed

    Status timeline:
      ● Submitted    — date and time
      ● Acknowledged — date and time
      ○ In Progress  — pending
      ○ Resolved     — pending

    Location map:
      Pin at complaint location

    If resolved:
      Resolution note from department
      Resolution date
```

---

### 6. 404 Not Found
```
URL: /* (any wrong URL)
Single job: Handle wrong URLs gracefully

Content:
  Friendly message
  Illustration or simple graphic
  Back to Home button
  Report a Problem button
  (citizen might have found a real bug)
```

---

## Complete Count

```
SHARED:        1 screen  (Login)
ADMIN:        12 views   (in dashboard shell)
OFFICER:      10 views   (in dashboard shell)
SUPERVISOR:    4 views   (in dashboard shell)
CITIZEN:       6 pages   (public website)
─────────────────────────────────────────
TOTAL:        33 screens/views/pages
```

---

## What To Design In Figma

```
FRAME 1:    Login Page
FRAMES 2-13:  Admin views (12)
FRAMES 14-23: Officer views (10)
FRAMES 24-27: Supervisor views (4)
FRAMES 28-33: Citizen pages (6)

PLUS design system page:
  Colors, Typography, Spacing,
  All components with all states,
  Dark mode variants

PLUS shell frames:
  Admin/Officer/Supervisor shell
  Citizen header and footer
```

---

*Screen inventory locked. Every screen has a single clear job.*
*Nothing missing. Nothing extra.*
*This is the exact list to design in Figma.*
