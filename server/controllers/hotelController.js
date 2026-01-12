// Otel Sil (Admin veya Otel Sahibi)
export const deleteHotel = async (req, res) => {
    try {
        const hotelId = req.params.id;
        const hotel = await Hotel.findByIdAndDelete(hotelId);
        if (!hotel) {
            return res.json({ success: false, message: 'Otel bulunamadý' });
        }
        res.json({ success: true, message: 'Otel baþarýyla silindi' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import Role from "../models/Role.js";

export const registerHotel = async (req, res) => {
    try {
        const { 
            name, 
            address, 
            contact, 
            city, 
            country, 
            starRating, 
            latitude, 
            longitude, 
            checkInTime, 
            checkOutTime 
        } = req.body;
        
        const owner = req.user._id;

        const hotel = await Hotel.findOne({ owner });
        if (hotel) {
            return res.json({ success: false, message: "Hotel already registered by this owner" })
        }
        
        // Map fields to new structure
        await Hotel.create({ 
            name, 
            owner,
            address: {
                line: address,
                city: city,
                country: country,
                latitude: latitude || 0,
                longitude: longitude || 0
            },
            phone: contact,
            starRating: starRating || 0,
            policies: {
                checkInTime: checkInTime || '14:00',
                checkOutTime: checkOutTime || '11:00'
            }
        });

        // Update user role to hotelOwner
        const hotelOwnerRole = await Role.findOne({ name: "hotelOwner" });
        if (hotelOwnerRole) {
            await User.findByIdAndUpdate(owner, { 
                $addToSet: { roles: hotelOwnerRole._id } 
            });
        } else {
            // Fallback: Create role if it doesn't exist
            const newRole = await Role.create({ name: "hotelOwner", description: "Hotel Owner" });
            await User.findByIdAndUpdate(owner, { 
                $addToSet: { roles: newRole._id } 
            });
        }

        res.json({ success: true, message: "Hotel registered successfully" })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get all hotels (Public - only approved)
export const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({ isApproved: true });
        res.json({ success: true, hotels });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get pending hotels (Admin only)
export const getPendingHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({ isApproved: false, status: { $ne: 'rejected' } }).populate('owner', 'name email');
        res.json({ success: true, hotels });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Approve hotel (Admin only)
export const approveHotel = async (req, res) => {
    try {
        const { hotelId } = req.body;
        const hotel = await Hotel.findByIdAndUpdate(hotelId, { isApproved: true, status: 'active' }, { new: true });
        
        if (!hotel) {
            return res.json({ success: false, message: "Hotel not found" });
        }

        // Assign hotelOwner role to the user if not already assigned
        const hotelOwnerRole = await Role.findOne({ name: "hotelOwner" });
        if (hotelOwnerRole && hotel.owner) {
            await User.findByIdAndUpdate(hotel.owner, {
                $addToSet: { roles: hotelOwnerRole._id }
            });
        }

        res.json({ success: true, message: "Hotel approved successfully", hotel });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Reject hotel (Admin only)
export const rejectHotel = async (req, res) => {
    try {
        const { hotelId } = req.body;
        const hotel = await Hotel.findByIdAndUpdate(hotelId, { status: 'rejected' }, { new: true });
        
        if (!hotel) {
            return res.json({ success: false, message: "Hotel not found" });
        }

        res.json({ success: true, message: "Hotel rejected successfully", hotel });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get all hotels (Admin only)
export const getAllHotelsAdmin = async (req, res) => {
    try {
        const hotels = await Hotel.find({}).populate('owner', 'name email');
        res.json({ success: true, hotels });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
