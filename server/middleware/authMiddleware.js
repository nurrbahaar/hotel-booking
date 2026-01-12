import User from "../models/User.js";
import crypto from 'crypto';

const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET || 'default_secret_key_change_me';
    
    // Split by the last dot to handle IDs that might contain dots (like emails)
    const lastDotIndex = token.lastIndexOf('.');
    if (lastDotIndex === -1) return null;

    const userId = token.substring(0, lastDotIndex);
    const signature = token.substring(lastDotIndex + 1);

    if (!userId || !signature) return null;
    
    const expectedSignature = crypto.createHmac('sha256', secret).update(userId).digest('hex');
    if (signature === expectedSignature) return userId;
    return null;
}

export const protect = async (req, res, next) => {
    try {
        let userId = req.auth?.userId;

        // Check for custom token if Clerk auth failed or not present
        if (!userId) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.split(' ')[1];
                userId = verifyToken(token);
            }
        }

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
        // Fix for controllers expecting req.auth.userId
        // Forcefully set req.auth.userId if it's missing, using the manually authenticated user's ID
        if (!req.auth || !req.auth.userId) {
            req.auth = { ...req.auth, userId: user._id.toString() };
        }
        
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