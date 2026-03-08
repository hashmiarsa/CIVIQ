"use strict";

const mongoose = require("mongoose");
const config   = require("./index");
const logger   = require("../utils/logger");

// ---------------------------------------------------------------------------
// connectDB — called once in server.js before app starts listening
// ---------------------------------------------------------------------------
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI, {
      // These are the recommended options for Mongoose 8+
      // useNewUrlParser and useUnifiedTopology are no longer needed
    });

    logger.info(`[DB] MongoDB connected — host: ${conn.connection.host}`);
  } catch (err) {
    logger.error(`[DB] Connection failed — ${err.message}`);
    process.exit(1); // crash hard — app cannot run without DB
  }
};

// ---------------------------------------------------------------------------
// Mongoose global settings
// ---------------------------------------------------------------------------

// Return plain JS objects instead of Mongoose documents where possible
mongoose.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v; // strip version key from all responses
  },
});

// Log all queries in development for debugging
if (config.IS_DEVELOPMENT) {
  mongoose.set("debug", (collectionName, method, query) => {
    logger.debug(`[Mongoose] ${collectionName}.${method} ${JSON.stringify(query)}`);
  });
}

// ---------------------------------------------------------------------------
// Connection event listeners
// ---------------------------------------------------------------------------
mongoose.connection.on("disconnected", () => {
  logger.warn("[DB] MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  logger.info("[DB] MongoDB reconnected");
});

module.exports = connectDB;