import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";
import fs from 'fs';


export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities, capacityAdults, capacityChildren, description } = req.body;
        const hotel = await Hotel.findOne({ owner: req.auth.userId })

        if (!hotel) return res.json({ success: false, message: "No hotel found for this owner" })

        const images = await Promise.all(req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            // Delete local file after upload
            fs.unlinkSync(file.path);
            return response.secure_url;
        }));

        await Room.create({
            hotel: hotel._id,
            roomType,
            description,
            pricePerNight: +pricePerNight, // Reverted to pricePerNight
            capacity: {
                adults: capacityAdults ? +capacityAdults : 2,
                children: capacityChildren ? +capacityChildren : 0
            },
            amenities: JSON.parse(amenities),
            images,
        })
        res.json({ success: true, message: "Room created successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });


    }
}


export const getRoom = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true }).populate({
            path: "hotel",
            match: { isApproved: true }, // Only populate if hotel is approved
            populate: {
                path: "owner",
                select: 'image'
            }
        }).sort({ createdAt: -1 });

        // Filter out rooms where hotel is null (because it wasn't approved)
        const approvedRooms = rooms.filter(room => room.hotel !== null);

        res.json({ success: true, rooms: approvedRooms });


    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData = await Hotel.findOne({ owner: req.auth.userId })
        
        if (!hotelData) {
            return res.json({ success: true, rooms: [] });
        }

        const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel");
        res.json({ success: true, rooms });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}


export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({ success: true, message: "Room availability updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}