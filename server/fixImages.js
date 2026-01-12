import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';

dotenv.config();

const hotelRoomImages = [
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512918760532-3edbed1351c3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591088398332-61778f54a0c8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616594039964-40891a90c73f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609949165384-3b878e34833f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594563703937-fdc6a6c4c322?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560185007-cde436f9a4db?q=80&w=800&auto=format&fit=crop"
];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fixImages = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb+srv://bahar:bahar123@cluster0.ltgauaq.mongodb.net/hotel-booking";
        
        await mongoose.connect(uri);
        console.log("Connected to DB");

        const rooms = await Room.find({});
        console.log(`Found ${rooms.length} rooms. Updating images...`);

        for (const room of rooms) {
            room.images = [
                getRandomElement(hotelRoomImages),
                getRandomElement(hotelRoomImages),
                getRandomElement(hotelRoomImages)
            ];
            await room.save();
        }

        console.log("All rooms updated with realistic hotel images!");
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

fixImages();
