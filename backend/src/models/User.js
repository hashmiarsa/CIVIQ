"use strict";

const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

// ---------------------------------------------------------------------------
// Schema — exactly as defined in SCHEMA.md
// ---------------------------------------------------------------------------
const userSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, "Name is required"],
      trim:     true,
    },
    email: {
      type:      String,
      required:  [true, "Email is required"],
      unique:    true,
      lowercase: true,
      trim:      true,
    },
    password: {
      type:      String,
      required:  [true, "Password is required"],
      minlength: 8,
      select:    false, // never returned in API responses
    },
    role: {
      type:     String,
      enum:     ["admin", "officer", "supervisor", "citizen"],
      required: true,
    },
    department: {
      type:    mongoose.Schema.Types.ObjectId,
      ref:     "Department",
      default: null, // null for admin and citizen
    },
    isActive: {
      type:    Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// ---------------------------------------------------------------------------
// Indexes
// ---------------------------------------------------------------------------
userSchema.index({ email: 1 }, { unique: true });

// ---------------------------------------------------------------------------
// Pre-save hook — hash password before saving
// Only runs when password field is modified
// ---------------------------------------------------------------------------
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt    = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ---------------------------------------------------------------------------
// Instance method — compare plain password against stored hash
// Used in auth.service.js during login
// ---------------------------------------------------------------------------
userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------
const User = mongoose.model("User", userSchema);

module.exports = User;