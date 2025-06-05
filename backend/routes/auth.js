const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// ✅ Use Environment Variable for JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// ✅ Signup Route (Fixed Double Hashing)
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Validate Input Fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if User Already Exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ No need to hash password here, `User.js` will handle it before saving
        user = new User({ name, email, password });
        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully", token, userId: user._id });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Login Route (Fully Debugged)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.error("❌ User Not Found:", email);
            return res.status(400).json({ message: "User not found" });
        }

        console.log("🔍 Entered Password:", password);
        console.log("🔍 Stored Hashed Password:", user.password);

        // ✅ Compare hashed password correctly
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 Password Match Status:", isMatch);

        if (!isMatch) {
            console.error("❌ Incorrect Password for:", email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        console.log("✅ Login Successful for:", email);
        res.json({ message: "Login successful", token, userId: user._id });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
