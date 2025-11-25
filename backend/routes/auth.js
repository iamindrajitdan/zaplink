const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Persistent user storage
const usersFile = path.join(__dirname, '../storage/users.json');
let users = new Map();

// Load users from file
if (fs.existsSync(usersFile)) {
  const userData = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  users = new Map(Object.entries(userData));
}

// Save users to file
const saveUsers = () => {
  const userData = Object.fromEntries(users);
  fs.writeFileSync(usersFile, JSON.stringify(userData, null, 2));
};

// POST /api/auth/signup
router.post("/signup", (req, res) => {
  const { email, password, name } = req.body;
  console.log('Signup attempt:', { email, name });
  
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
  saveUsers();
  
  res.json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password });
  console.log('Available users:', Array.from(users.keys()));
  
  const user = users.get(email);
  console.log('Found user:', user);
  
  if (!user || user.password !== password) {
    console.log('Login failed: Invalid credentials');
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  res.json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

module.exports = router;