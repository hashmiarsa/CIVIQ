# CIVIQ — Intelligent Urban Infrastructure Coordination Platform
## Complete System Design Document · Version 3.0

**Document Status:** Production-Ready Draft  
**Version:** 3.0  
**Date:** April 2026  
**Authors:** CIVIQ Core Team  
**Classification:** Internal — Engineering & Product  

---

> **How to use this document**  
> This is the single source of truth for the entire CIVIQ platform. Every engineer, designer, product manager, and stakeholder should derive their work from this document. Nothing should be built, designed, or deployed that contradicts what is written here. If reality diverges from this document, either update this document first or raise a change request. Sections are numbered for precise cross-referencing.

---

## Table of Contents

1. [Title & Version Control](#1-title--version-control)
2. [Executive Summary & North Star](#2-executive-summary--north-star)
3. [Problem Statement](#3-problem-statement)
4. [Goals & Non-Goals](#4-goals--non-goals)
5. [Users & Personas](#5-users--personas)
6. [High-Level Architecture](#6-high-level-architecture)
7. [Data Model](#7-data-model)
8. [Core Workflows & User Flows](#8-core-workflows--user-flows)
9. [Clash Detection Engine](#9-clash-detection-engine)
10. [Long-Term Protection System](#10-long-term-protection-system)
11. [AI Coordination Agent](#11-ai-coordination-agent)
12. [MCDM Priority Scoring Engine](#12-mcdm-priority-scoring-engine)
13. [Location & Map System](#13-location--map-system)
14. [Admin Override System](#14-admin-override-system)
15. [Enforcement & Adoption Mechanism](#15-enforcement--adoption-mechanism)
16. [Notification System](#16-notification-system)
17. [Citizen Information System](#17-citizen-information-system)
18. [Mobile App & Offline Support](#18-mobile-app--offline-support)
19. [ERP Integration Architecture](#19-erp-integration-architecture)
20. [Security Architecture](#20-security-architecture)
21. [Compliance & Regulatory Framework](#21-compliance--regulatory-framework)
22. [Tech Stack & Infrastructure](#22-tech-stack--infrastructure)
23. [Database Schema — Full Physical Design](#23-database-schema--full-physical-design)
24. [API Design](#24-api-design)
25. [Directory Structure](#25-directory-structure)
26. [Monitoring, Observability & Analytics](#26-monitoring-observability--analytics)
27. [Deployment & Scaling Strategy](#27-deployment--scaling-strategy)
28. [Edge Cases & Failure Handling](#28-edge-cases--failure-handling)
29. [Development Roadmap & Phasing](#29-development-roadmap--phasing)
30. [Assumptions & Risks](#30-assumptions--risks)
31. [Appendix](#31-appendix)

---

## 1. Title & Version Control

| Field | Value |
|---|---|
| **Project Name** | CIVIQ |
| **Full Name** | Civic Infrastructure Quality & Coordination Platform |
| **Version** | 3.0 |
| **Status** | Production-Ready Draft |
| **Pilot City** | Ghaziabad, Uttar Pradesh, India |
| **Target Users** | Municipal Corporations of Indian Cities |
| **Document Owner** | System Architecture Team |

### 1.1 Version History

| Version | Date | Author | Summary of Changes |
|---|---|---|---|
| 1.0 | Jan 2026 | Core Team | Initial MCDM-based design. Full clash detection, 7-criteria MCDM, all user flows. |
| 2.0 | Mar 2026 | AI Extension | Added AI layer, long-term protection concept, ERP enforcement, mobile offline. Weakened precision on core rules. |
| 3.0 | Apr 2026 | Core Team | Merged best of both. V1 precision restored. V2 additions integrated with full specification. Patent-ready. |

---

## 2. Executive Summary & North Star

### 2.1 The North Star

> **CIVIQ exists because city departments plan in silos, causing the same roads, pipelines, and cables to be dug up multiple times — wasting public money and making citizens suffer for months. CIVIQ eliminates this by forcing intelligent, AI-enhanced, enforceable coordination between government departments before a single tool hits the ground.**

This sentence is the judge of every feature in this system. If a proposed feature does not directly serve this sentence, it does not belong in CIVIQ.

### 2.2 The Core Insight

The problem is not budget. Every municipal department in India already has its annual budget approved by the state government. The problem is the complete absence of cross-department communication before ground work begins.

CIVIQ is not a budget tool. CIVIQ is a **clash prevention and coordination enforcement platform**.

### 2.3 Success Metrics

| Metric | Baseline (Current) | Target (Year 1) |
|---|---|---|
| Same-location re-excavation incidents | ~12–15 per ward per year (estimated) | Reduce by 90% |
| Average gap between conflicting works on same infrastructure | 2–3 months | Minimum 12–18 months |
| Projects submitted through CIVIQ before ground work | ~0% (no platform exists) | 95%+ |
| AI suggestion acceptance rate | N/A | >70% within 6 months |
| Citizen complaint volume about repeated digging | Baseline TBD at pilot start | Reduce by 60% in Year 1 |
| Average project approval time | Days–weeks (manual) | <48 hours (AI-assisted) |

---

## 3. Problem Statement

### 3.1 The Reality of Indian Municipal Infrastructure

In every major Indian city, municipal infrastructure is managed by independent departments:

- **PWD (Public Works Department)** — Roads, pavements, flyovers
- **Jal Nigam / Jal Board** — Water supply pipelines
- **PVVNL / DISCOMS** — Electrical distribution cables and substations
- **Sewerage Board / Nagar Nigam** — Sewage and drainage lines
- **Parks & Horticulture Department** — Public parks, green belts, plantation
- **Nagar Nigam (Municipal Corporation)** — Local roads, drains, street furniture

Each of these departments:
- Has its own separately approved annual budget from the state government
- Plans projects independently, without consulting other departments
- Has its own Executive Engineer who reports to the department, not to a cross-department coordinator
- Has its own procurement and tendering process
- Operates with complete autonomy within its budget allocation

### 3.2 The Classic Failure Pattern

```
MONTH 1 — MARCH
PWD resurfacing tender finalized
Fresh asphalt laid on MG Road, Vijay Nagar
Cost: ₹42 Lakhs
Citizens relieved — good road at last

MONTH 3 — JUNE
Jal Nigam pipeline tender (approved separately in Jan)
Work order issued — same road section
Road cut open for water pipeline installation
Fresh asphalt destroyed
Estimated restoration: inadequate, done by contractor
Cost: ₹28 Lakhs + ₹8 Lakhs "restoration"

MONTH 6 — SEPTEMBER
PVVNL underground cable work on the same stretch
Another excavation — same road
Citizens file complaints: "Why is this road always dug up?"
Total cost of disruption to citizens: Immeasurable
Total waste of public money: ₹78+ Lakhs on one road in 6 months

REALITY CHECK:
If coordinated: Water pipeline in March, asphalt in October
Total cost: ₹42 Lakhs
Savings: ₹36+ Lakhs on ONE road
Citizen disruption: ONE event instead of THREE
```

This is not an exceptional case. This is the default operating reality in Ghaziabad, Lucknow, Kanpur, Agra, Varanasi, and every major Indian city.

### 3.3 Root Cause Analysis

The root cause is **not** any of the following:
- Corruption (though that exists and is addressed)
- Lack of technical skill
- Insufficient budget
- Bad contractors

The root cause is **structural information isolation**:
- Department A genuinely does not know Department B is planning work at the same location
- There is no mandatory pre-work coordination mechanism
- There is no penalty for starting work that conflicts with existing work
- The Municipal Commissioner has no real-time visibility into cross-department conflicts

### 3.4 Why Existing Approaches Fail

| Approach | Why It Fails |
|---|---|
| **Manual coordination meetings** | Infrequent, poorly documented, no enforcement, easy to ignore |
| **Basic project tracking dashboards** | Show what is happening — cannot predict what will conflict |
| **Geographic Information Systems (GIS) alone** | Static maps, no real-time clash detection, no enforcement |
| **Rule-based MCDM (V1 approach)** | Correct logic, but no enforcement mechanism — voluntary submission means the system is bypassed |
| **Ad-hoc phone calls between officers** | Works for good-faith actors, fails entirely for bad-faith actors or different reporting chains |

### 3.5 Why Now (2026)

- AI/LLM technology is mature enough for production deployment in coordination systems
- Indian government's Digital India push has created enough digital infrastructure for API-based enforcement
- SmartCity initiatives have introduced the concept of centralized urban data platforms
- PostGIS and modern geo-processing tools are production-ready at low cost
- Mobile internet penetration means field supervisors can use smartphones
- The DPDP Act 2023 has created a compliance framework that gives CIVIQ a regulatory hook for proper data handling

### 3.6 The Specific Loopholes CIVIQ Must Close

Identified through analysis of V1, V2, and real-world scenarios:

**Implementation/Adoption Gaps:**
1. Voluntary submission → departments bypass the system entirely
2. Single admin overload → bottleneck kills adoption
3. Heavy dependence on inaccurate map data → wrong clash detection
4. No post-completion verification → quality not enforced
5. Scoring system can be gamed → officers inflate their project priority
6. No mobile/offline support → field supervisors cannot update
7. Privacy/regulatory gaps → DPDP non-compliance

**Dynamic Real-World Loopholes:**
1. New need appears 2–3 months after completion → fresh infrastructure destroyed
2. Disguised follow-up work submitted as new project → bypasses coordination
3. Project gets delayed on ground → creates unexpected windows for conflicting work
4. Emergency overrides used without accountability → loophole for bypass
5. No long-term protection → 14-day buffer is completely inadequate
6. Scope creep between phases → phased projects treated as independent

---

## 4. Goals & Non-Goals

### 4.1 Primary Goals

#### Business / Impact Goals
1. Reduce repeated excavation of same urban infrastructure by **90%** in pilot cities within Year 1
2. Create a **mandatory single source of truth** for all municipal civil infrastructure works — enforced through ERP integration, not goodwill
3. Build an **AI-enhanced coordination engine** that predicts clashes, suggests sequencing, handles dynamic changes, and learns from human decisions — while keeping humans in final authority
4. Significantly improve **citizen experience** by reducing repeated digging, traffic disruptions, and utility outages
5. Increase **average infrastructure lifespan** through intelligent coordination and restoration planning
6. Enable **data-driven decision making** for Municipal Commissioners and administrators

#### Technical Goals
1. **AI-enhanced MCDM** — AI contextualizes and validates the 7-criteria scoring, but the structured inputs and audit trail remain intact
2. **95%+ adoption** through mandatory ERP enforcement, not incentive alone
3. **Full mobile + offline support** for field supervisors in areas with poor connectivity
4. **Full auditability** — every action, every AI suggestion, every human override permanently logged
5. **Scalable from city to state** — multi-city ready from day one of architecture

### 4.2 Non-Goals

These were explicitly considered and excluded. Anyone requesting these features must provide a separate justification:

| Feature | Reason Excluded |
|---|---|
| Budget approval or financial management | Departments already have allocated budgets. CIVIQ is not an e-procurement platform. |
| Contractor management or tendering | Belongs in existing ERP systems. CIVIQ integrates, not replaces. |
| Day-to-day labor or equipment tracking | Internal department concern below supervisor level. |
| Post-maintenance / warranty management | Different workflow, different platform entirely. |
| Private sector utilities (Jio, Airtel fiber, PNG gas) | Private operators have different regulatory frameworks. |
| Real-time IoT sensor installation | CIVIQ may consume sensor data in future, but will not install or manage hardware. |
| Citizen voting or direct decision power | Citizens file complaints and view projects. Decision authority stays with government. |
| Merging two projects into one | Too complex. Rejection + rescheduling achieves the same coordination outcome. |
| Internet/telecom as utility disruption option | Private operators, not municipal infrastructure. |
| Worker accounts below Supervisor level | Supervisor manages ground team outside the app. App tracks project-level progress only. |

---

## 5. Users & Personas

### 5.1 The Real Indian Government Hierarchy

Understanding how Indian municipal government actually operates is essential to every design decision:

```
┌──────────────────────────────────────────────────────────────────────┐
│                    MUNICIPAL COMMISSIONER (IAS Officer)               │
│  Appointed by State Government. Highest authority in municipal corp.  │
│  Coordinates between departments. Signs off on large budgets.         │
│  Can be transferred any time — system must not depend on one person.  │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
               ┌───────────────┼───────────────┐
               ▼               ▼               ▼
       ┌───────────────┐ ┌───────────────┐ ┌──────────────────┐
       │  PWD Officer  │ │ Jal Nigam     │ │ PVVNL Officer    │
       │ (Exec Engr)   │ │ Officer       │ │ (Exec Engr)      │
       └───────┬───────┘ └───────┬───────┘ └────────┬─────────┘
               │                 │                  │
       ┌───────▼───────┐ ┌───────▼───────┐ ┌────────▼─────────┐
       │  JE / Site    │ │  JE / Site    │ │  JE / Site       │
       │  Supervisor   │ │  Supervisor   │ │  Supervisor      │
       └───────────────┘ └───────────────┘ └──────────────────┘
                               │
                        ┌──────▼──────┐
                        │  CITIZENS   │
                        │  (Public)   │
                        └─────────────┘
```

**Critical insight:** Executive Engineers (Department Officers) have autonomous spending authority within their annual budget. They do not need the Commissioner's approval for every project — only above certain value thresholds. This is why informal coordination fails: they have no incentive to coordinate and no process that forces them to.

### 5.2 User Roles — Formal Definitions

CIVIQ has **5 human roles** and **1 system role**:

| Role | Real-World Equivalent | Count (per city) |
|---|---|---|
| Municipal Commissioner | Super Admin, IAS Officer | 1 |
| Admin (Operational Coordinator) | Additional Commissioner / Nodal Officer | 2–5 (by zone) |
| Department Officer | Executive Engineer / Dept Head | 5–10 (one per dept) |
| Field Supervisor | Junior Engineer / Site In-Charge | 20–100 |
| Citizen | General Public | Unlimited |
| AI Coordination Agent | Intelligent System Component | N/A (not a person) |

### 5.3 Detailed Persona Specifications

---

#### ROLE 1: Municipal Commissioner (Super Admin)

**Single job in one sentence:** Ensure city-wide infrastructure work is coordinated, visible, and accountable — without getting involved in daily operational details.

**Authority — CAN DO:**
- View city-wide analytics dashboard: clash rates, adoption metrics, estimated cost savings, department performance
- View complete audit log of every action in the system (read-only)
- Receive automatic alerts when Admin override rate exceeds threshold
- Receive alerts when system detects unregistered work (complaints + map analysis)
- Set city-wide configuration: protection period durations, enforcement thresholds, escalation rules
- Deactivate any user account including Admin accounts
- View inter-department conflict patterns and escalation history
- Generate official compliance reports for state government submission

**Authority — CANNOT DO:**
- Approve or reject individual projects (that is Admin's job)
- Directly modify project data
- Override MCDM decisions (only Admin can, with logged justification)
- Submit projects on behalf of any department

**CIVIQ Interaction Pattern:**
- Logs in 2–3 times per week
- Views high-level dashboards
- Acts only when escalation or anomaly patterns are flagged
- Mostly a passive monitor with high-consequence intervention power

---

#### ROLE 2: Admin (Operational Coordinator)

**Single job in one sentence:** Detect clashes between departments and coordinate them before ground work begins — every single day.

**Authority — CAN DO:**
- View ALL projects from ALL departments
- Approve or reject any submitted project
- View all MCDM scores, AI suggestions, and clash alerts
- Resolve clashes — approve both with coordination note OR reject lower priority
- Override MCDM/AI recommendation (4 defined categories only, always logged with mandatory reference number)
- Create, deactivate, and reassign user accounts (all roles except Commissioner)
- View complete audit log of their zone's actions
- View department performance analytics
- Adjust project dates during clash resolution (within rules)
- Mark a clash as "Conditional — needs monitoring" without full rejection

**Authority — CANNOT DO:**
- Assign supervisors to projects (Officer's exclusive authority)
- Submit projects on behalf of any department
- See internal department staffing or HR details
- Delete or permanently modify project records (only soft-delete/archive)
- Override a Commissioner-level configuration

**CIVIQ Interaction Pattern:**
- Daily active user — morning queue review, throughout-day clash resolution
- Primary target of AI suggestions
- The most workflow-critical role in the system

---

#### ROLE 3: Department Officer (Executive Engineer)

**Single job in one sentence:** Submit department projects and track their approval and execution status.

**Authority — CAN DO:**
- Submit projects for their own department **only**
- View all their department's projects and current status at every stage
- Receive automatic notifications when their project has a clash detected
- Respond to clash rejections — accept Admin's suggested date OR propose a custom date (must be equal to or later than suggestion)
- Assign supervisors from their own department **only**
- Mark a project as a Phase 2/3/4 of an existing project
- View their department's performance analytics (own department only)
- Upload as-built photos on project completion (mandatory)

**Authority — CANNOT DO:**
- Approve projects (Admin-only authority)
- Resolve clashes between departments (Admin-only)
- View other departments' internal project details (can see public status only)
- Assign supervisors from other departments
- See MCDM scores of other departments' projects
- Propose a custom date earlier than Admin's suggested minimum date

**CIVIQ Interaction Pattern:**
- Project submission: 2–5 projects per month
- Progress monitoring: daily
- Clash responses: as needed

---

#### ROLE 4: Field Supervisor (Junior Engineer / Site Supervisor)

**Single job in one sentence:** Update progress on projects assigned to them — accurately and on time.

**Authority — CAN DO:**
- View only projects assigned to them by their Officer
- Update progress percentage on assigned projects (0–100%)
- Upload site photos at key milestones (mandatory at completion)
- View full project details: location, planned dates, scope
- View project location on map
- Report issues or blockers through the app (triggers Admin notification)
- Work offline — all updates sync when connection restored

**Authority — CANNOT DO:**
- Submit projects
- Approve or reject anything
- Assign anyone to any project
- Resolve clashes
- View projects not assigned to them
- See MCDM scores or internal admin details

**CIVIQ Interaction Pattern:**
- Mobile app primary user
- Daily updates from the field
- Often in areas with poor internet — offline mode is critical

**Important note about scope:** Everything below supervisor level — laborers, contractors, daily workers — is outside the app. The supervisor manages their ground team through their own means. The app tracks project-level progress only, not labor management.

---

#### ROLE 5: Citizen (General Public)

**Single job in one sentence:** Know what infrastructure work is happening near them and easily report problems.

**Authority — CAN DO (no login required for map):**
- View all APPROVED and ONGOING projects on the public map (pending/rejected never shown)
- Filter projects by location or area
- View project details: name, department, type, expected completion, disruption warnings
- File a complaint: issue type, location pin, description, optional photo
- Receive a CNR tracking ID (format: CNR-XXXXXX) on submission
- Track complaint status through 4 stages using CNR ID

**Authority — CANNOT DO:**
- Login to the system (public access only for map and complaints)
- See pending or rejected projects
- See internal department data: cost, MCDM scores, documents
- Officer or supervisor names
- Approve, modify, or influence any decision directly

**Indirect Influence:**
Citizen complaint volume about a specific location feeds into MCDM Criteria 1 (Condition Severity). High complaint volume directly increases that area's priority score. Citizens cannot vote — but they influence which work gets prioritized through their complaints.

---

#### ROLE 6: AI Coordination Agent (System Component — Not a Human)

**What it is:** The intelligent engine inside CIVIQ. It is not a chatbot. It is not a replacement for human judgment. It is an analyst that processes every project through multiple data sources and produces structured, confidence-scored recommendations.

**What it does:**
- Runs pre-submission analysis as officer fills the form (real-time, before clicking Submit)
- Calculates MCDM priority score with full breakdown and contextual AI commentary
- Detects clashes (deterministic engine — see Section 9)
- Suggests clash resolution options with confidence scores and reasoning
- Detects long-term protection violations (see Section 10)
- Re-optimizes schedule dynamically when projects are delayed or completed early
- Generates restoration plans when new work threatens recently completed infrastructure
- Flags suspicious patterns (gaming attempts, scope creep, undeclared follow-ups)
- Learns from every human accept/reject/modify decision

**The single most important rule:**
> **AI can suggest. AI can flag. AI can explain. AI NEVER decides. Every consequential action requires a human with a name attached to it in the audit log.**

**Confidence Scoring:**
Every AI output must include a confidence score (0–100%) and a brief plain-English explanation of why. No AI output should ever appear to the user as a command or a final decision.

---

### 5.4 Role Hierarchy & Access Control Matrix

```
┌─────────────────┬───────────┬────────────┬───────────┬────────────┬─────────┐
│ CAPABILITY      │ COMMSNR   │ ADMIN      │ OFFICER   │ SUPERVISOR │ CITIZEN │
├─────────────────┼───────────┼────────────┼───────────┼────────────┼─────────┤
│ City-wide       │ ✓ Full    │ ✓ Zone     │ ✗         │ ✗          │ ✗       │
│ Analytics       │           │            │           │            │         │
├─────────────────┼───────────┼────────────┼───────────┼────────────┼─────────┤
│ View All Depts  │ ✓         │ ✓          │ ✗ Own     │ ✗ Assigned │ Public  │
│ Projects        │           │            │ only      │ only       │ only    │
├─────────────────┼───────────┼────────────┼───────────┼────────────┼─────────┤
│ Approve /       │ ✗         │ ✓          │ ✗         │ ✗          │ ✗       │
│ Reject Projects │           │            │           │            │         │
├─────────────────┼───────────┼────────────┼───────────┼────────────┼─────────┤
│ Submit Projects │ ✗         │ ✗          │ ✓ Own     │ ✗          │ ✗       │
│                 │           │            │ dept      │            │         │
├─────────────────┼───────────┼────────────┼───────────┼────────────┼─────────┤
│ Override MCDM   │ ✗         │ ✓ Logged   │ ✗         │ ✗          │ ✗       │
├─────────────────┼───────────┼────────────┼───────────┼────────────┼─────────┤
│ Assign          │ ✗         │ ✗          │ ✓ Own     │ ✗          │ ✗       │
│ Supervisors     │           │            │ dept      │            │         │
├─────────────────┼───────────┼────────────┼───────────┼────────────┼─────────┤
│ Update Progress │ ✗         │ ✗          │ ✗         │ ✓ Assigned │ ✗       │
│                 │           │            │           │ only       │         │
├─────────────────┼───────────┼────────────┼───────────┼────────────┼─────────┤
│ View Audit Log  │ ✓ Full    │ ✓ Zone     │ ✗         │ ✗          │ ✗       │
├─────────────────┼───────────┼────────────┼───────────┼────────────┼─────────┤
│ File Complaints │ ✗         │ ✗          │ ✗         │ ✗          │ ✓       │
├─────────────────┼───────────┼────────────┼───────────┼────────────┼─────────┤
│ View Public Map │ ✓         │ ✓          │ ✓         │ ✓          │ ✓       │
├─────────────────┼───────────┼────────────┼───────────┼────────────┼─────────┤
│ System Config   │ ✓         │ ✗          │ ✗         │ ✗          │ ✗       │
└─────────────────┴───────────┴────────────┴───────────┴────────────┴─────────┘
```

---

## 6. High-Level Architecture

### 6.1 Architecture Principles

1. **Deterministic rules stay deterministic.** The clash detection engine uses explicit business logic — not AI. AI sits on top for suggestions and learning, but the detection itself is rule-based and auditable.
2. **AI enhances, not replaces.** AI enhances MCDM scoring with contextual reasoning. The structured 7-criteria inputs and their weights remain. AI adds commentary, pattern detection, and confidence scoring.
3. **Human-in-the-Loop is non-negotiable.** Every AI output is a suggestion. Every consequential action has a human name in the audit trail.
4. **Enforcement through integration.** Adoption is enforced through ERP API integration — CIVIQ approval is a technical prerequisite for budget release. Not a policy request.
5. **Mobile-first, offline-first.** Field reality in India means intermittent connectivity. The system must work without internet and sync reliably when connected.
6. **Immutable audit trail.** Every action is logged. Logs cannot be deleted, only archived. Cryptographic hashing ensures tamper detection.
7. **Multi-city from day one.** Architecture is built for Ghaziabad first but designed to scale to any Indian municipal city without re-engineering.

### 6.2 System Architecture Diagram

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                            CIVIQ PLATFORM V3.0                               ║
╚══════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────┐
│                           PRESENTATION LAYER                                 │
│                                                                               │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐  │
│  │   Web Dashboard  │  │   Mobile App     │  │   Public Citizen Portal  │  │
│  │   (Next.js 15)   │  │   (React Native  │  │   (Next.js, no login)   │  │
│  │                  │  │    + Expo)        │  │                          │  │
│  │ Commissioner     │  │                  │  │  Public Map (OSM)         │  │
│  │ Admin            │  │ Field Supervisor │  │  Complaint Filing         │  │
│  │ Dept Officer     │  │ (Offline-first)  │  │  CNR Status Tracking     │  │
│  └────────┬─────────┘  └────────┬─────────┘  └──────────────┬───────────┘  │
└───────────┼─────────────────────┼─────────────────────────── ┼─────────────┘
            │                     │                             │
            └──────────────┬──────┘                             │
                           ▼                                    ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY + AUTH LAYER                              │
│                                                                               │
│  Rate Limiting · JWT Validation · RBAC Enforcement · WAF · Audit Log Entry   │
│  SSO Integration with Govt ERP Systems (NIC SSO / State Portal)              │
└──────────────────────────────────┬───────────────────────────────────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
┌─────────────────────┐ ┌──────────────────┐ ┌──────────────────────────────┐
│  CORE BACKEND       │ │  AI COORDINATION │ │  NOTIFICATION SERVICE        │
│  (NestJS)           │ │  AGENT SERVICE   │ │                              │
│                     │ │                  │ │  Email (SMTP/SES)            │
│  Project Service    │ │  RAG Pipeline    │ │  In-App (WebSocket)          │
│  Clash Service      │ │  LLM Integration │ │  SMS (MSG91 / Gupshup)       │
│  User Service       │ │  Vector DB Query │ │  WhatsApp (Meta API)         │
│  Scoring Service    │ │  Feedback Loop   │ │                              │
│  Location Service   │ │                  │ │  Event Queue (Bull/Redis)    │
│  Complaint Service  │ │  Model: Claude   │ │                              │
│  Audit Service      │ │  Fallback: GPT4o │ │                              │
│  ERP Sync Service   │ └──────────────────┘ └──────────────────────────────┘
│                     │
│  DETERMINISTIC      │ ┌──────────────────────────────────────────────────┐
│  CLASH ENGINE       │ │  MAP & GEO SERVICES                              │
│  (pure rule-based   │ │                                                  │
│   no AI)            │ │  OpenStreetMap (via self-hosted tile server)     │
└──────────┬──────────┘ │  Nominatim (self-hosted, reverse geocoding)     │
           │            │  Overpass API (POI detection)                   │
           │            │  Turf.js (geometric calculations)               │
           │            │  PostGIS (database-level spatial queries)       │
           │            └──────────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              DATA LAYER                                       │
│                                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │  PostgreSQL 16 │  │   MongoDB      │  │   Redis      │  │  Pinecone / │ │
│  │  + PostGIS     │  │                │  │              │  │  Supabase   │ │
│  │                │  │  Complaints    │  │  Cache       │  │  Vector DB  │ │
│  │  Projects      │  │  Audit Logs    │  │  Sessions    │  │             │ │
│  │  Users         │  │  AI Recs       │  │  Job Queue   │  │  Embeddings │ │
│  │  Departments   │  │  Media Meta    │  │  Rate Limit  │  │  of past    │ │
│  │  Clashes       │  │  Raw Docs      │  │  Real-time   │  │  projects,  │ │
│  │  Locations     │  │                │  │  Notifs      │  │  clashes,   │ │
│  │  Overrides     │  │                │  │              │  │  resolutions│ │
│  │  Config        │  │                │  │              │  │             │ │
│  └────────────────┘  └────────────────┘  └──────────────┘  └─────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL INTEGRATIONS                                 │
│                                                                               │
│  Municipal ERP (SAP / NIC PFMS / State ERP)  ←──── Enforcement Hook         │
│  Census India API / data.gov.in              ←──── Population data           │
│  OpenStreetMap / Nominatim                   ←──── Map + geocoding           │
│  MSG91 / Gupshup                             ←──── SMS/WhatsApp              │
│  AWS S3 / Supabase Storage                   ←──── File uploads              │
│  LLM APIs (Claude / GPT-4o)                  ←──── AI suggestions            │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Key Architectural Decisions & Rationale

| Decision | Choice | Rationale |
|---|---|---|
| Clash detection engine | Pure rule-based (deterministic) | Must be auditable, explainable, legally defensible. AI cannot replace this. |
| AI role in scoring | Enhances MCDM with contextual commentary | Keeps structured audit trail. Prevents "black box" scoring that departments can challenge. |
| Backend framework | NestJS (TypeScript) | Clean architecture, dependency injection, excellent for modular government-scale systems |
| Primary database | PostgreSQL + PostGIS | Spatial queries are first-class. PostGIS is industry standard for geographic clash detection. |
| Mobile framework | React Native + Expo | Single codebase for iOS + Android. Expo handles offline storage well. |
| Map provider | OpenStreetMap (self-hosted) | Free, DPDP-compliant (no data sent to Google), customizable, works offline |
| Notification channels | In-app + Email + SMS + WhatsApp | Government officers in India check WhatsApp before email. All channels needed. |
| LLM provider | Claude (primary), GPT-4o (fallback) | Claude has better structured JSON output. Fallback critical for government SLA. |

---

## 7. Data Model

### 7.1 Entity Relationship Overview

```
cities ──────── departments ──────── users
   │                  │                │
   │                  └────────────────┤
   │                                   │
   └──── wards ──── locations ──── projects ──── project_phases
                         │              │               │
                         │         clashes ────── ai_recommendations
                         │              │
                    complaints      overrides
                                       │
                                   audit_logs (partitioned)
```

### 7.2 Core Entities and Relationships

**Projects** are the central entity. Every other entity either describes, constrains, or responds to a project.

**Locations** are separate from projects because the same physical location may be referenced by multiple projects (clash detection requires this).

**Clashes** are a relationship between exactly two projects — they are not a property of a single project.

**AI Recommendations** are always attached to a specific entity (project, clash, complaint) and marked as accepted/rejected to enable the feedback loop.

**Overrides** are a separate table, not a field on projects. This is critical for the audit and pattern detection.

### 7.3 System Configuration Tables

These tables must exist but are often missing from system designs. They store all the business rules that the clash engine and MCDM use:

- `system_config` — buffer values, lifecycle values, seasonal calendar, protection periods
- `conflict_matrix` — work type compatibility rules (✗/~/✓)
- `protection_periods` — long-term protection duration per project type (separate from short-term buffer)

Full physical schema is in Section 23.

---

## 8. Core Workflows & User Flows

### 8.1 Master Flow Overview

```
                    ┌─────────────────────────────────┐
                    │  OFFICER submits project        │
                    └──────────────┬──────────────────┘
                                   │
                    ┌──────────────▼──────────────────┐
                    │  AI runs pre-submission          │
                    │  analysis (real-time)            │
                    │  • Early clash warnings shown    │
                    │  • Priority score preview        │
                    │  • Suggestions shown to officer  │
                    └──────────────┬──────────────────┘
                                   │
                    ┌──────────────▼──────────────────┐
                    │  System runs deterministic       │
                    │  MCDM scoring (automatic)        │
                    │  + Geographic clash detection    │
                    │  + Long-term protection check    │
                    └──────────────┬──────────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
          ▼                        ▼                        ▼
  ┌───────────────┐       ┌────────────────┐      ┌─────────────────┐
  │ NO CLASH      │       │ CLASH DETECTED │      │ PROTECTION      │
  │ DETECTED      │       │                │      │ PERIOD VIOLATED │
  └───────┬───────┘       └───────┬────────┘      └────────┬────────┘
          │                       │                        │
          ▼                       ▼                        ▼
  ┌───────────────┐    ┌──────────────────┐    ┌──────────────────────┐
  │ Admin sees    │    │ Admin sees both  │    │ AI generates          │
  │ project +     │    │ projects side by │    │ restoration plan      │
  │ MCDM score    │    │ side + AI clash  │    │ + Admin must decide   │
  │               │    │ resolution opts  │    │ with justification    │
  └───────┬───────┘    └──────────┬───────┘    └──────────┬───────────┘
          │                       │                        │
          ▼             ┌─────────┼─────────┐              │
  ┌───────────────┐     ▼         ▼         ▼              │
  │ Admin:        │ ┌───────┐ ┌───────┐ ┌───────┐         │
  │ APPROVE or    │ │Approve│ │Approve│ │Reject │         │
  │ REJECT        │ │Both   │ │One    │ │Lower  │         │
  └───────────────┘ │(seq.) │ │       │ │MCDM   │         │
                    └───┬───┘ └───┬───┘ └───┬───┘         │
                        │         │         │              │
                        │         │         ▼              │
                        │         │  ┌──────────────┐     │
                        │         │  │ Suggest next │     │
                        │         │  │ safe date    │     │
                        │         │  │ Officer can: │     │
                        │         │  │ ACCEPT or    │     │
                        │         │  │ CUSTOM DATE  │     │
                        │         │  │ (≥ suggested)│     │
                        │         │  └──────┬───────┘     │
                        │         │         │              │
                        └─────────┴─────────┘              │
                                   │                        │
                    ┌──────────────▼────────────────────────▼──┐
                    │  Project ACTIVE                           │
                    │  Officer assigns Supervisor               │
                    └──────────────┬────────────────────────────┘
                                   │
                    ┌──────────────▼──────────────────┐
                    │  Supervisor updates progress     │
                    │  via mobile app (offline OK)     │
                    └──────────────┬──────────────────┘
                                   │
                    ┌──────────────▼──────────────────┐
                    │  On 100% completion:             │
                    │  • Mandatory as-built photo      │
                    │  • Protection period starts      │
                    │  • Queue notified if applicable  │
                    └──────────────┬──────────────────┘
                                   │
                    ┌──────────────▼──────────────────┐
                    │  CITIZEN sees on public map      │
                    │  throughout approved/active      │
                    └─────────────────────────────────┘
```

### 8.2 Project Submission Flow — Detailed

**Step 1 — Phase Type Selection (First question on form)**

```
What type of submission is this?
○ New standalone project
○ New phased project (this is Phase 1 of a larger plan)
○ Continue existing project (Phase 2, 3, 4...)
```

If "Continue existing project" is selected:
- Dropdown shows officer's department's existing projects
- **Auto-filled from parent project:** Title (editable with Phase 2 suffix), Project Type (LOCKED — cannot change between phases), Department (locked from login), Contractor Name and Firm (editable)
- **Blanked (must fill fresh):** Start Date, End Date, Estimated Cost, Assigned Supervisor, all documents

**Step 2 — Basic Identity**

```
Project Title             Text field, required
Project ID                System-generated, not editable (format: GHZ-PWD-2026-0047)
Department                Auto-filled from login, locked
Project Type              Dropdown: Road / Water Pipeline / Sewage / Electrical / Parks / Other
Project Description       Free text — scope of work, required (minimum 100 chars)
```

**Step 3 — Location** (Full detail in Section 13)

**Step 4 — Timeline**

```
Planned Start Date        Date picker, required (cannot be in the past beyond 30 days)
Planned End Date          Date picker, required (must be after start date)
Estimated Duration        Auto-calculated from dates, display only
Buffer Period             System-defined by project type, NOT SHOWN TO OFFICER
```

**Step 5 — Budget (Informational Only)**

```
Estimated Cost            Number in Rupees, required
Budget Source             Dropdown: Municipal Fund / State Grant / Central Scheme / PPP / Other
Tender Number             Text, optional
Contractor Name           Text (distinguish same-name individuals by firm)
Contractor Firm Name      Text
```

**Step 6 — MCDM Priority Assessment** (Full detail in Section 12)

**Step 7 — Team Assignment**

```
Assigned Supervisor       Dropdown — shows ONLY supervisors from officer's own department
```

**Step 8 — Documents**

```
Project Document PDF      Upload, REQUIRED — cannot submit without
Site Photos               Upload, optional, multiple files
Approval Letter           Upload, optional
```

**On Submit:**
- System auto-runs MCDM scoring
- System auto-runs clash detection (all 4 steps)
- System runs long-term protection check
- AI runs background analysis and prepares suggestion for Admin
- Officer sees: MCDM score + any clash warnings + submission confirmation

### 8.3 Clash Resolution Flow — Complete Rules

**The 3 Dimensions of a Clash — All Three Must Be True Simultaneously**

```
DIMENSION 1 — GEOGRAPHIC OVERLAP
Two project buffered zones intersect on the map.
(Turf.js circle intersection on center coordinates + calculated buffers)

DIMENSION 2 — TIME OVERLAP  
Two project date ranges overlap on the calendar.
Formula: max(startA, startB) < min(endA, endB)

DIMENSION 3 — WORK TYPE CONFLICT
Two project types are incompatible per the conflict matrix.
(See Section 9 for full matrix)
```

If even one dimension is absent → no clash raised.

**Admin Resolution Options:**

```
OPTION 1: APPROVE BOTH WITH COORDINATION
Admin writes coordination note explaining sequence
Admin adjusts one project's dates (projects run sequentially)
Both become ACTIVE
Officer of adjusted project notified with new dates
Officer can accept adjusted dates OR propose a later custom date
System re-checks all 3 dimensions for the new dates
If clean → both ACTIVE
If still clashing → loop repeats with new date

OPTION 2: REJECT LOWER PRIORITY PROJECT
System calculates suggested next safe date:
  = Higher priority project END DATE + BUFFER DAYS (by project type)
Officer of rejected project is notified with:
  - Rejection reason
  - Suggested next safe start date
  - Two options: ACCEPT SUGGESTED DATE or PROPOSE CUSTOM DATE
Custom date rule: MUST BE EQUAL TO OR LATER THAN SUGGESTION
  (System enforces this — earlier dates are blocked)
System re-checks all 3 dimensions with new dates
If clean → Admin final approval
If new clash → loop repeats
Loop ends naturally when officer finds a clean date
```

**Why the Custom Date Rule is Non-Negotiable:**
The suggested date is the minimum safe gap calculated from the higher-priority project's completion + buffer. Allowing an earlier date would defeat the purpose of the buffer. The system enforces this automatically. Officers cannot negotiate this constraint.

**Why Officers Get a Custom Date Option:**
The system only knows projects in CIVIQ. Officers know their ground reality — team availability, equipment schedule, seasonal constraints, internal department commitments not visible to the system. Custom date respects real-world knowledge while maintaining the safety constraint.

### 8.4 Emergency Override Flow

```
1. Officer flags project as EMERGENCY on submission
2. System flags it for Admin with "EMERGENCY" badge
3. AI immediately:
   a. Assesses impact on all nearby projects within protection period
   b. Identifies any recently completed infrastructure at risk
   c. Generates mandatory restoration scope and cost estimate
   d. Assigns restoration responsibility to emergency-filing department
4. Admin sees: Emergency project + impact assessment + AI restoration plan
5. Admin must choose one of 4 legitimate override categories (Section 14)
6. Admin must provide reference number for the category
7. Admin acknowledges: permanent audit trail entry
8. If emergency damages recent infrastructure → restoration task created
9. Restoration task assigned to emergency department with deadline
10. Frequent emergency overrides (>3 in 30 days) → auto-alert to Commissioner
```

### 8.5 Project Completion Flow

```
1. Supervisor marks project progress as 100%
2. System BLOCKS completion until:
   a. Mandatory as-built photo uploaded (minimum 3 photos required)
   b. Actual end date confirmed
3. On confirmed completion:
   a. Long-term protection period starts for this location + project type
   b. Protection period is logged with start date, end date, project type
   c. Any queued projects for this location are notified: "Project X completed.
      Your project can now start from [actual completion date + buffer]"
4. If project completes BEFORE planned end date:
   a. System notifies next queued project:
      "Project X completed early on [date]. 
       You can now start from [actual completion + buffer]."
   b. That officer decides whether to advance their start date
5. Protection period visible to system for clash detection going forward
```

---

## 9. Clash Detection Engine

### 9.1 Design Philosophy

The clash detection engine is **deterministic, rule-based, and fully auditable.** AI is not involved in detection. AI sits on top for resolution suggestions only.

Why? Because every clash detection decision may be challenged by a department officer. "Why was my project flagged?" must have a precise, explainable, defensible answer. "The AI decided" is not an acceptable answer in a government context.

### 9.2 Data Stored Per Project for Clash Detection

```javascript
{
  locationIdentity: {
    roadOrLocalityName: "MG Road",           // auto-detected via Nominatim
    neighbourhood:      "Vijay Nagar",       // auto-detected via Nominatim
    city:               "Ghaziabad",         // auto-detected
    state:              "Uttar Pradesh",     // auto-detected
    ward:               "Ward 14",           // auto-detected via ward boundary GeoJSON
    pincode:            "201001"             // auto-detected via Nominatim
  },
  centerCoordinates: {
    lat: 28.6692,
    lng: 77.4538
  },
  dimensions: {
    shape:  "corridor",   // circle | corridor | rectangle | polygon
    length: 1200,         // meters (for corridor/rectangle)
    width:  15,           // meters (for corridor/rectangle)
    area:   18000         // sqm — calculated by Turf.js
  },
  clashDetectionBuffer: 30,     // meters — calculated by system, NOT by officer
  visualGeoJSON: { ... }        // FOR MAP DISPLAY ONLY — not used in detection
}
```

### 9.3 Why Shape (GeoJSON) Is NOT Used for Clash Detection

Human-drawn shapes are inconsistent and inaccurate. Two officers marking the same road will never draw identical polygons. Using polygon intersection for detection would create:
- False positives (two projects with slightly overlapping boundaries that don't actually conflict)
- False negatives (two projects where polygons don't touch but the work areas clearly overlap)
- Endless disputes about boundary accuracy

**Solution:** Center coordinates + buffer radius. The buffer absorbs human placement inaccuracy. This is reliable, repeatable, and mathematically precise.

The GeoJSON polygon is stored for visualization only — shown on maps for officers, admins, and citizens to understand the project visually. Never used in clash computation.

### 9.4 Buffer Calculation Formula

```
TOTAL DETECTION BUFFER = BASE BUFFER + SIZE BUFFER

BASE BUFFER (by project type):
┌─────────────────────────────────────┬────────────────┐
│ Project Type                        │ Base Buffer    │
├─────────────────────────────────────┼────────────────┤
│ Road reconstruction                 │ 30 metres      │
│ Road resurfacing                    │ 20 metres      │
│ Water pipeline (underground)        │ 15 metres      │
│ Sewage pipeline (underground)       │ 20 metres      │
│ Electrical overhead                 │ 10 metres      │
│ Electrical underground              │ 15 metres      │
│ Parks and plantation                │ 10 metres      │
│ Other                               │ 15 metres      │
└─────────────────────────────────────┴────────────────┘

SIZE BUFFER (by project area in sqm):
┌────────────────────────────────────┬────────────────┐
│ Project Area                       │ Size Buffer    │
├────────────────────────────────────┼────────────────┤
│ 0 – 5,000 sqm                     │ +0 metres      │
│ 5,001 – 20,000 sqm                │ +10 metres     │
│ 20,001 – 50,000 sqm               │ +20 metres     │
│ 50,001 – 100,000 sqm              │ +30 metres     │
│ Above 100,000 sqm                 │ +40 metres     │
└────────────────────────────────────┴────────────────┘

EXAMPLES:
Road resurfacing, 18,000 sqm → 20 + 10 = 30 metres total
Large park, 282,000 sqm → 10 + 40 = 50 metres total
Small pipeline, 3,000 sqm → 15 + 0 = 15 metres total
```

### 9.5 The 4-Step Detection Algorithm

```
STEP 1 — FAST PRE-FILTER (performance optimization)
Input:  city_id + ward_id of both projects
Check:  Same city AND same ward?
Result: NO → STOP immediately. Cannot be a clash.
        YES → Proceed to Step 2.

Reason: Most projects are in different wards. This filter eliminates
        95%+ of comparisons before any geometry calculation.

──────────────────────────────────────────────────────────

STEP 2 — GEOGRAPHIC OVERLAP CHECK
Input:  centerLat/Lng of Project A + bufferA
        centerLat/Lng of Project B + bufferB
Check:  Does the buffered circle of A intersect the buffered circle of B?
Formula: distance(centerA, centerB) < (bufferA + bufferB)
         (using Haversine distance formula for accuracy)
Result: NO → STOP. No geographic overlap.
        YES → Proceed to Step 3.

Reason: Pure coordinate math. Fast, deterministic, O(1) per pair.

──────────────────────────────────────────────────────────

STEP 3 — TIME OVERLAP CHECK
Input:  startA, endA (planned dates of Project A)
        startB, endB (planned dates of Project B)
Check:  Do the date ranges overlap?
Formula: max(startA, startB) < min(endA, endB)
Result: NO → STOP. Different time periods.
        YES → Proceed to Step 4.

Note:   Buffer days for completion (Section 7) are added to endA/endB
        before this calculation. A project "completing" today still
        blocks work during its buffer period.

──────────────────────────────────────────────────────────

STEP 4 — WORK TYPE CONFLICT CHECK
Input:  project type of A, project type of B
Check:  Look up conflict_matrix[typeA][typeB]
Result: COMPATIBLE (✓) → No clash raised. Projects can coexist.
        CONDITIONAL (~) → Flag for Admin review. Not a hard block.
        INCOMPATIBLE (✗) → CLASH RAISED. Admin must resolve.

──────────────────────────────────────────────────────────

FINAL RESULT:
ALL 4 STEPS TRUE → CLASH RAISED TO ADMIN
ANY STEP FALSE → No clash
```

### 9.6 Work Type Conflict Matrix

```
         ROAD  WATER  ELECT  SEWAGE  PARKS
ROAD      ✗      ✗      ~      ✗      ~
WATER     ✗      ✗      ✓      ✗      ✓
ELECT     ~      ✓      ✗      ✓      ✓
SEWAGE    ✗      ✗      ✓      ✗      ✓
PARKS     ~      ✓      ✓      ✓      ✗

KEY:
✗ = Always clash — physically incompatible simultaneously
    (both require excavating the same road surface)
~ = Conditional clash — needs coordination, Admin reviews
    (can potentially coexist with sequencing)
✓ = Compatible — can run simultaneously, no problem
    (different physical layers, no conflict)
```

**Rationale for each combination:**
- Road + Water: Both require road excavation. Classic Indian digging problem. Always clash.
- Road + Sewage: Same. Sewage lines run under roads.
- Road + Electrical (conditional): Overhead electrical can coexist. Underground electrical clashes.
- Water + Electrical: Water underground, electrical overhead or in conduit = compatible.
- Water + Sewage: Both underground but typically different depths/trenches = conditional (depends on location).
- Sewage + Parks: Underground sewage + surface park work = usually compatible.
- Road + Parks: Parks near road may affect access = conditional (needs coordination).
- Same type + Same type: Always clash (two road projects in same location make no sense simultaneously).

### 9.7 Clash Detection Performance Requirements

| Scale | Requirement | Solution |
|---|---|---|
| <1,000 active projects | <100ms per submission check | In-memory check + PostgreSQL spatial index |
| 1,000–10,000 active projects | <500ms per submission check | PostGIS spatial query + ward pre-filter |
| >10,000 active projects | <2s per submission check | PostGIS + Redis cache of active project locations |

---

## 10. Long-Term Protection System

### 10.1 The Problem This Solves

V1's buffer system (3–14 day completion buffer) only prevents immediate re-excavation. It does not prevent the classic scenario: road resurfaced in March, Jal Nigam digs it up in June. The June work is technically allowed because the 14-day buffer from March has expired.

The long-term protection period is CIVIQ's answer to this. It introduces a minimum gap (12–24 months depending on project type) during which the completed location is marked as "protected" and any new work triggering a violation is escalated to Admin with a mandatory restoration plan.

### 10.2 Long-Term Protection vs Short-Term Buffer — Distinction

```
SHORT-TERM BUFFER (Section 9):
Purpose:   Prevent new work starting before previous work physically settles
Duration:  Days (3–14 days)
Effect:    Blocks new project start date (hard block)
Who sets:  System (never visible to officers)

LONG-TERM PROTECTION PERIOD (this section):
Purpose:   Prevent the core problem — expensive fresh work being destroyed by new excavation
Duration:  Months (8–24 months depending on type)
Effect:    Does NOT hard-block. Raises warning + requires Admin decision + AI generates restoration plan
Who sets:  Municipal Commissioner sets policy; system enforces
Overridable: Yes — by Admin with logged justification under one of 4 categories
```

### 10.3 Protection Period Duration Table

```
┌───────────────────────────────────────┬───────────────────────────────────┐
│ Project Type (Completed Work)         │ Protection Period                 │
├───────────────────────────────────────┼───────────────────────────────────┤
│ Road reconstruction (full depth)      │ 24 months                         │
│ Road resurfacing (surface only)       │ 18 months                         │
│ Water pipeline                        │ 18 months                         │
│ Sewage pipeline                       │ 18 months                         │
│ Electrical underground                │ 12 months                         │
│ Electrical overhead                   │ 6 months                          │
│ Parks and plantation (major)          │ 12 months                         │
│ Parks and plantation (minor)          │ 8 months                          │
│ Other                                 │ 12 months                         │
└───────────────────────────────────────┴───────────────────────────────────┘

These values are stored in the protection_periods table and can be updated
by the Municipal Commissioner through system configuration.
They are not hardcoded in application logic.
```

### 10.4 What Happens When a New Project Violates a Protection Period

```
DETECTION:
When a new project is submitted and passes clash detection Steps 1–4,
system additionally checks:
"Is there a COMPLETED project at this location that is within its
 protection period?"

If YES:
  - Flag raised: PROTECTION_PERIOD_VIOLATION
  - AI generates:
    a. Impact assessment: what completed work is at risk
    b. Two-path comparison:
       Path A: New work now → estimated damage + restoration cost
       Path B: Delay new work until protection period ends → total cost
    c. Recommended path with confidence score
    d. If Path A chosen: detailed restoration scope, estimated cost,
       responsibility assignment (new project's department pays restoration)

Admin sees:
  - Protection period violation alert
  - AI-generated impact assessment + both paths
  - Recommended resolution
  - Must either: approve with justification (logged) OR reject + suggest date
```

### 10.5 Restoration Responsibility Rule

This is a critical governance rule. **The department that causes damage during a protection period is financially and operationally responsible for restoration.**

```
RULE: If Department X submits work that will disturb location L,
      and location L is within protection period from Department Y's work,
      and Admin approves Department X's work anyway (with justification),
      THEN Department X's project record is automatically linked to:
        a. Restoration task (scope defined by AI)
        b. Estimated restoration cost
        c. Deadline for restoration completion
        d. Supervisor assignment requirement

This restoration task is tracked in CIVIQ and cannot be closed without:
  - As-built photos of completed restoration
  - Admin sign-off
  - Update of the protection period start date (reset to restoration completion)
```

---

## 11. AI Coordination Agent

### 11.1 What the AI Is and Is Not

**The AI is:**
- An intelligent analyst that reads history, patterns, and rules
- A suggestion generator with confidence scores and reasoning
- A learning system that improves from human feedback
- A pattern detector for gaming attempts, scope creep, and anomalies
- A restoration plan generator
- An explainer that makes complex multi-factor decisions transparent

**The AI is NOT:**
- A decision maker (all consequential actions require human approval)
- A replacement for the deterministic clash engine (Section 9)
- A black box (every suggestion must include plain-English reasoning)
- Always right (humans can override; overrides feed the learning loop)

### 11.2 AI Architecture — RAG + LLM

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AI COORDINATION AGENT                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  INPUT EVENT                                                                 │
│  (project submission / clash detected / completion / emergency)              │
│       │                                                                       │
│       ▼                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                       CONTEXT BUILDER                                │    │
│  │  Assembles:                                                          │    │
│  │  • Current project details (all MCDM inputs + location data)        │    │
│  │  • Relevant system config (buffers, conflict matrix, protection)     │    │
│  │  • Clash detection results (from deterministic engine)              │    │
│  └───────────────────────────┬─────────────────────────────────────────┘    │
│                              │                                                │
│                              ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        RAG RETRIEVER                                 │    │
│  │  Queries Vector Database for:                                        │    │
│  │  • Similar past projects (same type + area + season)                │    │
│  │  • Similar past clashes and how they were resolved                  │    │
│  │  • Human override decisions in similar situations                   │    │
│  │  • Past protection period violations and outcomes                   │    │
│  │  • Citizen complaint patterns for this area                        │    │
│  │  Returns: Top 5–10 most relevant historical cases                  │    │
│  └───────────────────────────┬─────────────────────────────────────────┘    │
│                              │                                                │
│                              ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      PROMPT ENGINE                                   │    │
│  │  Constructs structured prompt including:                             │    │
│  │  • System role: "You are CIVIQ's coordination advisor..."           │    │
│  │  • Current situation context                                         │    │
│  │  • Retrieved historical cases                                        │    │
│  │  • Explicit output format requirements (JSON schema)                │    │
│  │  • Instruction: always explain reasoning, always include confidence │    │
│  └───────────────────────────┬─────────────────────────────────────────┘    │
│                              │                                                │
│                              ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    LLM CALL (Claude / GPT-4o)                        │    │
│  │  Receives structured prompt                                          │    │
│  │  Returns structured JSON response with:                             │    │
│  │  • recommendation_type                                               │    │
│  │  • primary_recommendation (plain English)                           │    │
│  │  • reasoning (why)                                                  │    │
│  │  • confidence_score (0–100)                                         │    │
│  │  • alternatives (2–3 other options with tradeoffs)                 │    │
│  │  • flags (gaming_attempt | scope_creep | protection_risk | etc.)   │    │
│  └───────────────────────────┬─────────────────────────────────────────┘    │
│                              │                                                │
│                              ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    RESPONSE VALIDATOR                                │    │
│  │  Validates:                                                          │    │
│  │  • JSON schema compliance                                            │    │
│  │  • Confidence score is a valid number                               │    │
│  │  • No hallucinated project IDs or dates                            │    │
│  │  • Suggestion doesn't violate deterministic rules                  │    │
│  └───────────────────────────┬─────────────────────────────────────────┘    │
│                              │                                                │
│                              ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    FEEDBACK LOOP                                     │    │
│  │  When human acts on this suggestion:                                │    │
│  │  • ACCEPT → store as positive example in vector DB                 │    │
│  │  • REJECT → store as negative example with admin's reason          │    │
│  │  • MODIFY → store modification as correction signal                │    │
│  │  All feedback continuously improves retrieval relevance            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 11.3 AI Tasks — Complete Specification

#### Task 1: Pre-Submission Analysis
**Trigger:** Officer begins filling project form (before submitting)  
**Input:** Partial project data (location + type + dates)  
**Output:**
```json
{
  "early_warnings": [
    {
      "type": "potential_clash",
      "description": "High probability of clash with Jal Nigam pipeline project in Ward 14",
      "confidence": 82,
      "affected_project_id": "GHZ-JN-2026-0031"
    }
  ],
  "suggested_start_date": "2026-11-01",
  "suggested_date_reasoning": "Avoids monsoon season and clears existing pipeline project buffer",
  "priority_preview": {
    "estimated_score": 78,
    "key_drivers": ["High complaint volume in area (23 in 6 months)", "Critical facilities nearby"]
  }
}
```

#### Task 2: Clash Resolution Suggestions
**Trigger:** Clash detected by deterministic engine  
**Input:** Both project details + clash detection result + historical similar clashes  
**Output:**
```json
{
  "resolution_options": [
    {
      "option_id": 1,
      "description": "Approve both projects sequentially — Jal Nigam completes by Aug 15, PWD starts Sep 1",
      "type": "sequential_approval",
      "adjusted_dates": {"project_b_start": "2026-09-01"},
      "confidence": 87,
      "tradeoffs": "PWD delayed by 6 weeks but both projects complete this fiscal year",
      "cost_estimate": "No additional cost — optimal sequence"
    },
    {
      "option_id": 2,
      "description": "Reject PWD project — reschedule to November after monsoon ends",
      "type": "reject_lower_mcdm",
      "suggested_new_date": "2026-11-01",
      "confidence": 72,
      "tradeoffs": "PWD road work delayed to next season — better quality in dry weather anyway"
    }
  ],
  "recommended_option": 1,
  "recommendation_reasoning": "Option 1 keeps both projects within this fiscal year. Historical data shows sequential approval with 6-week gap works well for Road+Pipeline conflicts in Ward 14.",
  "flags": []
}
```

#### Task 3: MCDM Score Commentary
**Trigger:** MCDM scoring complete  
**Input:** All 7 criteria scores + raw inputs  
**Output:**
```json
{
  "score_commentary": "This project scores 82.7/100. The high score is primarily driven by significant citizen complaint volume (23 complaints in 6 months — highest in Ward 14 this year) and the proximity of City Hospital (180m). The October start date also helps — dry season is optimal for road work. Note: contractor Sharma Constructions has a clean track record (0 stalls in 4 prior projects).",
  "risk_flags": [],
  "gaming_detection": {
    "suspicious": false,
    "reason": "Officer inputs are consistent with historical data for this road section"
  }
}
```

#### Task 4: Dynamic Re-Planning
**Trigger:** Project marked as significantly delayed (>14 days behind planned progress)  
**Input:** Delayed project + all projects in same ward + their MCDM scores  
**Output:** Updated sequencing suggestions for affected projects in queue

#### Task 5: Restoration Planning
**Trigger:** Protection period violation approved by Admin  
**Input:** Completed project details + new project details + protection period data  
**Output:**
```json
{
  "restoration_scope": "The new Jal Nigam pipeline work will cut through 850m of PWD's freshly resurfaced road (completed 4 months ago). Required restoration: full-depth patch repair for trench width + 500mm either side. Estimated 920 sqm of reinstatement.",
  "estimated_cost_inr": 680000,
  "responsible_department": "Jal Nigam",
  "restoration_deadline_days": 30,
  "quality_standard": "Must match or exceed original PWD resurfacing specification",
  "required_documentation": ["Before photos", "During-work photos", "After photos", "Material test report"]
}
```

#### Task 6: Anomaly / Gaming Detection
**Trigger:** New project submission  
**Input:** New project + department's history + similar projects in same area  
**Output:**
```json
{
  "anomalies": [
    {
      "type": "scope_creep",
      "description": "This 'new standalone project' covers exactly the remaining 400m of a project submitted 3 months ago that was approved for only 600m. This appears to be a continuation rather than a new project.",
      "confidence": 91,
      "recommendation": "Admin should ask officer to convert to Phase 2 of Project GHZ-PWD-2026-0023"
    }
  ]
}
```

### 11.4 Continuous Learning Loop

```
WEEK 1:
  AI suggests Option 1 (sequential approval) for Road+Pipeline clash
  Admin accepts → stored as positive case in vector DB

WEEK 3:
  Similar clash — AI again suggests Option 1
  Admin modifies dates slightly (starts 2 weeks later due to local festival)
  Stored as: "Option 1 with festival-aware date adjustment" positive case

MONTH 2:
  AI now automatically checks local festival calendar
  before suggesting dates for Ward 14 projects

MONTH 6:
  AI acceptance rate for Ghaziabad Admin: 74%
  (Above 70% target — system is learning well)

QUARTERLY REVIEW:
  Low-acceptance cases reviewed
  Prompt templates updated based on patterns
  Vector DB cleaned of outdated cases
```

---

## 12. MCDM Priority Scoring Engine

### 12.1 Design Philosophy

The MCDM (Multi-Criteria Decision Making) engine scores every project across 7 weighted criteria. The AI enhances this with contextual commentary and gaming detection — but the structured 7-criteria framework remains. This is intentional.

**Why keep the structured framework?**
- Fully auditable — every score has a traceable calculation
- Legally defensible — departments can challenge scores and see the math
- Prevents black-box scoring that departments cannot understand or trust
- Gaming is detectable because AI can cross-validate officer inputs against historical data

### 12.2 The 7 Criteria with Weights

```
CRITERIA                          WEIGHT   INPUT SOURCE
──────────────────────────────────────────────────────────────
1. Condition Severity              26%     Officer + DB complaints
2. Population & Facility Impact    21%     System (map auto-detect)
3. Seasonal Compatibility          16%     System (calendar auto)
4. Execution Readiness             16%     Officer + DB history
5. Citizen Disruption During Work  10%     Officer inputs
6. Infrastructure Age               8%     Officer (one year field)
7. Economic Value                   3%     System (map auto-detect)
──────────────────────────────────────────────────────────────
TOTAL                             100%

OFFICER CONTROLS:    Criteria 1, 4, 5, 6 → 60% of total
SYSTEM CONTROLS:     Criteria 2, 3, 7     → 40% of total (cannot be gamed)
```

### 12.3 Input Specification — Category 1: Officer-Provided Inputs

**Question 1 — Infrastructure Condition** → Criteria 1 (26%)

```
Q1: What is the current condition of this infrastructure?
○ Critical — immediate risk, unsafe for use                    [Score: 10]
○ Poor     — heavily deteriorated, causes daily problems       [Score: 7]
○ Fair     — visible damage, functional but degrading          [Score: 4]
○ Good     — minor issues, preventive work needed              [Score: 2]

AI CROSS-VALIDATION: AI compares officer's condition rating against:
  a. Complaint volume for this location in last 6 months
  b. Last known inspection/completion date in CIVIQ history
  c. Infrastructure type lifecycle age
If AI detects inconsistency (officer rates "Good" but 25 complaints in 3 months),
it flags for Admin review as "Possible gaming attempt — review condition rating"
```

**Question 2 — Incidents** → Criteria 1 (adds to condition score)

```
Q2: Have there been any reported incidents at this location?
(Select all that apply)
□ Accidents or injuries at this location
□ Infrastructure collapse or failure
□ Flooding or waterlogging due to this infrastructure
□ No incidents reported

Scoring addition:
  Any single incident type checked: +2 to condition score
  Two or more incident types: +3 to condition score (cap at 10)
```

**Question 3 — Infrastructure Age (Year)** → Criteria 6 (8%)

```
Q3: When was the last major work done on this infrastructure?
[YYYY] — year only
If never repaired since construction, enter year built.

System calculates:
  age_years = current_year - entered_year
  lifecycle = system_config[project_type].lifecycle_years
  urgency_ratio = age_years / lifecycle

Scoring:
  urgency_ratio > 1.5 (overdue by 50%+):   10
  urgency_ratio 1.0–1.5 (overdue):          8
  urgency_ratio 0.7–1.0 (near end):         6
  urgency_ratio 0.4–0.7 (mid-lifecycle):    3
  urgency_ratio < 0.4 (recently done):      1
```

**Question 4 — Tender Status** → Criteria 4 (16%)

```
Q4: What is the current execution status?
○ Tender complete — procurement finished                 [Score: 8]
○ Tender in process — procurement underway              [Score: 5]
○ Planning stage — tender not yet started               [Score: 2]

Rationale: Approving a project that cannot actually start wastes
the approval slot and blocks the queue. Execution readiness is
a real priority dimension, not just paperwork.
```

**Question 5 — Contractor Assignment** → Criteria 4 (added to tender score)

```
Q5: Has a contractor been assigned to this project?
○ Yes — contractor identified and confirmed              [+2 to Criteria 4]
○ No  — contractor not yet assigned                     [+0]

Combined with Q4:
  Tender complete + contractor assigned = 10
  Tender complete + no contractor = 8
  Tender in process + contractor = 7
  Tender in process + no contractor = 5
  Planning + contractor = 4
  Planning + no contractor = 2
```

**Question 6 — Road Closure** → Criteria 5 (10%)

```
Q6: Will the road be closed during this work?
○ Full closure — road completely blocked                [Score: 2] ← high disruption
○ Partial closure — one lane or side remains open      [Score: 6]
○ No closure — traffic unaffected                      [Score: 10]

Note: Counter-intuitive scoring — LOWER disruption = HIGHER disruption score
This is correct. Criteria 5 measures DISRUPTION IMPACT.
High disruption = low score = pulls DOWN overall priority
unless condition severity and urgency justify it.
```

**Question 7 — Utility Disruption** → Criteria 5 (combined with road closure)

```
Q7: Which utilities will be disrupted during work?
(Select all that apply)
□ Water supply
□ Electricity
□ Drainage and sewage
□ Gas supply (PNG)
□ No utility disruption

Scoring: Each utility disrupted subtracts from Criteria 5 base:
  No disruption: 10
  1 utility: 8
  2 utilities: 6
  3 utilities: 4
  4 utilities: 2
```

**Question 8 — Disruption Duration** → Criteria 5 (combined with Q6+Q7)

```
Q8: How many days will citizens face disruption?
[__] days (citizen-facing disruption, not full project duration)

Duration scoring component:
  1–3 days:    10
  4–7 days:    8
  8–14 days:   6
  15–30 days:  4
  >30 days:    2

FINAL Criteria 5 Score = average of (Q6 score + Q7 score + Q8 score)
```

### 12.4 Input Specification — Category 2: System Auto-Detected from Map

**Factor 1 — Population Estimate** → Criteria 2 (21%)

```
Source: Census India ward-level population data (data.gov.in)
Import: One-time download, stored in PostgreSQL
Query: When location set, identify ward → retrieve population
Calculate: population × (project_area / ward_area) = estimated_affected_population

Scoring:
  >100,000 people: 10
  50,000–100,000: 8
  20,000–50,000: 6
  5,000–20,000: 4
  <5,000: 2
```

**Factor 2 — Critical Facilities** → Criteria 2 (combined with population)

```
Source: OpenStreetMap via Overpass API (free, no key needed)
Query at runtime: Find POIs within project buffer distance

Scoring additions:
  Hospital or clinic:                +3
  School or college:                 +2
  Fire station or police station:    +2
  Railway station / bus depot:       +2
  Market / commercial zone:          +1

FINAL Criteria 2 = (Population score + Facility score, capped at 10) × 21%
```

**Factor 3 — Seasonal Compatibility** → Criteria 3 (16%)

```
Source: system_config.seasonal_calendar (stored in DB, not hardcoded)

Ghaziabad seasonal config:
{
  "monsoon":    [6, 7, 8, 9],       // June–September
  "pre_monsoon": [4, 5],            // April–May
  "dry_season": [10, 11, 12, 1, 2, 3] // October–March
}

Scoring by project type:
Road and surface work:
  Dry season (Oct–Mar):   10
  Pre-monsoon (Apr–May):   6
  Monsoon (Jun–Sep):       1

Underground work (pipeline, underground electrical):
  Any season:  8 (less rain-sensitive, but monsoon still -1)
  Monsoon:     6

Parks and plantation:
  Monsoon (Jun–Sep):   10 (best for planting)
  Pre-monsoon:          6
  Winter (Dec–Feb):     4
  Summer (Mar–May):     2
```

**Factor 4 — Economic Zone** → Criteria 7 (3%)

```
Source: OpenStreetMap land use tags via Overpass API

Scoring:
  Industrial area connectivity:        10
  Commercial / market zone:            8
  Mixed residential + commercial:      5
  Pure residential:                    3
  Low-activity / remote area:          1

Note: Weight is 3% intentionally. Economic value should NOT override
human suffering. A poor residential area with broken infrastructure
deserves repair even if economic multiplier is low.
```

### 12.5 Input Specification — Category 3: Database-Derived

**Factor 1 — Citizen Complaint Volume** → Criteria 1 (boosts condition score)

```
Query: Count complaints filed about this location in last 6 months
Method: MongoDB $near geospatial query within project buffer distance

db.complaints.countDocuments({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [lng, lat] },
      $maxDistance: bufferMetres
    }
  },
  createdAt: { $gte: sixMonthsAgo },
  status: { $ne: "Invalid" }
})

Scoring:
  >20 complaints: +3 to Criteria 1
  10–20 complaints: +2
  5–9 complaints: +1
  <5 complaints: +0
```

**Factor 2 — Contractor Track Record** → Criteria 4

```
Query: Count past projects by this contractor firm that stalled or were abandoned

Scoring:
  0 stalls in project history: +2 to Criteria 4
  1 stall: +0
  2+ stalls: -2 to Criteria 4

Note: Contractor firm name (not individual name) is the lookup key.
Same firm, different site manager — same accountability.
```

**Factor 3 — Department Completion Rate** → Criteria 4

```
Query: % of this department's past projects completed on time

Scoring:
  >80% on time: +2 to Criteria 4
  60–80% on time: +0
  <60% on time: -2 to Criteria 4
```

### 12.6 MCDM Calculation Example

```
PROJECT: Vijay Nagar Main Road Reconstruction (GHZ-PWD-2026-0047)
OFFICER: PWD Department, Ghaziabad

OFFICER INPUTS:
  Q1 Condition: Poor → 7
  Q2 Incidents: Accidents reported → +2 → Condition = 9
  Q3 Last work: 2011 (15 years ago, lifecycle 10 years, ratio 1.5) → 10
  Q4 Tender: In process → 5
  Q5 Contractor: Assigned → +2 → Execution = 7
  Q6 Road closure: Partial → 6
  Q7 Utilities: Water disrupted → 8
  Q8 Duration: 8 days → 6
  Criteria 5 = avg(6, 8, 6) = 6.7

MAP AUTO-DETECTION:
  Population: 38,000 (Ward 14) → 6
  Facilities: Hospital 180m (+3), School 95m (+2), Bus depot 210m (+2) → +7
  Criteria 2 raw: 6 + 7 = 13 → capped at 10
  Season: October start, dry season → 10
  Economic: Mixed commercial → 5

DATABASE:
  Complaints nearby (6 months): 23 → +3 → Condition = 9 + 3 = 10 (final: 10)
  Contractor (Sharma Constructions): 0 stalls → +2 → Execution = 7 + 2 = 9
  Dept completion rate: 78% → +0 → Execution = 9

CALCULATION:
  Criteria 1 (Condition): 10 × 26% = 2.60
  Criteria 2 (Population/Facility): 10 × 21% = 2.10
  Criteria 3 (Seasonal): 10 × 16% = 1.60
  Criteria 4 (Execution): 9 × 16% = 1.44
  Criteria 5 (Disruption): 6.7 × 10% = 0.67
  Criteria 6 (Age): 10 × 8% = 0.80
  Criteria 7 (Economic): 5 × 3% = 0.15
  ─────────────────────────────────────
  TOTAL: 9.36 / 10 → Displayed as: 93.6 / 100

AI COMMENTARY: "This project scores 93.6/100 — one of the highest-priority
projects in the current queue. Three factors are driving this: (1) 23 citizen
complaints in 6 months — highest in Ward 14, (2) City Hospital just 180 metres
away — infrastructure failure has direct health safety implications, (3) Road
was last repaired in 2011 — 15 years ago, 50% beyond its 10-year lifecycle.
The October start date is optimal — dry season ensures quality work. No gaming
flags detected — officer inputs are consistent with location complaint history."
```

### 12.7 What the Officer Sees After Submitting

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ Project GHZ-PWD-2026-0047 submitted successfully

  Your project priority score: 93.6 / 100

  Key score drivers:
  • High citizen complaint volume in this area (23 in 6 months)
  • City Hospital and school within project area
  • Infrastructure overdue by 5 years

  Status: Pending Admin Review

  ⚠️ 1 potential clash detected with:
     "Jal Nigam — Vijay Nagar Pipeline Upgrade" (GHZ-JN-2026-0031)
     Both projects involve road excavation in the same ward.
     Admin will review both projects together.

  You will be notified when Admin makes a decision.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 13. Location & Map System

### 13.1 Core UX Principle

> Form and map are ALWAYS shown together simultaneously. Left panel: input fields. Right panel: live map. They are always in sync — changing one updates the other instantly.

Officers never choose between typing or clicking. Both are always available simultaneously.

### 13.2 Three Input Methods — Always Simultaneous

```
METHOD 1 — TYPE ADDRESS
Officer types in text field
Autocomplete suggestions via Nominatim (free, self-hosted OSM geocoding)
Officer selects → map pans, pin drops, fields auto-fill

METHOD 2 — CLICK ON MAP
Officer clicks any point on map
Nominatim reverse geocoding fills address fields
System detects road name, ward, locality automatically

METHOD 3 — GPS / CURRENT LOCATION
Officer clicks "Use my location"
Browser Geolocation API (works on mobile)
Pin drops at officer's actual physical location
Useful when standing at the project site
All three methods available simultaneously — never forced to choose one
```

### 13.3 Location Path A — Along a Road or Street

Used for: road repair, pipeline along road, electrical work along road

```
STEP 1 — Find the road
  [Search road name...] → Nominatim autocomplete
  OR click on road on map
  OR use GPS

STEP 2 — Mark the work stretch
  [📍 Mark start point] — click or type
  [📍 Mark end point]   — click or type
  System draws corridor following actual OSM road centerline
  Default corridor width by project type:
    Road work: 12 metres
    Pipeline: 5 metres
    Electrical: 3 metres
  Officer can adjust width

STEP 3 — Auto-fill (system detects):
  Start landmark (nearest junction name)
  End landmark
  Corridor length in metres (Turf.js)
  Total area (length × width)
  Ward number
  Full address string: "MG Road from Vijay Chowk to Gandhi Nagar Crossing,
                        Vijay Nagar, Ghaziabad, UP — 1.2 km"
```

### 13.4 Location Path B — Specific Location or Area

Used for: parks, substations, open ground, water tanks, local works

```
STEP 1 — Drop pin
  [Drop pin on map] OR [type address] OR [use GPS]

STEP 2 — Select area shape
  ○ Circle     — for parks, substations, open ground
  ○ Corridor   — for linear work on unnamed road
  ○ Rectangle  — for construction sites, market work
  ○ Custom     — officer clicks points to draw any shape

STEP 3 — Adjust size
  Circle:     50m / 100m / 200m / 500m / Custom radius
  Corridor:   length (custom) × width (custom)
  Rectangle:  length × width (custom)
  Custom:     Click points on map, close shape

STEP 4 — System pre-selects shape by project type:
  Road → Corridor default
  Parks → Circle default
  Substation → Rectangle default
  Officer can always change
```

### 13.5 Auto-Detection and Officer Verification

```
After location is set, system shows verification panel:
"We detected the following. Please verify and correct if needed:"

┌────────────────────────────────────────────────────────┐
│ Ward:        Ward 14, Vijay Nagar          [✓ Correct]│
│ Zone:        East Zone                     [✓ Correct]│
│ Address:     MG Road, Vijay Nagar...   [✓ or ✏️ Edit] │
│                                                        │
│ Nearby critical facilities detected:                   │
│   🏥 City Hospital — 180m              [✓ Correct]    │
│   🏫 Govt Senior Secondary School — 95m [✓ Correct]   │
│   🚌 Vijay Nagar Bus Depot — 210m      [✓ Correct]    │
│                                                        │
│ Population estimate: ~38,000            [✓ Correct]   │
└────────────────────────────────────────────────────────┘

Officer corrections:
  All corrections are saved with: corrected_by_officer: true
  Corrections create an audit log entry
  AI uses correction data to improve future auto-detection accuracy
  Admin can see when officer corrected auto-detected values
  If officer repeatedly corrects map data → flagged for map data review
```

### 13.6 Live Clash Preview (Before Submission)

```
After location confirmed:
"🔍 Checking existing projects in this area..."

If overlaps found:
"⚠️ 1 existing project overlaps this area and time period.
 Admin will review these clashes when you submit.
 You can still submit — Admin will coordinate."

Highlighted on map: overlapping project's area in orange

If clean:
"✓ No existing project overlaps detected in this area and time period."

Officer cannot be blocked from submitting by a clash warning.
Submission proceeds. Admin handles the clash.
```

### 13.7 Map Data Sources

| Data | Source | Update Frequency | Notes |
|---|---|---|---|
| Base maps (roads, buildings, POIs) | OpenStreetMap (self-hosted tiles) | Monthly refresh | Free, DPDP-compliant, works offline |
| Geocoding (address → coordinates) | Nominatim (self-hosted instance) | Same as OSM | Self-hosted critical for data privacy |
| Reverse geocoding (coordinates → address) | Nominatim | Same as OSM | |
| Points of Interest (hospitals, schools) | Overpass API (live queries) | Real-time | Free, no API key needed |
| Ward boundaries (GeoJSON) | Ghaziabad Municipal Corporation / data.gov.in | Annual | Downloaded once, stored in PostGIS |
| Population data (ward-level) | Census India / data.gov.in | 10-year census | Downloaded once, stored in PostgreSQL |
| Area calculation | Turf.js (in-app library) | N/A | Pure math, no API |

**Self-hosting requirement:** Both OSM tile server and Nominatim must be self-hosted (not using Google Maps, not using nominatim.openstreetmap.org). Reasons: (1) DPDP Act compliance — no project location data sent to third parties, (2) Reliability — no rate limits, no API key failures, (3) Cost — no per-request charges.

---

## 14. Admin Override System

### 14.1 Philosophy

MCDM + AI is the expert advisor. Admin is the judge. Admin can override but must justify with a logged reason. This prevents corruption while respecting genuine human judgment for situations the system cannot quantify.

### 14.2 The 4 Legitimate Override Categories

```
CATEGORY 1 — DECLARED EMERGENCY
Valid for: Natural disaster, sudden infrastructure collapse, public health crisis,
           flood damage requiring immediate repair
Required reference: Official disaster declaration number OR emergency notice
                    reference number issued by competent authority

CATEGORY 2 — LEGAL MANDATE
Valid for: Court order, tribunal direction, statutory compliance deadline,
           regulatory requirement with legal penalty
Required reference: Case number OR official order reference number
                    (High Court, NGT, or equivalent)

CATEGORY 3 — STATE / CENTRAL GOVERNMENT DIRECTIVE
Valid for: Government scheme with published deadline, CM/PM publicly announced
           project, national or state event preparation mandate
Required reference: Official communication reference number OR government
                    order number (GO number)

CATEGORY 4 — SAFETY ESCALATION
Valid for: New safety data received AFTER project submission — new accident
           reports, structural engineering survey findings, hazard assessment
Required reference: Report reference number OR incident report number from
                    competent authority
```

### 14.3 Override Flow

```
1. Admin selects "Override MCDM Recommendation"
2. System shows: "You are overriding a system recommendation.
                  This action is permanently logged."
3. Admin must select ONE of the 4 categories
4. Admin must enter the required reference number
5. Admin must write minimum 100 characters of explanation
6. Admin must check acknowledgment:
   "I understand this override is permanently logged and visible in
    the complete audit trail accessible by the Municipal Commissioner."
7. System logs:
   - Admin user ID, name
   - Timestamp
   - Override category
   - Reference number provided
   - Explanation text
   - What was being overridden (project ID, clash ID, etc.)
   - Original AI/MCDM recommendation
8. Commissioner receives notification of override within 1 hour
```

### 14.4 If No Category Applies

```
If admin clicks "None of the above categories applies":
  - Admin must write minimum 200 character explanation
  - Override is flagged as "UNCLASSIFIED OVERRIDE" in audit log
  - Commissioner notification is IMMEDIATE (not batched)
  - Flagged in Commissioner dashboard as requiring attention
  - Permanently marked in audit log — cannot be reclassified later
```

### 14.5 Pattern Detection — Anti-Gaming

```
THRESHOLD RULE:
If any Admin overrides MCDM/AI recommendations for more than 25% of
clashes resolved in any 30-day period:

  Action 1: System flags the pattern
  Action 2: Commissioner receives weekly report of this admin's overrides
  Action 3: Override report included in Commissioner's monthly analytics

PATTERN TYPES TO DETECT:
  a. Admin consistently favors one department (e.g., always approves PWD
     projects when they clash with others, regardless of MCDM scores)
  b. Admin consistently overrides AI suggestions for specific project types
  c. Same reference number used for multiple overrides
     (likely fabricated justification)
  d. Override frequency spikes around budget year end
     (departments rush projects, admins rubber-stamp)
```

---

## 15. Enforcement & Adoption Mechanism

### 15.1 The Adoption Problem

CIVIQ solves a real problem. But no solution matters if departments don't use it.

In V1, submission was voluntary. In Indian government reality, voluntary means bypassed. The only mechanism that guarantees adoption is making CIVIQ approval a technical prerequisite for something departments cannot avoid: **budget release**.

### 15.2 ERP Enforcement Integration

```
MECHANISM:
  Department Officer submits project in CIVIQ → CIVIQ generates approval token
  Officer submits work order/tender in ERP → ERP asks for CIVIQ token
  ERP calls CIVIQ API to validate token
  If token valid and approved: ERP allows budget release, work order proceeds
  If token absent or not approved: ERP BLOCKS the transaction

This is not a policy rule. It is a technical block.
The department cannot release budget without a valid CIVIQ approval token.
The CIVIQ approval token is cryptographically signed and has an expiry.
```

### 15.3 ERP Integration Technical Design

See Section 19 for full technical specification.

### 15.4 Governance Enforcement

```
LAYER 1 — OFFICIAL ORDER
Municipal Commissioner issues official order:
"All civil infrastructure works within [city] requiring ground excavation
or surface disruption must be registered and approved in CIVIQ before
issuance of work orders or release of funds. Non-compliance will be treated
as financial irregularity under Municipal Accounts Rules."

LAYER 2 — TECHNICAL BLOCK (ERP integration)
Project cannot proceed to tender/payment without CIVIQ token
(Technical enforcement — not dependent on human compliance)

LAYER 3 — AI MONITORING
AI monitors complaint data and map updates for signs of unregistered work
If public complaints mention "digging on [road]" but no CIVIQ project exists
for that road → auto-alert to Admin and Commissioner

LAYER 4 — DEPARTMENT PERFORMANCE METRICS
Commissioner dashboard shows:
  Department X: 94% projects registered in CIVIQ before work
  Department Y: 67% compliance — flagged for review
  Published monthly → creates social/professional pressure
```

### 15.5 Phased Enforcement Rollout

```
PHASE 1 (Months 1–3 after pilot launch):
  Soft mode: CIVIQ sends reminder if work order submitted without CIVIQ token
  No hard block yet. Training focus. Build habit.
  Target: 60% voluntary compliance

PHASE 2 (Months 4–6):
  Mandatory for projects above ₹10 Lakhs
  ERP soft warning for smaller projects
  Target: 85% compliance for large projects

PHASE 3 (Month 7+):
  Full mandatory enforcement for ALL project sizes
  ERP hard block — no exceptions without Commissioner-level override
  Target: 95%+ compliance

This phased approach gives departments time to adapt
while building irreversible technical enforcement.
```

---

## 16. Notification System

### 16.1 Notification Events Table

Every notification in the system is defined here. Nothing should be sent that isn't in this table.

```
┌─────────────────────────────────────┬───────────────────┬──────────────────────────────┬───────────────────────────────┐
│ TRIGGER EVENT                       │ WHO IS NOTIFIED   │ CHANNELS                     │ REQUIRED ACTION               │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Project submitted                   │ Admin(s) for zone │ In-app + Email               │ Review within 48 hours        │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Clash detected on submission        │ Admin + both      │ In-app + Email + SMS         │ Admin: review clash           │
│                                     │ Officers involved │                              │ Officers: await decision      │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Project approved                    │ Submitting Officer│ In-app + Email               │ Assign supervisor             │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Project rejected with suggested     │ Submitting Officer│ In-app + Email + SMS         │ Accept date or propose new    │
│ reschedule date                     │                   │                              │ (must be ≥ suggested)         │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Officer proposes custom date        │ Admin             │ In-app + Email               │ Review new date for clashes   │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Project approved after date         │ Officer           │ In-app + Email               │ Assign supervisor             │
│ rescheduling                        │                   │                              │                               │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Supervisor assigned to project      │ Supervisor        │ In-app + SMS                 │ Begin progress tracking       │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Project start date is tomorrow      │ Supervisor        │ In-app + SMS + WhatsApp      │ Begin work                    │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Project progress not updated        │ Supervisor        │ In-app + WhatsApp            │ Update progress               │
│ in 72 hours (during active project) │ + Officer         │                              │ (Officer: check on site)      │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Project significantly delayed       │ Officer + Admin   │ In-app + Email               │ Admin: re-optimize schedule   │
│ (>14 days behind planned progress)  │                   │                              │ Officer: update reason        │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Project completed (100% by super)   │ Officer           │ In-app + Email               │ Verify + upload as-built      │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ As-built photos uploaded,           │ Queued project    │ In-app + Email + SMS         │ Decide whether to advance     │
│ project in protection now           │ Officers nearby   │                              │ start date                    │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Protection period violation on      │ Admin + both      │ In-app + Email               │ Admin: decide with           │
│ new project submission              │ Officers          │                              │ restoration plan              │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Admin override above threshold      │ Commissioner      │ In-app + Email               │ Review admin pattern          │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Unclassified override               │ Commissioner      │ In-app + Email (immediate)   │ Immediate review required     │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Citizen complaint CNR filed         │ Relevant dept     │ In-app + Email               │ Acknowledge within 48 hours   │
│                                     │ Officer           │                              │                               │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Complaint status updated            │ Citizen (by CNR)  │ SMS to submitted mobile      │ None (informational)          │
│                                     │                   │ (if provided)                │                               │
├─────────────────────────────────────┼───────────────────┼──────────────────────────────┼───────────────────────────────┤
│ Emergency project submitted         │ Admin (immediate) │ In-app + Email + SMS +       │ Immediate review              │
│                                     │ + Commissioner    │ WhatsApp                     │                               │
└─────────────────────────────────────┴───────────────────┴──────────────────────────────┴───────────────────────────────┘
```

### 16.2 Channel Priority (Indian Context)

```
PRIORITY ORDER FOR CRITICAL NOTIFICATIONS:
1. WhatsApp (most reliable — Indian government officers check WhatsApp constantly)
2. SMS (fallback if WhatsApp unavailable, works on any phone)
3. In-app (real-time, requires app open)
4. Email (least immediate — used for formal records, not time-sensitive)

For non-critical notifications (status updates, confirmations):
  In-app + Email only

Provider:
  SMS + WhatsApp: MSG91 (Indian provider, TRAI-compliant)
  Fallback: Gupshup (another Indian provider)
  Never: International providers for government notifications (data residency)
```

### 16.3 Notification Queue Architecture

```
Technology: Bull (Redis-based job queue)

Queue types:
  immediate_queue:    Max delay 30 seconds (emergencies, clash alerts)
  standard_queue:     Max delay 5 minutes (normal notifications)
  digest_queue:       Daily summary emails (analytics, daily queue review)

Retry logic:
  On failure: retry 3 times with exponential backoff
  After 3 failures: log failure, send alternative channel
  After all channels fail: log as NOTIFICATION_FAILED in audit log
```

---

## 17. Citizen Information System

### 17.1 Public Map

```
Access:   No login required — fully public
URL:      civiq.ghaziabad.gov.in/map (example)
Data:     APPROVED and ONGOING projects only
          PENDING and REJECTED projects never shown publicly

MAP DISPLAY:
Color coding by project type:
  Road:        🟠 Orange
  Water:       🔵 Blue
  Electricity: 🟡 Yellow
  Sewage:      🟣 Purple
  Parks:       🟢 Green
  Other:       ⚫ Grey

Each project popup shows:
  Project name (public-facing title)
  Department responsible (e.g., "PWD — Roads")
  Project type
  Planned start date
  Expected completion date
  ⚠️ Road closure warning (if applicable)
  ⚠️ Utility disruption warning + affected utilities
  Current status: Approved / Ongoing
  % completion (from supervisor updates)

NOT shown publicly:
  Estimated cost
  MCDM scores or priority ranking
  Officer or supervisor names
  Internal documents
  Budget source or tender details
  Contractor name
```

### 17.2 Citizen Complaint System

```
STEP 1 — Issue Type
  Pothole / Waterlogging / Water Leak / Streetlight Out /
  Repeated Unnecessary Digging / Garbage / Drainage /
  Road Damage After Repair / Other

STEP 2 — Location
  Drop pin on map
  OR type address (Nominatim autocomplete)
  OR use GPS

STEP 3 — Description
  Free text (minimum 20 characters)
  Optional: Voice note (converted to text on device)

STEP 4 — Photo
  Optional — but strongly encouraged
  Up to 3 photos
  Stored in Supabase Storage / S3

STEP 5 — Contact (optional)
  Mobile number (for SMS updates on complaint status)
  If not provided: complaint filed anonymously, no status updates

STEP 6 — Submit
  System generates CNR ID: CNR-XXXXXX (format: CNR + 6 alphanumeric)
  CNR displayed prominently with instruction to save it
  Relevant department Officer receives in-app + email notification
  If mobile provided: confirmation SMS sent

CNR TRACKING:
  Citizen visits: civiq.ghaziabad.gov.in/track
  Enters CNR ID
  Sees 4-stage progress:
    📋 Submitted — Complaint received
    👁️ Acknowledged — Department officer has seen it
    🔧 In Progress — Action underway
    ✅ Resolved — Issue addressed
```

### 17.3 Complaint → MCDM Integration

```
FLOW:
Citizen files complaint about location L
Complaint stored in MongoDB with lat/lng
Location flagged in CIVIQ's spatial index

When any new project is submitted for location near L:
MCDM Criteria 1 calculation queries complaints:
  db.complaints.countDocuments({
    location: { $near: { maxDistance: bufferMetres } },
    createdAt: { $gte: sixMonthsAgo }
  })

Result:
  High complaint volume → higher Condition Severity score
  → Higher overall MCDM score
  → Project more likely to be prioritized

This is the feedback loop:
Citizens reporting problems → problems get fixed sooner
Citizens influence priority without voting power
```

---

## 18. Mobile App & Offline Support

### 18.1 Primary Mobile User: Field Supervisor

Field supervisors in Indian municipal construction:
- Are often in areas with poor or no internet (construction sites, basements, remote zones)
- Use Android phones (80%+ of Indian smartphone users)
- Are not technically sophisticated — UI must be extremely simple
- Need to upload photos from the field
- May be out of connectivity for hours at a time

### 18.2 Offline Architecture

```
TECHNOLOGY: React Native + Expo + WatermelonDB (local SQLite)

OFFLINE-CAPABLE OPERATIONS:
  ✓ View assigned projects (cached from last sync)
  ✓ Update progress percentage
  ✓ Upload photos (stored in device queue)
  ✓ Write issue/blocker notes
  ✓ View project location on cached map tiles

NOT OFFLINE-CAPABLE (requires internet):
  ✗ Submit new projects (Officer function)
  ✗ View other projects or map data beyond cached
  ✗ Receive real-time notifications

SYNC STRATEGY:
  Background sync whenever internet detected
  Foreground sync on app open
  Sync indicator: "Last synced 47 minutes ago"
```

### 18.3 Conflict Resolution Strategy

```
SCENARIO: Supervisor updates progress to 60% offline.
          Another update comes in online: Admin sets progress to 75%.
          Supervisor comes back online — both updates exist.

RESOLUTION RULE: Last-write-wins based on server timestamp.
  Server timestamp > device timestamp → server wins
  Device timestamp > server timestamp → device wins
  (Device clock cannot be trusted for conflict resolution in absence of NTP)

EXCEPTION: If server timestamp is from the same session as device update,
           show merge prompt to user: "Your update (60%) vs latest (75%) —
           which is correct?"

This is deliberately simple. Progress % updates are low-stakes.
The important thing is that an update always reaches the server.
```

### 18.4 Photo Upload Queue

```
SCENARIO: Supervisor takes 3 photos at site. No internet.

BEHAVIOR:
  Photos stored in device local storage with metadata:
    project_id, photo_type, timestamp, offline_queued: true
  When internet available: automatic background upload
  Upload progress shown in-app
  Until upload completes: progress update shows "⚠️ Photos pending upload"
  After upload: "✓ 3 photos uploaded"

MAX OFFLINE STORAGE: 500MB for photos per device
PHOTO COMPRESSION: Resized to max 2MB on device before queue
```

### 18.5 Mobile-Specific UI Rules

```
1. Every action must be completable with ONE THUMB (right-handed)
   Critical buttons: bottom of screen, large tap targets (min 48px)

2. Progress update: ONE tap to open, slider to set %, confirm button
   Must be completable in under 30 seconds

3. Photo upload: tap photo icon, select from camera or gallery
   Multiple selection supported, max 5 photos per update

4. Location on map: tap "View on Map" — shows cached OSM tile
   No internet needed for cached tiles

5. Offline indicator: always visible in header when offline
   "📵 Offline — updates will sync when connected"

6. Language: Hindi option required for Ghaziabad pilot
   All critical UI text must have Hindi translation
```

---

## 19. ERP Integration Architecture

### 19.1 The Integration Contract

CIVIQ generates a **CIVIQ Approval Token (CAT)** for every approved project. The ERP system must validate this token before releasing budget or issuing work orders.

```
CAT FORMAT:
{
  "cat_id": "CAT-GHZ-2026-47829",
  "project_id": "GHZ-PWD-2026-0047",
  "department_code": "PWD",
  "city_code": "GHZ",
  "approved_by": "ADMIN-USER-UUID",
  "approved_at": "2026-10-15T09:23:44Z",
  "valid_until": "2027-04-15T23:59:59Z",  // 6-month validity
  "estimated_cost_approved": 4200000,      // in paise
  "signature": "HMAC-SHA256-HASH"         // cryptographic signature
}
```

### 19.2 ERP Validation API

```
ENDPOINT: POST /api/v1/erp/validate-token
AUTH: ERP system calls with pre-shared API key (IP-whitelist enforced)

REQUEST:
{
  "cat_id": "CAT-GHZ-2026-47829",
  "erp_transaction_id": "ERP-TXN-2026-99234",
  "transaction_amount": 4200000,
  "requesting_department": "PWD"
}

RESPONSE (valid):
{
  "valid": true,
  "project_id": "GHZ-PWD-2026-0047",
  "project_title": "Vijay Nagar Main Road Reconstruction",
  "approved_at": "2026-10-15T09:23:44Z",
  "approved_budget": 4200000,
  "department": "PWD",
  "status": "ACTIVE"
}

RESPONSE (invalid):
{
  "valid": false,
  "reason": "TOKEN_NOT_FOUND" | "TOKEN_EXPIRED" | "TOKEN_USED" |
             "AMOUNT_MISMATCH" | "DEPARTMENT_MISMATCH" | "INVALID_SIGNATURE",
  "message": "Human-readable reason for block"
}
```

### 19.3 Integration Failure Handling

```
SCENARIO 1: CIVIQ API is down
  ERP behavior: Do NOT fail open. Show error: "CIVIQ coordination check
  temporarily unavailable. Contact CIVIQ admin." Budget release blocked.
  Reason: Failing open defeats the entire enforcement mechanism.

SCENARIO 2: ERP doesn't have API support (legacy system)
  Manual workflow fallback:
    a. CIVIQ Admin prints/emails the CAT token PDF
    b. ERP requires CAT token number in work order form (manual field)
    c. Spot audits by Commissioner verify compliance
    d. This is a stopgap — ERP integration is the real solution

SCENARIO 3: Department bypasses ERP entirely
  (Uses state funds directly without ERP work order)
  AI monitoring: If complaints mention active work at a location
  with no CIVIQ project → alert Commissioner with location + time
  Commissioner office can verify in the field
```

### 19.4 Common Indian Municipal ERP Systems

| ERP System | State/Use | Integration Approach |
|---|---|---|
| NIC PFMS (Public Financial Management) | Central Government schemes | REST API (NIC provides sandbox) |
| IFMS (Integrated Financial Management) | UP State Government | REST API + SSO via NIC |
| SAP ECC / S4HANA | Large municipal corporations | BAPI/RFC + custom middleware |
| eNagar (CDAC) | Some UP municipal corporations | Custom REST API integration |
| Custom state ERP | Various states | Requires custom integration module |

**Integration architecture:** CIVIQ exposes a standard REST API. Each ERP integration is handled by an adapter module in the ERP Integration Service. Adding a new ERP requires only a new adapter, not core system changes.

---

## 20. Security Architecture

### 20.1 Authentication

```
PRIMARY: Single Sign-On (SSO) via NIC/State Government SSO portal
  All government officers already have SSO credentials
  CIVIQ integrates as a SSO service provider
  No separate username/password for government users

FALLBACK: Local JWT authentication
  For users without SSO credentials (citizens, contractors)
  JWT tokens, 8-hour expiry, refresh token rotation
  bcrypt password hashing (cost factor 12)

MULTI-FACTOR AUTH:
  Required for: Commissioner, Admin
  Optional for: Officers, Supervisors
  Method: OTP via SMS (MSG91) — not TOTP app
  Reason: SMS OTP is more accessible for Indian government officers
          who may not have smartphone apps
```

### 20.2 Authorization — Row Level Security

```
PostgreSQL Row Level Security (RLS) policies:

Officers can only SELECT/INSERT/UPDATE projects WHERE department_id = their_department_id
Supervisors can only SELECT/UPDATE projects WHERE assigned_supervisor_id = their_user_id
Admins can SELECT/UPDATE all projects WHERE city_id = their_city_id
Commissioner can SELECT all, UPDATE only config tables

These policies are enforced at the database level, not just application level.
Even if application code has a bug, the database will reject unauthorized queries.
```

### 20.3 Data Encryption

```
AT REST:
  PostgreSQL: pgcrypto extension for sensitive fields
  Specifically encrypted: mobile numbers, email addresses, personal details
  Database-level encryption: AES-256 for data files
  File storage (S3/Supabase): server-side encryption by default

IN TRANSIT:
  TLS 1.3 mandatory for all connections
  HTTP Strict Transport Security (HSTS) headers
  Certificate pinning for mobile app
  API Gateway enforces TLS — HTTP connections rejected

AUDIT LOG:
  Immutable (append-only) — no UPDATE or DELETE permitted
  Cryptographic hash of each log entry (SHA-256)
  Hash chain: each entry includes hash of previous entry
  Monthly hash verification report to Commissioner
```

### 20.4 API Security

```
RATE LIMITING:
  Per-user: 100 requests/minute
  Per-IP: 200 requests/minute
  File uploads: 10 uploads/minute per user
  ERP validation endpoint: 20 calls/minute per ERP IP

INPUT VALIDATION:
  All inputs validated server-side (never trust client)
  Parameterized queries only (no string interpolation in SQL)
  File uploads: type validation + virus scan (ClamAV)
  GeoJSON: size limits + schema validation

HEADERS:
  Content-Security-Policy
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
```

---

## 21. Compliance & Regulatory Framework

### 21.1 DPDP Act 2023 (Digital Personal Data Protection Act)

```
APPLICABILITY:
  Citizens filing complaints provide personal data (mobile number, location)
  Government officers' employment data is processed
  Both are covered under DPDP Act

COMPLIANCE MEASURES:

1. CONSENT:
   Citizen complaint form: explicit consent checkbox for data processing
   Clear purpose statement: "Your data will be used only to process your complaint"
   Consent logged with timestamp and IP

2. DATA MINIMIZATION:
   Citizens: collect only what's needed (issue, location, description)
   Mobile number: optional for complaint (required only for updates)
   Name: never collected from citizens

3. PURPOSE LIMITATION:
   Complaint data used only for: routing to department + MCDM priority input
   Never used for marketing, profiling, or other purposes

4. RIGHT TO ACCESS:
   Citizen can query their complaint status by CNR ID
   No login required — CNR is the access credential

5. RIGHT TO ERASURE:
   Citizens can request complaint data deletion via email to CIVIQ admin
   Deleted from primary database within 30 days
   Anonymized in analytics (location retained, personal data removed)
   Exception: complaints that fed into MCDM of completed projects retained
   for audit but personal data anonymized

6. DATA RETENTION:
   Active complaints: retained until resolved + 1 year
   Resolved complaints: anonymized after 2 years (location retained,
   mobile/description replaced with anonymized hash)
   
7. DATA RESIDENCY:
   All CIVIQ servers must be in India
   Cloud provider: AWS Mumbai (ap-south-1) or equivalent Indian region
   No data to be processed or stored outside India
```

### 21.2 MeitY Guidelines Compliance

```
1. AUDIT TRAIL:
   All government actions logged with: user, timestamp, action, before/after
   Audit logs retained for minimum 7 years
   Logs in India only

2. DATA LOCALIZATION:
   All processing in India as above

3. OPEN STANDARDS:
   APIs documented per OpenAPI 3.0 specification
   Data formats: JSON, GeoJSON (open standards)
   No proprietary lock-in on core data

4. ACCESSIBILITY:
   Web: WCAG 2.1 AA compliance
   Hindi language support for all user-facing content
```

### 21.3 RTI (Right to Information) Readiness

```
CIVIQ generates the following RTI-ready reports on demand:
  1. All projects submitted by department X in year Y (with costs)
  2. All clashes detected and how they were resolved
  3. All Admin overrides with categories and justifications
  4. Estimated cost savings from clash prevention (calculated)
  5. Citizen complaint volume and resolution rates

These reports are pre-built and can be generated by Commissioner
without manual data extraction.
```

---

## 22. Tech Stack & Infrastructure

### 22.1 Complete Tech Stack

#### Frontend (Web Dashboard)
```
Framework:          Next.js 15 (App Router + Server Components + Turbopack)
Language:           TypeScript (strict mode)
Styling:            Tailwind CSS + Shadcn/ui + Radix UI
Animation:          Framer Motion (page transitions, loading states)
State Management:   Zustand (global) + TanStack Query (server state)
Maps:               Leaflet.js + React-Leaflet (OSM tiles)
Geo Calculations:   Turf.js (client-side geometric operations)
Forms:              React Hook Form + Zod (validation)
Charts/Analytics:   Recharts
Build Tool:         Turbopack (bundled with Next.js 15)
```

#### Mobile App
```
Framework:          React Native + Expo (SDK 51+)
Language:           TypeScript
Offline Storage:    WatermelonDB (local SQLite, built for React Native)
Maps:               React Native Maps + cached OSM tiles
State:              Zustand + TanStack Query
Photo Handling:     Expo Camera + expo-image-picker
File Upload:        expo-file-system + background upload
Push Notifications: Expo Notifications (FCM for Android, APNs for iOS)
Location:           expo-location (GPS)
```

#### Backend
```
Framework:          NestJS (TypeScript)
ORM:                Prisma (type-safe, excellent for complex schemas)
Connection Pool:    Prisma Accelerate
API Style:          REST (primary) + GraphQL subscriptions (real-time only)
Real-time:          Socket.IO (for live map updates, notifications)
Job Queue:          Bull (Redis-backed, for notifications and AI tasks)
File Upload:        Multer + streaming to S3
Validation:         class-validator + class-transformer
```

#### AI / Intelligent Layer
```
Orchestration:      LangChain.js
Vector Database:    Pinecone (production) / Supabase Vector (dev)
LLM Primary:        Anthropic Claude (claude-sonnet-4-6)
LLM Fallback:       OpenAI GPT-4o
Embeddings:         OpenAI text-embedding-3-small
Prompt Versioning:  LangSmith (prompt tracking + observability)
AI Monitoring:      Custom metrics in Grafana
```

#### Databases
```
Primary:            PostgreSQL 16 + PostGIS extension
  Tables:           Projects, users, departments, locations, clashes,
                    overrides, system_config, conflict_matrix
  Spatial:          PostGIS for geographic clash detection at scale
Document:           MongoDB Atlas
  Collections:      Complaints, audit_logs, AI recommendations, media metadata
Cache:              Redis 7
  Uses:             Session store, rate limiting, job queue, API response cache,
                    active project location cache for clash pre-filter
```

#### Infrastructure
```
Frontend Hosting:   Vercel (Edge Network, automatic scaling)
Backend Hosting:    AWS EKS (Kubernetes) — Mumbai region (ap-south-1)
Database Hosting:   AWS RDS (PostgreSQL), MongoDB Atlas India, AWS ElastiCache
File Storage:       AWS S3 (Mumbai region)
CDN:                CloudFront (static assets, map tiles)
Map Tiles:          Self-hosted OpenStreetMap tile server (t-rex or tegola)
Geocoding:          Self-hosted Nominatim instance
CI/CD:              GitHub Actions
Containers:         Docker
Secrets:            AWS Secrets Manager
```

#### Monitoring & Observability
```
Error Tracking:     Sentry (frontend, backend, mobile)
Metrics:            Prometheus + Grafana
Distributed Trace:  OpenTelemetry
Log Aggregation:    Loki + Grafana (centralized log search)
Product Analytics:  PostHog (self-hosted for DPDP compliance)
Uptime:             AWS CloudWatch + PagerDuty alerts
```

#### Security Tools
```
Authentication:     NextAuth.js (NIC SSO integration) + JWT
Authorization:      CASL + PostgreSQL Row Level Security
WAF:                AWS WAF (on API Gateway)
Vulnerability Scan: Snyk (dependency scanning in CI)
Penetration Test:   Annual CERT-In empanelled vendor audit
Secrets:            AWS Secrets Manager (never in code)
```

#### Developer Tools
```
Testing:            Jest + React Testing Library + Playwright (E2E)
API Testing:        Supertest
Code Quality:       ESLint + Prettier + Husky (pre-commit hooks)
Type Safety:        TypeScript strict mode across all packages
Documentation:      OpenAPI 3.0 (auto-generated from NestJS decorators)
Monorepo:           Turborepo (shared types, configs, utilities)
```

---

## 23. Database Schema — Full Physical Design

### 23.1 Design Principles Applied

1. Soft deletes (`deleted_at`) on all major tables — records never physically deleted
2. `updated_at` maintained by database triggers — never trust application code for this
3. Optimistic locking (`version` column) to prevent concurrent update conflicts
4. Partitioning on `audit_logs` for high volume
5. PostGIS spatial index for geographic clash detection
6. Row Level Security policies on all user-facing tables
7. All IDs are UUIDs — no sequential integer IDs (prevents enumeration attacks)
8. Configuration tables (buffer values, lifecycle values, conflict matrix) are in the database — never hardcoded

### 23.2 Full SQL Schema

```sql
-- ═══════════════════════════════════════════════════════════════════
-- EXTENSIONS
-- ═══════════════════════════════════════════════════════════════════
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "earthdistance" CASCADE;
CREATE EXTENSION IF NOT EXISTS "cube";

-- ═══════════════════════════════════════════════════════════════════
-- HELPER FUNCTION: auto-update updated_at
-- ═══════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: cities
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE cities (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    code            VARCHAR(10) UNIQUE NOT NULL,  -- e.g., 'GHZ'
    state           VARCHAR(100) NOT NULL,
    country         VARCHAR(50) DEFAULT 'India',
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_cities_updated_at
    BEFORE UPDATE ON cities
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: wards
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE wards (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_id         UUID NOT NULL REFERENCES cities(id) ON DELETE RESTRICT,
    ward_number     VARCHAR(20) NOT NULL,
    ward_name       VARCHAR(100),
    zone            VARCHAR(50),
    boundary        GEOMETRY(MULTIPOLYGON, 4326),  -- PostGIS ward boundary
    population      INTEGER,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(city_id, ward_number)
);
CREATE INDEX idx_wards_city ON wards(city_id);
CREATE INDEX idx_wards_boundary ON wards USING GIST(boundary);
CREATE TRIGGER update_wards_updated_at
    BEFORE UPDATE ON wards
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: departments
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE departments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_id         UUID NOT NULL REFERENCES cities(id) ON DELETE RESTRICT,
    name            VARCHAR(100) NOT NULL,
    code            VARCHAR(20) NOT NULL,   -- e.g., 'PWD', 'JALNIGAM'
    full_name       VARCHAR(200),
    head_officer_id UUID,                  -- FK to users (set after users created)
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(city_id, code)
);
CREATE INDEX idx_departments_city ON departments(city_id);
CREATE TRIGGER update_departments_updated_at
    BEFORE UPDATE ON departments
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: users
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    phone           VARCHAR(20),
    role            VARCHAR(30) NOT NULL CHECK (
                        role IN ('commissioner', 'admin', 'officer', 'supervisor', 'citizen')
                    ),
    city_id         UUID REFERENCES cities(id) ON DELETE SET NULL,
    department_id   UUID REFERENCES departments(id) ON DELETE SET NULL,
    password_hash   TEXT,                  -- NULL if SSO-only user
    sso_id          VARCHAR(255) UNIQUE,   -- NIC SSO identifier
    is_active       BOOLEAN DEFAULT true,
    last_login      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ NULL,      -- soft delete
    version         INTEGER DEFAULT 1      -- optimistic locking
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_department ON users(department_id);
CREATE INDEX idx_users_city ON users(city_id);
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Add FK back to departments
ALTER TABLE departments ADD CONSTRAINT fk_departments_head
    FOREIGN KEY (head_officer_id) REFERENCES users(id) ON DELETE SET NULL;

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: locations
-- Critical for clash detection
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE locations (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    center_lat          DECIMAL(10,8) NOT NULL,
    center_lng          DECIMAL(11,8) NOT NULL,
    center_point        GEOMETRY(POINT, 4326),   -- PostGIS point (auto-computed)
    buffer_radius_m     INTEGER NOT NULL,        -- system-calculated detection buffer
    shape_type          VARCHAR(20) CHECK (shape_type IN ('circle','corridor','rectangle','polygon')),
    shape_length_m      INTEGER,
    shape_width_m       INTEGER,
    area_sqm            INTEGER,
    geojson             JSONB,                   -- visual only, not used for detection
    road_name           VARCHAR(255),
    neighbourhood       VARCHAR(100),
    ward_id             UUID REFERENCES wards(id) ON DELETE SET NULL,
    address_full        TEXT,
    city_id             UUID REFERENCES cities(id) ON DELETE SET NULL,
    auto_detected       BOOLEAN DEFAULT true,
    officer_corrected   BOOLEAN DEFAULT false,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_locations_center ON locations USING GIST(center_point);
CREATE INDEX idx_locations_ward ON locations(ward_id);
CREATE INDEX idx_locations_city ON locations(city_id);
-- Earthdistance index for fast distance queries
CREATE INDEX idx_locations_earth ON locations USING GIST(ll_to_earth(center_lat, center_lng));

-- Trigger to auto-populate center_point from lat/lng
CREATE OR REPLACE FUNCTION set_location_center_point()
RETURNS TRIGGER AS $$
BEGIN
  NEW.center_point = ST_SetSRID(ST_MakePoint(NEW.center_lng, NEW.center_lat), 4326);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_center_point
    BEFORE INSERT OR UPDATE OF center_lat, center_lng ON locations
    FOR EACH ROW EXECUTE FUNCTION set_location_center_point();

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: projects
-- The central table of CIVIQ
-- ═══════════════════════════════════════════════════════════════════
CREATE TYPE project_type AS ENUM (
    'Road', 'WaterPipeline', 'SewagePipeline', 'ElectricalOverhead',
    'ElectricalUnderground', 'Parks', 'Other'
);

CREATE TYPE project_status AS ENUM (
    'Draft', 'Pending', 'ClashReview', 'ProtectionViolationReview',
    'Approved', 'Active', 'Delayed', 'Completed', 'Rejected', 'Archived'
);

CREATE TABLE projects (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_code            VARCHAR(30) UNIQUE NOT NULL,  -- GHZ-PWD-2026-0047
    title                   VARCHAR(255) NOT NULL,
    description             TEXT NOT NULL CHECK (char_length(description) >= 100),
    department_id           UUID NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    city_id                 UUID NOT NULL REFERENCES cities(id) ON DELETE RESTRICT,
    type                    project_type NOT NULL,
    status                  project_status NOT NULL DEFAULT 'Draft',
    
    -- Phase management
    is_phased               BOOLEAN DEFAULT false,
    parent_project_id       UUID REFERENCES projects(id) ON DELETE SET NULL,
    phase_number            INTEGER DEFAULT 1,
    
    -- Dates
    planned_start_date      DATE NOT NULL,
    planned_end_date        DATE NOT NULL,
    actual_start_date       DATE,
    actual_end_date         DATE,
    
    -- Location
    location_id             UUID REFERENCES locations(id) ON DELETE SET NULL,
    
    -- Budget (informational, not approval workflow)
    estimated_cost          DECIMAL(15,2),
    budget_source           VARCHAR(50),
    tender_number           VARCHAR(100),
    contractor_name         VARCHAR(255),
    contractor_firm_name    VARCHAR(255),
    
    -- MCDM outputs
    mcdm_score              DECIMAL(5,2),
    mcdm_breakdown          JSONB,         -- full criteria scores for audit
    ai_commentary           TEXT,          -- AI's explanation of score
    
    -- Completion
    progress_pct            INTEGER DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
    as_built_photos_count   INTEGER DEFAULT 0,
    completion_verified     BOOLEAN DEFAULT false,
    
    -- Team
    created_by              UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    assigned_officer_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    assigned_supervisor_id  UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_by             UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- CIVIQ Approval Token (for ERP enforcement)
    civiq_token             VARCHAR(50) UNIQUE,
    token_valid_until       TIMESTAMPTZ,
    
    -- Metadata
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW(),
    deleted_at              TIMESTAMPTZ NULL,   -- soft delete
    version                 INTEGER DEFAULT 1  -- optimistic locking
);

CREATE INDEX idx_projects_department_status ON projects(department_id, status);
CREATE INDEX idx_projects_city_status ON projects(city_id, status);
CREATE INDEX idx_projects_dates ON projects(planned_start_date, planned_end_date);
CREATE INDEX idx_projects_location ON projects(location_id);
CREATE INDEX idx_projects_parent ON projects(parent_project_id);
CREATE INDEX idx_projects_code ON projects(project_code);
CREATE INDEX idx_projects_active ON projects(status) WHERE status IN ('Approved', 'Active', 'Delayed');

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: clashes
-- A clash is always between exactly 2 projects
-- ═══════════════════════════════════════════════════════════════════
CREATE TYPE clash_status AS ENUM (
    'Unresolved', 'UnderReview', 'ResolvedBothApproved',
    'ResolvedOneLower', 'ResolvedRescheduled', 'Dismissed'
);

CREATE TABLE clashes (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_a_id            UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    project_b_id            UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    
    -- Detection details
    detected_at             TIMESTAMPTZ DEFAULT NOW(),
    geographic_overlap      BOOLEAN NOT NULL DEFAULT true,
    time_overlap            BOOLEAN NOT NULL DEFAULT true,
    work_type_conflict      VARCHAR(20) CHECK (work_type_conflict IN ('incompatible', 'conditional')),
    detection_buffer_used   INTEGER,   -- metres, for audit
    
    -- Resolution
    status                  clash_status NOT NULL DEFAULT 'Unresolved',
    admin_decision          VARCHAR(30),
    ai_suggestion           JSONB,     -- full AI suggestion JSON
    ai_confidence           DECIMAL(5,2),
    final_resolution        TEXT,
    resolved_by             UUID REFERENCES users(id),
    resolved_at             TIMESTAMPTZ,
    
    -- If one project rescheduled:
    rescheduled_project_id  UUID REFERENCES projects(id),
    original_start_date     DATE,
    new_start_date          DATE,
    
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure no duplicate clash pairs
    CONSTRAINT unique_clash_pair UNIQUE (
        LEAST(project_a_id::TEXT, project_b_id::TEXT),
        GREATEST(project_a_id::TEXT, project_b_id::TEXT)
    )
);

CREATE INDEX idx_clashes_project_a ON clashes(project_a_id);
CREATE INDEX idx_clashes_project_b ON clashes(project_b_id);
CREATE INDEX idx_clashes_status ON clashes(status);
CREATE TRIGGER update_clashes_updated_at
    BEFORE UPDATE ON clashes
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: protection_periods (active protection records)
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE protection_periods (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id          UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    location_id         UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    project_type        project_type NOT NULL,
    protection_start    TIMESTAMPTZ NOT NULL,
    protection_end      TIMESTAMPTZ NOT NULL,
    is_active           BOOLEAN DEFAULT true,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_protection_location ON protection_periods(location_id);
CREATE INDEX idx_protection_active ON protection_periods(is_active, protection_end);
CREATE TRIGGER update_protection_updated_at
    BEFORE UPDATE ON protection_periods
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: overrides
-- SEPARATE TABLE — not a field on projects
-- Critical for Commissioner oversight and anti-gaming detection
-- ═══════════════════════════════════════════════════════════════════
CREATE TYPE override_category AS ENUM (
    'DeclaredEmergency', 'LegalMandate',
    'GovernmentDirective', 'SafetyEscalation', 'Unclassified'
);

CREATE TABLE overrides (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    override_by             UUID NOT NULL REFERENCES users(id),
    city_id                 UUID NOT NULL REFERENCES cities(id),
    category                override_category NOT NULL,
    reference_number        VARCHAR(100),   -- required except for Unclassified
    justification_text      TEXT NOT NULL CHECK (
                                CASE WHEN category = 'Unclassified'
                                     THEN char_length(justification_text) >= 200
                                     ELSE char_length(justification_text) >= 100
                                END
                            ),
    
    -- What was overridden
    entity_type             VARCHAR(50) NOT NULL,  -- 'clash', 'project', 'protection_violation'
    entity_id               UUID NOT NULL,
    
    -- AI recommendation that was overridden
    ai_recommendation       JSONB,
    ai_confidence           DECIMAL(5,2),
    
    flagged_unclassified    BOOLEAN DEFAULT false,
    commissioner_notified   BOOLEAN DEFAULT false,
    acknowledged_permanent  BOOLEAN NOT NULL DEFAULT false,  -- admin must check this
    
    created_at              TIMESTAMPTZ DEFAULT NOW()
    -- NO updated_at — overrides are immutable records
);

CREATE INDEX idx_overrides_user ON overrides(override_by);
CREATE INDEX idx_overrides_city_date ON overrides(city_id, created_at);
CREATE INDEX idx_overrides_category ON overrides(category);
CREATE INDEX idx_overrides_flagged ON overrides(flagged_unclassified) WHERE flagged_unclassified = true;

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: system_config
-- All configurable business rules — NEVER hardcoded in application
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE system_config (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_id         UUID REFERENCES cities(id),   -- NULL = global default
    config_key      VARCHAR(100) NOT NULL,
    config_value    JSONB NOT NULL,
    description     TEXT,
    updated_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(city_id, config_key)
);

-- Seed data for Ghaziabad:
-- Short-term buffer days (post-completion, before next project can start)
INSERT INTO system_config (city_id, config_key, config_value, description) VALUES
    (NULL, 'buffer_days', '{
        "Road": 14,
        "WaterPipeline": 10,
        "SewagePipeline": 10,
        "ElectricalOverhead": 5,
        "ElectricalUnderground": 7,
        "Parks": 3,
        "Other": 7
    }', 'Short-term buffer days by project type after completion'),
    
    (NULL, 'protection_period_months', '{
        "Road": 24,
        "WaterPipeline": 18,
        "SewagePipeline": 18,
        "ElectricalOverhead": 6,
        "ElectricalUnderground": 12,
        "Parks": 12,
        "Other": 12
    }', 'Long-term protection period in months after project completion'),
    
    (NULL, 'lifecycle_years', '{
        "Road": 10,
        "WaterPipeline": 20,
        "SewagePipeline": 15,
        "ElectricalOverhead": 15,
        "ElectricalUnderground": 15,
        "Parks": 8,
        "Other": 10
    }', 'Expected infrastructure lifecycle in years'),
    
    (NULL, 'seasonal_calendar_ghaziabad', '{
        "monsoon": [6, 7, 8, 9],
        "pre_monsoon": [4, 5],
        "dry_season": [10, 11, 12, 1, 2, 3]
    }', 'Monthly seasonal classification for Ghaziabad'),
    
    (NULL, 'base_detection_buffer_m', '{
        "Road": 30,
        "WaterPipeline": 15,
        "SewagePipeline": 20,
        "ElectricalOverhead": 10,
        "ElectricalUnderground": 15,
        "Parks": 10,
        "Other": 15
    }', 'Base detection buffer radius in metres by project type'),
    
    (NULL, 'override_threshold_pct', '{"threshold": 25}',
     'Override rate above which Commissioner is alerted (percentage)');

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: conflict_matrix
-- Work type compatibility rules
-- ═══════════════════════════════════════════════════════════════════
CREATE TYPE conflict_level AS ENUM ('compatible', 'conditional', 'incompatible');

CREATE TABLE conflict_matrix (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type_a          project_type NOT NULL,
    type_b          project_type NOT NULL,
    conflict_level  conflict_level NOT NULL,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(type_a, type_b)
);

-- Seed the conflict matrix
INSERT INTO conflict_matrix (type_a, type_b, conflict_level, notes) VALUES
    ('Road', 'Road', 'incompatible', 'Two road projects cannot run simultaneously in same location'),
    ('Road', 'WaterPipeline', 'incompatible', 'Both require road excavation'),
    ('Road', 'SewagePipeline', 'incompatible', 'Both require road excavation'),
    ('Road', 'ElectricalOverhead', 'conditional', 'Underground electrical clashes; overhead may not'),
    ('Road', 'ElectricalUnderground', 'incompatible', 'Both require road excavation'),
    ('Road', 'Parks', 'conditional', 'Depends on proximity and scope'),
    ('WaterPipeline', 'WaterPipeline', 'incompatible', 'Same utility, same location'),
    ('WaterPipeline', 'SewagePipeline', 'conditional', 'Different depths but same trench sometimes'),
    ('WaterPipeline', 'ElectricalOverhead', 'compatible', 'Different physical layers'),
    ('WaterPipeline', 'ElectricalUnderground', 'compatible', 'Can coexist in coordinated trenches'),
    ('WaterPipeline', 'Parks', 'compatible', 'Underground vs surface'),
    ('SewagePipeline', 'SewagePipeline', 'incompatible', 'Same utility, same location'),
    ('SewagePipeline', 'ElectricalOverhead', 'compatible', 'Different physical layers'),
    ('SewagePipeline', 'ElectricalUnderground', 'compatible', 'Can coexist in coordinated trenches'),
    ('SewagePipeline', 'Parks', 'compatible', 'Underground vs surface'),
    ('ElectricalOverhead', 'ElectricalOverhead', 'incompatible', 'Same utility, same location'),
    ('ElectricalOverhead', 'ElectricalUnderground', 'conditional', 'Different methods, may share route'),
    ('ElectricalOverhead', 'Parks', 'compatible', 'Overhead does not disturb surface'),
    ('ElectricalUnderground', 'ElectricalUnderground', 'incompatible', 'Same utility, same location'),
    ('ElectricalUnderground', 'Parks', 'compatible', 'Underground vs surface'),
    ('Parks', 'Parks', 'incompatible', 'Same location, same surface work');

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: ai_recommendations
-- Every AI suggestion stored for learning and audit
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE ai_recommendations (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type         VARCHAR(50) NOT NULL,   -- 'project', 'clash', 'protection_violation'
    entity_id           UUID NOT NULL,
    recommendation_type VARCHAR(50),            -- 'clash_resolution', 'priority_scoring', 'restoration_plan'
    
    -- AI output
    suggestion_json     JSONB NOT NULL,         -- full structured AI response
    suggestion_text     TEXT,                   -- human-readable summary
    confidence_score    DECIMAL(5,2),
    model_used          VARCHAR(100),           -- e.g., 'claude-sonnet-4-6'
    
    -- Human response (feedback loop)
    accepted            BOOLEAN,               -- NULL = not yet acted on
    modified            BOOLEAN DEFAULT false,
    human_action        TEXT,                  -- what the human actually did
    feedback_stored     BOOLEAN DEFAULT false, -- whether this feedback was stored in vector DB
    
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    acted_on_at         TIMESTAMPTZ
);

CREATE INDEX idx_ai_recommendations_entity ON ai_recommendations(entity_type, entity_id);
CREATE INDEX idx_ai_recommendations_pending ON ai_recommendations(accepted) WHERE accepted IS NULL;

-- ═══════════════════════════════════════════════════════════════════
-- TABLE: audit_logs (PARTITIONED by month for scale)
-- Immutable — no UPDATE or DELETE allowed
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE audit_logs (
    id              BIGSERIAL,
    user_id         UUID REFERENCES users(id),
    user_role       VARCHAR(30),           -- denormalized for performance
    action          VARCHAR(100) NOT NULL,
    entity_type     VARCHAR(50) NOT NULL,
    entity_id       UUID NOT NULL,
    old_values      JSONB,
    new_values      JSONB,
    ip_address      INET,
    user_agent      TEXT,
    city_id         UUID,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create initial yearly partitions
CREATE TABLE audit_logs_2026 PARTITION OF audit_logs
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
CREATE TABLE audit_logs_2027 PARTITION OF audit_logs
    FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id, created_at);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id, created_at);
CREATE INDEX idx_audit_logs_action ON audit_logs(action, created_at);

-- Prevent updates and deletes on audit_logs
CREATE OR REPLACE RULE audit_logs_no_update AS ON UPDATE TO audit_logs DO INSTEAD NOTHING;
CREATE OR REPLACE RULE audit_logs_no_delete AS ON DELETE TO audit_logs DO INSTEAD NOTHING;
```

---

## 24. API Design

### 24.1 API Structure

```
Base URL: https://api.civiq.ghaziabad.gov.in/v1

Authentication: Bearer token (JWT) in Authorization header
All responses: JSON
All errors: { "code": "ERROR_CODE", "message": "Human readable", "details": {...} }
```

### 24.2 Core Endpoints

```
PROJECTS:
GET    /projects                     List projects (filtered by role)
POST   /projects                     Submit new project
GET    /projects/:id                 Get project details
PATCH  /projects/:id                 Update project
POST   /projects/:id/submit          Submit draft for review
POST   /projects/:id/assign-supervisor  Assign supervisor
PATCH  /projects/:id/progress        Update progress (supervisor only)
POST   /projects/:id/complete        Mark as complete + upload as-built photos

CLASHES:
GET    /clashes                      List clashes for admin review
GET    /clashes/:id                  Get clash details with AI suggestion
POST   /clashes/:id/resolve          Admin resolves clash
POST   /clashes/:id/reschedule       Officer proposes new date after rejection

PROTECTION:
GET    /protection/check             Check if location has active protection
GET    /protection/active            List all active protection periods

MCDM:
POST   /mcdm/score                   Calculate MCDM score for a project
GET    /mcdm/preview                 Get partial score during form fill

AI:
POST   /ai/pre-submission-analysis   Real-time analysis during form fill
GET    /ai/clash-suggestions/:id     Get AI suggestions for a clash
POST   /ai/feedback                  Submit human feedback on AI suggestion

ERP:
POST   /erp/validate-token           Validate CIVIQ approval token (ERP systems only)
GET    /erp/token/:project_id        Get approval token for project

ADMIN:
GET    /admin/dashboard              City-wide analytics
GET    /admin/queue                  Pending approvals queue
POST   /admin/override               Override AI/MCDM recommendation

NOTIFICATIONS:
GET    /notifications                List user's notifications
PATCH  /notifications/:id/read       Mark as read

PUBLIC (no auth):
GET    /public/projects              Public project list (approved/active only)
GET    /public/map                   GeoJSON of approved/active projects
POST   /public/complaints            File citizen complaint
GET    /public/complaints/:cnr       Track complaint by CNR ID
```

### 24.3 WebSocket Events

```
NAMESPACE: /realtime

EVENTS EMITTED BY SERVER:
  project.status_changed       { projectId, oldStatus, newStatus }
  clash.detected               { clashId, projectAId, projectBId }
  clash.resolved               { clashId, resolution }
  notification.new             { notificationId, type, message }
  map.project_updated          { projectId, status, progressPct }   (for public map)
  
CLIENT SUBSCRIBES TO:
  room: city:{cityId}          All events for a city
  room: dept:{deptId}          Events for a specific department
  room: project:{projectId}    Events for a specific project
```

---

## 25. Directory Structure

```
civiq/
├── packages/                          # Turborepo monorepo packages
│   ├── types/                         # Shared TypeScript types
│   │   ├── src/
│   │   │   ├── project.types.ts       # ProjectType, ProjectStatus enums
│   │   │   ├── user.types.ts          # UserRole, Persona interfaces
│   │   │   ├── clash.types.ts         # ClashDetectionResult, ClashStatus
│   │   │   ├── mcdm.types.ts          # MCDMScore, MCDMBreakdown
│   │   │   ├── ai.types.ts            # AIRecommendation, AIResponse
│   │   │   └── notification.types.ts  # NotificationEvent, Channel
│   │   └── package.json
│   │
│   └── config/                        # Shared ESLint, TypeScript configs
│
├── apps/
│   ├── web/                           # Next.js 15 web dashboard
│   │   ├── src/
│   │   │   ├── app/                   # App Router pages
│   │   │   │   ├── (auth)/            # Login, SSO callback
│   │   │   │   ├── dashboard/         # Commissioner dashboard
│   │   │   │   ├── admin/             # Admin workspace
│   │   │   │   │   ├── queue/         # Pending approvals
│   │   │   │   │   ├── clashes/       # Clash resolution interface
│   │   │   │   │   └── analytics/     # Department performance
│   │   │   │   ├── officer/           # Officer workspace
│   │   │   │   │   ├── projects/      # Submit + track projects
│   │   │   │   │   └── notifications/ # Clash alerts, decisions
│   │   │   │   ├── supervisor/        # Supervisor workspace
│   │   │   │   │   └── progress/      # Update assigned projects
│   │   │   │   └── public/            # Public map + complaints
│   │   │   │       ├── map/
│   │   │   │       └── complaints/
│   │   │   ├── components/
│   │   │   │   ├── map/               # Leaflet map components
│   │   │   │   │   ├── MapCanvas.tsx  # Main split-screen map
│   │   │   │   │   ├── ProjectLayer.tsx
│   │   │   │   │   ├── ClashOverlay.tsx
│   │   │   │   │   └── DrawingTools.tsx
│   │   │   │   ├── project/
│   │   │   │   │   ├── SubmissionForm/ # Multi-step form
│   │   │   │   │   ├── MCDMPreview/   # Real-time score preview
│   │   │   │   │   ├── ClashWarning/  # Pre-submission clash alert
│   │   │   │   │   └── PhaseSelector/ # Phase 1/2/3 selection
│   │   │   │   ├── admin/
│   │   │   │   │   ├── ClashResolver/ # Side-by-side comparison
│   │   │   │   │   ├── OverrideModal/ # 4-category override form
│   │   │   │   │   └── AIPanel/       # AI suggestions panel
│   │   │   │   └── ui/                # Shadcn components
│   │   │   ├── lib/
│   │   │   │   ├── api/               # API client (TanStack Query)
│   │   │   │   ├── turf/              # Turf.js utilities
│   │   │   │   └── store/             # Zustand global state
│   │   │   └── styles/
│   │   └── package.json
│   │
│   ├── mobile/                        # React Native + Expo
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   │   ├── ProjectList.tsx    # Assigned projects
│   │   │   │   ├── ProjectDetail.tsx  # Project + map view
│   │   │   │   ├── ProgressUpdate.tsx # Update % + photos
│   │   │   │   └── ReportIssue.tsx    # Blocker reporting
│   │   │   ├── offline/
│   │   │   │   ├── db.ts              # WatermelonDB schema
│   │   │   │   ├── sync.ts            # Background sync logic
│   │   │   │   └── queue.ts           # Photo upload queue
│   │   │   ├── components/
│   │   │   │   ├── ProgressSlider.tsx # Large-touch-target slider
│   │   │   │   ├── PhotoCapture.tsx   # Camera + gallery
│   │   │   │   └── OfflineBadge.tsx   # Offline indicator
│   │   │   └── localization/
│   │   │       ├── en.json
│   │   │       └── hi.json            # Hindi translation
│   │   └── package.json
│   │
│   └── api/                           # NestJS backend
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── modules/
│       │   │   ├── projects/
│       │   │   │   ├── projects.module.ts
│       │   │   │   ├── projects.controller.ts
│       │   │   │   ├── projects.service.ts
│       │   │   │   ├── projects.repository.ts
│       │   │   │   ├── dto/               # Request/response DTOs
│       │   │   │   └── __tests__/
│       │   │   ├── clash/
│       │   │   │   ├── clash.module.ts
│       │   │   │   ├── clash.controller.ts
│       │   │   │   ├── clash.service.ts
│       │   │   │   ├── clash-detection.engine.ts  # Deterministic 4-step engine
│       │   │   │   └── __tests__/
│       │   │   ├── mcdm/
│       │   │   │   ├── mcdm.module.ts
│       │   │   │   ├── mcdm.service.ts            # 7-criteria scoring
│       │   │   │   ├── map-data.service.ts         # Overpass API queries
│       │   │   │   └── __tests__/
│       │   │   ├── ai/
│       │   │   │   ├── ai.module.ts
│       │   │   │   ├── ai.service.ts              # RAG orchestration
│       │   │   │   ├── rag/
│       │   │   │   │   ├── retriever.ts           # Vector DB queries
│       │   │   │   │   ├── prompt-builder.ts      # Prompt construction
│       │   │   │   │   └── feedback-loop.ts       # Learning from decisions
│       │   │   │   └── prompts/                   # Versioned prompt templates
│       │   │   │       ├── clash-resolution.v1.ts
│       │   │   │       ├── pre-submission.v1.ts
│       │   │   │       └── restoration-plan.v1.ts
│       │   │   ├── protection/
│       │   │   │   ├── protection.module.ts
│       │   │   │   └── protection.service.ts
│       │   │   ├── notifications/
│       │   │   │   ├── notifications.module.ts
│       │   │   │   ├── notifications.service.ts
│       │   │   │   ├── channels/
│       │   │   │   │   ├── sms.provider.ts        # MSG91
│       │   │   │   │   ├── whatsapp.provider.ts   # Meta API
│       │   │   │   │   ├── email.provider.ts      # SES
│       │   │   │   │   └── inapp.provider.ts      # WebSocket
│       │   │   │   └── queue/                     # Bull job definitions
│       │   │   ├── erp/
│       │   │   │   ├── erp.module.ts
│       │   │   │   ├── erp.service.ts             # Token generation + validation
│       │   │   │   └── adapters/                  # Per-ERP adapters
│       │   │   │       ├── nic-pfms.adapter.ts
│       │   │   │       └── ifms-up.adapter.ts
│       │   │   ├── auth/
│       │   │   │   ├── auth.module.ts
│       │   │   │   ├── nic-sso.strategy.ts
│       │   │   │   ├── jwt.strategy.ts
│       │   │   │   └── rbac.guard.ts
│       │   │   ├── audit/
│       │   │   │   ├── audit.module.ts
│       │   │   │   └── audit.service.ts           # Immutable log writer
│       │   │   ├── map/
│       │   │   │   ├── map.module.ts
│       │   │   │   ├── nominatim.service.ts       # Self-hosted geocoding
│       │   │   │   └── overpass.service.ts        # POI queries
│       │   │   ├── users/
│       │   │   ├── departments/
│       │   │   ├── complaints/
│       │   │   └── public/                        # Public API (no auth)
│       │   ├── common/
│       │   │   ├── guards/
│       │   │   ├── interceptors/                  # Audit log interceptor
│       │   │   ├── pipes/
│       │   │   └── decorators/
│       │   ├── database/
│       │   │   ├── prisma/
│       │   │   │   ├── schema.prisma
│       │   │   │   └── migrations/
│       │   │   └── seeds/
│       │   │       ├── departments.seed.ts
│       │   │       ├── complaints.seed.ts         # 40-50 realistic Ghaziabad complaints
│       │   │       ├── past-projects.seed.ts      # 10 completed projects for AI context
│       │   │       └── conflict-matrix.seed.ts
│       │   └── config/
│       │       ├── database.config.ts
│       │       ├── ai.config.ts
│       │       └── environment.validation.ts
│       └── package.json
│
├── infrastructure/
│   ├── docker/
│   │   ├── docker-compose.yml           # Local dev: all services
│   │   ├── docker-compose.test.yml      # Test environment
│   │   ├── Dockerfile.api
│   │   └── Dockerfile.nominatim        # Self-hosted geocoding
│   ├── kubernetes/
│   │   ├── namespace.yml
│   │   ├── api-deployment.yml
│   │   ├── api-hpa.yml                  # Horizontal pod autoscaler
│   │   ├── postgres-statefulset.yml
│   │   ├── redis-deployment.yml
│   │   └── ingress.yml
│   ├── terraform/
│   │   ├── main.tf                      # AWS EKS + RDS + ElastiCache
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── scripts/
│       ├── setup-dev.sh
│       ├── seed-database.sh
│       └── backup-db.sh
│
├── .github/
│   └── workflows/
│       ├── ci.yml                       # Test + lint on PR
│       ├── deploy-staging.yml           # Deploy on merge to main
│       └── deploy-production.yml        # Deploy on release tag
│
├── turbo.json
├── package.json
└── README.md
```

---

## 26. Monitoring, Observability & Analytics

### 26.1 Monitoring Stack

```
ERROR TRACKING:
  Tool: Sentry
  Covers: Next.js frontend, NestJS backend, React Native mobile
  Alerts: Immediate for P0/P1 errors, hourly digest for P2

METRICS:
  Tool: Prometheus + Grafana
  Scrapes: NestJS /metrics endpoint, PostgreSQL exporter, Redis exporter
  Dashboards: System health, AI performance, business metrics

DISTRIBUTED TRACING:
  Tool: OpenTelemetry → Jaeger
  Critical traces: API request → DB query → AI call → notification send
  Purpose: Find bottlenecks in AI suggestion pipeline

LOG AGGREGATION:
  Tool: Loki + Grafana
  Structured JSON logs from all services
  Retention: 90 days hot, 2 years cold (S3)

PRODUCT ANALYTICS:
  Tool: PostHog (self-hosted, DPDP compliant — no data to EU/US)
  Tracks: Feature adoption, user flow completion, drop-off points
```

### 26.2 Key Metrics to Track

```
SYSTEM HEALTH:
  API p50/p95/p99 latency by endpoint
  Error rate by service
  Database query time (slow query log threshold: 100ms)
  AI API response time and token usage
  WebSocket connection count
  Queue depth (Bull jobs pending)

AI PERFORMANCE:
  Suggestion acceptance rate (target: >70%)
  Average confidence score
  Suggestions per event type (submission, clash, completion)
  Feedback loop completeness (% of suggestions that have human feedback)

BUSINESS METRICS:
  Daily/weekly project submissions per department
  Clash detection rate (clashes per 100 projects)
  Average clash resolution time (hours from detection to resolution)
  Admin override rate (overall and per category)
  Protection period violation rate
  ERP enforcement compliance rate (% with valid CAT token)
  Citizen complaint volume and resolution rate
  Estimated cost savings (calculated: clashes prevented × avg. excavation cost)

ADOPTION:
  Active users per role per week
  Mobile app vs web ratio for supervisors
  Offline sync success rate
```

### 26.3 Alerting Rules

```
P0 — IMMEDIATE (PagerDuty + Phone Call):
  API error rate > 5% for 5 minutes
  Database connection pool exhausted
  AI service completely unavailable for >10 minutes

P1 — URGENT (SMS + WhatsApp in 15 minutes):
  AI acceptance rate drops below 50% (sudden quality degradation)
  Enforcement compliance rate drops below 70% (system being bypassed)
  >3 unclassified overrides in 24 hours
  Payment/token validation endpoint error rate > 1%

P2 — WATCH (Email within 1 hour):
  AI acceptance rate drops below 70% (gradual degradation)
  Query latency p95 > 2 seconds
  Offline sync failure rate > 10% for any supervisor
  Complaint acknowledgment rate < 80% within 48 hours
```

---

## 27. Deployment & Scaling Strategy

### 27.1 Environments

```
LOCAL:     Docker Compose — all services on developer machine
STAGING:   AWS EKS (Mumbai) — mirrors production, used for QA and demos
PRODUCTION: AWS EKS (Mumbai) — blue-green deployment, zero downtime
```

### 27.2 Phased Deployment

```
PHASE 0 — PRE-LAUNCH (Month 1-2):
  Docker Compose local setup for all developers
  CI/CD pipeline: GitHub Actions → staging on every PR merge
  Load test with realistic Ghaziabad data volumes
  Security audit (internal)

PHASE 1 — PILOT (Month 3):
  Single city: Ghaziabad
  Single cluster: AWS EKS (ap-south-1)
  PostgreSQL: RDS Multi-AZ (automatic failover)
  Redis: ElastiCache cluster
  Feature flags: Enforce mode OFF (soft reminders only)
  Monitoring: Full stack live

PHASE 2 — ENFORCEMENT (Month 6+):
  Feature flags: Enable ERP hard enforcement
  Multiple cities: Add second city (Lucknow or Agra)
  Database: Read replicas added for analytics queries
  Auto-scaling: HPA configured for API pods

PHASE 3 — STATE SCALE (Month 12+):
  Multi-city: All major UP cities
  Database: Partitioning by city_id
  AI: Dedicated pod group, GPU support if needed
  Kubernetes: Multiple node pools by workload type
```

### 27.3 Zero-Downtime Deployment Strategy

```
STRATEGY: Blue-Green deployment

PROCESS:
  1. Deploy new version to "green" deployment (parallel to current "blue")
  2. Run smoke tests against green
  3. Shift 5% of traffic to green (canary)
  4. Monitor for 15 minutes — errors? Roll back to blue
  5. Shift 100% to green
  6. Blue becomes standby for 24 hours, then decommissioned

DATABASE MIGRATIONS:
  Expand-contract pattern:
    a. Expand: add new columns/tables without removing old ones
    b. Deploy new code that writes to both old and new
    c. Migrate data from old to new (background job)
    d. Contract: remove old columns in next deployment
  Never: breaking schema changes in same deployment as code changes
```

---

## 28. Edge Cases & Failure Handling

### 28.1 Philosophy

> Assume real-world messiness will always happen. The system must be resilient, transparent, and continuously improving. Every failure or edge case must be fully logged for audit and AI learning.

### 28.2 Edge Cases and Handling

| Edge Case | How CIVIQ Handles It |
|---|---|
| **New need appears 2–3 months after completion** | Protection period system catches this. AI generates restoration plan if Admin approves anyway. Restoration responsibility assigned to new department. |
| **Scope creep — remaining work submitted as new project** | AI detects similar scope/area from same department recently. Flags for Admin: "Possible continuation of Project X — consider converting to Phase 2." |
| **Project significantly delayed on ground** | Supervisor progress tracking triggers delay flag at >14 days behind. AI re-optimizes schedule for all affected queue. Officers notified with updated suggestions. |
| **Emergency overrides protection period** | Emergency project submitted. AI assesses impact + generates mandatory restoration plan. Admin approves with logged justification. Restoration task auto-created. |
| **Officer games MCDM by inflating condition rating** | AI cross-validates officer inputs against: complaint volume (database), infrastructure age (database), historical ratings for same location. Inconsistency flagged to Admin. |
| **Map data is inaccurate for officer's location** | Officer can correct any auto-detected value. Correction logged. AI uses correction to improve future detection. Admin can see when corrections were made. |
| **No internet on construction site (supervisor)** | Full offline mode. Progress + photos stored locally. Background sync when connection restored. Conflict resolution: last-write-wins by server timestamp. |
| **AI service is down** | Fallback to rule-based MCDM only (no AI commentary). Clash detection continues normally (deterministic engine unaffected). Admin gets: "AI suggestions temporarily unavailable." |
| **ERP API is down** | CIVIQ does not fail open. Budget release blocked. Manual fallback: paper CAT token + spot audits. Commissioner notified. |
| **Admin rejects projects repeatedly without real justification** | Pattern detection: override rate > 25% in 30 days → Commissioner alert. Unclassified overrides → immediate alert. Audit trail provides evidence. |
| **Same contractor stalls multiple projects across departments** | Contractor firm track record in MCDM Criteria 4. Database tracks stalls across all projects. Score reduced for new projects with that firm. |
| **Project marked complete but site not actually done** | As-built photos required before completion (minimum 3). Admin can dispute completion by raising a new review. Photo timestamp/GPS metadata stored for verification. |
| **Department bypasses CIVIQ entirely** | AI monitoring: complaints + map data suggest active work at location with no CIVIQ project → Commissioner alert. Physical verification possible. ERP enforcement makes this increasingly costly. |
| **Municipal Commissioner transfers** | System config + all historical data retained. New Commissioner has full access. No single-person dependency in system design. |

### 28.3 Data Recovery

```
BACKUP SCHEDULE:
  PostgreSQL: Continuous WAL archiving to S3 + daily snapshots
  MongoDB: Daily snapshots to S3
  Redis: Redis persistence (RDB + AOF) + daily snapshots
  Files (S3): Cross-region replication to ap-south-2 (Mumbai → Hyderabad)

RECOVERY TIME OBJECTIVES:
  RPO (Recovery Point Objective): <1 hour for all critical data
  RTO (Recovery Time Objective): <4 hours for full system restore

DISASTER RECOVERY:
  Primary: AWS Mumbai (ap-south-1)
  Backup: AWS Hyderabad (ap-south-2)
  Failover: Automated for database, manual trigger for application
```

---

## 29. Development Roadmap & Phasing

### 29.1 Phase 0: Foundation (Month 1–2)

```
GOAL: Working development environment, core data model, basic API

Deliverables:
  ✓ Complete system design document (this document)
  ✓ Tech stack finalized and documented
  ✓ Development environment: Docker Compose, all services running
  ✓ PostgreSQL schema migrations (Prisma)
  ✓ Seed data: departments, wards, past projects, complaints
  ✓ NestJS project structure with all modules scaffolded
  ✓ Basic authentication (JWT + placeholder SSO)
  ✓ CI/CD pipeline: GitHub Actions → staging
  ✓ OpenAPI docs auto-generated from NestJS decorators

Team size: 2 engineers
```

### 29.2 Phase 1: MVP (Month 3–7)

```
GOAL: Functional system demonstrable to municipal stakeholders

Core Features:
  ✓ User roles + RBAC + authentication
  ✓ Project submission form (all 8 sections)
  ✓ Location system (split-screen map, 3 input methods)
  ✓ MCDM scoring engine (all 7 criteria, all data sources)
  ✓ Clash detection engine (all 4 steps, conflict matrix)
  ✓ Admin review + approval/rejection interface
  ✓ Clash resolution workflow (both options, custom date rule)
  ✓ Supervisor progress update (web, basic offline)
  ✓ Public map + citizen complaint system
  ✓ Basic audit logging
  ✓ Basic AI integration (pre-submission analysis + clash suggestions)
  ✓ Notification system (in-app + email)

Success Criteria:
  3 departments actively using
  AI clash detection working with >75% accuracy
  Mobile app with reliable offline sync
  MCDM scores generating correctly for real Ghaziabad projects

Team size: 3–4 engineers
```

### 29.3 Phase 2: AI Intelligence + Enforcement (Month 8–10)

```
GOAL: Full AI capabilities + ERP enforcement live

Features:
  ✓ Long-term protection period system (full implementation)
  ✓ Restoration planning AI
  ✓ Dynamic re-planning on delays
  ✓ AI feedback loop (continuous learning)
  ✓ Gaming detection alerts
  ✓ ERP integration (soft mode: warning, not hard block)
  ✓ SMS + WhatsApp notifications
  ✓ Commissioner dashboard
  ✓ Admin override pattern detection
  ✓ Full mobile app (React Native) with Hindi support

Success Criteria:
  AI acceptance rate >70%
  ERP soft enforcement live
  Protection period violations being caught
  Mobile app used by all supervisors

Team size: 4–5 engineers
```

### 29.4 Phase 3: Scale + Compliance (Month 11–14)

```
GOAL: Production-hardened, compliance-verified, multi-city ready

Features:
  ✓ ERP hard enforcement (full technical block)
  ✓ Full DPDP Act compliance audit + fixes
  ✓ RTI report generation
  ✓ Performance optimization for 10,000+ projects
  ✓ Multi-city support (second city onboarding)
  ✓ Kubernetes HPA + multi-AZ
  ✓ CERT-In security audit
  ✓ Full monitoring stack
  ✓ Commissioner analytics — cost savings, ROI reports

Success Criteria:
  95%+ ERP enforcement compliance
  Security audit passed
  DPDP compliance certified
  Second city onboarded in <2 weeks
```

### 29.5 Phase 4: Future Enhancements (Month 15+)

```
POTENTIAL FUTURE FEATURES (not committed):
  • IoT sensor data ingestion (as data consumer only — no hardware)
  • Voice-based progress updates for supervisors
  • Predictive maintenance using AI pattern analysis
  • Open API for integration with Smart City Command Centers
  • State-wide or national rollout support
  • Automated RTI response generation
  • Integration with PMGSY (road infrastructure data)
```

---

## 30. Assumptions & Risks

### 30.1 Key Assumptions

| Assumption | Confidence | Impact if Wrong |
|---|---|---|
| Municipal Commissioner will issue mandatory usage order | High — CIVIQ solves a real problem they face | Without formal order, adoption depends on goodwill — problematic |
| Departments will have ERP systems with API access | Medium — legacy systems are common | Manual CAT token validation fallback required |
| OpenStreetMap data is reasonably accurate for Ghaziabad | High — OSM India coverage is good in UP cities | Clause: officer correction mechanism handles gaps |
| Field supervisors have Android smartphones | High — very common in India | iOS also supported; basic web fallback for feature phones |
| AI suggestion quality reaches 70% acceptance in 6 months | Medium — depends on quality of seed data and feedback | Human-only MCDM still works; AI is enhancement not dependency |
| Population data from Census India is adequate | Medium — 2011 census data, may be outdated | Use as relative comparison, not absolute — still valid for scoring |

### 30.2 Risk Register

```
RISK                           LIKELIHOOD  IMPACT   MITIGATION
─────────────────────────────────────────────────────────────────────
Low adoption by departments    HIGH        HIGH     ERP enforcement (technical block,
                                                    not policy). Official order.
                                                    Phase-in enforcement.

ERP integration fails          MEDIUM      HIGH     Manual CAT token fallback.
(legacy systems, no API)                           Prioritize 1-2 ERPs for Phase 2.
                                                    Paper-based spot audits in interim.

AI suggestions not trusted     MEDIUM      HIGH     Transparent confidence scores.
by Admin/Officers                                  Every suggestion has reasoning.
                                                    Start with conservative AI.
                                                    Build trust over 6 months.

Officer resistance             HIGH        MEDIUM   Mobile-first, minimal extra work.
(extra workload)                                   Show time savings vs old process.
                                                    Hindi language support.
                                                    Field demos in Ghaziabad.

Map data gaps in Ghaziabad     MEDIUM      MEDIUM   Officer correction mechanism.
                                                    Corrections improve data.
                                                    OSM India community engagement.

DPDP compliance gaps           MEDIUM      HIGH     Legal review before launch.
                                                    DPDP consultant in Phase 2.
                                                    Privacy by design in schema.

AI performance degradation     LOW         MEDIUM   Monitoring + weekly prompt review.
over time                                          LangSmith prompt versioning.
                                                    Human fallback always available.

Budget constraints             MEDIUM      HIGH     Start MVP with minimal infra cost
at scaling phase                                   (Vercel + Railway < ₹15k/month).
                                                    Scale on demonstrated ROI.

Commissioner transfers         MEDIUM      HIGH     No single-person dependency.
mid-deployment                                     Full documentation.
                                                    Institutional process.

Contractor data gaming         MEDIUM      MEDIUM   AI cross-validation.
(submitting wrong firm names)                      Admin can flag.
                                                    Audit trail for post-hoc review.
```

---

## 31. Appendix

### A. Glossary

| Term | Definition |
|---|---|
| **CIVIQ** | Civic Infrastructure Quality & Coordination Platform |
| **CAT** | CIVIQ Approval Token — cryptographically signed token issued on project approval, required by ERP for budget release |
| **Clash** | Conflict between two infrastructure projects because all three conditions are met simultaneously: geographic overlap, time overlap, and work-type conflict |
| **Short-term Buffer** | System-defined gap in days between one project completing and the next starting at the same location (prevents immediate re-excavation while fresh work settles) |
| **Long-term Protection Period** | System-defined gap in months during which completed infrastructure is flagged as "protected" — new work triggering a violation requires Admin review and AI restoration plan |
| **MCDM** | Multi-Criteria Decision Making — the 7-criteria weighted scoring system that calculates every project's priority score |
| **RAG** | Retrieval-Augmented Generation — AI architecture where the LLM retrieves relevant historical examples from the vector database before generating suggestions |
| **Human-in-the-Loop** | Design principle: AI always suggests, humans always decide. Every consequential action has a human name in the audit log. |
| **CNR ID** | Complaint Number Reference — unique tracking ID (CNR-XXXXXX) given to every citizen complaint |
| **Conditional Clash (~)** | Two projects that can potentially coexist in the same location and time if properly coordinated — requires Admin review but not hard blocked |
| **Incompatible Clash (✗)** | Two projects that physically cannot proceed simultaneously — hard blocked until resolved |
| **Override** | Admin decision to proceed despite AI/MCDM recommendation — always requires one of 4 defined categories, a reference number, written justification, and acknowledgment that it is permanently logged |
| **PWD** | Public Works Department — responsible for roads and pavements |
| **Jal Nigam / Jal Board** | Water supply department |
| **PVVNL / DISCOMS** | Power (electricity) distribution company for Western UP |
| **DPDP Act** | Digital Personal Data Protection Act 2023 — Indian data privacy law |
| **ERP** | Enterprise Resource Planning — municipal financial and project management systems (SAP, NIC PFMS, IFMS) |
| **NIC** | National Informatics Centre — Indian government IT infrastructure provider |
| **PostGIS** | PostgreSQL extension for geographic/spatial data and queries |
| **Turf.js** | JavaScript library for geographic analysis and geometric calculations |
| **Nominatim** | Geocoding service built on OpenStreetMap (address ↔ coordinates) |
| **Overpass API** | Query interface for OpenStreetMap data (used for POI detection) |

### B. Buffer Values Quick Reference

```
SHORT-TERM BUFFER (days after completion, before next project can start):
  Road reconstruction:     14 days
  Road resurfacing:         7 days
  Water pipeline:          10 days
  Sewage pipeline:         10 days
  Electrical overhead:      5 days
  Electrical underground:   7 days
  Parks and plantation:     3 days
  Other:                    7 days

LONG-TERM PROTECTION PERIOD (months after completion):
  Road reconstruction:    24 months
  Road resurfacing:       18 months
  Water pipeline:         18 months
  Sewage pipeline:        18 months
  Electrical underground: 12 months
  Electrical overhead:     6 months
  Parks (major):          12 months
  Parks (minor):           8 months
  Other:                  12 months

DETECTION BUFFER RADII (metres — base, before size addition):
  Road reconstruction:    30m
  Road resurfacing:       20m
  Water pipeline:         15m
  Sewage pipeline:        20m
  Electrical overhead:    10m
  Electrical underground: 15m
  Parks:                  10m
  Other:                  15m
```

### C. MCDM Quick Reference

```
7 CRITERIA + WEIGHTS:
  Condition Severity            26%  (Officer + DB complaints)
  Population & Facility Impact  21%  (System auto: map data)
  Seasonal Compatibility        16%  (System auto: calendar)
  Execution Readiness           16%  (Officer + DB track record)
  Citizen Disruption            10%  (Officer)
  Infrastructure Age             8%  (Officer: year of last work)
  Economic Value                 3%  (System auto: map data)

OFFICER CONTROLS: 60%  |  SYSTEM CONTROLS: 40% (cannot be gamed)
```

### D. Notification Event Reference

See Section 16.1 — full notification events table with triggers, recipients, channels, and required actions.

### E. API Endpoint Reference

See Section 24.2 — complete REST endpoint list with methods, paths, and descriptions.

### F. Seed Data Requirements for Prototype

```
For a realistic MVP demonstration, seed the following:

DEPARTMENTS (Ghaziabad):
  PWD (Roads): code=PWD
  Jal Nigam (Water): code=JALNIGAM
  PVVNL (Electricity): code=PVVNL
  Sewerage Board: code=SEWERAGE
  Parks & Horticulture: code=PARKS

CITIZEN COMPLAINTS (40–50 records):
  Distribute across Vijay Nagar, Indirapuram, Vasundhara, Kaushambi
  Include: pothole, water leak, flooding, repeated digging complaints
  Vary complaint volume per location (some with 15-20, some with 2-3)
  Include 5-8 "incident" type complaints (accidents, collapse)

COMPLETED PAST PROJECTS (10 records):
  Mix of types: 3 road, 3 water pipeline, 2 electrical, 2 parks
  Vary contractor performance: 3 with stalls, 7 clean records
  Vary department on-time rate: 2 departments < 60%, others 70-85%
  Some completed within protection period of each other
  Place in realistic Ghaziabad locations

SEASONAL CONFIG: Pre-loaded as system_config (June-Sept monsoon)
CONFLICT MATRIX: Pre-loaded as per schema seed
BUFFER VALUES: Pre-loaded as system_config
PROTECTION PERIODS: Pre-loaded as system_config
LIFECYCLE VALUES: Pre-loaded as system_config
```

### G. Project Code Format

```
Format: {CITY}-{DEPT}-{YEAR}-{SEQUENCE}
Example: GHZ-PWD-2026-0047

City codes:    GHZ (Ghaziabad), LKO (Lucknow), AGR (Agra)
Dept codes:    PWD, JALNIGAM, PVVNL, SEWERAGE, PARKS
Year:          4-digit year of submission
Sequence:      4-digit sequence, reset per city-dept-year combination
```

### H. CNR ID Format

```
Format: CNR-XXXXXX
Where X is alphanumeric (A-Z, 0-9)
Example: CNR-A4F2X9

Generated on complaint submission
Unique across the system
Used as authentication for complaint status tracking (no login needed)
```

---

*End of CIVIQ System Design Document v3.0*

---

**Document Control:**
- This document is the single source of truth for all CIVIQ development
- Changes must be version-controlled and communicated to all team members
- Sections 9 (Clash Detection), 10 (Protection), 12 (MCDM), and 14 (Override) are foundational — changes to these require full team review
- All code, designs, and specifications must be consistent with this document

*Version 3.0 — April 2026*
