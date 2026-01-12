import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import crypto from 'crypto';

dotenv.config();

const checkUser = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb+srv://bahar:bahar123@cluster0.ltgauaq.mongodb.net/hotel-booking";
        await mongoose.connect(uri.includes('hotel-booking') ? uri : `${uri}/hotel-booking`);
        console.log("Connected to DB");

        const email = "owner@example.com";
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User NOT FOUND");
        } else {
            console.log("User FOUND");
            console.log("Email:", user.email);
            console.log("Password Hash:", user.password);
            
            const pass = "password123";
            const hash = crypto.createHash('sha256').update(pass).digest('hex');
            console.log(`Hash for 'password123': ${hash}`);
            
            if (user.password === hash) {
                console.log("MATCH: Password is correct.");
            } else {
                console.log("MISMATCH: Password is NOT correct.");
                
                // Fix it
                user.password = hash;
                await user.save();
                console.log("FIXED: Password has been reset to 'password123'");
            }
        }
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUser();
