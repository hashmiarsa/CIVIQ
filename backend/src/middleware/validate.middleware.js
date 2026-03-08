"use strict";

const { error } = require("../utils/response");

// ---------------------------------------------------------------------------
// validate — middleware factory that runs a Joi or custom validator schema
//             against req.body, req.params, or req.query
//
// Usage in routes:
//   const { validateBody } = require("../middleware/validate.middleware")
//   const { registerSchema } = require("../validators/auth.validator")
//
//   router.post("/register", validateBody(registerSchema), register)
//   router.get("/:id",       validateParams(idSchema),     getProject)
// ---------------------------------------------------------------------------

/**
 * Validates req.body against the provided schema
 *
 * @param   {object} schema  - Joi schema object with a .validate() method
 * @returns {Function}       - Express middleware
 */
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error: validationError, value } = schema.validate(req.body, {
      abortEarly:   false,  // collect ALL errors, not just the first one
      stripUnknown: true,   // remove fields not defined in schema
      convert:      true,   // coerce types where possible (string "5" → number 5)
    });

    if (validationError) {
      const details = validationError.details.reduce((acc, detail) => {
        // detail.path is an array e.g. ["criteria", "urgency"]
        // join with dot notation for a clean field key
        const field = detail.path.join(".");
        acc[field]  = detail.message.replace(/['"]/g, ""); // strip Joi's quotes
        return acc;
      }, {});

      return res.status(400).json(
        error("Validation failed", details)
      );
    }

    // Replace req.body with the validated + sanitized value
    req.body = value;
    next();
  };
};

/**
 * Validates req.params against the provided schema
 *
 * @param   {object} schema  - Joi schema object
 * @returns {Function}       - Express middleware
 */
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error: validationError, value } = schema.validate(req.params, {
      abortEarly:   false,
      stripUnknown: true,
      convert:      true,
    });

    if (validationError) {
      const details = validationError.details.reduce((acc, detail) => {
        acc[detail.path.join(".")] = detail.message.replace(/['"]/g, "");
        return acc;
      }, {});

      return res.status(400).json(
        error("Invalid request parameters", details)
      );
    }

    req.params = value;
    next();
  };
};

/**
 * Validates req.query against the provided schema
 *
 * @param   {object} schema  - Joi schema object
 * @returns {Function}       - Express middleware
 */
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error: validationError, value } = schema.validate(req.query, {
      abortEarly:   false,
      stripUnknown: true,
      convert:      true,
    });

    if (validationError) {
      const details = validationError.details.reduce((acc, detail) => {
        acc[detail.path.join(".")] = detail.message.replace(/['"]/g, "");
        return acc;
      }, {});

      return res.status(400).json(
        error("Invalid query parameters", details)
      );
    }

    req.query = value;
    next();
  };
};

module.exports = { validateBody, validateParams, validateQuery };