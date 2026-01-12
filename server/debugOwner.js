import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/Hotel.js';
import User from './models/User.js';

dotenv.config();

const debugOwner = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb+srv://bahar:bahar123@cluster0.ltgauaq.mongodb.net/hotel-booking";
        await mongoose.connect(uri.includes('hotel-booking') ? uri : `${uri}/hotel-booking`);
        console.log("Connected to DB");

        const email = "owner@example.com";
        console.log(`Searching for users with email: ${email}`);
        
        const users = await User.find({ email: email });
        console.log(`Found ${users.length} users.`);
        
        users.forEach(u => {
            console.log(`User ID: ${u._id}, Role: ${u.role}, Email: ${u.email}`);
        });

        if (users.length > 0) {
            const userId = users[0]._id;
            console.log(`Checking hotels for Owner ID: ${userId}`);
            
            // Allow for string vs ObjectId mismatch if necessary, though schema defines specific types
            const hotels = await Hotel.find({ owner: userId });
            console.log(`Found ${hotels.length} hotels for this owner.`);
            
            hotels.forEach(h => {
                console.log(`Hotel: ${h.name} (ID: ${h._id}), Owner Field: ${h.owner}`);
            });
            
            // Also check generally if any hotel has this owner string/object id
            const hotelsLoose = await Hotel.find({ owner: userId.toString() });
             if (hotels.length === 0 && hotelsLoose.length > 0) {
                 console.log("WARNING: Found hotels via string query but not direct query. Type mismatch?");
             }
        }
        
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugOwner();
