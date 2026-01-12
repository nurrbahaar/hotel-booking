import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/Hotel.js';

dotenv.config();

const checkData = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb+srv://bahar:bahar123@cluster0.ltgauaq.mongodb.net/hotel-booking";
        await mongoose.connect(uri);
        console.log("Connected to DB");

        const count = await Hotel.countDocuments();
        console.log(`Current Hotel Count: ${count}`);
        
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkData();
