# URBAN NEXUS — Database Schema Reference
# All MongoDB collections and Mongoose schemas defined here.
# No developer should define schemas differently from this file.

---

## Collection 1: users

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    select: false           // never returned in API responses
  },
  role: {
    type: String,
    enum: ["admin", "officer", "supervisor", "citizen"],
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: null           // null for admin and citizen
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });
```

**Indexes:**
```javascript
userSchema.index({ email: 1 }, { unique: true });
```

---

## Collection 2: departments

```javascript
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Department name is required"],
    unique: true,
    trim: true              // "Public Works Department", "Water Board"
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true              // "PWD", "WB", "ELEC"
  },
  headId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });
```

---

## Collection 3: projects

```javascript
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title is required"],
    trim: true
  },
  type: {
    type: String,
    enum: ["road", "water", "electricity", "sewage", "parks", "other"],
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null           // supervisor assigned by officer
  },
  location: {
    type: {
      type: String,
      enum: ["Polygon"],
      required: true
    },
    coordinates: {
      type: [[[Number]]],   // GeoJSON Polygon: [[[lng, lat], ...]]
      required: true
    }
  },
  address: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"]
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"]
  },
  estimatedCost: {
    type: Number,
    min: 0
  },
  status: {
    type: String,
    enum: ["pending", "approved", "ongoing", "completed", "rejected", "clashed"],
    default: "pending"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    default: "medium"
  },
  mcdmScore: {
    type: Number,
    min: 0,
    max: 1,
    default: null           // computed by MCDM engine, not set by user
  },
  // MCDM input criteria (officer fills these on submission)
  criteria: {
    urgency:           { type: Number, min: 1, max: 10, default: 5 },
    socialImpact:      { type: Number, min: 1, max: 10, default: 5 },
    estimatedCost:     { type: Number, min: 1, max: 10, default: 5 },
    feasibility:       { type: Number, min: 1, max: 10, default: 5 },
    environmentImpact: { type: Number, min: 1, max: 10, default: 5 }
  },
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"          // projects that must complete before this one
  }],
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true });
```

**Indexes:**
```javascript
projectSchema.index({ location: "2dsphere" });
projectSchema.index({ department: 1, status: 1 });
projectSchema.index({ startDate: 1, endDate: 1 });
```

**Validation:**
```javascript
// endDate must be after startDate
projectSchema.pre("save", function(next) {
  if (this.endDate <= this.startDate) {
    return next(new Error("End date must be after start date"));
  }
  next();
});
```

---

## Collection 4: conflicts

```javascript
const conflictSchema = new mongoose.Schema({
  projectA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  projectB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  overlapArea: {
    type: {
      type: String,
      enum: ["Polygon"]
    },
    coordinates: [[[Number]]]  // GeoJSON of the intersection area
  },
  overlapDates: {
    start: { type: Date },
    end:   { type: Date }
  },
  status: {
    type: String,
    enum: ["open", "resolved", "overridden"],
    default: "open"
  },
  resolution: {
    type: String,
    default: null             // admin's resolution note
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  recommendation: {
    order:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    scores: {
      projectA: { type: Number },
      projectB: { type: Number }
    }
  },
  resolvedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });
```

**Indexes:**
```javascript
conflictSchema.index({ projectA: 1, projectB: 1 });
conflictSchema.index({ status: 1 });
```

---

## Collection 5: citizen_reports

```javascript
const citizenReportSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    unique: true,
    required: true          // auto-generated, format: "CNR-XXXXXX"
  },
  type: {
    type: String,
    enum: ["pothole", "streetlight", "water_leak", "garbage", "other"],
    required: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],       // [longitude, latitude]
      required: true
    }
  },
  photoUrl: {
    type: String,
    default: null           // Cloudinary URL
  },
  status: {
    type: String,
    enum: ["submitted", "acknowledged", "in_progress", "resolved"],
    default: "submitted"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: null
  },
  linkedProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    default: null
  }
}, { timestamps: true });
```

**Indexes:**
```javascript
citizenReportSchema.index({ location: "2dsphere" });
citizenReportSchema.index({ trackingId: 1 }, { unique: true });
```

---

## Collection 6: audit_logs

```javascript
const auditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  action: {
    type: String,
    required: true
    // Examples: "project.created", "conflict.resolved",
    //           "project.approved", "report.status_updated"
  },
  resource: {
    type: String,
    required: true          // collection name: "projects", "conflicts"
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  before: {
    type: mongoose.Schema.Types.Mixed,
    default: null           // state before the change
  },
  after: {
    type: mongoose.Schema.Types.Mixed,
    default: null           // state after the change
  },
  ip: {
    type: String
  }
}, {
  timestamps: true,
  // audit logs are never updated or deleted
});
```

**Indexes:**
```javascript
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ resourceId: 1 });
```

---

## Relationships Summary

```
departments  →  users          (one department has many users)
departments  →  projects       (one department has many projects)
users        →  projects       (one officer submits many projects)
projects     →  projects       (many-to-many via dependencies[])
projects     →  conflicts      (one project involved in many conflicts)
users        →  audit_logs     (one user has many log entries)
projects     →  citizen_reports (optional link)
```

---

## Tracking ID Generator (for CitizenReport)

```javascript
// utils/trackingId.js
const generateTrackingId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "CNR-";
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

module.exports = { generateTrackingId };
```

---

*All schemas defined here are final.*
*Do not add or remove fields without updating this file.*