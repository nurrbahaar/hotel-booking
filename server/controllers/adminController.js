import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        const totalHotels = await Hotel.countDocuments({});
        const totalBookings = await Booking.countDocuments({});
        
        // Pending hotels count
        const pendingHotels = await Hotel.countDocuments({ isApproved: false });

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalHotels,
                totalBookings,
                pendingHotels
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
