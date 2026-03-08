"use strict";

const mongoose = require("mongoose");

// ---------------------------------------------------------------------------
// Schema — exactly as defined in SCHEMA.md
// ---------------------------------------------------------------------------
const conflictSchema = new mongoose.Schema(
  {
    projectA: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "Project",
      required: true,
    },
    projectB: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "Project",
      required: true,
    },
    overlapArea: {
      type: {
        type: String,
        enum: ["Polygon"],
      },
      coordinates: [[[Number]]], // GeoJSON of the intersection area
    },
    overlapDates: {
      start: { type: Date },
      end:   { type: Date },
    },
    status: {
      type:    String,
      enum:    ["open", "resolved", "overridden"],
      default: "open",
    },
    resolution: {
      type:    String,
      default: null, // admin's resolution note
    },
    resolvedBy: {
      type:    mongoose.Schema.Types.ObjectId,
      ref:     "User",
      default: null,
    },
    recommendation: {
      order: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref:  "Project",
        },
      ],
      scores: {
        projectA: { type: Number },
        projectB: { type: Number },
      },
    },
    resolvedAt: {
      type:    Date,
      default: null,
    },
  },
  { timestamps: true }
);

// ---------------------------------------------------------------------------
// Indexes — as defined in SCHEMA.md
// ---------------------------------------------------------------------------
conflictSchema.index({ projectA: 1, projectB: 1 });
conflictSchema.index({ status: 1 });

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------
const Conflict = mongoose.model("Conflict", conflictSchema);

module.exports = Conflict;