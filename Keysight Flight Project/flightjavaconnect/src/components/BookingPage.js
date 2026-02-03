import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const BookingPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [flight, setFlight] = useState(null);

    useEffect(() => {
        const loadFlight = async () => {
            const res = await fetch(`http://localhost:6161/flight/${id}`);
            const data = await res.json();
            setFlight(data);
        };
        loadFlight();
    }, [id]);

    const handleBooking = async () => {
        try {
            const response = await fetch('http://localhost:6161/api/bookings/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    flightId: flight.id
                }),
            });

            if (response.ok) {
                alert("Flight booked successfully!");
                navigate('/my-bookings');
            } else {
                alert("Booking failed.");
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert("An error occurred during booking.");
        }
    };

    if (!flight) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <h2 className="mb-4 text-center font-weight-bold" style={{ color: 'var(--accent-primary)' }}>Confirm Booking</h2>
            <div className="glass-panel p-5 text-center">
                <h4 className="font-weight-bold mb-3" style={{ color: 'var(--accent-secondary)' }}>{flight.flightName}</h4>
                <div className="mb-4">
                    <p className="text-secondary mb-1">Carrier</p>
                    <h5 className="text-dark font-weight-bold">{flight.carrier}</h5>
                </div>

                <div className="d-flex justify-content-center align-items-center mb-4">
                    <div className="text-right mr-4">
                        <p className="text-secondary mb-0">From</p>
                        <h4 className="text-dark font-weight-bold">{flight.source}</h4>
                    </div>
                    <div className="text-secondary mx-3">➝</div>
                    <div className="text-left ml-4">
                        <p className="text-secondary mb-0">To</p>
                        <h4 className="text-dark font-weight-bold">{flight.destination}</h4>
                    </div>
                </div>

                <div className="mb-5 p-3 rounded" style={{ background: 'rgba(120, 53, 15, 0.05)', border: '1px solid var(--glass-border)' }}>
                    <p className="text-secondary mb-1">Total Price</p>
                    <h1 className="font-weight-bold display-4" style={{ color: 'var(--accent-primary)' }}>${flight.price}</h1>
                </div>

                <button onClick={handleBooking} className="btn btn-premium btn-lg w-100 shadow-lg">
                    Confirm & Pay
                </button>
                <div className="mt-3">
                    <button onClick={() => navigate(-1)} className="btn btn-link text-secondary">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
