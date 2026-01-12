import User from "../models/User.js";
import crypto from 'crypto';

// Simple helper to hash password
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Simple helper to generate a token (HMAC of userId)
const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET || 'default_secret_key_change_me';
    const signature = crypto.createHmac('sha256', secret).update(userId.toString()).digest('hex');
    return `${userId}.${signature}`;
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log("Login Request Body:", req.body);

        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        const cleanEmail = email.trim();

        console.log("LOGIN ATTEMPT:");
        console.log("Email:", email);
        console.log("Clean Email:", cleanEmail);
        console.log("Password received length:", password ? password.length : 0);
        
        const user = await User.findOne({ email: cleanEmail });
        
        console.log("User found:", !!user);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!user.password) {
            return res.json({ success: false, message: "Manual login not set up for this user" });
        }

        const hashedPassword = hashPassword(password);
        console.log("Input Hash:", hashedPassword);
        console.log("Stored Hash:", user.password);

        if (hashedPassword !== user.password) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                roles: user.roles
            }
        });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
