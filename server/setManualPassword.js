import mongoose from 'mongoose';
import User from './models/User.js';
import crypto from 'crypto';
import 'dotenv/config';

const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
}

const setPassword = async (email, password) => {
    try {
        // Match the connection logic in configs/db.js
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
        console.log("Connected to DB (hotel-booking)");

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found with email:", email);
            console.log("Creating new user...");
            
            const newUser = await User.create({
                _id: 'manual_' + Date.now(),
                email,
                username: email.split('@')[0],
                image: 'https://via.placeholder.com/150',
                password: hashPassword(password),
                role: 'admin', // Default to admin
                roles: [], // Initialize empty roles array
                recentSearchedCities: []
            });
            
            // Add admin role manually if needed, or rely on 'role' field for legacy support
            // For now, let's just save it.
            console.log("Created new user successfully:", newUser.email);
            process.exit(0);
        }

        user.password = hashPassword(password);
        await user.save();

        console.log(`Password set for user ${email}`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
    console.log("Usage: node setManualPassword.js <email> <password>");
    process.exit(1);
}

setPassword(email, password);
