const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/files', express.static(path.join(__dirname, 'storage/files')));

const linkRoutes = require("./routes/link");
const authRoutes = require("./routes/auth");
app.use("/api", linkRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 ZapLink Backend running on port ${PORT}`));