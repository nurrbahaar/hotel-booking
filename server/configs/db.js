import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("? Database Connected"));
        mongoose.connection.on('error', (err) => console.log("? DB Error: " + err));
        
        // strictQuery ayarý (Mongoose 7+ için önerilir)
        mongoose.set('strictQuery', false);

        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
    } catch (error) {
        console.log("Database connection failed: " + error.message);
        process.exit(1); // Baðlantý yoksa uygulamayý durdur
    }
}

export default connectDb;