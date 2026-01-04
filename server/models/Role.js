import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // e.g., "admin", "hotelOwner", "user"
    permissions: [{ type: String }], // e.g., ["manage_hotels", "book_room"]
    description: { type: String }
}, { timestamps: true });

const Role = mongoose.model("Role", roleSchema);
export default Role;
