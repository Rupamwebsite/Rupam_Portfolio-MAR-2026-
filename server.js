const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs").promises;
const https = require("https");
const nodemailer = require("nodemailer");
const db = require("./db");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(db.auditMiddleware());
app.use(express.static(path.join(__dirname, "Public")));

// Files for local storage
const PROJECTS_FILE = path.join(__dirname, "projects.json");
const CONTACTS_FILE = path.join(__dirname, "contacts.json");

// Groq API Config
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

// System prompt with Rupam's full portfolio context
const RUPAM_SYSTEM_PROMPT = `You are Apex — the advanced AI assistant of Rupam Mandal’s portfolio website.

Your mission is to behave like a real smart human assistant, not a robotic chatbot. 
You represent Rupam Mandal professionally and help visitors understand his value, skills, services, and projects while creating trust and converting visitors into serious clients.

### ABOUT RUPAM MANDAL
Name: Rupam Mandal
Professional Background:
- Frontend Developer & Full Stack Web Developer.
- IT Executive in Hospital Software Department at Peerless Hospital (Kolkata).
- Expert in HMS / OPD / IPD / Billing / Patient Workflows.
- Oracle SQL / PL SQL / Reports specialist.
- Experience: Working at Peerless Hospital since Dec 6, 2024.
- Key Strengths: Real industry hospital IT experience, Technical + business understanding, Fast learner, Reliable support, Professional communication.

### CONTACT DETAILS
- Email: rupammandal240@gmail.com
- Phone: +91 9382949704
- Location: Kolkata, West Bengal, India
- LinkedIn: https://www.linkedin.com/in/rupam-mandal-44b41b250/
- GitHub: https://github.com/rupam-mandal

### PROJECTS HIGHLIGHTS
1. **LMS with AI Integration** (Live: https://rmeducation.vercel.app/) — Modern Learning Management System with AI assessment and interactive courses.
2. **Advanced Doctor Appointment & HMS System** — Hospital management with AI clinical slot scheduling and OPD/IPD queue tracking.
3. **Portfolio 2026** (https://rupam.co.in) — Cyber-aurora glassmorphic interactive web experience.
4. **Spotify Ultra UI Clone** — Dynamic theme color extraction, track visualization, and playback management.

### SERVICES TO OFFER
- Portfolio & Business Websites
- E-commerce & Web Applications
- Hospital Management Systems (HMS) & Doctor Appointment Systems
- Custom Dashboards & Telemetry
- Oracle SQL / PL SQL / Database Optimization
- API Development & Web UI Improvements

### YOUR PERSONALITY & TONE
- Status: Human-like, Warm, Intelligent, Helpful, Confident, Premium, Friendly, Trustworthy.
- Multilingual: Answer fluently in English, Bengali (বাংলা / বাংলিশ), or Hindi based on user language.
- Format: Use neat Markdown formatting with bolding, lists, and code blocks where suitable.`;

// Helper: Read JSON file safely
async function readJson(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        if (err.code === "ENOENT") {
            await fs.writeFile(filePath, JSON.stringify([]));
            return [];
        }
        console.error(`Error reading ${filePath}:`, err);
        return [];
    }
}

// Helper: Write JSON file safely
async function writeJson(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    } catch (err) {
        console.error(`Error writing ${filePath}:`, err);
        throw err;
    }
}

// Save contact locally
async function saveContact(contactData) {
    const contacts = await readJson(CONTACTS_FILE);
    const newContact = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...contactData
    };
    contacts.push(newContact);
    await writeJson(CONTACTS_FILE, contacts);
    return newContact;
}

// Helper: Send email notification via Nodemailer
async function sendEmailNotification(contactData) {
    const userEmail = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!userEmail || !pass) {
        return;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: userEmail, pass: pass }
    });

    const mailOptionsToRupam = {
        from: `"${contactData.name}" <${userEmail}>`,
        to: userEmail,
        replyTo: contactData.email,
        subject: `💼 New Lead from Portfolio: ${contactData.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2>🚀 New Portfolio Contact Form Submission</h2>
                <hr/>
                <p><strong>Name:</strong> ${contactData.name}</p>
                <p><strong>Email:</strong> ${contactData.email}</p>
                <p><strong>Phone:</strong> ${contactData.phone || "Not provided"}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f9f9f9; border-left: 4px solid #00f2fe; padding: 10px 15px;">
                    ${contactData.message}
                </blockquote>
                <hr/>
                <small>Submitted at: ${new Date().toLocaleString()}</small>
            </div>
        `
    };

    const mailOptionsToUser = {
        from: `"Rupam Mandal" <${userEmail}>`,
        to: contactData.email,
        subject: `Thank you for reaching out, ${contactData.name}!`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2>Hi ${contactData.name},</h2>
                <p>Thank you for reaching out to me. I have received your message and will review it shortly.</p>
                <p>I usually respond within 24 hours.</p>
                <br/>
                <p>Best regards,</p>
                <p><strong>Rupam Mandal</strong><br/>
                IT Executive & Full-Stack Developer<br/>
                <a href="https://rupam.co.in">rupam.co.in</a></p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptionsToRupam);
        await transporter.sendMail(mailOptionsToUser);
        console.log("✅ Emails successfully dispatched!");
    } catch (err) {
        console.error("❌ Email dispatch failed:", err);
    }
}

/* ================================================================
   INTELLIGENT APEX FALLBACK KNOWLEDGE ENGINE
   Ensures 100% flawless responses even without an external API key!
   ================================================================ */
function generateApexResponse(query = "", history = []) {
    const q = query.toLowerCase().trim();

    // Bengali queries
    const isBengali = /[\u0980-\u09FF]/.test(query) || 
                      q.includes("kemon") || q.includes("tumi ke") || q.includes("rupam ke") || 
                      q.includes("ki kaj") || q.includes("bhalo") || q.includes("hobe") || q.includes("koro");

    // 1. GREETINGS & INTRO
    if (/^(hi|hello|hey|hola|greetings|halo|assalamu|namaste)/i.test(q) || q === "hi" || q === "hello") {
        if (isBengali) {
            return `হ্যালো! 👋 আমি **Apex**, রূপম মণ্ডলের পার্সোনাল AI অ্যাসিস্ট্যান্ট।\n\nরূপমের প্রজেক্ট, হসপিটাল আইটি এক্সপেরিয়েন্স, ওয়েব ডেভেলপমেন্ট সার্ভিস বা কন্টাক্ট ইনফরমেশন সম্পর্কে আপনি যেকোনো প্রশ্ন করতে পারেন। আমি কীভাবে আপনাকে সাহায্য করতে পারি?`;
        }
        return `Hello! 👋 I'm **Apex**, Rupam Mandal's personal AI assistant.\n\nI can help you explore Rupam's **Full-Stack Projects**, **Hospital IT (Peerless Hospital)** expertise, **Services**, or help you get in touch with him directly. How can I assist you today?`;
    }

    // 2. WHO IS RUPAM / ABOUT
    if (q.includes("who is rupam") || q.includes("about rupam") || q.includes("rupam ke") || q.includes("tell me about") || q.includes("background") || q.includes("profile") || q.includes("রূপম")) {
        return `### 👨‍💻 About Rupam Mandal\n\n**Rupam Mandal** is a skilled **Full-Stack Developer** & **IT Executive** currently working in the Hospital Software Department at **Peerless Hospital, Kolkata**.\n\n- 🏥 **Hospital IT Specialist**: Manages mission-critical Hospital Management Systems (HMS), OPD, IPD, Billing, and clinical workflows.\n- ⚙️ **Full-Stack Engineer**: Builds fast, modern web applications with **React, Node.js, Express, JavaScript, HTML5 & CSS3**.\n- 📊 **Database & Oracle Expert**: Oracle Certified in **SQL & PL/SQL**, reports generation, and backend performance tuning.\n\nWould you like to explore his **Projects**, **Services**, or **Contact Details**?`;
    }

    // 3. EXPERIENCE & PEERLESS HOSPITAL
    if (q.includes("experience") || q.includes("peerless") || q.includes("hospital") || q.includes("hms") || q.includes("opd") || q.includes("ipd") || q.includes("job") || q.includes("work")) {
        return `### 🏥 Professional Experience\n\n**IT Executive — Hospital Software Department**\n📍 *Peerless Hospital & B.K. Roy Research Centre, Kolkata*\n🗓️ *Dec 6, 2024 — Present*\n\n**Core Responsibilities & Achievements:**\n- 🔹 Managing and optimizing end-to-end **Hospital Management Systems (HMS)** across OPD, IPD, Emergency & Diagnostics.\n- 🔹 Writing complex **Oracle SQL / PL/SQL queries**, automated triggers, stored procedures, and clinical reports.\n- 🔹 Resolving live production hospital workflow bottlenecks with zero downtime.\n- 🔹 Coordinating cross-departmental telemetry for doctors, billing counters, and patient care units.`;
    }

    // 4. SKILLS & TECH STACK
    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("technology") || q.includes("oracle") || q.includes("react") || q.includes("node") || q.includes("sql") || q.includes("database")) {
        return `### ⚡ Technical Skillset & Stack\n\n- **Frontend Development**: React.js, JavaScript (ES6+), Modern Vanilla CSS, Glassmorphism, Responsive UI/UX, Tailwind CSS, HTML5.\n- **Backend & APIs**: Node.js, Express.js, RESTful APIs, SSE Streaming, Serverless Functions.\n- **Databases & Enterprise**: Oracle SQL, PL/SQL, MySQL, MongoDB, Stored Procedures & Triggers.\n- **Hospital IT Systems**: HMS, OPD/IPD Queuing, Doctor Telemetry, Hospital Billing & Pharmacy Systems.\n- **Tools & Workflow**: Git, GitHub, VS Code, Postman, Vercel, Figma.\n\nNeed assistance with a specific technology stack? Feel free to ask!`;
    }

    // 5. PROJECTS
    if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("lms") || q.includes("doctor appointment") || q.includes("spotify")) {
        return `### 🚀 Featured Projects by Rupam\n\n1. **[LMS with AI Integration](https://rmeducation.vercel.app/)**\n   - Full-featured modern Learning Management System with AI progress evaluation, course management, and student analytics.\n\n2. **Advanced Doctor Appointment & HMS System**\n   - High-throughput clinical slot scheduling system with real-time doctor queue telemetry and OPD/IPD tracking.\n\n3. **Rupam Portfolio 2026 (Live)**\n   - Cyber-Aurora interactive web portfolio featuring 3D particle constellation, glassmorphic card spotlights, and real-time Apex AI integration.\n\n4. **Spotify Ultra UI Clone**\n   - High-fidelity streaming UI clone with dynamic album art color palettes and audio visualization.\n\nVisit the **Projects** section on this page to explore more!`;
    }

    // 6. SERVICES / HIRE / PRICING
    if (q.includes("service") || q.includes("hire") || q.includes("cost") || q.includes("price") || q.includes("freelance") || q.includes("website") || q.includes("build") || q.includes("appointment") || q.includes("software")) {
        return `### 💼 Services Offered by Rupam\n\n- 🌐 **Modern Portfolio & Business Websites**: Ultra-fast, responsive, animated, and SEO-optimized.\n- 🏥 **Hospital & Healthcare IT Solutions**: Custom HMS modules, Doctor Appointment scheduling, and patient portals.\n- 📊 **Database & Oracle Solutions**: SQL optimization, database architecture, stored procedures & report generation.\n- 🤖 **Custom AI Chatbot Integration**: ChatGPT / Groq / Gemini style AI assistants for websites.\n- 🛠️ **Bug Fixing & UI Modernization**: Performance optimization and code refactoring.\n\n✨ **Availability:** Open for Freelance Projects & Full-time opportunities!\n\nWould you like to drop a message or schedule a call?`;
    }

    // 7. CONTACT & GET IN TOUCH
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("number") || q.includes("reach") || q.includes("call") || q.includes("message") || q.includes("mail") || q.includes("linkedin") || q.includes("github")) {
        return `### 📬 Contact Information\n\nYou can reach out to **Rupam Mandal** directly:\n\n- 📧 **Email**: [rupammandal240@gmail.com](mailto:rupammandal240@gmail.com)\n- 📱 **Phone / WhatsApp**: [+91 9382949704](tel:+919382949704)\n- 🌐 **LinkedIn**: [linkedin.com/in/rupam-mandal-44b41b250](https://www.linkedin.com/in/rupam-mandal-44b41b250/)\n- 💻 **GitHub**: [github.com/rupam-mandal](https://github.com/rupam-mandal)\n- 📍 **Location**: Kolkata, West Bengal, India\n\nYou can also submit the **Contact Form** at the bottom of this page!`;
    }

    // 8. CERTIFICATIONS
    if (q.includes("certificate") || q.includes("certification") || q.includes("degree") || q.includes("education")) {
        return `### 📜 Certifications & Credentials\n\n- 🏆 **Oracle Database SQL Certified Specialist** — In-depth database modeling, complex queries & PL/SQL.\n- 🏆 **Full-Stack Web Development Professional** — Mastery of modern web standards, React, Node.js & REST APIs.\n- 🏆 **Hospital Information Systems Specialist** — Healthcare workflow management, HMS compliance & medical billing systems.`;
    }

    // 9. BENGALI FALLBACK
    if (isBengali) {
        return `আমি আপনার প্রশ্ন বুঝতে পেরেছি! রূপম মণ্ডল একজন **Full-Stack Developer** এবং **Peerless Hospital**-এর IT Executive।\n\nআপনি তাঁর **Projects**, **Services**, **Tech Stack**, বা **যোগাযোগ করার মাধ্যম (Contact)** সম্পর্কে জানতে চাইলে আমাকে বলতে পারেন।`;
    }

    // 10. DEFAULT SMART RESPONSE
    return `I can definitely help you with that! **Rupam Mandal** is a Full-Stack Developer and IT Executive at Peerless Hospital specializing in **Web Development**, **Healthcare IT (HMS)**, and **Oracle SQL/Database Systems**.\n\nHere are some popular topics you can ask me about:\n- 🚀 **Projects** (LMS, Doctor Appointment, Portfolio)\n- 💻 **Tech Stack** (React, Node.js, Oracle SQL, JavaScript)\n- 🏥 **Hospital IT Experience** (Peerless Hospital, HMS)\n- 📬 **Contact & Hire** (Email, Phone, WhatsApp)\n\nWhat would you like to know more about?`;
}

// Utility: Call Groq API via native https
function callGroqAPI(messages, tools = null) {
    if (!GROQ_API_KEY || !GROQ_API_KEY.startsWith("gsk_")) {
        return Promise.reject(new Error("No valid GROQ_API_KEY configured"));
    }

    return new Promise((resolve, reject) => {
        const bodyObj = {
            model: GROQ_MODEL,
            messages: messages,
            max_tokens: 1024,
            temperature: 0.7
        };
        
        if (tools && tools.length > 0) {
            bodyObj.tools = tools;
            bodyObj.tool_choice = "auto";
        }

        const body = JSON.stringify(bodyObj);

        const options = {
            hostname: "api.groq.com",
            path: "/openai/v1/chat/completions",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Length": Buffer.byteLength(body)
            }
        };

        const req = https.request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => { data += chunk; });
            res.on("end", () => {
                try {
                    const parsed = JSON.parse(data);
                    if (res.statusCode !== 200) {
                        reject(new Error(parsed.error?.message || `Groq HTTP ${res.statusCode}`));
                    } else {
                        resolve(parsed);
                    }
                } catch (e) {
                    reject(new Error("Invalid JSON from Groq: " + data));
                }
            });
        });

        req.on("error", reject);
        req.setTimeout(8000, () => {
            req.destroy(new Error("Groq API timeout"));
        });
        req.write(body);
        req.end();
    });
}

// Serve static frontend files
app.use(express.static(path.join(__dirname, "Public")));

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "index.html"));
});

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "Server is running (Apex AI Engine Active)", timestamp: new Date() });
});

// --- Routes ---

// 1. Contact Form (Saved to MySQL `contact_messages` table + local backup + audit log)
app.post("/contact", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Name, email, and message are required." });
        }

        const ip = db.getRealClientIp(req);
        const ua = req.headers["user-agent"] || "";
        const uaDetails = db.parseUserAgent(ua);
        const country = req.headers["cf-ipcountry"] || (ip.includes("Localhost") ? "India" : null);
        const city = ip.includes("Localhost") ? "Kolkata" : null;

        // 1. Store in MySQL contact_messages table
        const messageId = await db.saveContactMessage({
            name,
            email,
            phone: phone || null,
            message,
            ip_address: ip,
            country: country || "India",
            city: city || "Kolkata",
            user_agent: ua,
            device_type: uaDetails.device_type,
            browser: uaDetails.browser,
            os: uaDetails.os
        });

        // 2. Backup to local JSON file
        const newContact = await saveContact({ id: messageId, name, email, phone, message, ip_address: ip });

        // 3. Log Audit Change
        await db.logAuditChange({
            req,
            userName: name,
            action: 'SUBMIT_DIRECT_MESSAGE',
            entityType: 'CONTACT_MESSAGE',
            entityId: messageId,
            newValues: { id: messageId, name, email, phone, message },
            metadata: {
                source: 'Portfolio Send a Direct Message Form',
                email: email,
                phone: phone || null
            }
        });

        // 4. Trigger Email Notification in Background (if configured)
        sendEmailNotification({ name, email, phone, message }).catch(console.error);

        res.status(201).json({
            success: true,
            message: "✅ Message received and saved successfully to database!",
            messageId: messageId
        });
    } catch (err) {
        console.error("❌ Contact save error:", err);
        res.status(500).json({ error: "Failed to process message." });
    }
});

// Admin Contact Messages API
app.get("/api/admin/contacts", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit || "50", 10);
        const offset = parseInt(req.query.offset || "0", 10);
        const status = req.query.status || null;
        const search = req.query.search || null;

        const data = await db.getContactMessages({ limit, offset, status, search });
        res.json(data);
    } catch (err) {
        console.error("❌ Failed to fetch contact messages:", err);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// Admin Update Contact Message Status API
app.patch("/api/admin/contacts/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['NEW', 'READ', 'REPLIED', 'ARCHIVED'].includes(status)) {
            return res.status(400).json({ error: "Invalid status value." });
        }

        const success = await db.updateContactStatus(id, status);
        res.json({ success });
    } catch (err) {
        console.error("❌ Failed to update contact status:", err);
        res.status(500).json({ error: "Failed to update status" });
    }
});


// Admin Audit Log API
app.get("/api/admin/audit-logs", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit || "50", 10);
        const offset = parseInt(req.query.offset || "0", 10);
        const eventType = req.query.eventType || null;
        const ipAddress = req.query.ipAddress || null;
        const action = req.query.action || null;
        const search = req.query.search || null;

        const data = await db.getVisitLogs({ limit, offset, eventType, ipAddress, action, search });
        res.json(data);
    } catch (err) {
        console.error("❌ Failed to fetch audit logs:", err);
        res.status(500).json({ error: "Failed to fetch audit logs" });
    }
});

// Admin Visit & Telemetry Stats API
app.get("/api/admin/visit-stats", async (req, res) => {
    try {
        const stats = await db.getVisitStats();
        res.json(stats);
    } catch (err) {
        console.error("❌ Failed to fetch stats:", err);
        res.status(500).json({ error: "Failed to fetch visit stats" });
    }
});

// Client Telemetry & Visitor Interaction Logger
app.post("/api/telemetry/event", async (req, res) => {
    try {
        const {
            session_id,
            visitor_id,
            screen_resolution,
            action,
            event_type,
            page_url,
            referrer,
            entity_type,
            entity_id,
            metadata
        } = req.body || {};

        const ip = db.getRealClientIp(req);
        const ua = req.headers["user-agent"] || "";
        const uaDetails = db.parseUserAgent(ua);

        await db.logVisit({
            session_id: session_id || null,
            visitor_id: visitor_id || null,
            ip_address: ip,
            country: req.headers["cf-ipcountry"] || (ip.includes("Localhost") ? "India" : null),
            city: ip.includes("Localhost") ? "Kolkata" : null,
            user_agent: ua,
            browser: uaDetails.browser,
            browser_version: uaDetails.browser_version,
            os: uaDetails.os,
            os_version: uaDetails.os_version,
            device_type: uaDetails.device_type,
            screen_resolution: screen_resolution || null,
            is_bot: uaDetails.is_bot,
            http_method: "POST",
            page_url: page_url || "/",
            referrer: referrer || null,
            status_code: 200,
            event_type: event_type || "PAGE_VIEW",
            action: action || "CLIENT_INTERACTION",
            entity_type: entity_type || null,
            entity_id: entity_id || null,
            metadata: metadata || null
        });

        res.json({ success: true });
    } catch (e) {
        console.error("Telemetry event error:", e);
        res.status(500).json({ error: "Failed to record event" });
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

// 3. AI Chatbot Non-Streaming (Groq API with Intelligent Fallback)
app.post("/api/chat", async (req, res) => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "Invalid messages array" });
        }

        const lastMessage = messages[messages.length - 1]?.content || "";

        // Try Groq API if key exists
        if (GROQ_API_KEY && GROQ_API_KEY.startsWith("gsk_")) {
            try {
                const fullMessages = [
                    { role: "system", content: RUPAM_SYSTEM_PROMPT },
                    ...messages.slice(-10)
                ];

                const groqResponse = await callGroqAPI(fullMessages);
                const reply = groqResponse.choices?.[0]?.message?.content;
                if (reply) {
                    return res.json({ reply });
                }
            } catch (apiErr) {
                console.warn("⚠️ Groq API failed, using Built-in Knowledge Engine:", apiErr.message);
            }
        }

        // Use Built-in Apex Knowledge Engine
        const fallbackReply = generateApexResponse(lastMessage, messages);
        res.json({ reply: fallbackReply });

    } catch (err) {
        console.error("❌ Chat error:", err);
        const lastMessage = req.body?.messages?.[req.body.messages.length - 1]?.content || "";
        res.json({ reply: generateApexResponse(lastMessage) });
    }
});

// 4. AI Chatbot STREAMING (SSE — Real-Time Streaming)
app.post("/api/chat/stream", async (req, res) => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "Invalid messages array" });
        }

        // SSE headers
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("X-Accel-Buffering", "no");
        res.flushHeaders();

        const lastMessage = messages[messages.length - 1]?.content || "";

        // Function to stream from fallback knowledge engine
        const streamFallback = async () => {
            const reply = generateApexResponse(lastMessage, messages);
            // Split into realistic words/tokens for smooth streaming
            const words = reply.match(/(\S+\s*|\n)/g) || [reply];
            for (const word of words) {
                if (res.writableEnded) break;
                res.write(`data: ${JSON.stringify({ content: word })}\n\n`);
                await new Promise((r) => setTimeout(r, 20));
            }
            if (!res.writableEnded) {
                res.write("data: [DONE]\n\n");
                res.end();
            }
        };

        // Try Groq API if key exists and starts with gsk_
        if (GROQ_API_KEY && GROQ_API_KEY.startsWith("gsk_")) {
            const fullMessages = [
                { role: "system", content: RUPAM_SYSTEM_PROMPT },
                ...messages.slice(-15)
            ];

            const bodyObj = {
                model: GROQ_MODEL,
                messages: fullMessages,
                max_tokens: 1024,
                temperature: 0.7,
                stream: true
            };
            const body = JSON.stringify(bodyObj);

            const options = {
                hostname: "api.groq.com",
                path: "/openai/v1/chat/completions",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Length": Buffer.byteLength(body)
                }
            };

            let buffer = "";
            let streamStarted = false;

            const groqReq = https.request(options, (groqRes) => {
                if (groqRes.statusCode !== 200) {
                    console.warn(`⚠️ Groq streaming HTTP ${groqRes.statusCode}, switching to Built-in Engine...`);
                    streamFallback();
                    return;
                }

                groqRes.on("data", (chunk) => {
                    buffer += chunk.toString();
                    const lines = buffer.split("\n");
                    buffer = lines.pop();

                    for (const line of lines) {
                        const trimmed = line.trim();
                        if (!trimmed || !trimmed.startsWith("data: ")) continue;
                        const data = trimmed.slice(6);
                        if (data === "[DONE]") {
                            res.write("data: [DONE]\n\n");
                            res.end();
                            return;
                        }
                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content;
                            if (content) {
                                streamStarted = true;
                                res.write(`data: ${JSON.stringify({ content })}\n\n`);
                            }
                        } catch (e) {}
                    }
                });

                groqRes.on("end", () => {
                    if (!res.writableEnded) {
                        res.write("data: [DONE]\n\n");
                        res.end();
                    }
                });
            });

            groqReq.on("error", (err) => {
                console.error("Groq stream error, using fallback:", err.message);
                if (!streamStarted) streamFallback();
                else {
                    if (!res.writableEnded) {
                        res.write("data: [DONE]\n\n");
                        res.end();
                    }
                }
            });

            req.on("close", () => { groqReq.destroy(); });
            groqReq.write(body);
            groqReq.end();
        } else {
            // No Groq key provided — stream directly with Built-in Apex Knowledge Engine
            await streamFallback();
        }

    } catch (err) {
        console.error("❌ Stream setup error:", err);
        const lastMessage = req.body?.messages?.[req.body.messages.length - 1]?.content || "";
        const fallbackText = generateApexResponse(lastMessage);
        res.write(`data: ${JSON.stringify({ content: fallbackText })}\n\n`);
        res.write("data: [DONE]\n\n");
        res.end();
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Mode: Local JSON Data + Apex Neural Intelligence`);
    console.log(`🔗 Projects API:    GET  http://localhost:${PORT}/api/projects`);
    console.log(`🤖 Chatbot API:     POST http://localhost:${PORT}/api/chat`);
    console.log(`⚡ Stream API:      POST http://localhost:${PORT}/api/chat/stream`);
    console.log(`📊 Audit Logs API:  GET  http://localhost:${PORT}/api/admin/audit-logs`);
    console.log(`📈 Visit Stats API: GET  http://localhost:${PORT}/api/admin/visit-stats`);

    // Initialize database tables on server launch
    await db.initDatabase();
});