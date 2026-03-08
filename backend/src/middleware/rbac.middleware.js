"use strict";

const { error } = require("../utils/response");

// ---------------------------------------------------------------------------
// permit — role-based access control middleware factory
//
// Usage in routes:
//   router.post("/", auth, permit("officer", "admin"), createProject)
//   router.patch("/:id/status", auth, permit("admin"), updateStatus)
//   router.get("/audit", auth, permit("admin"), getAuditLog)
//
// Must always be used AFTER auth middleware so req.user is populated
// ---------------------------------------------------------------------------

/**
 * @param  {...string} allowedRoles  - One or more roles permitted to access the route
 * @returns {Function}               - Express middleware function
 */
const permit = (...allowedRoles) => {
  return (req, res, next) => {
    // -----------------------------------------------------------------------
    // Guard — auth middleware must run before permit()
    // If req.user is missing, something is wrong with route definition
    // -----------------------------------------------------------------------
    if (!req.user) {
      return res
        .status(401)
        .json(error("Authentication required. Please log in."));
    }

    // -----------------------------------------------------------------------
    // Check if the user's role is in the allowed roles list
    // -----------------------------------------------------------------------
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json(
          error(
            `Access denied. This action requires one of the following roles: ${allowedRoles.join(", ")}.`
          )
        );
    }

    next();
  };
};

// ---------------------------------------------------------------------------
// Role constants — use these instead of raw strings throughout the codebase
// Prevents typos like "Admin" or "OFFICER" breaking access control silently
// ---------------------------------------------------------------------------
const ROLES = Object.freeze({
  ADMIN:      "admin",
  OFFICER:    "officer",
  SUPERVISOR: "supervisor",
  CITIZEN:    "citizen",
});

module.exports = { permit, ROLES };