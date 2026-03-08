"use strict";

const mongoose = require("mongoose");

// ---------------------------------------------------------------------------
// Schema — exactly as defined in SCHEMA.md
// ---------------------------------------------------------------------------
const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },
    action: {
      type:     String,
      required: true,
      // Examples: "project.created", "conflict.resolved",
      //           "project.approved", "report.status_updated"
    },
    resource: {
      type:     String,
      required: true, // collection name: "projects", "conflicts", etc.
    },
    resourceId: {
      type:     mongoose.Schema.Types.ObjectId,
      required: true,
    },
    before: {
      type:    mongoose.Schema.Types.Mixed,
      default: null, // state before the change
    },
    after: {
      type:    mongoose.Schema.Types.Mixed,
      default: null, // state after the change
    },
    ip: {
      type: String,
    },
  },
  {
    timestamps: true,
    // Audit logs are never updated or deleted — enforce at schema level
  }
);

// ---------------------------------------------------------------------------
// Indexes — as defined in SCHEMA.md
// ---------------------------------------------------------------------------
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ resourceId: 1 });

// ---------------------------------------------------------------------------
// Pre hooks — block any update or delete operations on audit logs
// Audit logs are append-only by design
// ---------------------------------------------------------------------------
const IMMUTABILITY_ERROR = "Audit logs are immutable and cannot be modified or deleted.";

auditLogSchema.pre(["updateOne", "findOneAndUpdate", "updateMany"], function (next) {
  next(new Error(IMMUTABILITY_ERROR));
});

auditLogSchema.pre(["deleteOne", "findOneAndDelete", "deleteMany"], function (next) {
  next(new Error(IMMUTABILITY_ERROR));
});

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------
const AuditLog = mongoose.model("AuditLog", auditLogSchema);

module.exports = AuditLog;