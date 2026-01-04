import mongoose from 'mongoose';
import 'dotenv/config';
import Hotel from './models/Hotel.js';
import Room from './models/Room.js';
import User from './models/User.js';
import Role from './models/Role.js';

const seedData = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
        console.log('Connected to DB');

        // 1. Get a user to be the owner
        const ownerEmail = "temp_email@example.com"; 
        let owner = await User.findOne({ email: ownerEmail });

        if (!owner) {
            owner = await User.findOne({});
            if (!owner) {
                console.log("No users found. Please register a user first.");
                process.exit(1);
            }
        }
        
        console.log(`Assigning hotels to owner: ${owner.username}`);

        const hotelOwnerRole = await Role.findOne({ name: "hotelOwner" });
        if (hotelOwnerRole && !owner.roles.includes(hotelOwnerRole._id)) {
            owner.roles.push(hotelOwnerRole._id);
            await owner.save();
        }

        // 2. Define Hotels with unique images
        const baseHotelsData = [
            {
                name: "Grand Istanbul Hotel",
                slug: "grand-istanbul-hotel",
                address: { line: "Istiklal Cad. No: 123", city: "Istanbul", country: "Turkey" },
                phone: "+90 212 555 0001",
                starRating: 5,
                description: "Experience luxury in the heart of Istanbul with Bosphorus views.",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
                roomImages: [
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop", // Deluxe
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop"  // Suite
                ]
            },
            {
                name: "Cappadocia Cave Resort",
                slug: "cappadocia-cave-resort",
                address: { line: "Goreme Mah.", city: "Nevsehir", country: "Turkey" },
                phone: "+90 384 555 0002",
                starRating: 4,
                description: "Authentic cave rooms with modern amenities and balloon views.",
                image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1000&auto=format&fit=crop",
                roomImages: [
                    "https://images.unsplash.com/photo-1609948053968-279202552a23?q=80&w=1000&auto=format&fit=crop", // Stone Room
                    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop"  // Cave Suite
                ]
            },
            {
                name: "Antalya Beach Resort",
                slug: "antalya-beach-resort",
                address: { line: "Lara Beach", city: "Antalya", country: "Turkey" },
                phone: "+90 242 555 0003",
                starRating: 5,
                description: "All-inclusive paradise right on the Mediterranean coast.",
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop",
                roomImages: [
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000&auto=format&fit=crop", // Sea View
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop"  // Pool Villa
                ]
            },
            {
                name: "Bodrum Luxury Villas",
                slug: "bodrum-luxury-villas",
                address: { line: "Yalikavak Marina", city: "Mugla", country: "Turkey" },
                phone: "+90 252 555 0004",
                starRating: 5,
                description: "Exclusive white villas with private pools and stunning sunsets.",
                image: "https://images.unsplash.com/photo-1512918760532-3ed64bc8066e?q=80&w=1000&auto=format&fit=crop",
                roomImages: [
                    "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1000&auto=format&fit=crop", // Villa Room
                    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop"  // Master Suite
                ]
            },
            {
                name: "Rize Mountain Bungalow",
                slug: "rize-mountain-bungalow",
                address: { line: "Ayder Yaylasi", city: "Rize", country: "Turkey" },
                phone: "+90 464 555 0005",
                starRating: 3,
                description: "Cozy wooden bungalows surrounded by nature and fresh air.",
                image: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?q=80&w=1000&auto=format&fit=crop",
                roomImages: [
                    "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1000&auto=format&fit=crop", // Cabin
                    "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000&auto=format&fit=crop"  // Family Cabin
                ]
            },
            {
                name: "Izmir City Center",
                slug: "izmir-city-center",
                address: { line: "Alsancak Kordon", city: "Izmir", country: "Turkey" },
                phone: "+90 232 555 0006",
                starRating: 4,
                description: "Modern comfort steps away from the famous Kordon promenade.",
                image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=1000&auto=format&fit=crop",
                roomImages: [
                    "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1000&auto=format&fit=crop", // Standard
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop"  // Executive
                ]
            }
        ];

        // Generate more hotels by duplicating and modifying base data
        const hotelsData = [];
        const multipliers = ["North", "South", "East", "West", "Central", "Royal", "Elite", "Grand"];
        
        // Add original 6
        hotelsData.push(...baseHotelsData);

        // Generate 24 more hotels (Total 30)
        for (let i = 0; i < 24; i++) {
            const baseHotel = baseHotelsData[i % baseHotelsData.length];
            const suffix = multipliers[i % multipliers.length];
            const variation = Math.floor(i / baseHotelsData.length) + 1;
            
            hotelsData.push({
                ...baseHotel,
                name: `${baseHotel.name} ${suffix} ${variation}`,
                slug: `${baseHotel.slug}-${suffix.toLowerCase()}-${variation}`,
                address: { ...baseHotel.address, line: `${baseHotel.address.line} No:${100 + i}` },
                phone: baseHotel.phone.slice(0, -2) + (10 + i),
                starRating: Math.max(3, Math.min(5, baseHotel.starRating + (Math.random() > 0.5 ? 1 : -1))),
                description: `${baseHotel.description} (Branch ${variation})`
            });
        }

        // Clear existing data
        await Hotel.deleteMany({});
        await Room.deleteMany({});
        console.log("Cleared existing hotels and rooms.");

        // Create Hotels and Rooms
        for (const hData of hotelsData) {
            const hotel = await Hotel.create({
                name: hData.name,
                slug: hData.slug,
                owner: owner._id,
                address: hData.address,
                phone: hData.phone,
                starRating: hData.starRating,
                isApproved: true,
                description: hData.description,
                image: hData.image
            });

            // Create 2 rooms for each hotel
            await Room.create({
                hotel: hotel._id,
                roomType: "Standard Room",
                pricePerNight: 100 + Math.floor(Math.random() * 100),
                capacity: { adults: 2, children: 0 },
                amenities: ["WiFi", "TV", "Air Conditioning"],
                isAvailable: true,
                description: "Comfortable room for a relaxing stay.",
                images: [hData.roomImages[0]]
            });

            await Room.create({
                hotel: hotel._id,
                roomType: "Premium Suite",
                pricePerNight: 250 + Math.floor(Math.random() * 200),
                capacity: { adults: 3, children: 1 },
                amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar", "View"],
                isAvailable: true,
                description: "Spacious suite with premium amenities.",
                images: [hData.roomImages[1]]
            });
        }

        console.log(`${hotelsData.length} hotels and ${hotelsData.length * 2} rooms created successfully!`);
        process.exit();

    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedData();
