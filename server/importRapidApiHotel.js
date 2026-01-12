import mongoose from 'mongoose';
import Hotel from './models/Hotel.js';
import Room from './models/Room.js';
import User from './models/User.js';
import 'dotenv/config';

const RAPIDAPI_KEY = 'daa199f7b6msh371358a0242b3e0p1e1efcjsnfab068050012';
const RAPIDAPI_HOST = 'hotels-com-provider.p.rapidapi.com';

const importHotel = async (hotelId) => {
    try {
        // 1. Connect to DB
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
        console.log("? Connected to DB");

        // 2. Fetch Data from RapidAPI
        console.log(`? Fetching data for Hotel ID: ${hotelId}...`);
        const url = `https://${RAPIDAPI_HOST}/v3/hotels/summary?locale=es_AR&domain=AR&hotel_id=${hotelId}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        };

        const response = await fetch(url, options);
        const json = await response.json();

        if (!json.data || !json.data.summary) {
            console.error("? API Error: Invalid response format", json);
            process.exit(1);
        }

        const summary = json.data.summary;
        const location = summary.location || {};
        const address = location.address || {};
        const coordinates = location.coordinates || {};
        const amenities = summary.amenities?.topAmenities?.map(a => a.text || a) || [];

        // 3. Find Owner (Admin)
        let owner = await User.findOne({ email: 'nur@email.com' });
        if (!owner) {
            owner = await User.findOne({ role: 'admin' });
        }
        if (!owner) {
            console.error("? No admin user found to assign as owner. Please create an admin first.");
            process.exit(1);
        }

        // 4. Create/Update Hotel
        const hotelData = {
            externalId: summary.id,
            name: summary.name,
            description: summary.tagline || summary.overview?.accessibilityLabel || "No description available",
            owner: owner._id,
            address: {
                line: address.addressLine || address.firstAddressLine || "Unknown Address",
                city: address.city || "Unknown City",
                country: address.countryCode || "Unknown Country",
                latitude: coordinates.latitude || 0,
                longitude: coordinates.longitude || 0
            },
            city: address.city || "Unknown City", // Legacy field
            starRating: summary.overview?.rating || 0,
            amenities: amenities,
            isApproved: true, // Auto approve imported hotels
            status: 'active'
        };

        const hotel = await Hotel.findOneAndUpdate(
            { externalId: summary.id },
            hotelData,
            { upsert: true, new: true }
        );

        console.log(`? Hotel saved: ${hotel.name}`);

        // 5. Create a Dummy Room (since summary API doesn't give rooms)
        // Check if room exists
        const existingRoom = await Room.findOne({ hotel: hotel._id });
        if (!existingRoom) {
            await Room.create({
                hotel: hotel._id,
                roomType: "Standard Room",
                description: "Comfortable standard room imported from external source.",
                pricePerNight: 150, // Default price
                capacity: { adults: 2, children: 1 },
                amenities: ["Free Wi-Fi", "TV", "Air Conditioning"],
                images: ["https://via.placeholder.com/800x600?text=Hotel+Room"], // Placeholder image
                isAvailable: true
            });
            console.log("? Created default room for hotel.");
        } else {
            console.log("? Room already exists, skipping creation.");
        }

        console.log("? Import completed successfully!");
        process.exit(0);

    } catch (error) {
        console.error("? Error:", error);
        process.exit(1);
    }
};

const hotelId = process.argv[2] || '1105156'; // Default to the one in curl
importHotel(hotelId);
