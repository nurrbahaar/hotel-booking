import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Hotel from './models/Hotel.js';
import User from './models/User.js';

dotenv.config();

const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

const assignOwner = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb+srv://bahar:bahar123@cluster0.ltgauaq.mongodb.net/hotel-booking";
        
        // Handle connection string adjustment if needed (similar to seedData)
        // If URI ends with /?..., insert database name before ?
        // If URI doesn't end with /, append /hotel-booking? But here we assume it might be full.
        // Let's just use the same logic as seedData usually does or just connect.
        // seedData used: await mongoose.connect(`${uri}/hotel-booking`); but uri there was base cluster.
        // I'll assume the hardcoded one or .env works. 
        // Safer:
        await mongoose.connect(uri.includes('hotel-booking') ? uri : `${uri}/hotel-booking`);
        
        console.log("Connected to DB");

        const targetEmail = "owner@example.com";
        const targetPassword = "password123";
        const hashedPassword = hashPassword(targetPassword);

        let user = await User.findOne({ email: targetEmail });

        if (!user) {
            console.log(`User ${targetEmail} not found. Creating...`);
            user = new User({
                _id: `manual_owner_${Date.now()}`,
                username: "Demo Owner",
                email: targetEmail,
                password: hashedPassword,
                image: "https://ui-avatars.com/api/?name=Demo+Owner&background=random",
                role: "hotelOwner",
                recentSearchedCities: []
            });
            await user.save();
            console.log("User created.");
        } else {
            console.log(`User ${targetEmail} found. Updating password just in case...`);
            user.password = hashedPassword;
            // Ensure they are an owner
            user.role = 'hotelOwner';
            await user.save();
            console.log("User updated.");
        }

        // Now find a random hotel
        const count = await Hotel.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const hotel = await Hotel.findOne().skip(rand);

        if (!hotel) {
            console.log("No hotels found in DB!");
            process.exit(1);
        }

        console.log(`Assigning hotel "${hotel.name}" to ${targetEmail}`);
        hotel.owner = user._id;
        await hotel.save();

        console.log("SUCCESS: Hotel assigned.");
        console.log(`Login with: ${targetEmail} / ${targetPassword}`);

        process.exit(0);

    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

assignOwner();
