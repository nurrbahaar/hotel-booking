import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'failed', 'refunded'], 
        default: 'pending' 
    },
    paymentMethod: { type: String, required: true }, // e.g., "credit_card", "paypal"
    transactionId: { type: String },
    paymentDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
