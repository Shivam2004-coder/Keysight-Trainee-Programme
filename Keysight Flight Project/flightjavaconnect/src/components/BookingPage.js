import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const BookingPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [flight, setFlight] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        passengerName: '',
        passengerAge: '',
        passengerPhoneNumber: '',
        passengerAadhaar: '',
        passengerPan: ''
    });

    useEffect(() => {
        const loadFlight = async () => {
            const res = await fetch(`http://localhost:6161/flight/${id}`);
            const data = await res.json();
            setFlight(data);
        };
        loadFlight();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBooking = async () => {
        // Validation
        const { passengerName, passengerAge, passengerPhoneNumber, passengerAadhaar, passengerPan } = formData;
        if (!passengerName || !passengerAge || !passengerPhoneNumber || !passengerAadhaar || !passengerPan) {
            alert("Please fill in all passenger details.");
            return;
        }

        try {
            const response = await fetch('http://localhost:6161/api/bookings/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    flightId: flight.id,
                    ...formData
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
        <div className="container mt-5" style={{ maxWidth: '800px' }}>
            <h2 className="mb-4 text-center font-weight-bold" style={{ color: 'var(--accent-primary)' }}>Confirm Booking</h2>

            <div className="row">
                <div className="col-md-6">
                    <div className="glass-panel p-4 h-100">
                        <h4 className="font-weight-bold mb-3" style={{ color: 'var(--accent-secondary)' }}>Flight Summary</h4>
                        <div className="mb-3">
                            <small className="text-secondary text-uppercase font-weight-bold">Flight</small>
                            <h5 className="font-weight-bold text-dark">{flight.flightName}</h5>
                        </div>
                        <div className="mb-3">
                            <small className="text-secondary text-uppercase font-weight-bold">Route</small>
                            <p className="font-weight-bold text-dark mb-0">{flight.source} ➝ {flight.destination}</p>
                        </div>
                        <div className="mb-3 p-3 rounded" style={{ background: 'rgba(120, 53, 15, 0.05)', border: '1px solid var(--glass-border)' }}>
                            <small className="text-secondary text-uppercase font-weight-bold">Total Price</small>
                            <h2 className="font-weight-bold mb-0" style={{ color: 'var(--accent-primary)' }}>${flight.price}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="glass-panel p-4">
                        <h4 className="font-weight-bold mb-3" style={{ color: 'var(--accent-secondary)' }}>Passenger Details</h4>

                        <div className="form-group mb-3">
                            <label className="text-sm font-weight-bold text-secondary">Full Name</label>
                            <input type="text" name="passengerName" value={formData.passengerName} onChange={handleChange} className="form-control" placeholder="Enter full name" />
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6 mb-3">
                                <label className="text-sm font-weight-bold text-secondary">Age</label>
                                <input type="number" name="passengerAge" value={formData.passengerAge} onChange={handleChange} className="form-control" placeholder="Age" />
                            </div>
                            <div className="form-group col-md-6 mb-3">
                                <label className="text-sm font-weight-bold text-secondary">Phone Number</label>
                                <input type="text" name="passengerPhoneNumber" value={formData.passengerPhoneNumber} onChange={handleChange} className="form-control" placeholder="Phone" />
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label className="text-sm font-weight-bold text-secondary">Aadhaar Number</label>
                            <input type="text" name="passengerAadhaar" value={formData.passengerAadhaar} onChange={handleChange} className="form-control" placeholder="12-digit Aadhaar" />
                        </div>

                        <div className="form-group mb-4">
                            <label className="text-sm font-weight-bold text-secondary">PAN Card Number</label>
                            <input type="text" name="passengerPan" value={formData.passengerPan} onChange={handleChange} className="form-control" placeholder="PAN Number" />
                        </div>

                        <button onClick={handleBooking} className="btn btn-premium btn-lg w-100 shadow-lg">
                            Pay Now
                        </button>
                        <div className="mt-3 text-center">
                            <button onClick={() => navigate(-1)} className="btn btn-link text-secondary">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
