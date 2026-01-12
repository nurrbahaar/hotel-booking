import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/Hotel.js';
import Room from './models/Room.js';
import User from './models/User.js';
import Booking from './models/Booking.js';
import Review from './models/Review.js';

import 'dotenv/config'; // Use this instead of dotenv.config() for ES modules if needed, or ensure path is correct

const cleanData = async () => {
    try {
        // Connect to the correct database
        // Hardcoding for now if env is not loading correctly from parent dir
        const uri = process.env.MONGODB_URI || "mongodb+srv://bahar:bahar123@cluster0.ltgauaq.mongodb.net";
        await mongoose.connect(`${uri}/hotel-booking`);
        console.log("Connected to DB");

        console.log("Cleaning Hotels...");
        const hotels = await Hotel.deleteMany({});
        console.log(`Deleted ${hotels.deletedCount} hotels.`);
        
        console.log("Cleaning Rooms...");
        const rooms = await Room.deleteMany({});
        console.log(`Deleted ${rooms.deletedCount} rooms.`);

        console.log("Cleaning Bookings...");
        const bookings = await Booking.deleteMany({});
        console.log(`Deleted ${bookings.deletedCount} bookings.`);

        console.log("Cleaning Reviews...");
        const reviews = await Review.deleteMany({});
        console.log(`Deleted ${reviews.deletedCount} reviews.`);

        console.log("Cleaning Seed Users...");
        // Delete users created by the seed script (checking for seed_ prefix in _id or specific criteria if needed)
        // For now, removing users that might be seed or dummies if identifiable, or skipping if risky.
        // Assuming we only want to clean hotel data, maybe keep users? 
        // User asked to clean "old data" implying the broken hotel listings.
        // const users = await User.deleteMany({ _id: { $regex: /^seed_/ } });
        // console.log(`Deleted ${users.deletedCount} seed users.`);

        console.log("Data cleaned successfully!");
        process.exit();
    } catch (error) {
        console.error("Error cleaning data:", error);
        process.exit(1);
    }
};

cleanData();
