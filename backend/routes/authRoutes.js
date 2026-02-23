const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require('google-auth-library');  // ← ADD THIS
const { validateSignup, validateLogin } = require("../middleware/validateInput");

const router = express.Router();

// Your existing Google client (global)
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 1. EXISTING SIGNUP (unchanged)
router.post("/signup", validateSignup, async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashed });
  await user.save();

  res.status(201).json({ message: "Account created" });
});

// 2. EXISTING LOGIN (unchanged)
router.post("/login", validateLogin, async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token,
    userId: user._id,
    role: user.role
  });
});

// 3. NEW GOOGLE AUTH ROUTE (ADD THIS)
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user (no password needed for Google users)
      user = new User({
        googleId,        // Add this field to User model if missing
        name,
        email,
        isVerified: true // Google users auto-verified
      });
      await user.save();
    }

    // Generate JWT (same format as regular login)
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role || 'user' },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Google login successful",
      token: jwtToken,
      userId: user._id,
      role: user.role || 'user'
    });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(400).json({ message: "Invalid Google token" });
  }
});

module.exports = router;
