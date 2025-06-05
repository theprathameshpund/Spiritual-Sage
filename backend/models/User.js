const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// ✅ Ensure password is hashed only once before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    console.log("🔍 Original Password Before Hashing:", this.password); // Debugging
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("🔍 Hashed Password Before Saving:", this.password); // Debugging

    next();
});

module.exports = mongoose.model("User", UserSchema);
