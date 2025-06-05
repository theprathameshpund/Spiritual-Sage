const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    sessionId: { type: String, required: true }, // Unique session for each user session
    messages: [
        {
            sender: { type: String, enum: ["user", "bot"], required: true },
            text: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model("Message", MessageSchema);
