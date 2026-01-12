import mongoose from 'mongoose';
import Hotel from './models/Hotel.js';
import Room from './models/Room.js'; // Room modelini ekledik
import User from './models/User.js';
import 'dotenv/config'; 

// Veritabaný Baðlantýsý
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('? MongoDB Baðlantýsý Baþarýlý');
    } catch (error) {
        console.error('? MongoDB Baðlantý Hatasý:', error);
        process.exit(1);
    }
};

// 1. KULLANICI VERÝSÝ ÇEKME (Ücretsiz - RandomUser.me)
async function fetchUsers(count = 5) {
    try {
        console.log(`${count} adet kullanýcý verisi çekiliyor...`);
        const response = await fetch(`https://randomuser.me/api/?results=${count}`);
        const data = await response.json();
        
        const users = data.results.map(user => ({
            username: user.login.username,
            email: user.email,
            image: user.picture.large,
            role: 'user',
            recentSearchedCities: [user.location.city]
        }));

        // Veritabanýna Kaydetme
        for (const userData of users) {
            await User.findOneAndUpdate(
                { email: userData.email },
                { ...userData, _id: userData.email }, 
                { upsert: true, new: true }
            );
        }

        console.log(`? ${users.length} kullanýcý veritabanýna kaydedildi/güncellendi.`);
        return users;
    } catch (error) {
        console.error("? Kullanýcý hatasý:", error.message);
        return [];
    }
}

// 2. OTEL VE ODA VERÝSÝ ÇEKME (RapidAPI - Booking.com)
async function fetchHotels() {
    const apiKey = process.env.RAPID_API_KEY || 'daa199f7b6msh371358a0242b3e0p1e1efcjsnfab068050012'; 
    
    const url = 'https://booking-com.p.rapidapi.com/v1/hotels/search?dest_id=-755070&search_type=CITY&arrival_date=2024-09-01&departure_date=2024-09-02&adults_number=2&room_qty=1&units=metric&temperature=celsius&languagecode=en-us&currency_code=USD';
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };

    try {
        console.log(`Otel verileri çekiliyor...`);
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`API Hatasý: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        
        const hotels = result.result.map(hotel => ({
            externalId: hotel.hotel_id.toString(),
            name: hotel.hotel_name,
            slug: hotel.hotel_name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            description: "Booking.com'dan çekilen otel verisi. Ýstanbul'un kalbinde harika bir konaklama deneyimi.",
            owner: "admin_user_id", 
            address: {
                line: hotel.address,
                city: hotel.city,
                country: hotel.country_trans,
                latitude: hotel.latitude,
                longitude: hotel.longitude
            },
            starRating: hotel.class,
            image: hotel.main_photo_url, // Bu alan Hotel modelinizde yoksa eklenmeli veya kullanýlmamalý
            // Hotel modelinizde 'image' alaný yoksa, bunu Room'a ekleyeceðiz veya Hotel þemasýna eklemelisiniz.
            // Þimdilik Hotel þemasýnda 'image' alaný olmadýðýný varsayarak Room'a ekliyorum.
            price: hotel.price_breakdown?.gross_price?.value,
            currency: hotel.price_breakdown?.gross_price?.currency,
            isApproved: true, // ÖNEMLÝ: Otelin görünmesi için onaylý olmasý lazým
            status: 'active'
        }));

        const owner = await User.findOne({ role: 'admin' }) || await User.findOne();
        const ownerId = owner ? owner._id : 'temp_owner_id';

        let createdRoomsCount = 0;

        for (const hotelData of hotels) {
            hotelData.owner = ownerId;
            
            // 1. Oteli Kaydet
            const savedHotel = await Hotel.findOneAndUpdate(
                { externalId: hotelData.externalId },
                hotelData,
                { upsert: true, new: true }
            );

            // 2. Bu otel için Oda (Room) Oluþtur
            // Eðer bu otel için daha önce oda oluþturulmadýysa oluþtur
            const existingRoom = await Room.findOne({ hotel: savedHotel._id });
            
            if (!existingRoom) {
                const roomData = {
                    hotel: savedHotel._id,
                    roomType: "Standard Double Room",
                    description: `Comfortable room at ${savedHotel.name} with city view.`,
                    pricePerNight: hotelData.price || 100,
                    currency: hotelData.currency || 'USD',
                    capacity: {
                        adults: 2,
                        children: 1
                    },
                    amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Bar"],
                    images: [hotelData.image], // Otel resmini oda resmi olarak kullanýyoruz
                    isAvailable: true,
                    isActive: true
                };

                await Room.create(roomData);
                createdRoomsCount++;
            }
        }

        console.log(`? ${hotels.length} otel iþlendi.`);
        console.log(`? ${createdRoomsCount} yeni oda oluþturuldu.`);
        return hotels;
    } catch (error) {
        console.error("? Otel hatasý:", error.message);
        return [];
    }
}

// Scripti çalýþtýran ana fonksiyon
(async () => {
    console.log("--- VERÝ ÇEKME VE KAYDETME ÝÞLEMÝ BAÞLADI ---\n");
    
    await connectDB();

    // 1. Kullanýcýlarý Çek ve Kaydet
    await fetchUsers(3);

    // 2. Otelleri ve Odalarý Çek ve Kaydet
    await fetchHotels();
    
    console.log("\n--- ÝÞLEM TAMAMLANDI ---");
    process.exit(0);
})();
