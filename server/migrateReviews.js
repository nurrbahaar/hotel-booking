import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/Hotel.js';
import Review from './models/Review.js';

dotenv.config();

const migrateReviews = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb+srv://bahar:bahar123@cluster0.ltgauaq.mongodb.net/hotel-booking";
        await mongoose.connect(uri);
        console.log("Connected to DB");

        const hotels = await Hotel.find({});
        console.log(`Found ${hotels.length} hotels. Updating ratings...`);

        for (const hotel of hotels) {
            const reviews = await Review.find({ hotel: hotel._id });
            const count = reviews.length;
            
            if (count > 0) {
                const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
                const averageRating = totalRating / count;
                
                hotel.numReviews = count;
                hotel.starRating = averageRating;
                await hotel.save();
                // console.log(`Updated ${hotel.name}: ${count} reviews, ${averageRating} stars`);
            } else {
                hotel.numReviews = 0;
                hotel.starRating = 0;
                await hotel.save();
            }
        }

        console.log("All hotels updated!");
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

migrateReviews();