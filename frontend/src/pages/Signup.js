import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Submitting:", { name, email, password });

        try {
            const res = await axios.post("http://localhost:5000/auth/signup", { name, email, password });
            console.log("✅ Signup Success:", res.data);
            alert(res.data.message || "Signup successful! Please login.");

            // Clear form after successful signup
            setName("");
            setEmail("");
            setPassword("");

            navigate("/login");
        } catch (error) {
            console.error("❌ Signup Error:", error);
            alert(error.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h2 style={styles.title}>Create an Account</h2>
                <form onSubmit={handleSignup} style={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                </form>
                <p style={styles.loginText}>
                    Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

// Full-Screen Dark Matte Theme (No Gaps, No Scrolling Issues)
const styles = {
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "#121212",  // Matte Dark Background
        margin: "0",
        padding: "0",
    },
    container: {
        width: "100%",
        maxWidth: "400px",
        padding: "40px",
        borderRadius: "12px",
        background: "#1E1E1E", // Matte Dark Finish
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        textAlign: "center",
        animation: "fadeIn 0.8s ease-in-out",
    },
    title: {
        color: "#ffffff",
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        letterSpacing: "1px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        padding: "12px",
        margin: "12px 0",
        borderRadius: "6px",
        border: "1px solid #333",
        background: "#222", // Matte Input Background
        color: "#fff",
        outline: "none",
        fontSize: "16px",
        transition: "0.3s",
    },
    button: {
        padding: "12px",
        borderRadius: "6px",
        border: "none",
        background: "#007bff", // Subtle Dark Blue
        color: "white",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s",
        marginTop: "10px",
    },
    loginText: {
        marginTop: "15px",
        color: "#bbb",
        fontSize: "14px",
    },
    link: {
        color: "#007bff",
        textDecoration: "none",
        fontWeight: "bold",
        transition: "0.3s",
    },
};

// Fixing White Gaps & Scroll Issues
const stylesGlobal = document.createElement("style");
stylesGlobal.innerHTML = `
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    background: #121212;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}

input:focus {
    border-color: #007bff;
    box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.5);
}

button:hover {
    background: #0056b3;
}

a:hover {
    text-decoration: underline;
}
`;
document.head.appendChild(stylesGlobal);

export default Signup;
