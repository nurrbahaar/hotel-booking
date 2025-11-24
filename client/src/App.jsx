import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route, useLocation } from "react-router-dom";
import Hero from "./components/hero";
import Home from "./pages/Home";
import Footer from './components/Footer.jsx';
import AllRooms from './pages/AllRooms.jsx';
import RoomDetails from './pages/RoomDetails.jsx';
import MyBookings from './pages/MyBookings.jsx';
import HotelReg from './components/HotelReg.jsx';
import Layout from './pages/hotelOwner/layout.jsx'
import Dashboard from './pages/hotelOwner/Dashboard.jsx'
import AddRoom from './pages/hotelOwner/AddRoom.jsx'
import ListRoom from './pages/hotelOwner/ListRoom.jsx'

const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes('owner');

  return (
    <div>
      {!isOwnerPath && <Navbar />}

      <div className='min-h-[70vh]'>
        <Routes location={location}>
          <Route path='/' element={<Home />} />
          <Route path='/Odalar' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />

          {/* Owner routes - nested */}
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>
        </Routes>
        {/* Other components and routes would go here */}
      </div>
      <Footer />
    </div>
  )
}

export default App
