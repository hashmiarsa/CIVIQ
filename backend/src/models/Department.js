"use strict";

const mongoose = require("mongoose");

// ---------------------------------------------------------------------------
// Schema — exactly as defined in SCHEMA.md
// ---------------------------------------------------------------------------
const departmentSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, "Department name is required"],
      unique:   true,
      trim:     true, // e.g. "Public Works Department", "Water Board"
    },
    code: {
      type:      String,
      required:  true,
      unique:    true,
      uppercase: true,
      trim:      true, // e.g. "PWD", "WB", "ELEC"
    },
    headId: {
      type:    mongoose.Schema.Types.ObjectId,
      ref:     "User",
      default: null,
    },
    isActive: {
      type:    Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------
const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;