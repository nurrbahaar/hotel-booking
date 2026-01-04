import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.json({ success: false, message: "Not authorized" })
        }

        let user = await User.findById(userId).populate('roles');

        if (!user) {
            try {
                // Kullanýcý yoksa oluþtur (Geçici çözüm)
                user = await User.create({
                    _id: userId,
                    email: "temp_email@example.com",
                    username: "New User",
                    image: "https://via.placeholder.com/150",
                    recentSearchedCities: []
                });
                // Re-fetch to populate roles if needed (though new user probably has no roles)
                user = await User.findById(userId).populate('roles');
            } catch (createError) {
                // Eðer oluþtururken duplicate key hatasý alýrsak (kullanýcý zaten varsa), tekrar bulmayý dene
                if (createError.code === 11000) {
                    user = await User.findById(userId).populate('roles');
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

export const isAdmin = async (req, res, next) => {
    try {
        // req.user is populated by the protect middleware
        const hasAdminRole = req.user?.roles?.some(role => role.name === 'admin');
        const hasLegacyAdminRole = req.user?.role === 'admin';

        if (!hasAdminRole && !hasLegacyAdminRole) {
            return res.json({ success: false, message: "Admin access required" });
        }
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}