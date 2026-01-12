import mongoose from 'mongoose';
import User from './models/User.js';
import crypto from 'crypto';
import 'dotenv/config';

const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
}

const checkLogin = async (email, password) => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
        console.log("Connected to DB");

        const user = await User.findOne({ email });
        
        if (!user) {
            console.log("User not found");
            process.exit(0);
        }

        console.log("User found:", user.email);
        console.log("Stored Password Hash:", user.password);
        
        const inputHash = hashPassword(password);
        console.log("Input Password Hash: ", inputHash);

        if (user.password === inputHash) {
            console.log("SUCCESS: Password matches!");
        } else {
            console.log("FAILURE: Password does NOT match.");
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const email = process.argv[2];
const password = process.argv[3];

checkLogin(email, password);
