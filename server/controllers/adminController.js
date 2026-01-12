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

        // Monthly User and Hotel Registrations (Last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5); // include this month
        sixMonthsAgo.setDate(1);

        // Helper to get month key
        const getMonthKey = (date) => `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}`;

        // Get user registrations
        const userRegs = await User.aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            { $group: {
                _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                count: { $sum: 1 }
            } },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Get hotel registrations
        const hotelRegs = await Hotel.aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            { $group: {
                _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                count: { $sum: 1 }
            } },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Build chart data for last 6 months
        const chartData = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = getMonthKey(d);
            const monthName = d.toLocaleString('default', { month: 'short' });
            const userReg = userRegs.find(x => x._id.year === d.getFullYear() && x._id.month === d.getMonth()+1);
            const hotelReg = hotelRegs.find(x => x._id.year === d.getFullYear() && x._id.month === d.getMonth()+1);
            chartData.push({
                name: monthName,
                users: userReg ? userReg.count : 0,
                hotels: hotelReg ? hotelReg.count : 0
            });
        }

        // Get recent users (last 5)
        const recentUsers = await User.find({}).sort({ createdAt: -1 }).limit(5).select('username email image createdAt');
        // Get recent hotels (last 5)
        const recentHotels = await Hotel.find({}).sort({ createdAt: -1 }).limit(5).select('name address.city owner createdAt');
        // Get pending hotels (with owner info)
        const pendingHotelsList = await Hotel.find({ isApproved: false, status: { $ne: 'rejected' } })
            .populate('owner', 'username email')
            .select('name address.city owner createdAt');

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalHotels,
                totalBookings,
                pendingHotels,
                chartData,
                recentUsers,
                recentHotels,
                pendingHotelsList
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
