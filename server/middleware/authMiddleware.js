import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.json({ success: false, message: "Not authorized" })
        }

        let user = await User.findById(userId);

        if (!user) {
            try {
                // Kullanıcı yoksa oluştur (Geçici çözüm)
                user = await User.create({
                    _id: userId,
                    email: "temp_email@example.com",
                    username: "New User",
                    image: "https://via.placeholder.com/150"
                });
            } catch (createError) {
                // Eğer oluştururken duplicate key hatası alırsak (kullanıcı zaten varsa), tekrar bulmayı dene
                if (createError.code === 11000) {
                    user = await User.findById(userId);
                } else {
                    throw createError;
                }
            }
        }

        req.user = user;
        next();
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}