# CIVIQ — First Prompt For Every Chat
> Copy the relevant prompt block when starting each new chat.
> Paste it as your very first message in that chat.

---

## PHASE 1 — Frontend: Auth + Layouts

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Your job this chat:
Build the Login screen, all 3 dashboard shells (Admin/Officer/Supervisor),
citizen header and footer, AppRouter, AuthContext, and fill mockData.js
with realistic dummy data.

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. The 8 tasks you need to complete

Then begin Task 1.
```

---

## PHASE 2 — Frontend: Admin Screens Part 1

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Phase 1 is complete. Login works, shells are built, mockData.js has dummy data,
AppRouter has all 33 routes, AuthContext works.

Your job this chat:
Build Admin Dashboard, Projects List, and Project Detail screens using mockData.

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. The 3 screens you need to build and their routes

Then begin Task 1.
```

---

## PHASE 3 — Frontend: Admin Screens Part 2

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Phase 1 and 2 are complete. Login, shells, mockData, and first 3 admin screens
(Dashboard, Projects List, Project Detail) are fully built.

Your job this chat:
Build the remaining 9 Admin screens: Conflicts List, Conflict Detail, City Map,
Complaints Monitor, Complaint Detail, Audit Log, User Management, User Detail,
and Admin Settings.

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. All 9 screens you need to build and their routes

Then begin Task 1.
```

---

## PHASE 4 — Frontend: Officer Screens

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Phases 1, 2, 3 are complete. All 12 Admin screens are fully built.
Login, shells, mockData, and all admin navigation work correctly.

Your job this chat:
Build all 10 Officer screens. The most important and complex one is the
Project Submission Form with all 7 sections including location split screen
and MCDM questions.

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. All 10 screens you need to build and their routes

Then begin Task 1.
```

---

## PHASE 5 — Frontend: Supervisor + Citizen

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Phases 1 through 4 are complete. All 12 Admin and all 10 Officer screens
are fully built. Full dashboard experience works for Admin and Officer.

Your job this chat:
Build all 4 Supervisor screens and all 6 Citizen public website pages.
This is the final frontend phase — when done, all 33 screens will be complete.

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. The 4 supervisor screens and 6 citizen pages you need to build

Then begin Task 1.
```

---

## PHASE 6 — Database Design

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Frontend is 100% complete — all 33 screens built and working with mockData.
Now starting the backend phase.

Your job this chat:
Design every MongoDB collection and schema completely on paper.
Zero code this chat — pure documentation only.
Output: a complete CIVIQ_DATABASE_DESIGN.md file.

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. The 7 collections you will design

Then begin Task 1.
```

---

## PHASE 7 — Backend Part 1: Auth + Users

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Frontend complete. Database design complete (see CIVIQ_DATABASE_DESIGN.md).
Backend folder structure already exists with starter files.

Your job this chat:
Build working auth system and user management APIs.
Test every route in Postman before finishing.
Tech stack: Node.js + Express + MongoDB + JWT

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. All API routes you will build this chat

Then begin Task 1.
```

---

## PHASE 8 — Backend Part 2: Projects + MCDM

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Auth and user APIs are complete and tested (Phase 7 done).
Seed data exists in MongoDB — 5 users with correct roles.

Your job this chat:
Build project submission API with automatic MCDM scoring.
The MCDM engine must calculate all 7 criteria with correct weights.
Test that submitting a project returns the correct score.

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. The 7 MCDM criteria and their weights

Then begin Task 1.
```

---

## PHASE 9 — Backend Part 3: Clash Detection

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Auth APIs and Projects + MCDM APIs are complete and tested.
Project submission automatically calculates MCDM score.

Your job this chat:
Build the clash detection engine and conflict resolution APIs.
Clash detection must run automatically every time a project is submitted.
The 4-step process (ward → buffer → time → work type) must work correctly.

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. The 4 steps of clash detection

Then begin Task 1.
```

---

## PHASE 10 — Backend Part 4: Complaints + Audit

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Auth, Projects, MCDM, and Clash Detection APIs are all complete and tested.
Submitting two clashing projects automatically creates a Conflict document.

Your job this chat:
Build citizen complaints API, audit logging middleware, and notifications.
Complaints must work without authentication (public route).
CNR ID must auto-generate in format CNR-XXXXXX.
Audit middleware must log every important action automatically.

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. What CNR stands for and its format

Then begin Task 1.
```

---

## PHASE 11 — Connect Frontend to Backend

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Frontend complete (33 screens, mockData). Backend complete (all APIs tested).
Backend is running on: [PASTE YOUR RENDER URL HERE]

Your job this chat:
Replace every mockData import across all 33 screens with real API calls.
Use the service files in frontend/src/services/ for all API calls.
After connecting, the full app must work end to end with real data.

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. How many screens need to be updated

Then begin Task 1.
```

---

## PHASE 12 — Testing

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Frontend and backend are fully connected. The complete app is working.

Your job this chat:
Test every critical flow in the application systematically.
Document what passes and what fails.
Fix any bugs found during testing.

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. The 6 test areas you will cover

Then begin Task 1.
```

---

## PHASE 13 — Deployment

```
You are working on CIVIQ — a smart city infrastructure coordination platform.
Read the files in this project before doing anything.

Everything is complete and tested. Time to go live before defense.

Your job this chat:
Deploy CIVIQ fully — MongoDB Atlas + Render (backend) + Vercel (frontend).
By end of this chat the app must be accessible on a live URL.

Confirm you have read the files by telling me:
1. What CIVIQ does in one sentence
2. What your exact job is this chat
3. The 3 platforms you will deploy to and what goes on each

Then begin Task 1.
```
