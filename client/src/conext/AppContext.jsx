import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency = 'TL';
    const navigate = useNavigate();
    const { user, isLoaded } = useUser();
    const { getToken: getClerkToken } = useAuth()

    const getToken = async () => {
        let token = await getClerkToken();
        if (!token) {
            token = localStorage.getItem('adminToken') || localStorage.getItem('ownerToken');
        }
        return token;
    }

    const [isOwner, setIsOwner] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/rooms');
            if (data?.success) {
                setRooms(data.rooms);
                console.log("Fetched rooms:", data.rooms);
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    const fetchUser = async (retryCount = 0) => {
        try {
            let token = await getToken();
            
            // If no Clerk token, check for manual tokens
            if (!token) {
                token = localStorage.getItem('adminToken') || localStorage.getItem('ownerToken');
            }

            if (!token) {
                setUserDataLoaded(true);
                return;
            }

            const { data } = await axios.get('/api/users', { headers: { Authorization: `Bearer ${token}` } });
            if (data?.success) {
                // Handle new roles array structure
                const roles = data.roles || [];
                setIsOwner(roles.some(r => r.name === 'hotelOwner'));
                setIsAdmin(roles.some(r => r.name === 'admin'));
                
                setSearchedCities(data.recentSearchedCities);
                setUserDataLoaded(true);
            }
            else {
                if (retryCount < 3) {
                    setTimeout(() => {
                        fetchUser(retryCount + 1);
                    }, 2000)
                } else {
                    toast.error("Failed to load user data: " + data.message);
                    setUserDataLoaded(true);
                }
            }
        } catch (error) {
            toast.error(error.message)
            setUserDataLoaded(true);
        }

    }


    const syncUserData = async () => {
        if (!user) return;
        try {
            const token = await getToken();
            if (token) {
                 await axios.post('/api/users/sync', {
                    username: user.fullName || user.firstName || "User",
                    image: user.imageUrl,
                    email: user.primaryEmailAddress?.emailAddress
                }, { headers: { Authorization: `Bearer ${token}` } });
            }
        } catch (e) {
            console.error("User sync failed:", e);
        }
    }

    useEffect(() => {
        if (isLoaded) {
            const manualToken = localStorage.getItem('adminToken') || localStorage.getItem('ownerToken');
            if (user || manualToken) {
                fetchUser();
                if (user) syncUserData();
            } else {
                // User is not logged in, so data is "loaded" (as empty)
                setUserDataLoaded(true);
            }
        }
    }, [user, isLoaded])

    useEffect(() => {
        fetchRooms();
    }, [])

    const value = {
        currency, isAdmin, setIsAdmin, userDataLoaded, setUserDataLoaded,
        navigate,
        user, isLoaded, getToken, isOwner, setIsOwner, axios, showHotelReg, setShowHotelReg,
        searchedCities, setSearchedCities, rooms, setRooms, loading
    }


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);

