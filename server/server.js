import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDb from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import { clerkMiddleware } from '@clerk/express'
import "./models/Role.js"; // Register Role model
import "./models/User.js"; // Register User model
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Uygulama Ayarlarý
const app = express()
const PORT = process.env.PORT || 4000;

// Veritabaný ve Servis Baðlantýlarý
connectDb()
connectCloudinary();

// Middlewares
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

// Rotalar (Routes)
app.get('/', (req, res) => res.send("API Working"))
app.use("/api/clerk", clerkWebhooks);
app.use('/api/users', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));