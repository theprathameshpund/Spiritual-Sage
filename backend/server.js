require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid"); // Ensure uuid is installed (npm install uuid)
const Message = require("./models/Message"); // Import Message model

const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);  // ✅ Now frontend can call `http://localhost:5000/auth/signup`

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/chatbot"; // Default local DB

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // Exit to prevent running without a DB connection
    });

// Character Personalities
const characterPersonalities = {
    "Krishna": "You are Lord Krishna, the divine guide from the Bhagavad Gita. Speak as God addressing a devoted soul—your tone is gentle, uplifting, and full of wisdom. For basic questions, keep answers short and to the point. For deep spiritual questions, provide an elaborate and profound response.",
    "Acharya Chanakya": "You are Chanakya, an ancient Indian strategist and teacher. Your responses are intelligent, practical, and focused on leadership, governance, and diplomacy. Provide wisdom rooted in strategy and political thinking.",
    "Gautam Buddha": "You are Gautama Buddha, the enlightened teacher. Speak in a calm, meditative tone, offering mindfulness, inner peace, and detachment from suffering.",
    "Swami Vivekananda": "You are Swami Vivekananda, an inspiring spiritual leader. Your tone is energetic, motivational, and empowering, encouraging self-confidence and personal growth."
};

app.post("/chat", async (req, res) => {
    try {
        const { message, sessionId, character } = req.body;

        if (!message || !sessionId || !character) {
            return res.status(400).json({ error: "Message, sessionId, and character are required" });
        }

        // Retrieve last 5 messages for context
        const previousMessages = await Message.findOne({ sessionId });
        const conversationHistory = previousMessages ? previousMessages.messages.slice(-5) : [];

        // Format conversation history for Gemini API
        const formattedContext = conversationHistory.map(msg => ({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
        }));

        // Select character persona
        const personaText = characterPersonalities[character] || "You are a wise and helpful AI assistant.";
        const characterPersona = {
            role: "model",
            parts: [{
                text: `${personaText} Respond concisely, without role-playing, storytelling, or stage directions. 
                Do not include actions or narrative descriptions in parentheses. Provide direct, insightful, and clear answers only.`
            }]
        };

        // Construct API request payload
        const requestPayload = {
            contents: [
                characterPersona,  // ✅ Dynamic persona based on character
                ...formattedContext,
                { role: "user", parts: [{ text: message }] }
            ]
        };

        // Call Google Gemini API
        const response = await axios.post(GEMINI_API_URL, requestPayload);

        // Extract response
        const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                         "I am here to guide you with wisdom and clarity.";

        // Store messages in MongoDB
        await Message.findOneAndUpdate(
            { sessionId },
            { $push: { messages: { sender: "user", text: message }, messages: { sender: "bot", text: botReply } } },
            { upsert: true, new: true }
        );

        res.json({ reply: botReply });
    } catch (error) {
        console.error("❌ Error calling Gemini API:", error.response?.data || error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to clear chat when the page refreshes
app.post("/clear-chat", async (req, res) => {
    try {
        const { sessionId } = req.body;
        if (!sessionId) {
            return res.status(400).json({ error: "Session ID is required" });
        }

        // Remove conversation history
        await Message.deleteOne({ sessionId });
        res.json({ message: "Chat cleared" });
    } catch (error) {
        console.error("❌ Error clearing chat:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
