import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Generate a unique session ID for each chat session
import { AuthContext } from "../context/AuthContext"; // ✅ Import AuthContext
import "./Chatbot.css"; // Importing CSS file
import { useLocation } from "react-router-dom"; // ✅ Import useLocation to get character data

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false); // Bot Typing Indicator
    const messagesEndRef = useRef(null);
    const [sessionId, setSessionId] = useState(() => uuidv4()); // Unique session per page load
    const { logout } = useContext(AuthContext); // ✅ Get logout function

    const location = useLocation(); // ✅ Get passed character from navigation
    const character = location.state?.character || "Krishna"; // Default to "Krishna" if no character is selected

    useEffect(() => {
        // When the page refreshes, clear the chat on the backend
        axios.post("http://localhost:5000/clear-chat", { sessionId })
            .then(() => setMessages([]))
            .catch(err => console.error("Error clearing chat:", err));
    }, [sessionId]);

    // Function to maintain a short context history (last 5 messages)
    const getContextHistory = (limit = 5) => {
        return messages.slice(-limit).map(msg => ({
            sender: msg.sender,
            text: msg.text
        }));
    };

    // Format bot reply for better readability
    const formatBotReply = (reply) => {
        return reply
            .replace(/\*/g, "") // Remove asterisk symbols (*)
            .split(/\n+/) // Split into paragraphs on newline characters
            .map((line, index) => {
                if (line.includes(":")) {
                    const [boldText, normalText] = line.split(":", 2);
                    return (
                        <p key={index}>
                            <strong>{boldText.trim()}:</strong> {normalText.trim()}
                        </p>
                    );
                }
                return <p key={index}>{line.trim()}</p>;
            });
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        // Add user message to chat
        const userMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput("");

        setIsTyping(true); // Show typing animation

        try {
            const context = getContextHistory(); // Get last 5 messages for context

            const response = await axios.post("http://localhost:5000/chat", {
                message: input,
                sessionId,
                context: context,
                character: character, // ✅ Send character to backend
            });

            const botMessage = { sender: "bot", text: response.data.reply || `I am ${character}, here to guide you.` };

            setTimeout(() => {
                setMessages((prevMessages) => [...prevMessages, botMessage]);
                setIsTyping(false);
            }, 1000); // Delay for realistic effect
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Sorry, something went wrong!" }
            ]);
            setIsTyping(false);
        }
    };

    // Auto-scroll to the latest message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    
    // Send message on pressing "Enter"
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            {/* Chat Header with Logout Button */}
            <div className="chat-header">
                {character} <span className="flute-icon"></span>
                <button onClick={logout} className="logout-button">Logout</button> {/* ✅ Added Logout Button */}
            </div>

            {/* Chat Messages */}
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-bubble ${msg.sender}`}>
                        <strong>{msg.sender === "user" ? "You" : character}:</strong>
                        {msg.sender === "bot" ? formatBotReply(msg.text) : <span>{msg.text}</span>}
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="chat-bubble bot typing">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                )}

                <div ref={messagesEndRef}></div>
            </div>

            {/* Input Box */}
            <div className="chat-input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Ask ${character}...`} // ✅ Updated to reflect selected character
                    onKeyDown={handleKeyPress}
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="send-button">Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
