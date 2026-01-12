import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import Hotel from './models/Hotel.js';
import Room from './models/Room.js';
import User from './models/User.js';
import Review from './models/Review.js';

dotenv.config();

// Testimonials Dummy Data from client assets
const dummyTestimonials = [
    { name: "Ay\u015Fe Y\u0131lmaz", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "Daha \u00F6nce bir\u00E7ok rezervasyon sitesi kulland\u0131m ama hi\u00E7biri Roomy'nin sundu\u011Fu ki\u015Fiselle\u015Ftirilmi\u015F deneyim ve detaylara g\u00F6sterilen \u00F6zenle k\u0131yaslanamaz." },
    { name: "Mehmet Demir", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "Roomy beklentilerimi a\u015Ft\u0131. Rezervasyon s\u00FCreci sorunsuzdu ve oteller kesinlikle birinci s\u0131n\u0131ft\u0131. \u015Eiddetle tavsiye ederim!" },
    { name: "Zeynep Kaya", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Harika hizmet! En iyi l\u00FCks konaklama yerlerini her zaman Roomy arac\u0131l\u0131\u011F\u0131yla buluyorum. \u00D6nerileri asla hayal k\u0131r\u0131kl\u0131\u011F\u0131na u\u011Fratm\u0131yor!" },
    { name: "Can \u00D6zt\u00FCrk", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200", rating: 5, review: "M\u00FC\u015Fteri deste\u011Fi ola\u011Fan\u00FCst\u00FC. Son dakikada rezervasyonumu de\u011Fi\u015Ftirmeme hi\u00E7 zorluk \u00E7\u0131karmadan yard\u0131mc\u0131 oldular. Ger\u00E7ekten 5 y\u0131ld\u0131zl\u0131 bir deneyim." },
    { name: "Elif \u015Eahin", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200", rating: 4, review: "Bu platform sayesinde Kapadokya'da gizli bir cennet buldum. Foto\u011Fraflar do\u011Fruydu ve fiyat rakipsizdi. Kesinlikle tekrar kullanaca\u011F\u0131m." },
    { name: "Burak \u00C7elik", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200", rating: 5, review: "Kullan\u0131c\u0131 aray\u00FCz\u00FC \u00E7ok temiz ve kullan\u0131m\u0131 kolay. T\u00FCm balay\u0131 seyahatimi buradan ayarlad\u0131m ve her \u015Fey m\u00FCkemmel bir \u015Fekilde ilerledi." }
];

const turkishCities = [
    "\u0130stanbul", "Ankara", "\u0130zmir", "Antalya", "Bursa", "Adana", "Konya", "Gaziantep", "Mersin", "Diyarbak\u0131r",
    "Kayseri", "Eski\u015Fehir", "Trabzon", "Samsun", "Denizli", "\u015Eanl\u0131urfa", "Malatya", "Kahramanmara\u015F", "Erzurum", "Van",
    "Batman", "Elaz\u0131\u011F", "Sivas", "Manisa", "Bal\u0131kesir", "Kocaeli", "Hatay", "Mu\u011Fla", "Tekirda\u011F", "Ayd\u0131n",
    "\u00C7anakkale", "Sakarya", "Afyonkarahisar", "Isparta", "K\u00FCtahya", "\u00C7orum", "Ordu", "Giresun", "Tokat", "Zonguldak",
    "Ad\u0131yaman", "Osmaniye", "K\u0131r\u0131kkale", "D\u00FCzce", "U\u015Fak", "Yozgat", "Mu\u015F", "Bing\u00F6l", "Mardin", "Siirt",
    "Bolu", "Nev\u015Fehir", "Kars", "Rize", "Amasya", "Sinop", "Bart\u0131n", "Yalova", "Karab\u00FCk", "Kilis",
    "I\u011Fd\u0131r", "Ardahan", "Artvin", "G\u00FCm\u00FC\u015Fhane", "Bayburt", "Tunceli", "Hakkari", "\u015E\u0131rnak", "A\u011Fr\u0131", "Bitlis",
    "Bilecik", "Burdur", "\u00C7ank\u0131r\u0131", "Edirne", "K\u0131rklareli", "K\u0131r\u015Fehir", "Ni\u011Fde", "Aksaray", "Karaman"
];

const hotelNames = [
    "Grand", "Royal", "Elite", "Luxury", "Comfort", "City", "Plaza", "Resort", "Boutique", "Palace",
    "Star", "Golden", "Silver", "Diamond", "Pearl", "Crystal", "Blue", "Green", "White", "Red",
    "Anadolu", "Ege", "Akdeniz", "Marmara", "Karadeniz", "Toros", "Zirve", "Lale", "\u00C7\u0131nar", "Y\u0131ld\u0131z"
];

const hotelSuffixes = [
    "Hotel", "Suites", "Resort & Spa", "Lodge", "Inn", "Residences", "Villas", "Konaklar\u0131", "Palas", "Termal Otel"
];

const amenitiesList = [
    "\u00DCcretsiz Wi-Fi", "Y\u00FCzme Havuzu", "Spa", "Spor Salonu", "Restoran", "Bar", "Otopark", "Oda Servisi",
    "Klima", "Kahvalt\u0131 Dahil", "Havaalan\u0131 Servisi", "Evcil Hayvan Dostu", "7/24 Resepsiyon"
];

const roomTypes = [
    { name: "Standart Oda", price: 1500, capacity: { adults: 2, children: 1 } },
    { name: "Deluxe Oda", price: 2500, capacity: { adults: 2, children: 2 } },
    { name: "Premium Oda", price: 3250, capacity: { adults: 3, children: 1 } },
    { name: "Suit", price: 4000, capacity: { adults: 4, children: 2 } },
    { name: "Aile Odas\u0131", price: 3500, capacity: { adults: 4, children: 3 } },
    { name: "Kral Dairesi", price: 10000, capacity: { adults: 6, children: 2 } }
];

// Real Hotel/Room Images from Unsplash
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
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomSubset = (arr, size) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
};

const generateHotels = async () => {
    try {
        console.log("Starting seedData script...");
        // Connect to the correct database
        const uri = process.env.MONGODB_URI || "mongodb+srv://bahar:bahar123@cluster0.ltgauaq.mongodb.net";
        await mongoose.connect(`${uri}/hotel-booking`);
        console.log("Connected to DB");

        // Generate Users (Owners and Regular Users)
        console.log("Generating users...");
        
        const firstNames = ["Ahmet", "Mehmet", "Ayse", "Fatma", "Mustafa", "Zeynep", "Emre", "Burak", "Elif", "Can", "Murat", "Selin", "Cem", "Deniz", "Esra", "Hakan", "Yusuf", "Omer", "Eren", "Seda", "Gizem", "Merve", "Ali", "Veli", "Derya", "Hande", "Kerem", "Baris", "Asli", "Buse"];
        const lastNames = ["Yilmaz", "Kaya", "Demir", "Celik", "Sahin", "Yildiz", "Ozturk", "Aydin", "Ozdemir", "Arslan", "Dogan", "Kilic", "Koc", "Kurt", "Ozkan", "Simsek", "Polat", "Korkmaz", "Cakir", "Erdogan", "Yavuz", "Coskun", "Guler", "Ucar", "Tas"];
        
        const owners = [];
        const usersToCreate = 200; // Create 200 users for owners

        for (let i = 0; i < usersToCreate; i++) {
            const firstName = getRandomElement(firstNames);
            const lastName = getRandomElement(lastNames);
            const isOwner = true; // All created here are owners for the 1000 hotels
            
            // Use a unique string ID as defined in the schema
            const user = new User({
                _id: `seed_owner_${Date.now()}_${i}`,
                username: `${firstName} ${lastName} ${i}`,
                email: `owner${i}_${Date.now()}@example.com`,
                password: 'password123', 
                image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
                role: 'hotelOwner',
                recentSearchedCities: []
            });

            try {
                const savedUser = await user.save();
                if (i % 50 === 0) console.log(`Created User ${i}: ${savedUser.username}`);
                if (isOwner) owners.push(savedUser);
            } catch (e) {
                // Ignore duplicates
            }
        }

        // Fallback if no owners created
        if (owners.length === 0) {
             const existingOwners = await User.find({ role: 'hotelOwner' });
             owners.push(...existingOwners);
             
             if (owners.length === 0) {
                 const emergencyOwner = new User({
                    _id: `seed_owner_${Date.now()}`,
                    username: "Admin Owner",
                    email: "admin.owner@example.com",
                    image: "https://via.placeholder.com/150",
                    role: "hotelOwner",
                    recentSearchedCities: []
                 });
                 await emergencyOwner.save();
                 owners.push(emergencyOwner);
             }
        }

        console.log(`Assigning hotels to ${owners.length} different owners.`);

        const hotelsToCreate = 400; // Create 400 hotels
        const usedNames = new Set();
        
        for (let i = 0; i < hotelsToCreate; i++) {
            let city, name;
            let attempts = 0;
            
            // Try to generate a unique name
            do {
                city = getRandomElement(turkishCities);
                name = `${getRandomElement(hotelNames)} ${city} ${getRandomElement(hotelSuffixes)}`;
                attempts++;
            } while (usedNames.has(name) && attempts < 20);

            // If still duplicate after 20 tries, append a number
            if (usedNames.has(name)) {
                name = `${name} ${i + 1}`;
            }
            usedNames.add(name);

            // Ensure unique slug by appending random string or timestamp
            const slug = `${name.toLowerCase().replace(/ /g, '-').replace(/[ðüþýöç]/g, (c) => ({'ð':'g','ü':'u','þ':'s','ý':'i','ö':'o','ç':'c'})[c])}-${Date.now()}-${getRandomInt(1000, 9999)}`;
            const randomOwner = getRandomElement(owners);
            
            const hotel = new Hotel({
                name: name,
                slug: slug,
                owner: randomOwner._id,
                description: `${name}, ${city} þehrinde lüks ve konforu bir araya getiriyor. Eþsiz manzarasý ve üstün hizmet kalitesiyle unutulmaz bir konaklama deneyimi sunuyoruz.`,
                email: `info@${slug.split('-')[0]}.com`,
                phone: `+90 555 ${getRandomInt(100, 999)} ${getRandomInt(10, 99)} ${getRandomInt(10, 99)}`,
                address: {
                    line: `${getRandomInt(1, 100)}. Sokak, No: ${getRandomInt(1, 50)}`,
                    city: city,
                    country: "Türkiye",
                    latitude: 39.9334 + (Math.random() - 0.5) * 5, // Rough Turkey coords
                    longitude: 32.8597 + (Math.random() - 0.5) * 10
                },
                status: 'active',
                isApproved: true, // Auto approve for seed data
                starRating: getRandomInt(3, 5),
                policies: {
                    checkInTime: "14:00",
                    checkOutTime: "11:00"
                },
                amenities: getRandomSubset(amenitiesList, getRandomInt(3, 8))
            });

            const savedHotel = await hotel.save();
            console.log(`Created Hotel: ${savedHotel.name}`);

            // Create Rooms for this Hotel
            const numRooms = getRandomInt(3, 8);
            for (let j = 0; j < numRooms; j++) {
                const type = getRandomElement(roomTypes);
                const room = new Room({
                    hotel: savedHotel._id,
                    roomType: type.name,
                    description: `Geni\u015F ve ferah ${type.name.toLowerCase()}, muhte\u015Fem manzaras\u0131yla sizi bekliyor.`,
                    pricePerNight: type.price + getRandomInt(-200, 500),
                    capacity: type.capacity,
                    amenities: getRandomSubset(amenitiesList, getRandomInt(2, 5)),
                    images: [
                        getRandomElement(hotelRoomImages),
                        getRandomElement(hotelRoomImages),
                        getRandomElement(hotelRoomImages)
                    ],
                    isAvailable: true,
                    isActive: true
                });
                await room.save();
            }

            // Create Dummy Reviews for this Hotel
            const numReviews = getRandomInt(0, 3);
            for (let k = 0; k < numReviews; k++) {
                 // Create a dummy user for the review if you want unique users, 
                 // OR allow multiple reviews from the same 'owner' user (simplest for now, 
                 // but better to create temp users or just reuse the logic)
                 // Let's create a temporary fake user object for the review
                 // Actually, Review model expects a user ID string. 
                 // Let's create a dummy user or use the current owner.
                 // To make it look real, let's create a new user for each review (or reuse existing ones if we had them)
                 // For this seed script, I'll create a new user per review to match the profile pic and name
                
                 const testimonialData = getRandomElement(dummyTestimonials);
                 
                 // Check if a user with this name already exists to avoid dupes if running multiple times? 
                 // But this script generally clears data or adds new.
                 // Let's just create a new User for this review
                 const reviewUser = new User({
                    _id: `user_${new mongoose.Types.ObjectId()}`, // Clerk ID simulation
                    username: testimonialData.name,
                    email: `reviewer${Date.now()}${k}@example.com`,
                    image: testimonialData.image,
                    recentSearchedCities: []
                 });
                 await reviewUser.save();

                 const review = new Review({
                    user: reviewUser._id,
                    hotel: savedHotel._id,
                    rating: testimonialData.rating,
                    comment: testimonialData.review
                 });
                 await review.save();
            }
        }

        console.log("Seeding completed successfully!");
        process.exit();

    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

generateHotels();
