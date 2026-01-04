import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import transporter from "../configs/nodemailer.js";

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        });
        return bookings.length === 0;
    } catch (error) {
        console.error("Availability Check Error:", error.message);
        return false;
    }
}

export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvailable });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not available for the selected dates" });
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // Veritabanýndan odayý ve oteli çekiyoruz
        const roomData = await Room.findById(room).populate('hotel');
        if (!roomData) {
            return res.json({ success: false, message: "Room not found" });
        }

        // Fiyat hesaplama (pricePerNight kullandýk)
        const price = roomData.pricePerNight;
        const totalPrice = price * nights;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            totalPrice,
            status: 'pending',
            paymentStatus: 'pending'
        });

        // E-posta gönderimi
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: "Hotel Booking Details",
            html: `
                <h2>Your booking details</h2>
                <p>Dear ${req.user.username},</p>
                <ul>
                    <li><strong>Booking ID:</strong> ${booking._id}</li>
                    <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                    <li><strong>City:</strong> ${roomData.hotel.city || 'Belirtilmedi'}</li>
                    <li><strong>Check-in Date:</strong> ${checkIn.toDateString()}</li>
                    <li><strong>Total Amount:</strong> ${process.env.CURRENCY || '$'} ${booking.totalPrice}</li>
                </ul> 
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Booking created successfully", booking });

    } catch (error) {
        console.error("Booking Error:", error);
        res.json({ success: false, message: error.message });
    }
}

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings" });
    }
}

export const getHotelBookings = async (req, res) => {
    try {
        // Clerk veya Auth sistemine göre owner ID kontrolü
        const hotel = await Hotel.findOne({ owner: req.auth?.userId || req.user?._id });
        if (!hotel) {
            return res.json({ success: false, message: "No hotel found for this owner" });
        }

        const bookings = await Booking.find({ hotel: hotel._id }).populate("room hotel user").sort({ createdAt: -1 });
        const totalBooking = bookings.length;
        const totalRevenue = bookings.reduce((acc, booking) => acc + (booking.totalPrice || 0), 0);

        res.json({ success: true, DashboardData: { bookings, totalBooking, totalRevenue } });
    } catch (error) {
        console.error("Dashboard Error:", error);
        res.json({ success: false, message: "Failed to fetch bookings" });
    }
}