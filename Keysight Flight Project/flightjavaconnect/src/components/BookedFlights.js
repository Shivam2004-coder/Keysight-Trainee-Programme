import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const BookedFlights = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            loadBookings();
        }
    }, [user]);

    const loadBookings = async () => {
        try {
            const res = await fetch(`http://localhost:6161/api/bookings/my-bookings/${user.id}`);
            const data = await res.json();
            setBookings(data);
        } catch (error) {
            console.error("Error loading bookings:", error);
        }
    };

    const handleCancel = async (bookingId) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            try {
                const res = await fetch(`http://localhost:6161/api/bookings/cancel/${bookingId}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    alert("Booking cancelled successfully");
                    loadBookings(); // Refresh list
                } else {
                    alert("Failed to cancel booking");
                }
            } catch (error) {
                console.error("Error cancelling booking:", error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">My Booked Flights</h3>
            {bookings.length === 0 ? (
                <p className="text-secondary text-center">You have no booked flights.</p>
            ) : (
                <div className="glass-panel p-4">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Booking ID</th>
                                <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Flight</th>
                                <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Source</th>
                                <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Destination</th>
                                <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Carrier</th>
                                <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Price</th>
                                <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Date Booked</th>
                                <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b.id}>
                                    <td className="text-muted font-weight-bold">{b.id}</td>
                                    <td className="font-weight-bold text-dark">{b.flight.flightName}</td>
                                    <td className="text-secondary">{b.flight.source}</td>
                                    <td className="text-secondary">{b.flight.destination}</td>
                                    <td className="text-secondary">{b.flight.carrier}</td>
                                    <td className="font-weight-bold" style={{ color: 'var(--accent-secondary)' }}>${b.flight.price}</td>
                                    <td className="text-muted">{b.bookingDate}</td>
                                    <td>
                                        <button
                                            onClick={() => navigate(`/flight/${b.flight.id}`, { state: { viewOnly: true } })}
                                            className="btn btn-premium btn-sm me-2">
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleCancel(b.id)}
                                            className="btn btn-outline-danger btn-sm">
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookedFlights;
