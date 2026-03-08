# URBAN NEXUS — Build Progress Tracker
# Update this file after every session.
# Every new Claude ID reads this before starting work.

---

## Current Status

```
Phase 1 — Backend Foundation      🔄 IN PROGRESS
Phase 2 — Decision Engines        ⏳ NOT STARTED
Phase 3 — Frontend                ⏳ NOT STARTED
Phase 4 — Maps & Realtime         ⏳ NOT STARTED
Phase 5 — Integration & Testing   ⏳ NOT STARTED
```

---

## Phase 1 — Backend Foundation
**Assigned to:** Claude ID 1
**Status:** 🔄 IN PROGRESS

**Must build:**

### Config
- [ ] src/config/index.js — central env config (reads dotenv, exports constants, crashes on missing vars)
- [ ] src/config/db.js — MongoDB connection
- [ ] src/config/cloudinary.js — Cloudinary config

### Models
- [ ] src/models/User.js
- [ ] src/models/Department.js
- [ ] src/models/Project.js
- [ ] src/models/Conflict.js
- [ ] src/models/CitizenReport.js
- [ ] src/models/AuditLog.js

### Utils
- [ ] src/utils/response.js — success/error response helpers
- [ ] src/utils/logger.js — Winston logger
- [ ] src/utils/trackingId.js — CNR-XXXXXX generator

### Middleware
- [ ] src/middleware/auth.middleware.js — JWT verify, sets req.user
- [ ] src/middleware/rbac.middleware.js — permit() role checker
- [ ] src/middleware/validate.middleware.js — Joi/Zod schema runner
- [ ] src/middleware/error.middleware.js — global error handler

### Validators
- [ ] src/validators/auth.validator.js
- [ ] src/validators/project.validator.js

### Auth (fully built)
- [ ] src/services/auth.service.js — registerUser, loginUser, getMe
- [ ] src/controllers/auth.controller.js — register, login, me
- [ ] src/routes/auth.routes.js

### Stubbed Controllers + Routes
- [ ] src/controllers/project.controller.js — stubbed, returns 200 "Coming soon"
- [ ] src/controllers/conflict.controller.js — stubbed, returns 200 "Coming soon"
- [ ] src/controllers/department.controller.js — stubbed, returns 200 "Coming soon"
- [ ] src/controllers/report.controller.js — stubbed, returns 200 "Coming soon"
- [ ] src/controllers/admin.controller.js — stubbed, returns 200 "Coming soon"
- [ ] src/routes/project.routes.js
- [ ] src/routes/conflict.routes.js
- [ ] src/routes/department.routes.js
- [ ] src/routes/report.routes.js
- [ ] src/routes/admin.routes.js

### App Entry
- [ ] src/app.js — Express setup, all routes mounted, all middleware registered
- [ ] server.js — entry point, starts HTTP server
- [ ] swagger.js — base Swagger/OpenAPI config

### DevOps
- [ ] package.json — all dependencies and scripts
- [ ] .env.example
- [ ] Dockerfile
- [ ] docker-compose.yml — backend + mongo services only

**Done when:**
- npm run dev → server starts on port 5000
- MongoDB connects successfully
- POST /api/v1/auth/register → creates user, returns token
- POST /api/v1/auth/login → returns JWT token
- GET /api/v1/auth/me → returns user with valid token
- All other routes return 200 "Coming soon — Phase 2"

**Files created:** *(fill after session)*

---

## Phase 2 — Decision Engines
**Assigned to:** Claude ID 2
**Status:** ⏳ NOT STARTED
**Depends on:** Phase 1 complete

**Needs from Phase 1 (paste these files at session start):**
- src/models/Project.js
- src/models/Conflict.js
- src/middleware/auth.middleware.js
- src/middleware/rbac.middleware.js
- src/utils/response.js
- src/routes/project.routes.js
- src/routes/conflict.routes.js
- src/app.js

**Must build:**

### Conflict Engine
- [ ] src/engines/conflict/geo.detector.js — Turf.js polygon intersection
- [ ] src/engines/conflict/time.detector.js — date range overlap detection
- [ ] src/engines/conflict/conflict.engine.js — orchestrator

### MCDM Engine
- [ ] src/engines/mcdm/topsis.js — TOPSIS algorithm (pure function)
- [ ] src/engines/mcdm/mcdm.engine.js — orchestrator

### Graph Engine
- [ ] src/engines/graph/dag.js — DAG data structure
- [ ] src/engines/graph/topological.js — Kahn's topological sort
- [ ] src/engines/graph/graph.engine.js — orchestrator

### Services
- [ ] src/services/project.service.js — full CRUD + triggers conflict engine on create
- [ ] src/services/conflict.service.js — save and fetch conflicts
- [ ] src/services/decision.service.js — combines all 3 engines in sequence
- [ ] src/services/audit.service.js — writes audit log entries

### Controllers (fully built, replacing stubs)
- [ ] src/controllers/project.controller.js — full implementation
- [ ] src/controllers/conflict.controller.js — full implementation
- [ ] src/controllers/department.controller.js — full implementation

**Done when:**
- POST /api/v1/projects saves project and runs conflict check
- Two overlapping projects → conflict document created in DB
- GET /api/v1/conflicts/:id returns MCDM scores + execution order
- All tested and verified in Postman

**Files created:** *(fill after session)*

---

## Phase 3 — Frontend
**Assigned to:** Claude ID 3
**Status:** ⏳ NOT STARTED
**Depends on:** Phase 1 complete (needs API contract only, not running backend)

**Attach at session start:**
- HANDOFF.md
- API_CONTRACT.md
- PROGRESS.md
- UI_GUIDE.md

**Must build:**

### Setup
- [ ] package.json — all dependencies
- [ ] vite.config.js — port 3000, path aliases
- [ ] tailwind.config.js — full config with custom colors and fonts
- [ ] postcss.config.js — tailwind + autoprefixer
- [ ] index.html — Inter font import, root div
- [ ] src/main.jsx — React root, QueryClient, Router
- [ ] src/App.jsx — top level component

### Config
- [ ] src/config/index.js — reads import.meta.env, exports apiUrl and socketUrl

### API Layer
- [ ] src/api/axios.config.js — axios instance, interceptors, token injection
- [ ] src/api/auth.api.js
- [ ] src/api/project.api.js
- [ ] src/api/conflict.api.js
- [ ] src/api/report.api.js

### State
- [ ] src/store/authStore.js — Zustand, user + token + login/logout
- [ ] src/store/notificationStore.js — Zustand, notifications list
- [ ] src/store/projectStore.js — Zustand, active filters

### Router
- [ ] src/router/AppRouter.jsx — all routes, protected route wrapper, role redirect

### Utils
- [ ] src/utils/roles.js — role constants and permission helpers
- [ ] src/utils/formatters.js — date, currency, status formatters

### Hooks
- [ ] src/hooks/useAuth.js
- [ ] src/hooks/useProjects.js

### Common Components
- [ ] src/components/common/Logo.jsx — SVG logo component
- [ ] src/components/common/Avatar.jsx — initials based avatar
- [ ] src/components/common/Button.jsx
- [ ] src/components/common/Modal.jsx
- [ ] src/components/common/Badge.jsx
- [ ] src/components/common/Table.jsx
- [ ] src/components/common/Spinner.jsx
- [ ] src/components/common/Toast.jsx

### Feature Components
- [ ] src/components/project/ProjectForm.jsx — map polygon is disabled text input placeholder
- [ ] src/components/project/ProjectCard.jsx
- [ ] src/components/project/ProjectList.jsx
- [ ] src/components/project/ProjectDetail.jsx
- [ ] src/components/conflict/ConflictAlert.jsx
- [ ] src/components/conflict/ConflictList.jsx
- [ ] src/components/conflict/ConflictDetail.jsx
- [ ] src/components/dashboard/StatsCard.jsx
- [ ] src/components/dashboard/ActivityChart.jsx
- [ ] src/components/dashboard/DeptPerformance.jsx
- [ ] src/components/citizen/ReportForm.jsx
- [ ] src/components/citizen/TrackReport.jsx

### Pages
- [ ] src/pages/Login.jsx
- [ ] src/pages/Dashboard.jsx — admin dashboard
- [ ] src/pages/DeptDashboard.jsx — officer dashboard
- [ ] src/pages/Projects.jsx
- [ ] src/pages/ProjectDetail.jsx
- [ ] src/pages/Conflicts.jsx
- [ ] src/pages/MyTasks.jsx — supervisor
- [ ] src/pages/CitizenReport.jsx — public, no login
- [ ] src/pages/AuditLog.jsx — admin only

### DevOps
- [ ] Dockerfile

**Done when:**
- npm run dev → React app loads on port 3000
- Login works, redirects by role to correct dashboard
- Officer dashboard shows project list with skeleton loaders
- Project form submits (polygon is placeholder text input)
- Conflict list page renders
- Citizen report form renders without login
- Dark mode toggle works on every page

**Files created:** *(fill after session)*

---

## Phase 4 — Maps & Realtime
**Assigned to:** Claude ID 4
**Status:** ⏳ NOT STARTED
**Depends on:** Phase 2 and Phase 3 complete

**Attach at session start:**
- HANDOFF.md
- PROGRESS.md
- UI_GUIDE.md

**Paste these existing files at session start:**
- frontend/src/config/index.js
- frontend/src/api/axios.config.js
- frontend/src/api/project.api.js
- frontend/src/components/project/ProjectForm.jsx
- frontend/src/pages/MapView.jsx
- frontend/src/pages/CitizenReport.jsx
- frontend/src/router/AppRouter.jsx
- backend/src/app.js

**Must build:**

### Map Components
- [ ] src/components/map/CityMap.jsx — Leaflet map with project polygons
- [ ] src/components/map/ProjectMarker.jsx — colored polygon per type and status
- [ ] src/components/map/DrawPolygon.jsx — polygon draw tool for project form
- [ ] src/components/map/MapFilters.jsx — filter panel on map

### Pages
- [ ] src/pages/MapView.jsx — full city map page (replaces placeholder)
- [ ] Replace polygon placeholder in ProjectForm.jsx with DrawPolygon component

### Realtime
- [ ] src/hooks/useSocket.js — Socket.io client connection
- [ ] backend/src/socket/socket.handler.js — all Socket.io event handlers
- [ ] backend/src/services/notification.service.js — emit events from backend

### Citizen Map
- [ ] Add map pin drop to CitizenReport.jsx

**Done when:**
- Map loads with all projects as colored polygons
- Officer draws polygon in project form, polygon saves correctly
- Two clashing projects → real-time toast alert appears on frontend
- Citizen can drop a pin on map in report form

**Files created:** *(fill after session)*

---

## Phase 5 — Integration & Testing
**Assigned to:** Claude ID 5
**Status:** ⏳ NOT STARTED
**Depends on:** All phases complete

**Attach at session start:**
- HANDOFF.md
- PROGRESS.md

**Paste these existing files at session start:**
- backend/src/engines/mcdm/topsis.js
- backend/src/engines/conflict/geo.detector.js
- backend/src/engines/conflict/time.detector.js
- backend/src/engines/graph/topological.js
- backend/src/controllers/report.controller.js
- backend/src/services/report.service.js
- backend/docker-compose.yml
- frontend/src/components/citizen/ReportForm.jsx
- frontend/src/components/citizen/TrackReport.jsx

**Must build:**

### Remaining Flows
- [ ] Full citizen report flow with Cloudinary photo upload
- [ ] Report status update flow end-to-end
- [ ] Task assignment — officer assigns project to supervisor
- [ ] Supervisor progress update flow
- [ ] Admin audit log page fully connected to backend
- [ ] Notification bell component in navbar

### Tests
- [ ] backend/src/tests/engines/mcdm.test.js
- [ ] backend/src/tests/engines/conflict.test.js
- [ ] backend/src/tests/engines/graph.test.js
- [ ] backend/src/tests/api/auth.test.js
- [ ] backend/src/tests/api/project.test.js

### Final
- [ ] docker-compose.yml — final with all services (backend, frontend, mongo, nginx)
- [ ] swagger.js — complete API documentation
- [ ] README.md — full setup instructions

**Done when:**
- Citizen submits report with photo → Cloudinary URL saved in DB
- Track by CNR-XXXXXX → returns correct status timeline
- All Jest tests pass with no failures
- docker-compose up → entire app runs correctly
- Full flow works: login → submit project → clash detected →
  MCDM scores → execution order → admin resolves

**Files created:** *(fill after session)*

---

## Known Issues / Blockers

*(add issues here as they are discovered)*

---

## Important Notes for All IDs

1. Read HANDOFF.md completely before writing any code
2. Read SCHEMA.md for all data structures
3. Read API_CONTRACT.md for all endpoint shapes
4. Read UI_GUIDE.md for all visual decisions (frontend IDs only)
5. Never deviate from the folder structure in HANDOFF.md
6. Always use the standard response format from HANDOFF.md Section 8
7. Engines are pure functions — no DB access inside engine files
8. Never use process.env directly — always import from src/config/index.js
9. Ask the project manager if anything is unclear before building