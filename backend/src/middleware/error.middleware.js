"use strict";

const mongoose = require("mongoose");
const { error } = require("../utils/response");
const logger   = require("../utils/logger");
const config   = require("../config/index");

// ---------------------------------------------------------------------------
// errorHandler — global error handling middleware
//
// Must be registered LAST in app.js after all routes
// Express identifies it as error middleware by the 4-parameter signature
// All controllers call next(err) to reach this handler
//
// Usage in app.js:
//   app.use(errorHandler)  ← must be last
// ---------------------------------------------------------------------------
const errorHandler = (err, req, res, next) => {
  // Log every error with request context
  logger.error(`[ErrorHandler] ${req.method} ${req.originalUrl} — ${err.message}`, {
    stack:  config.IS_PRODUCTION ? undefined : err.stack,
    userId: req.user?.userId || "unauthenticated",
  });

  // -------------------------------------------------------------------------
  // 1. Mongoose Validation Error
  //    Triggered by schema validators (required, minlength, enum, etc.)
  // -------------------------------------------------------------------------
  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.values(err.errors).reduce((acc, e) => {
      acc[e.path] = e.message;
      return acc;
    }, {});

    return res.status(400).json(
      error("Validation failed", details)
    );
  }

  // -------------------------------------------------------------------------
  // 2. Mongoose CastError
  //    Triggered by invalid ObjectId format in route params
  //    e.g. GET /api/v1/projects/not-a-valid-id
  // -------------------------------------------------------------------------
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json(
      error(`Invalid value for field '${err.path}': '${err.value}'`)
    );
  }

  // -------------------------------------------------------------------------
  // 3. MongoDB Duplicate Key Error (code 11000)
  //    Triggered by unique index violations (email, dept code, trackingId)
  // -------------------------------------------------------------------------
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    const value = err.keyValue?.[field] || "";
    return res.status(409).json(
      error(`Duplicate value: '${value}' is already taken for ${field}.`)
    );
  }

  // -------------------------------------------------------------------------
  // 4. JWT Errors — should be caught in auth.middleware but handled here
  //    as a safety net
  // -------------------------------------------------------------------------
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json(
      error("Invalid token. Please log in again.")
    );
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json(
      error("Session expired. Please log in again.")
    );
  }

  // -------------------------------------------------------------------------
  // 5. Custom application errors with explicit statusCode
  //    Services throw these for known business logic failures
  //    e.g. throw Object.assign(new Error("Not found"), { statusCode: 404 })
  // -------------------------------------------------------------------------
  if (err.statusCode) {
    return res.status(err.statusCode).json(
      error(err.message, err.details || null)
    );
  }

  // -------------------------------------------------------------------------
  // 6. Fallback — unhandled/unexpected errors
  //    Never expose stack traces or internal details in production
  // -------------------------------------------------------------------------
  const statusCode = err.status || 500;
  const message    = config.IS_PRODUCTION
    ? "An unexpected error occurred. Please try again later."
    : err.message;

  return res.status(statusCode).json(
    error(message, config.IS_PRODUCTION ? null : err.stack)
  );
};

// ---------------------------------------------------------------------------
// notFound — catches requests to unregistered routes
//
// Must be registered AFTER all routes but BEFORE errorHandler in app.js
//
// Usage in app.js:
//   app.use(notFound)      ← after all routes
//   app.use(errorHandler)  ← last
// ---------------------------------------------------------------------------
const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};

module.exports = { errorHandler, notFound };