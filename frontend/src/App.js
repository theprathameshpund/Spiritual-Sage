import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Characters from "./pages/Characters"; 
import { AuthContext, AuthProvider } from "./context/AuthContext";

// ✅ Updated Protected Route to Check Token
function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token");

    return user || token ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div style={styles.container}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/chatbot" />} />
                        <Route path="/characters" element={<ProtectedRoute><CharactersPage /></ProtectedRoute>} />
                        <Route path="/chatbot" element={<ProtectedRoute><ChatbotPage /></ProtectedRoute>} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}


// ✅ Characters Page Wrapper
const CharactersPage = () => (
    <div style={styles.pageContainer}>
        <h2>Characters</h2>
        <Characters />
    </div>
);

// Chatbot Page with Styling
const ChatbotPage = () => (
    <div style={styles.chatbotContainer}>
        <h2>Chatbot</h2>
        <Chatbot />
    </div>
);

// Basic Styling
const styles = {
    container: {
        textAlign: "center",
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    chatbotContainer: {
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "400px",
        backgroundColor: "#f9f9f9",
    }
};

export default App;
