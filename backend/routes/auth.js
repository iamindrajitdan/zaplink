const express = require("express");
const router = express.Router();

// Mock user database (replace with real database)
const users = new Map();

// POST /api/auth/signup
router.post("/signup", (req, res) => {
  const { email, password, name } = req.body;
  
  if (users.has(email)) {
    return res.status(400).json({ error: "User already exists" });
  }
  
  const user = {
    id: Date.now().toString(),
    email,
    name,
    password // In production, hash this password
  };
  
  users.set(email, user);
  
  res.json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  const user = users.get(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  res.json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

module.exports = router;