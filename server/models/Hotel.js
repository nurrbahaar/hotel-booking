import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true }, // ERD: slug
    description: { type: String }, // ERD: implied
    owner: { type: String, ref: 'User', required: true },
    
    // Contact Info (ERD: email, phone)
    email: { type: String },
    phone: { type: String },
    
    // Location (ERD: address_line, city, country, postal_code, latitude, longitude)
    address: {
        line: { type: String },
        city: { type: String },
        country: { type: String },
        postalCode: { type: String },
        latitude: { type: Number },
        longitude: { type: Number }
    },
    
    // Legacy fields for frontend compatibility
    location: { type: String }, 
    contact: { type: String }, 
    city: { type: String }, 
    
    // Status & Rating (ERD: status, star_rating)
    status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'active' },
    isApproved: { type: Boolean, default: false },
    starRating: { type: Number, min: 1, max: 5, default: 0 },
    
    // Policies (ERD: checkin_time, checkout_time)
    policies: {
        checkInTime: { type: String, default: '14:00' },
        checkOutTime: { type: String, default: '11:00' },
        cancellationPolicy: { type: String } // ERD: rate_plans.cancellation_policy (moved here for simplicity or keep in rate plans)
    },

    // Settings (ERD: hotel_settings)
    settings: {
        approvalTimeoutMinutes: { type: Number, default: 1440 }, // 24 hours
        isAutoApprove: { type: Boolean, default: false }
    },

    // Amenities (ERD: hotel_amenities)
    amenities: [{ type: String }], // Can be expanded to object with code/name

}, { timestamps: true });

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;

