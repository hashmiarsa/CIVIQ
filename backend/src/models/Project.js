"use strict";

const mongoose = require("mongoose");

// ---------------------------------------------------------------------------
// Schema — exactly as defined in SCHEMA.md
// ---------------------------------------------------------------------------
const projectSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, "Project title is required"],
      trim:     true,
    },
    type: {
      type:     String,
      enum:     ["road", "water", "electricity", "sewage", "parks", "other"],
      required: true,
    },
    department: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "Department",
      required: true,
    },
    submittedBy: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },
    assignedTo: {
      type:    mongoose.Schema.Types.ObjectId,
      ref:     "User",
      default: null, // supervisor assigned by officer
    },
    location: {
      type: {
        type:     String,
        enum:     ["Polygon"],
        required: true,
      },
      coordinates: {
        type:     [[[Number]]], // GeoJSON Polygon: [[[lng, lat], ...]]
        required: true,
      },
    },
    address: {
      type: String,
      trim: true,
    },
    startDate: {
      type:     Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type:     Date,
      required: [true, "End date is required"],
    },
    estimatedCost: {
      type: Number,
      min:  0,
    },
    status: {
      type:    String,
      enum:    ["pending", "approved", "ongoing", "completed", "rejected", "clashed"],
      default: "pending",
    },
    priority: {
      type:    String,
      enum:    ["low", "medium", "high", "critical"],
      default: "medium",
    },
    mcdmScore: {
      type:    Number,
      min:     0,
      max:     1,
      default: null, // computed by MCDM engine, never set by user
    },
    // MCDM input criteria — officer fills these on submission
    criteria: {
      urgency: {
        type:    Number,
        min:     1,
        max:     10,
        default: 5,
      },
      socialImpact: {
        type:    Number,
        min:     1,
        max:     10,
        default: 5,
      },
      estimatedCost: {
        type:    Number,
        min:     1,
        max:     10,
        default: 5,
      },
      feasibility: {
        type:    Number,
        min:     1,
        max:     10,
        default: 5,
      },
      environmentImpact: {
        type:    Number,
        min:     1,
        max:     10,
        default: 5,
      },
    },
    dependencies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Project", // projects that must complete before this one
      },
    ],
    progress: {
      type:    Number,
      min:     0,
      max:     100,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// ---------------------------------------------------------------------------
// Indexes — as defined in SCHEMA.md
// ---------------------------------------------------------------------------
projectSchema.index({ location: "2dsphere" });
projectSchema.index({ department: 1, status: 1 });
projectSchema.index({ startDate: 1, endDate: 1 });

// ---------------------------------------------------------------------------
// Pre-save validation — endDate must be after startDate
// ---------------------------------------------------------------------------
projectSchema.pre("save", function (next) {
  if (this.endDate <= this.startDate) {
    return next(new Error("End date must be after start date"));
  }
  next();
});

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;