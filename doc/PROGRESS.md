# URBAN NEXUS — Build Progress Tracker
# Update this file after every session.
# Every new Claude ID reads this before starting work.

---

## Current Status

```
Phase 1 — Backend Foundation     ⏳ NOT STARTED
Phase 2 — Decision Engines        ⏳ NOT STARTED
Phase 3 — Frontend                ⏳ NOT STARTED
Phase 4 — Maps & Realtime         ⏳ NOT STARTED
Phase 5 — Integration & Testing   ⏳ NOT STARTED
```

---

## Phase 1 — Backend Foundation
**Assigned to:** Claude ID 1
**Status:** ⏳ NOT STARTED

**Must build:**
- [ ] package.json with all dependencies
- [ ] backend folder structure (all folders and empty files)
- [ ] src/config/index.js — central env config (reads dotenv, exports constants)
- [ ] src/config/db.js — MongoDB connection
- [ ] src/models/User.js
- [ ] src/models/Department.js
- [ ] src/models/Project.js
- [ ] src/models/Conflict.js
- [ ] src/models/CitizenReport.js
- [ ] src/models/AuditLog.js
- [ ] src/utils/response.js — success/error helpers
- [ ] src/utils/logger.js — Winston logger
- [ ] src/utils/trackingId.js
- [ ] src/middleware/auth.middleware.js — JWT verify
- [ ] src/middleware/rbac.middleware.js — permit()
- [ ] src/middleware/error.middleware.js — global error handler
- [ ] src/middleware/validate.middleware.js
- [ ] src/controllers/auth.controller.js — register, login, me
- [ ] src/services/auth.service.js — registerUser, loginUser, getMe
- [ ] src/routes/auth.routes.js
- [ ] src/routes/project.routes.js — routes defined, controllers stubbed
- [ ] src/routes/conflict.routes.js — routes defined, controllers stubbed
- [ ] src/routes/department.routes.js — routes defined, controllers stubbed
- [ ] src/routes/report.routes.js — routes defined, controllers stubbed
- [ ] src/routes/admin.routes.js — routes defined, controllers stubbed
- [ ] src/app.js — Express setup, routes mounted, middleware
- [ ] server.js — entry point
- [ ] .env.example
- [ ] Dockerfile
- [ ] docker-compose.yml

**Done when:** Server starts, DB connects, login works, all routes registered (even returning dummy data)

**Files created:** *(fill after session)*

---

## Phase 2 — Decision Engines
**Assigned to:** Claude ID 2
**Status:** ⏳ NOT STARTED
**Depends on:** Phase 1 complete

**Needs from Phase 1:**
- All 6 Mongoose models
- auth.middleware.js and rbac.middleware.js
- response.js utility
- error.middleware.js
- Route files (to fill controllers)

**Must build:**
- [ ] src/engines/conflict/geo.detector.js — Turf.js polygon intersection
- [ ] src/engines/conflict/time.detector.js — date range overlap
- [ ] src/engines/conflict/conflict.engine.js — orchestrator
- [ ] src/engines/mcdm/topsis.js — TOPSIS algorithm
- [ ] src/engines/mcdm/mcdm.engine.js — orchestrator
- [ ] src/engines/graph/dag.js — DAG data structure
- [ ] src/engines/graph/topological.js — Kahn's algorithm
- [ ] src/engines/graph/graph.engine.js — orchestrator
- [ ] src/services/project.service.js — full CRUD + trigger engines
- [ ] src/services/conflict.service.js — save and fetch conflicts
- [ ] src/services/decision.service.js — combines all 3 engines
- [ ] src/services/audit.service.js — write audit log entries
- [ ] src/controllers/project.controller.js — full implementation
- [ ] src/controllers/conflict.controller.js — full implementation
- [ ] src/controllers/department.controller.js — full implementation

**Done when:** POST /api/v1/projects detects clashes, returns MCDM scores and execution order via Postman

**Files created:** *(fill after session)*

---

## Phase 3 — Frontend
**Assigned to:** Claude ID 3
**Status:** ⏳ NOT STARTED
**Depends on:** Phase 1 complete (needs API contract)

**Needs from Phase 1:**
- API_CONTRACT.md (all endpoints)
- SCHEMA.md (data shapes)

**Must build:**
- [ ] Vite + React + Tailwind setup
- [ ] src/api/axios.config.js
- [ ] src/api/auth.api.js
- [ ] src/api/project.api.js
- [ ] src/api/conflict.api.js
- [ ] src/api/report.api.js
- [ ] src/store/authStore.js — Zustand
- [ ] src/store/notificationStore.js — Zustand
- [ ] src/router/AppRouter.jsx — protected routes
- [ ] src/utils/roles.js
- [ ] src/utils/formatters.js
- [ ] src/components/common/ — Button, Modal, Badge, Table, Spinner, Toast
- [ ] src/components/project/ — ProjectForm (no map polygon yet), ProjectCard, ProjectList, ProjectDetail
- [ ] src/components/conflict/ — ConflictAlert, ConflictList, ConflictDetail
- [ ] src/components/dashboard/ — StatsCard, ActivityChart, DeptPerformance
- [ ] src/components/citizen/ — ReportForm, TrackReport
- [ ] src/pages/Login.jsx
- [ ] src/pages/Dashboard.jsx — admin
- [ ] src/pages/DeptDashboard.jsx — officer
- [ ] src/pages/Projects.jsx
- [ ] src/pages/ProjectDetail.jsx
- [ ] src/pages/Conflicts.jsx
- [ ] src/pages/MyTasks.jsx — supervisor
- [ ] src/pages/CitizenReport.jsx — public
- [ ] src/pages/AuditLog.jsx — admin only
- [ ] Dockerfile

**Done when:** Login works, dashboard renders, project form submits (map polygon is a text input placeholder), conflict list shows

**Files created:** *(fill after session)*

---

## Phase 4 — Maps & Realtime
**Assigned to:** Claude ID 4
**Status:** ⏳ NOT STARTED
**Depends on:** Phase 2 and Phase 3 complete

**Needs from Phase 3:**
- Full frontend codebase
- axios.config.js, project.api.js

**Needs from Phase 2:**
- GET /api/v1/projects/map endpoint working

**Must build:**
- [ ] src/components/map/CityMap.jsx — Leaflet map with project polygons
- [ ] src/components/map/ProjectMarker.jsx — colored polygon per status
- [ ] src/components/map/DrawPolygon.jsx — draw tool for project submission
- [ ] src/components/map/MapFilters.jsx — filter by dept/status/type
- [ ] Replace placeholder in ProjectForm.jsx with DrawPolygon component
- [ ] src/pages/MapView.jsx — full city map page
- [ ] src/hooks/useSocket.js — Socket.io connection
- [ ] src/socket/socket.handler.js — backend event handlers
- [ ] notification.service.js — backend Socket.io emitter
- [ ] Connect clash:detected event to frontend Toast notification
- [ ] Citizen report map pin on CitizenReport.jsx

**Done when:** Map shows all projects as polygons, officer can draw polygon in form, clash alert shows as real-time toast

**Files created:** *(fill after session)*

---

## Phase 5 — Integration & Testing
**Assigned to:** Claude ID 5
**Status:** ⏳ NOT STARTED
**Depends on:** All phases complete

**Must build:**
- [ ] Full citizen report flow with Cloudinary upload
- [ ] Report status update flow end-to-end
- [ ] Task assignment — officer assigns project to supervisor
- [ ] Supervisor progress update flow
- [ ] Admin audit log page fully connected
- [ ] Notification bell component in navbar
- [ ] Jest unit tests — mcdm.engine.js
- [ ] Jest unit tests — conflict.engine.js (geo + time detectors)
- [ ] Jest unit tests — graph.engine.js (topological sort + cycle detection)
- [ ] Supertest API tests — auth routes
- [ ] Supertest API tests — project creation + conflict detection
- [ ] Bug fixes from integration
- [ ] docker-compose.yml final verification
- [ ] swagger.js final documentation
- [ ] README.md — setup instructions

**Done when:** All flows work end-to-end, tests pass, app runs in docker-compose up

**Files created:** *(fill after session)*

---

## Known Issues / Blockers

*(add issues here as they are discovered)*

---

## Important Notes for All IDs

1. Read HANDOFF.md completely before writing any code
2. Read SCHEMA.md for all data structures
3. Read API_CONTRACT.md for all endpoint shapes
4. Never deviate from the folder structure in HANDOFF.md
5. Always use the standard response format from HANDOFF.md
6. Engines are pure functions — no DB access inside engine files
7. Ask the project manager if anything is unclear before building