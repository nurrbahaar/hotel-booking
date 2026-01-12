import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route, useLocation } from "react-router-dom";
import Hero from "./components/Hero"; 
import Home from "./pages/Home";
import Footer from './components/Footer.jsx';
import AllRooms from './pages/AllRooms.jsx';
import RoomDetails from './pages/RoomDetails.jsx';
import Payment from './pages/Payment.jsx';
import MyBookings from './pages/MyBookings.jsx';
import Testimonials from './pages/Testimonials.jsx';
import HotelReg from './components/HotelReg.jsx';
import Layout from './pages/hotelOwner/Layout.jsx' // Düzeltildi: layout.jsx -> Layout.jsx
import Dashboard from './pages/hotelOwner/Dashboard.jsx'
import Reservations from './pages/hotelOwner/Reservations.jsx'
import AddRoom from './pages/hotelOwner/AddRoom.jsx'
import ListRoom from './pages/hotelOwner/ListRoom.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import PendingHotels from './pages/admin/PendingHotels.jsx'
import AllHotels from './pages/admin/AllHotels.jsx'
import UserList from './pages/admin/UserList.jsx'
import OwnerLogin from './pages/hotelOwner/OwnerLogin.jsx'
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './conext/AppContext';

const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes('owner');
  const isAdminPath = location.pathname.includes('admin');
  const { showHotelReg } = useAppContext();

  return (
    <div>
      <Toaster />
      {!isOwnerPath && !isAdminPath && <Navbar />}

      {showHotelReg && <HotelReg />}

      <div className='min-h-[70vh]'>
        <Routes location={location}>
          <Route path='/' element={<Home />} />
          <Route path='/Odalar' element={<AllRooms />} />
          <Route path='/deneyim' element={<Testimonials />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/owner/login' element={<OwnerLogin />} />

          {/* Owner routes - nested */}
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='reservations' element={<Reservations />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>

          {/* Admin routes - nested */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='pending-hotels' element={<PendingHotels />} />
            <Route path='all-hotels' element={<AllHotels />} />
            <Route path='users' element={<UserList />} />
          </Route>
        </Routes>
        {/* Other components and routes would go here */}
      </div>
      {!isAdminPath && !isOwnerPath && <Footer />}
    </div>
  )
}

export default App
