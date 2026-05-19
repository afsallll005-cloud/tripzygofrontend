import { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { Toaster } from "react-hot-toast";

// import ProtectedRoute from './Components/ProtectedRoute';

// Admin Pages
import Dashboard from './Pages/admin/Dashboard/Dashboard';
import AddHero from './Pages/admin/Addhero/Addhero';
import AddAbout from "./Pages/admin/Addabout/AddAbout";
import AddHotel from './Pages/admin/AddHotel/AddHotel';
import AddRoom from './Pages/admin/AddRoom/AddRoom';
import ViewBookings from './Pages/admin/ViewBooking/ViewBooking';
import AddPackages from './Pages/admin/AddPackages/AddPackage';
import ViewPackages from './Pages/admin/ViewPackages/ViewPackages';
import EditPackage from './Pages/admin/EditPackage/EditPackage';
import PackageHotels from './Pages/admin/PackageHotels/PackageHotels';
import ViewRooms from './Pages/admin/ViewRooms/ViewRooms';
import SupportPage from './Pages/admin/SupportPage/SupportPage';

// Client Pages
import Home from './Pages/client/Home/Home';
import Contact from './Pages/client/Contact/Contact';
import Login from './Pages/client/LoginPage/Login';
import Signup from './Pages/client/SignupPage/Signup';
import UserProfile from './Pages/client/UserProfile/UserProfile';
import ExpensCheck from './Pages/client/ExpenceCheck/ExpensCheck';
import TripPlanner from './Pages/client/TripPlanner/TripPlanner';

// Other Pages
import Packages from './Pages/Packages/Packages';
import PackageDetails from './Pages/PackageDetails/PackageDetails';
import HotelDetails from './Pages/HotelDetails/HotelDetails';
import Booking from './Pages/Booking/Booking';
import Payment from './Pages/Payment/Payment';
import PaymentStaticPage from './Pages/PaymentStaticPage/PaymentStaticPage';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster position="top-right" />

      <Router>

        <Routes>

          {/* ================= CLIENT SIDE ================= */}

          <Route path="/" element={<Home />} />

          <Route path="/packages" element={<Packages />} />

          <Route path="/package/:id" element={<PackageDetails />} />

          <Route path="/hotel/:id" element={<HotelDetails />} />

          <Route path="/booking/:roomId" element={<Booking />} />

          <Route path="/payment/:bookingId" element={<Payment />} />

          <Route path="/paymentstaticpage" element={<PaymentStaticPage />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/contact" element={<Contact />} />



          {/* ================= USER PROTECTED ================= */}



          <Route
            path="/UserProfile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ExpenseChecke"
            element={
              <ProtectedRoute>
                <ExpensCheck />
              </ProtectedRoute>
            }
          />

          <Route
            path="/TripPlanner"
            element={
              <ProtectedRoute>
                <TripPlanner />
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN SIDE ================= */}

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/addHero"
            element={
              <ProtectedRoute adminOnly={true}>
                <AddHero />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addAbout"
            element={
              <ProtectedRoute adminOnly={true}>
                <AddAbout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-package"
            element={
              <ProtectedRoute adminOnly={true}>
                <AddPackages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-packages"
            element={
              <ProtectedRoute adminOnly={true}>
                <ViewPackages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-package/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <EditPackage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-hotel/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <AddHotel />
              </ProtectedRoute>
            }
          />

          <Route
            path="/package-hotels/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <PackageHotels />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-room/:hotelId"
            element={
              <ProtectedRoute adminOnly={true}>
                <AddRoom />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hotel-rooms/:hotelId"
            element={
              <ProtectedRoute adminOnly={true}>
                <ViewRooms />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-bookings"
            element={
              <ProtectedRoute adminOnly={true}>
                <ViewBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/SupportPage"
            element={
              <ProtectedRoute adminOnly={true}>
                <SupportPage />
              </ProtectedRoute>
            }
          />

        </Routes>

      </Router>
    </>
  );
}

export default App;

