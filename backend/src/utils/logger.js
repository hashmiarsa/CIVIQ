"use strict";

const { createLogger, format, transports } = require("winston");
const config = require("../config/index");

// ---------------------------------------------------------------------------
// Custom log format for development — colorized, human readable
// ---------------------------------------------------------------------------
const devFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length
      ? `\n${JSON.stringify(meta, null, 2)}`
      : "";
    return `[${timestamp}] ${level}: ${message}${metaStr}`;
  })
);

// ---------------------------------------------------------------------------
// Custom log format for production — structured JSON, machine readable
// ---------------------------------------------------------------------------
const prodFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }), // include stack traces in JSON
  format.json()
);

// ---------------------------------------------------------------------------
// Transport configuration
// ---------------------------------------------------------------------------
const loggerTransports = [
  // Always log to console
  new transports.Console(),
];

// In production, also write to log files
if (config.IS_PRODUCTION) {
  loggerTransports.push(
    // All logs at info level and above
    new transports.File({
      filename: "logs/app.log",
      level:    "info",
    }),
    // Error logs separately for quick access
    new transports.File({
      filename: "logs/error.log",
      level:    "error",
    })
  );
}

// ---------------------------------------------------------------------------
// Logger instance
// ---------------------------------------------------------------------------
const logger = createLogger({
  level:      config.IS_PRODUCTION ? "info" : "debug",
  format:     config.IS_PRODUCTION ? prodFormat : devFormat,
  transports: loggerTransports,
  // Do not crash on unhandled rejections — log them instead
  exitOnError: false,
});

// ---------------------------------------------------------------------------
// Silence all logs during testing to keep test output clean
// ---------------------------------------------------------------------------
if (config.IS_TEST) {
  logger.silent = true;
}

module.exports = logger;