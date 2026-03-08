"use strict";

const mongoose          = require("mongoose");
const { generateTrackingId } = require("../utils/trackingId");

// ---------------------------------------------------------------------------
// Schema — exactly as defined in SCHEMA.md
// ---------------------------------------------------------------------------
const citizenReportSchema = new mongoose.Schema(
  {
    trackingId: {
      type:     String,
      unique:   true,
      required: true, // auto-generated, format: "CNR-XXXXXX"
    },
    type: {
      type:     String,
      enum:     ["pothole", "streetlight", "water_leak", "garbage", "other"],
      required: true,
    },
    description: {
      type:      String,
      trim:      true,
      maxlength: 500,
    },
    location: {
      type: {
        type:     String,
        enum:     ["Point"],
        required: true,
      },
      coordinates: {
        type:     [Number], // [longitude, latitude]
        required: true,
      },
    },
    photoUrl: {
      type:    String,
      default: null, // Cloudinary URL
    },
    status: {
      type:    String,
      enum:    ["submitted", "acknowledged", "in_progress", "resolved"],
      default: "submitted",
    },
    assignedTo: {
      type:    mongoose.Schema.Types.ObjectId,
      ref:     "Department",
      default: null,
    },
    linkedProject: {
      type:    mongoose.Schema.Types.ObjectId,
      ref:     "Project",
      default: null,
    },
  },
  { timestamps: true }
);

// ---------------------------------------------------------------------------
// Indexes — as defined in SCHEMA.md
// ---------------------------------------------------------------------------
citizenReportSchema.index({ location: "2dsphere" });
citizenReportSchema.index({ trackingId: 1 }, { unique: true });

// ---------------------------------------------------------------------------
// Pre-validate hook — auto-generate trackingId if not provided
// Runs before validation so the required: true check passes
// ---------------------------------------------------------------------------
citizenReportSchema.pre("validate", async function (next) {
  if (!this.trackingId) {
    let isUnique = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 10;

    // Retry loop — handles the rare case of a collision
    while (!isUnique && attempts < MAX_ATTEMPTS) {
      const candidate = generateTrackingId();
      const existing  = await mongoose.model("CitizenReport").findOne({
        trackingId: candidate,
      });

      if (!existing) {
        this.trackingId = candidate;
        isUnique        = true;
      }

      attempts++;
    }

    if (!isUnique) {
      return next(new Error("Failed to generate a unique tracking ID. Please try again."));
    }
  }

  next();
});

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------
const CitizenReport = mongoose.model("CitizenReport", citizenReportSchema);

module.exports = CitizenReport;