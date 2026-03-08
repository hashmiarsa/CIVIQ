"use strict";

// ---------------------------------------------------------------------------
// Standard API response helpers
// Every controller uses these — no raw res.json() calls anywhere
// Format defined in HANDOFF.md Section 8
// ---------------------------------------------------------------------------

/**
 * Success response — single object or any payload
 *
 * @param {string} message  - Human readable success message
 * @param {*}      data     - Response payload (object, array, null)
 * @returns {object}        - Formatted success response
 *
 * Usage: res.status(200).json(success("Projects fetched", projects))
 */
const success = (message, data = null) => ({
  success: true,
  message,
  data,
});

/**
 * Paginated list response
 *
 * @param {string} message     - Human readable success message
 * @param {Array}  data        - Array of results
 * @param {object} pagination  - { total, page, limit, pages }
 * @returns {object}           - Formatted paginated response
 *
 * Usage: res.status(200).json(paginated("Projects fetched", projects, { total, page, limit, pages }))
 */
const paginated = (message, data = [], pagination = {}) => ({
  success:    true,
  message,
  data,
  pagination: {
    total: pagination.total || 0,
    page:  pagination.page  || 1,
    limit: pagination.limit || 20,
    pages: pagination.pages || 1,
  },
});

/**
 * Error response
 *
 * @param {string} message  - Human readable error message
 * @param {*}      error    - Error details (object, string, null)
 * @returns {object}        - Formatted error response
 *
 * Usage: res.status(400).json(error("Validation failed", { field: "email" }))
 */
const error = (message, details = null) => ({
  success: false,
  message,
  error: details,
});

/**
 * Pagination calculator — computes pagination metadata from query params
 *
 * @param {number} total   - Total number of documents matching the query
 * @param {number} page    - Current page number (1-based)
 * @param {number} limit   - Number of items per page
 * @returns {object}       - { total, page, limit, pages, skip }
 *
 * Usage:
 *   const meta = paginate(total, req.query.page, req.query.limit)
 *   const docs  = await Model.find(filter).skip(meta.skip).limit(meta.limit)
 *   res.status(200).json(paginated("Fetched", docs, meta))
 */
const paginate = (total, page = 1, limit = 20) => {
  const parsedPage  = Math.max(1, parseInt(page,  10) || 1);
  const parsedLimit = Math.max(1, parseInt(limit, 10) || 20);
  const pages       = Math.ceil(total / parsedLimit) || 1;
  const skip        = (parsedPage - 1) * parsedLimit;

  return {
    total,
    page:  parsedPage,
    limit: parsedLimit,
    pages,
    skip,
  };
};

module.exports = { success, paginated, error, paginate };