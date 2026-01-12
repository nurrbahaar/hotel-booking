import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/Hotel.js';
import User from './models/User.js';

dotenv.config();

const testLogic = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb+srv://bahar:bahar123@cluster0.ltgauaq.mongodb.net/hotel-booking";
        await mongoose.connect(uri.includes('hotel-booking') ? uri : `${uri}/hotel-booking`);
        console.log("Connected to DB");

        const email = "owner@example.com";
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found!");
            process.exit(1);
        }

        console.log(`User ID: ${user._id} (Type: ${typeof user._id})`);

        // Simulate what the middleware does
        const reqAuthUserId = user._id.toString(); 
        console.log(`Simulated req.auth.userId: ${reqAuthUserId} (Type: ${typeof reqAuthUserId})`);

        // Simulate what the controller does
        const query = { owner: reqAuthUserId };
        console.log("Querying Hotel with:", query);

        const hotel = await Hotel.findOne(query);

        if (hotel) {
            console.log("SUCCESS: Hotel found:", hotel.name);
            console.log("Hotel Owner Field:", hotel.owner, `(Type: ${typeof hotel.owner})`);
        } else {
            console.log("FAILURE: Hotel NOT found.");
            
            // Debug failure
            const allHotels = await Hotel.find({});
            const myHotel = allHotels.find(h => h.owner == reqAuthUserId); // Loose equality check
            if (myHotel) {
                console.log("But a hotel exists with abstract equality match:", myHotel.name);
                console.log("DB Owner:", myHotel.owner);
                console.log("Search Owner:", reqAuthUserId);
                console.log("Strict equality check:", myHotel.owner === reqAuthUserId);
            }
        }

        process.exit(0);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

testLogic();
