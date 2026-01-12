import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: String, ref: "User", required: true },
    hotel: { type: String, ref: "Hotel", required: true },
    
    // Booking Items (ERD: booking_items - simplified to single room for now)
    room: { type: String, ref: "Room", required: true },
    
    // Dates
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    
    // Financials
    totalPrice: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    
    // Details
    guests: { type: Number, required: true }, // Total guests
    guestDetails: { // Breakdown
        adults: { type: Number },
        children: { type: Number }
    },

    // Status (ERD: bookings.status)
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed', 'refunded'],
        default: 'pending',
    },

    // Payment (ERD: payments table linked)
    paymentMethod: {
        type: String,
        required: true,
        default: "pay at hotel",
    },
    paymentStatus: { // ERD: payments.status
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    isPaid: { type: Boolean, default: false }, // Legacy helper

    // Approval (ERD: booking_approvals)
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    approvedBy: { type: String, ref: 'User' },
    approvedAt: { type: Date }

}, { timestamps: true });

// Performans için indexler
bookingSchema.index({ room: 1 });
bookingSchema.index({ checkInDate: 1 });
bookingSchema.index({ checkOutDate: 1 });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;