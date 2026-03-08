"use strict";

const jwt    = require("jsonwebtoken");
const config = require("../config/index");
const User   = require("../models/User");
const { error } = require("../utils/response");

// ---------------------------------------------------------------------------
// auth — verifies JWT token and attaches decoded user to req.user
//
// Usage in routes:
//   router.get("/me", auth, getMe)
//   router.post("/projects", auth, permit("officer", "admin"), createProject)
// ---------------------------------------------------------------------------
const auth = async (req, res, next) => {
  try {
    // -----------------------------------------------------------------------
    // 1. Extract token from Authorization header
    //    Expected format: "Bearer <token>"
    // -----------------------------------------------------------------------
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json(error("Authentication required. Please log in."));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json(error("Authentication required. Please log in."));
    }

    // -----------------------------------------------------------------------
    // 2. Verify token signature and expiry
    // -----------------------------------------------------------------------
    let decoded;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET);
    } catch (jwtErr) {
      if (jwtErr.name === "TokenExpiredError") {
        return res
          .status(401)
          .json(error("Session expired. Please log in again."));
      }
      return res
        .status(401)
        .json(error("Invalid token. Please log in again."));
    }

    // -----------------------------------------------------------------------
    // 3. Confirm user still exists and is active
    //    Guards against tokens for deleted or deactivated accounts
    // -----------------------------------------------------------------------
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json(error("User no longer exists. Please log in again."));
    }

    if (!user.isActive) {
      return res
        .status(403)
        .json(error("Your account has been deactivated. Contact an administrator."));
    }

    // -----------------------------------------------------------------------
    // 4. Attach user to request — available in all downstream middleware
    //    and controllers as req.user
    //
    //    Shape of req.user:
    //    {
    //      userId:       ObjectId,
    //      role:         "admin" | "officer" | "supervisor" | "citizen",
    //      departmentId: ObjectId | null,
    //      name:         String,
    //      email:        String,
    //    }
    // -----------------------------------------------------------------------
    req.user = {
      userId:       user._id,
      role:         user.role,
      departmentId: user.department,
      name:         user.name,
      email:        user.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;