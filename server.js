const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs").promises;
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Files for local storage
const PROJECTS_FILE = path.join(__dirname, "projects.json");
const CONTACTS_FILE = path.join(__dirname, "contacts.json");

// Utility to read JSON
async function readJson(file) {
    try {
        const data = await fs.readFile(file, "utf8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Utility to append to JSON (for contacts)
async function saveContact(contact) {
    const contacts = await readJson(CONTACTS_FILE);
    contact.createdAt = new Date();
    contacts.push(contact);
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
}

// Serve static frontend files
app.use(express.static(path.join(__dirname, "Public")));

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "index.html"));
});

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "Server is running (Static Data Mode)", timestamp: new Date() });
});

// --- Routes ---

// 1. Contact Form (Locked to local file)
app.post("/contact", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).send("Missing required fields");
        }
        await saveContact({ name, email, phone, message });
        res.status(201).send("✅ Message saved successfully locally!");
    } catch (err) {
        console.error("❌ Save error:", err);
        res.status(500).send("Server Error");
    }
});

// 2. Get All Projects (From projects.json)
app.get("/api/projects", async (req, res) => {
    try {
        const projects = await readJson(PROJECTS_FILE);
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: "Failed to load projects" });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Mode: Local JSON Data (MongoDB Removed)`);
    console.log(`🔗 Projects API: GET http://localhost:${PORT}/api/projects`);
});