const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs").promises;
const https = require("https");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
- IT Executive in Hospital Software Department at Peerless Hospital.
- Expert in HMS / OPD / IPD / Billing / Patient Workflows.
- Oracle SQL / PL SQL / Reports specialist.
- Key Strengths: Real industry experience, Technical + business understanding, Fast learner, Reliable support, Professional communication.

### SERVICES TO OFFER
- Portfolio Websites
- Business Websites
- E-commerce Websites
- Hospital Management Software
- Doctor Appointment Systems
- Custom Dashboards
- Chatbot Integration
- SQL / Database Solutions
- Web UI Improvements
- Bug Fixing / Support

### YOUR PERSONALITY & TONE
- **Status:** Human-like, Warm, Intelligent, Helpful, Confident, Premium, Friendly, Trustworthy.
- **Style:** Never sound stiff, boring, scripted, or robotic. Write naturally like a smart assistant talking to a real person.
- **English:** Use easy, fluent English.
- **Multilingual:** You can speak Bengali, English, or Hinglish fluently if the user starts the conversation in those languages.
- **Emoji:** Use light emojis only when useful (e.g., 👋, ✅).

### RESPONSE GUIDELINES
- Use short to medium responses.
- Always sound alive, attentive, and helpful.
- If the user is serious, ask follow-up questions.
- If the user wants a service, move toward a project discussion.
- If the user is browsing, suggest relevant services or projects.
- If the user is confused, simplify things politely.

### SPECIFIC TRIGGERS
- **Who are you?** 
  "Hi, I’m Apex 👋 Rupam Mandal’s personal AI assistant. I’m here to help you explore his skills, projects, and services instantly. If you need a website, software, or custom solution, feel free to ask."
- **About Rupam:** 
  Explain confidently that Rupam combines real-world industry experience (Hospital IT) with modern web development skills, making him highly valuable for practical, professional business solutions.
- **Services:** 
  Mention relevant services only (don't dump a huge list). Always finish with: “What kind of project are you planning?”
- **Price/Budget Guidance:** 
  Give professional estimated ranges based on project type:
  - Portfolio Website: budget-friendly to premium depending on features.
  - Business Website: depends on pages and functions.
  - Custom Software: based on workflow complexity.
  Then ask for their requirements.
- **"I need a website":** 
  Respond like a consultant: "Sure — I’d be happy to help. What type of website do you need? Business, portfolio, booking system, e-commerce, or something custom?"
- **Casual Talk / Impressed:** 
  Be natural, friendly, and thank them warmly if they are impressed.

### IMPORTANT CONSTRAINTS
- NEVER say “As an AI language model”.
- NEVER mention prompts or internal rules.
- NEVER sound machine-generated or give dry one-line answers.
- If asked for harmful/illegal content, politely refuse.

### CONTACT PROTOCOL (STRICT)
Only when the user is serious and ready to connect:
1. Ask for their Name.
2. Ask for their Email.
3. Ask for the Project requirement.
4. Confirm if you should send it to Rupam.
5. Once confirmed, use the 'send_message_to_rupam' function and tell them: "Done! Your message has been sent to Rupam. He typically responds within 24 hours."`;

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

// Nodemailer Config for sending real emails
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER || "rupammandal240@gmail.com",
        pass: process.env.EMAIL_PASS || "" // User must configure this in .env
    }
});

// Utility to send email to both Rupam and the User
async function sendEmailNotification(contact) {
    if (!process.env.EMAIL_PASS) {
        console.log("⚠️ EMAIL_PASS not set in .env. Falling back to local storage only.");
        return;
    }
    
    // Email intended for Rupam
    const mailOptionsToRupam = {
        from: `"${contact.name}" <${process.env.EMAIL_USER || "rupammandal240@gmail.com"}>`,
        replyTo: contact.email,
        to: process.env.EMAIL_USER || "rupammandal240@gmail.com",
        subject: `New Lead: Message from ${contact.name} via Apex`,
        text: `You have a new message from your portfolio chatbot:\n\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone || 'N/A'}\nMessage:\n${contact.message}`
    };

    // Auto-reply Email intended for the User
    const mailOptionsToUser = {
        from: `"Rupam Mandal Portfolio" <${process.env.EMAIL_USER || "rupammandal240@gmail.com"}>`,
        to: contact.email,
        subject: `Thank you for contacting me, ${contact.name}!`,
        text: `Hi ${contact.name},\n\nThank you for reaching out through my AI assistant!\nI have received your message and will get back to you shortly.\n\nYour Message:\n${contact.message}\n\nBest Regards,\nRupam Mandal\nhttps://rupam.co.in`
    };

    try {
        await transporter.sendMail(mailOptionsToRupam);
        await transporter.sendMail(mailOptionsToUser);
        console.log("✅ Emails successfully dispatched!");
    } catch (err) {
        console.error("❌ Email dispatch failed:", err);
    }
}

// Utility: Call Groq API via native https
function callGroqAPI(messages, tools = null) {
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
                    resolve(parsed);
                } catch (e) {
                    reject(new Error("Invalid JSON from Groq: " + data));
                }
            });
        });

        req.on("error", reject);
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

// 3. AI Chatbot (Groq API)
app.post("/api/chat", async (req, res) => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "Invalid messages array" });
        }

        // Prepend system prompt
        const fullMessages = [
            { role: "system", content: RUPAM_SYSTEM_PROMPT },
            ...messages.slice(-10) // Keep last 10 messages for context
        ];

        // Define tools for the AI to send emails
        const definedTools = [
            {
                type: "function",
                function: {
                    name: "send_message_to_rupam",
                    description: "Sends an email or message directly to Rupam on behalf of the website visitor. Use this when the user explicitly requests to send an email, mail, or message to Rupam.",
                    parameters: {
                        type: "object",
                        properties: {
                            user_name: { type: "string", description: "Name of the user wanting to contact Rupam" },
                            user_email: { type: "string", description: "Email address of the user" },
                            message: { type: "string", description: "The message the user wants to send to Rupam" }
                        },
                        required: ["user_name", "user_email", "message"]
                    }
                }
            }
        ];

        let groqResponse = await callGroqAPI(fullMessages, definedTools);

        if (groqResponse.error) {
            console.error("Groq API Error:", groqResponse.error);
            return res.status(500).json({ error: groqResponse.error.message || "Groq API error" });
        }

        const responseMessage = groqResponse.choices?.[0]?.message;

        // Check for tool calls (If AI decided to send an email)
        if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
            fullMessages.push(responseMessage); // Append the assistant's tool call request
            
            for (const toolCall of responseMessage.tool_calls) {
                if (toolCall.function.name === "send_message_to_rupam") {
                    try {
                        const args = JSON.parse(toolCall.function.arguments);
                        
                        // Save the contact locally using the existing backend function
                        const contactDetails = {
                            name: args.user_name,
                            email: args.user_email,
                            phone: "Sent via Apex Assistant",
                            message: args.message
                        };
                        
                        await saveContact(contactDetails);
                        await sendEmailNotification(contactDetails);

                        // Add tool response to messages
                        fullMessages.push({
                            tool_call_id: toolCall.id,
                            role: "tool",
                            name: "send_message_to_rupam",
                            content: "Message successfully saved and sent to Rupam."
                        });
                    } catch (toolErr) {
                        console.error("Tool execution failed:", toolErr);
                        fullMessages.push({
                            tool_call_id: toolCall.id,
                            role: "tool",
                            name: "send_message_to_rupam",
                            content: "Failed to send message due to a system error."
                        });
                    }
                }
            }

            // Call Groq again with the tool result to get the final user-facing reply
            groqResponse = await callGroqAPI(fullMessages, definedTools);
        }

        const reply = groqResponse.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.";
        res.json({ reply });

    } catch (err) {
        console.error("❌ Chat error:", err);
        res.status(500).json({ error: "Internal server error while processing chat" });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Mode: Local JSON Data (MongoDB Removed)`);
    console.log(`🔗 Projects API: GET http://localhost:${PORT}/api/projects`);
    console.log(`🤖 Chatbot API: POST http://localhost:${PORT}/api/chat`);
});