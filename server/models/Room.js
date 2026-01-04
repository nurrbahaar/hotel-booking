import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    
    // Basic Info (ERD: room_types)
    roomType: { type: String, required: true }, // ERD: name
    description: { type: String }, // ERD: description
    
    // Pricing (ERD: base_price)
    pricePerNight: { type: Number, required: true }, // Reverted to pricePerNight for frontend compatibility
    currency: { type: String, default: 'USD' }, // ERD: currency
    ratePlans: [{
        name: { type: String, required: true }, // e.g., "Standard", "Non-Refundable"
        price: { type: Number, required: true },
        cancellationPolicy: { type: String },
        mealsIncluded: { type: Boolean, default: false }
    }],

    // Capacity (ERD: capacity_adults, capacity_children)
    capacity: {
        adults: { type: Number, default: 2 },
        children: { type: Number, default: 0 }
    },

    // Features
    amenities: { type: [String], required: true },
    images: [{ type: String }],
    
    // Availability & Status
    isAvailable: { type: Boolean, default: true }, // ERD: is_active
    isActive: { type: Boolean, default: true },

}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);
export default Room;
