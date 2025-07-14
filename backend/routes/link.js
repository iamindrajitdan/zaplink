const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// In-memory storage for demo (replace with DB in production)
const links = new Map();

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'storage/files/'),
  filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// POST /api/share - Create shareable link
router.post("/share", upload.single("file"), (req, res) => {
  const linkId = uuidv4().substring(0, 8);
  const { text, maxViews = 10, ttlHours = 24 } = req.body;
  
  const linkData = {
    id: linkId,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + ttlHours * 60 * 60 * 1000),
    viewsLeft: parseInt(maxViews),
    type: req.file ? 'file' : 'text',
    content: req.file ? req.file.filename : text,
    originalName: req.file?.originalname
  };
  
  links.set(linkId, linkData);
  
  res.json({
    success: true,
    linkId,
    shareUrl: `http://localhost:3000/view/${linkId}`,
    expiresAt: linkData.expiresAt,
    viewsLeft: linkData.viewsLeft
  });
});

// GET /api/view/:linkId - View shared content
router.get("/view/:linkId", (req, res) => {
  const { linkId } = req.params;
  const link = links.get(linkId);
  
  if (!link) return res.status(404).json({ error: "Link not found" });
  if (new Date() > link.expiresAt) return res.status(410).json({ error: "Link expired" });
  if (link.viewsLeft <= 0) return res.status(410).json({ error: "No views remaining" });
  
  // Decrement views
  link.viewsLeft--;
  
  if (link.type === 'file') {
    const filePath = path.join(__dirname, '../storage/files', link.content);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File not found" });
    
    res.json({
      type: 'file',
      filename: link.originalName,
      downloadUrl: `http://localhost:5000/files/${link.content}`,
      viewsLeft: link.viewsLeft
    });
  } else {
    res.json({
      type: 'text',
      content: link.content,
      viewsLeft: link.viewsLeft
    });
  }
});

// DELETE /api/expire/:linkId - Manual expiry
router.delete("/expire/:linkId", (req, res) => {
  const { linkId } = req.params;
  if (links.delete(linkId)) {
    res.json({ success: true, message: "Link expired" });
  } else {
    res.status(404).json({ error: "Link not found" });
  }
});

module.exports = router;