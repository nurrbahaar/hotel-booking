// Script to perform a full E2E test of the backend logic
// 1. Login
// 2. Use token to access protected route (Check Owner Hotel)

import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const runTest = async () => {
    try {
        console.log("1. Attempting Login...");
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: "owner@example.com",
            password: "password123"
        });

        if (!loginRes.data.success) {
            console.error("Login Failed:", loginRes.data.message);
            return;
        }

        const token = loginRes.data.token;
        console.log("Login Success. Token received.");
        console.log("Token sample:", token.substring(0, 20) + "...");

        console.log("\n2. Checking getOwnerRooms...");
        // This endpoint uses: Hotel.findOne({ owner: req.auth.userId })
        // If this returns rooms or empty array, it means it found the hotel (or didn't fail with 'No hotel found' logic inside createRoom).
        // Wait, getOwnerRooms returns { success: true, rooms: [] } if no hotel found!
        // createRoom returns { success: false, message: "No hotel found..." } if no hotel found.

        // We can't easily test createRoom without file upload simulation, but we can infer from the behavior.
        // Let's call a custom verified endpoint or try to hit a route that forces the check.
        
        // Actually, let's just inspect the response of getOwnerRooms.
        // If logic is consistent, if I have a hotel, I should get a result (even empty rooms list), but if I DON'T have a hotel, it returns empty list too. 
        // Bad proxy.

        // Let's try to hit /api/hotels/my-hotel if it exists, or similar.
        // Let's check hotelRoutes.
        
        // BETTER: I'll modify roomController.js to log to specific file or console.
        // I already added console.logs to roomController.js.
        
    } catch (error) {
        if (error.response) {
            console.error("HTTP Error:", error.response.status, error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
};

runTest();
