import React, { useEffect } from 'react';
import AddFlight from "./components/AddFlight";
import EditFlight from "./components/EditFlight";
import FlightList from "./components/FlightList";
import Login from "./components/Login";
import Register from "./components/Register";
import FlightInfo from "./components/FlightInfo";
import BookingPage from "./components/BookingPage";
import BookedFlights from "./components/BookedFlights";
import { Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import './App.css';
import logo from './assets/logo.png';

// Component to protect routes generic
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Admin Route Guard
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || !user.email.endsWith('@admin.com')) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// User Route Guard (Non-Admin)
const UserRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.email.endsWith('@admin.com')) {
    return <Navigate to="/" replace />;
  }
  return children;
};


// ... other imports

// Component for Navigation Bar (only shown when logged in)
const NavBar = () => {
  const { user, logout } = useAuth();

  // Don't show navbar on login/register pages if that was the intent, 
  // but the user logic in App.js only checks (!user). 
  // If user is logged in, they see the navbar.

  if (!user) return null;

  const isAdmin = user.email && user.email.endsWith('@admin.com');

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom mb-4 p-3 sticky-top">
      <div className="container-fluid px-5">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Shiva Airlines Logo" style={{ height: '50px', marginRight: '15px' }} />
          <span className="font-weight-bold" style={{ fontSize: '1.5rem', color: 'var(--accent-primary)' }}>Shiva Airlines</span>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navigation Links - Pushed to the left next to Brand */}
          <div className="navbar-nav mr-auto d-flex flex-row align-items-center">
            <Link to="/" className="nav-link text-secondary font-weight-bold mx-2">Flights</Link>
            {isAdmin && (
              <Link to="/add" className="nav-link text-secondary font-weight-bold mx-2">Add Flight</Link>
            )}
            {!isAdmin && (
              <Link to="/my-bookings" className="nav-link text-secondary font-weight-bold mx-2">Booked Flights</Link>
            )}
          </div>

          {/* Logout Button - Pushed to the extreme right */}
          <div className="navbar-nav">
            <button onClick={logout} className="btn btn-premium btn-sm shadow-sm">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  useEffect(() => {
    document.title = "Shiva Airlines";
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <FlightList />
              </ProtectedRoute>
            } />

            {/* Admin Only Routes */}
            <Route path="/add" element={
              <AdminRoute>
                <AddFlight />
              </AdminRoute>
            } />
            <Route path="/edit/:id" element={
              <AdminRoute>
                <EditFlight />
              </AdminRoute>
            } />

            {/* Common Route (View is for everyone, but internal buttons differ) */}
            <Route path="/flight/:id" element={
              <ProtectedRoute>
                <FlightInfo />
              </ProtectedRoute>
            } />

            {/* User Only Routes */}
            <Route path="/book/:id" element={
              <UserRoute>
                <BookingPage />
              </UserRoute>
            } />
            <Route path="/my-bookings" element={
              <UserRoute>
                <BookedFlights />
              </UserRoute>
            } />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;