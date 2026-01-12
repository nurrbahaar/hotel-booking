import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/Hotel.js';

dotenv.config();

const fixCity = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
        console.log("Connected to DB");

        const hotels = await Hotel.find({});
        console.log(`Found ${hotels.length} hotels.`);
        
        let count = 0;
        for (const hotel of hotels) {
            let updated = false;
            
            // Regex to match ?stanbul or similar (matches any single char before stanbul)
            const regex = /.?stanbul/i;
            const regexCountry = /T.?rkiye/i;

            // Check legacy city
            if (hotel.city && regex.test(hotel.city)) {
                console.log(`Found bad city in ${hotel.name}: ${hotel.city}`);
                hotel.city = 'Ýstanbul';
                updated = true;
            }

            // Check address.city
            if (hotel.address && hotel.address.city && regex.test(hotel.address.city)) {
                console.log(`Found bad address.city in ${hotel.name}: ${hotel.address.city}`);
                hotel.address.city = 'Ýstanbul';
                updated = true;
            }

            // Check address.country
            if (hotel.address && hotel.address.country && regexCountry.test(hotel.address.country)) {
                console.log(`Found bad country in ${hotel.name}: ${hotel.address.country}`);
                hotel.address.country = 'Türkiye';
                updated = true;
            }


            if (updated) {
                await hotel.save();
                console.log(`Updated hotel: ${hotel.name}`);
                count++;
            }
        }

        console.log(`Updated ${count} hotels.`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

fixCity();
