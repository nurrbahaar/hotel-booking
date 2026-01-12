// Kullanýcý Sil (Admin)
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.json({ success: false, message: 'Kullanýcý bulunamadý' });
        }
        res.json({ success: true, message: 'Kullanýcý baþarýyla silindi' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
import User from "../models/User.js";
import Role from "../models/Role.js";

// Sync user data from frontend (for localhost/dev where webhooks fail)
export const syncUser = async (req, res) => {
    try {
        const { username, image, email } = req.body;
        const userId = req.user._id;

        const updateData = {};
        if (username) updateData.username = username;
        if (image) updateData.image = image;
        if (email) updateData.email = email;

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// get /api/user

export const getUserData = async (req, res) => {
    try {
        let roles = req.user.roles || [];
        
        // Backward compatibility: If no roles found but legacy role exists
        if (roles.length === 0 && req.user.role) {
             roles = [{ name: req.user.role }];
        }

        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({ success: true, roles, recentSearchedCities }) 

    }
    catch (error) {

        res.json({ success: false, message: error.message })
    }
}

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).populate('roles');
        res.json({ success: true, users });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// store user recent searched cities
export const storeRecentSearchedCities = async (req, res) => {
    try {
        const { recentSearchedCities } = req.body;
        const user = await req.user;

        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCities);
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCities);
        }

        await user.save();
        res.json({ success: true, message: "city added" })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Temporary: Make me admin
export const makeMeAdmin = async (req, res) => {
    try {
        const user = await req.user;
        let adminRole = await Role.findOne({ name: "admin" });
        
        if (!adminRole) {
            adminRole = await Role.create({ name: "admin", description: "Administrator" });
        }

        if (!user.roles.includes(adminRole._id)) {
            user.roles.push(adminRole._id);
            await user.save();
        }

        res.json({ success: true, message: "You are now an admin!" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}