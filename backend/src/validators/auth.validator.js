"use strict";

const Joi = require("joi");

// ---------------------------------------------------------------------------
// Reusable field definitions
// ---------------------------------------------------------------------------
const fields = {
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.min":  "Name must be at least 2 characters",
      "string.max":  "Name must not exceed 100 characters",
      "any.required": "Name is required",
    }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required()
    .messages({
      "string.email":  "Please provide a valid email address",
      "any.required":  "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .required()
    .messages({
      "string.min":   "Password must be at least 8 characters",
      "string.max":   "Password must not exceed 128 characters",
      "any.required": "Password is required",
    }),

  role: Joi.string()
    .valid("admin", "officer", "supervisor", "citizen")
    .required()
    .messages({
      "any.only":     "Role must be one of: admin, officer, supervisor, citizen",
      "any.required": "Role is required",
    }),

  department: Joi.string()
    .hex()
    .length(24)
    .optional()
    .allow(null)
    .messages({
      "string.hex":    "Department must be a valid ID",
      "string.length": "Department must be a valid ID",
    }),
};

// ---------------------------------------------------------------------------
// registerSchema — POST /api/v1/auth/register
// ---------------------------------------------------------------------------
const registerSchema = Joi.object({
  name:       fields.name,
  email:      fields.email,
  password:   fields.password,
  role:       fields.role,
  department: fields.department,
}).options({ abortEarly: false });

// ---------------------------------------------------------------------------
// loginSchema — POST /api/v1/auth/login
// ---------------------------------------------------------------------------
const loginSchema = Joi.object({
  email:    fields.email,
  password: fields.password,
}).options({ abortEarly: false });

module.exports = { registerSchema, loginSchema };