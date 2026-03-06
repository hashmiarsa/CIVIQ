# URBAN NEXUS — API Contract
# Every endpoint, request body, and response shape defined here.
# Frontend and backend must both follow this exactly.
# Base URL: /api/v1

---

## Auth Routes — /api/v1/auth

### POST /api/v1/auth/register
*Admin only — creates officer or supervisor accounts*

**Request Body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@pwd.gov.in",
  "password": "password123",
  "role": "officer",
  "department": "64f1a2b3c4d5e6f7a8b9c0d1"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "name": "Rahul Sharma",
    "email": "rahul@pwd.gov.in",
    "role": "officer",
    "department": "64f1a2b3c4d5e6f7a8b9c0d1"
  }
}
```

---

### POST /api/v1/auth/login

**Request Body:**
```json
{
  "email": "rahul@pwd.gov.in",
  "password": "password123"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "name": "Rahul Sharma",
      "email": "rahul@pwd.gov.in",
      "role": "officer",
      "department": {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "name": "Public Works Department",
        "code": "PWD"
      }
    }
  }
}
```

---

### GET /api/v1/auth/me
*Protected — requires JWT*

**Response 200:**
```json
{
  "success": true,
  "message": "User profile fetched",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "name": "Rahul Sharma",
    "email": "rahul@pwd.gov.in",
    "role": "officer",
    "department": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Public Works Department",
      "code": "PWD"
    }
  }
}
```

---

## Department Routes — /api/v1/departments

### GET /api/v1/departments
*Protected — admin only*

**Response 200:**
```json
{
  "success": true,
  "message": "Departments fetched",
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Public Works Department",
      "code": "PWD",
      "isActive": true
    }
  ]
}
```

---

### POST /api/v1/departments
*Protected — admin only*

**Request Body:**
```json
{
  "name": "Public Works Department",
  "code": "PWD"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Department created",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Public Works Department",
    "code": "PWD"
  }
}
```

---

## Project Routes — /api/v1/projects

### GET /api/v1/projects
*Protected — admin sees all; officer sees own department only*

**Query Params (optional):**
```
?status=pending
?type=road
?department=64f1a2b3c4d5e6f7a8b9c0d1
?page=1&limit=20
```

**Response 200:**
```json
{
  "success": true,
  "message": "Projects fetched",
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
      "title": "MG Road Repair",
      "type": "road",
      "status": "pending",
      "department": { "_id": "...", "name": "PWD", "code": "PWD" },
      "submittedBy": { "_id": "...", "name": "Rahul Sharma" },
      "startDate": "2025-06-01T00:00:00.000Z",
      "endDate": "2025-06-15T00:00:00.000Z",
      "estimatedCost": 500000,
      "progress": 0
    }
  ],
  "pagination": { "total": 45, "page": 1, "limit": 20, "pages": 3 }
}
```

---

### POST /api/v1/projects
*Protected — officer, admin*
*This endpoint auto-triggers conflict detection after saving*

**Request Body:**
```json
{
  "title": "MG Road Repair",
  "type": "road",
  "description": "Resurfacing of MG Road from Junction A to B",
  "location": {
    "type": "Polygon",
    "coordinates": [[[77.2090, 28.6139], [77.2100, 28.6139], [77.2100, 28.6149], [77.2090, 28.6149], [77.2090, 28.6139]]]
  },
  "address": "MG Road, Ghaziabad",
  "startDate": "2025-06-01",
  "endDate": "2025-06-15",
  "estimatedCost": 500000,
  "priority": "high",
  "criteria": {
    "urgency": 8,
    "socialImpact": 7,
    "estimatedCost": 5,
    "feasibility": 8,
    "environmentImpact": 4
  },
  "dependencies": []
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Project submitted successfully",
  "data": {
    "project": { ...projectObject },
    "clashesDetected": 1,
    "conflicts": [
      {
        "_id": "...",
        "projectB": { "_id": "...", "title": "Water Pipeline MG Road" },
        "overlapDates": { "start": "2025-06-05", "end": "2025-06-15" }
      }
    ]
  }
}
```

---

### GET /api/v1/projects/:id
*Protected — admin or own department*

**Response 200:**
```json
{
  "success": true,
  "message": "Project fetched",
  "data": {
    "_id": "...",
    "title": "MG Road Repair",
    "type": "road",
    "status": "pending",
    "department": { "_id": "...", "name": "PWD" },
    "submittedBy": { "_id": "...", "name": "Rahul Sharma" },
    "assignedTo": null,
    "location": { "type": "Polygon", "coordinates": [...] },
    "address": "MG Road, Ghaziabad",
    "startDate": "2025-06-01T00:00:00.000Z",
    "endDate": "2025-06-15T00:00:00.000Z",
    "estimatedCost": 500000,
    "mcdmScore": 0.84,
    "criteria": { "urgency": 8, "socialImpact": 7, "estimatedCost": 5, "feasibility": 8, "environmentImpact": 4 },
    "dependencies": [],
    "progress": 0,
    "createdAt": "2025-05-20T10:30:00.000Z"
  }
}
```

---

### PATCH /api/v1/projects/:id/status
*Protected — admin only (approve/reject); supervisor (progress update)*

**Request Body (admin):**
```json
{
  "status": "approved",
  "comment": "Approved for June execution"
}
```

**Request Body (supervisor — progress only):**
```json
{
  "progress": 50
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Project status updated",
  "data": { ...updatedProject }
}
```

---

### PATCH /api/v1/projects/:id/assign
*Protected — officer, admin*

**Request Body:**
```json
{
  "supervisorId": "64f1a2b3c4d5e6f7a8b9c0d5"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Project assigned to supervisor",
  "data": { ...updatedProject }
}
```

---

### GET /api/v1/projects/map
*Protected — returns GeoJSON for map rendering*

**Response 200:**
```json
{
  "success": true,
  "message": "Map data fetched",
  "data": {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": { "type": "Polygon", "coordinates": [...] },
        "properties": {
          "_id": "...",
          "title": "MG Road Repair",
          "type": "road",
          "status": "approved",
          "department": "PWD"
        }
      }
    ]
  }
}
```

---

## Conflict Routes — /api/v1/conflicts

### GET /api/v1/conflicts
*Protected — admin sees all; officer sees own department's conflicts*

**Response 200:**
```json
{
  "success": true,
  "message": "Conflicts fetched",
  "data": [
    {
      "_id": "...",
      "projectA": { "_id": "...", "title": "MG Road Repair", "department": "PWD" },
      "projectB": { "_id": "...", "title": "Water Pipeline MG Road", "department": "WB" },
      "overlapDates": { "start": "2025-06-05", "end": "2025-06-15" },
      "status": "open",
      "recommendation": {
        "order": ["projectB_id", "projectA_id"],
        "scores": { "projectA": 0.84, "projectB": 0.91 }
      },
      "createdAt": "2025-05-20T10:30:00.000Z"
    }
  ]
}
```

---

### GET /api/v1/conflicts/:id
*Protected — full conflict detail with MCDM scores and execution order*

**Response 200:**
```json
{
  "success": true,
  "message": "Conflict detail fetched",
  "data": {
    "_id": "...",
    "projectA": { ...fullProjectObject },
    "projectB": { ...fullProjectObject },
    "overlapArea": { "type": "Polygon", "coordinates": [...] },
    "overlapDates": { "start": "2025-06-05", "end": "2025-06-15" },
    "status": "open",
    "recommendation": {
      "order": ["projectB_id", "projectA_id"],
      "scores": { "projectA": 0.84, "projectB": 0.91 },
      "explanation": "Water pipeline (0.91) scored higher on urgency and social impact. Execute pipeline first, road repair after."
    }
  }
}
```

---

### PATCH /api/v1/conflicts/:id/resolve
*Protected — admin only*

**Request Body:**
```json
{
  "resolution": "Pipeline to proceed first. Road repair rescheduled to July 1.",
  "status": "resolved"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Conflict resolved",
  "data": { ...updatedConflict }
}
```

---

## Citizen Report Routes — /api/v1/reports

### POST /api/v1/reports
*Public — no authentication required*

**Request Body (multipart/form-data):**
```
type: "pothole"
description: "Large pothole near bus stop causing accidents"
latitude: 28.6139
longitude: 77.2090
photo: [file upload — optional]
```

**Response 201:**
```json
{
  "success": true,
  "message": "Report submitted successfully",
  "data": {
    "trackingId": "CNR-A3X7P2",
    "type": "pothole",
    "status": "submitted",
    "message": "Use your tracking ID to check status"
  }
}
```

---

### GET /api/v1/reports/track/:trackingId
*Public — no authentication required*

**Response 200:**
```json
{
  "success": true,
  "message": "Report found",
  "data": {
    "trackingId": "CNR-A3X7P2",
    "type": "pothole",
    "status": "in_progress",
    "description": "Large pothole near bus stop",
    "assignedTo": { "name": "Public Works Department" },
    "createdAt": "2025-05-18T09:00:00.000Z",
    "updatedAt": "2025-05-20T11:00:00.000Z"
  }
}
```

---

### GET /api/v1/reports
*Protected — admin and officer only*

**Response 200:**
```json
{
  "success": true,
  "message": "Reports fetched",
  "data": [...reportObjects],
  "pagination": { "total": 120, "page": 1, "limit": 20, "pages": 6 }
}
```

---

### PATCH /api/v1/reports/:id/status
*Protected — officer, admin*

**Request Body:**
```json
{
  "status": "in_progress",
  "assignedTo": "64f1a2b3c4d5e6f7a8b9c0d1"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Report status updated",
  "data": { ...updatedReport }
}
```

---

## Admin Routes — /api/v1/admin

### GET /api/v1/admin/dashboard
*Protected — admin only*

**Response 200:**
```json
{
  "success": true,
  "message": "Dashboard data fetched",
  "data": {
    "totalProjects": 142,
    "pendingApprovals": 8,
    "activeConflicts": 3,
    "resolvedConflicts": 27,
    "totalDepartments": 6,
    "citizenReports": { "total": 89, "unresolved": 12 },
    "projectsByStatus": {
      "pending": 8,
      "approved": 45,
      "ongoing": 31,
      "completed": 52,
      "rejected": 6
    },
    "projectsByDepartment": [
      { "department": "PWD", "count": 38 },
      { "department": "Water Board", "count": 29 }
    ]
  }
}
```

---

### GET /api/v1/admin/audit
*Protected — admin only*

**Query Params:**
```
?userId=...
?resource=projects
?page=1&limit=20
```

**Response 200:**
```json
{
  "success": true,
  "message": "Audit logs fetched",
  "data": [
    {
      "_id": "...",
      "userId": { "_id": "...", "name": "Rahul Sharma", "role": "officer" },
      "action": "project.created",
      "resource": "projects",
      "resourceId": "...",
      "after": { "title": "MG Road Repair", "status": "pending" },
      "ip": "192.168.1.1",
      "createdAt": "2025-05-20T10:30:00.000Z"
    }
  ],
  "pagination": { "total": 500, "page": 1, "limit": 20, "pages": 25 }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "field": "endDate",
    "message": "End date must be after start date"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided or token is invalid"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Insufficient permissions."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Project not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

*This contract is final. Frontend builds API calls based on this.*
*Backend implements responses based on this.*
*If any endpoint needs to change, update this file first.*