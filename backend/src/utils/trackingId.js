"use strict";

// ---------------------------------------------------------------------------
// generateTrackingId — produces a random ID in the format "CNR-XXXXXX"
// X is any uppercase letter A-Z or digit 0-9
// 36^6 = 2,176,782,336 possible combinations
//
// Called by CitizenReport model's pre("validate") hook
// Never called directly by controllers or services
// ---------------------------------------------------------------------------

const PREFIX  = "CNR-";
const CHARS   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const ID_LENGTH = 6;

/**
 * Generates a random tracking ID for a citizen report
 *
 * @returns {string}  e.g. "CNR-A3FX92"
 */
const generateTrackingId = () => {
  let id = PREFIX;

  for (let i = 0; i < ID_LENGTH; i++) {
    id += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }

  return id;
};

module.exports = { generateTrackingId };