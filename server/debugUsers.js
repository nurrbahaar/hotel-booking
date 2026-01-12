import mongoose from 'mongoose';
import User from './models/User.js';
import 'dotenv/config';

const listUsers = async () => {
    try {
        // Match the connection logic in configs/db.js
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
        console.log("Connected to DB (hotel-booking)");

        const users = await User.find({});
        console.log("Users found:", users.length);
        users.forEach(u => {
            console.log(`- ${u.email} (ID: ${u._id}, Role: ${u.role})`);
        });

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

listUsers();
