import axios from "axios";

const API_URL = "http://localhost:5000/chat";

export const sendMessageToChatbot = async (message, context = []) => {
    try {
        const response = await axios.post(API_URL, { message, context }); // ✅ Send context
        return response.data.reply;
    } catch (error) {
        console.error("Error fetching chatbot response:", error.response?.data || error.message);
        return "Sorry, something went wrong.";
    }
};
