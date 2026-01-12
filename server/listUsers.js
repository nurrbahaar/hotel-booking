
import mongoose from 'mongoose';
import User from './models/User.js';
import connectDB from './configs/db.js';
import dotenv from 'dotenv';

dotenv.config();

const listUsers = async () => {
    await connectDB();
    const users = await User.find({});
    console.log(users);
    process.exit();
};

listUsers();
