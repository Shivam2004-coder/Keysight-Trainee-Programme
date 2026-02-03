import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FlightInfo = () => {
    const { id } = useParams();
    const [flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const location = useLocation();
    const isAdmin = user && user.email.endsWith('@admin.com');
    const isViewOnly = location.state?.viewOnly;

    useEffect(() => {
        loadFlight();
    }, [id]);

    const loadFlight = async () => {
        try {
            const res = await fetch(`http://localhost:6161/flight/${id}`);
            if (res.ok) {
                const data = await res.json();
                setFlight(data);
            } else {
                console.error("Failed to fetch flight");
            }
        } catch (error) {
            console.error("Error fetching flight:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return "N/A";
        // Remove decimal if present (e.g. "752.0" -> "752")
        let cleanStr = timeStr.toString().split('.')[0];

        // Pad with leading zeros to ensure at least 4 digits (e.g. "752" -> "0752")
        while (cleanStr.length < 4) {
            cleanStr = "0" + cleanStr;
        }

        // Extract hours and minutes
        const hours = cleanStr.slice(0, 2);
        const minutes = cleanStr.slice(2);

        return `${hours}:${minutes}`;
    };

    if (loading) {
        return <div className="container mt-5"><h3>Loading...</h3></div>;
    }

    if (!flight) {
        return <div className="container mt-5"><h3>Flight not found</h3></div>;
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '800px' }}>
            <div className="glass-panel p-0 overflow-hidden">
                <div className="p-4" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                    <h3 className="mb-0 font-weight-bold">Flight Details: <span style={{ color: 'var(--accent-secondary)' }}>{flight.flightName}</span></h3>
                </div>
                <div className="p-5">
                    <div className="row mb-4">
                        <div className="col-md-6 mb-3">
                            <h6 className="text-secondary text-uppercase text-xs font-weight-bolder">Route</h6>
                            <p className="text-xl text-dark font-weight-bold mb-0">{flight.source} ➝ {flight.destination}</p>
                            <small style={{ color: 'var(--accent-secondary)' }}>{flight.distance} miles</small>
                        </div>
                        <div className="col-md-6 mb-3 text-md-right">
                            <h6 className="text-secondary text-uppercase text-xs font-weight-bolder">Price</h6>
                            <h2 className="font-weight-bold mb-0" style={{ color: 'var(--accent-primary)' }}>${flight.price}</h2>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-4 mb-3">
                            <h6 className="text-secondary text-uppercase text-xs font-weight-bolder">Carrier</h6>
                            <p className="text-dark font-weight-bold">{flight.carrier}</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <h6 className="text-secondary text-uppercase text-xs font-weight-bolder">Tail Number</h6>
                            <p className="text-dark font-weight-bold">{flight.tailnum}</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <h6 className="text-secondary text-uppercase text-xs font-weight-bolder">Flight ID</h6>
                            <p className="text-dark font-weight-bold">#{flight.id}</p>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-4 mb-3">
                            <h6 className="text-secondary text-uppercase text-xs font-weight-bolder">Departure</h6>
                            <p className="text-dark font-weight-bold">{formatTime(flight.depTime)}</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <h6 className="text-secondary text-uppercase text-xs font-weight-bolder">Arrival</h6>
                            <p className="text-dark font-weight-bold">{formatTime(flight.arrTime)}</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <h6 className="text-secondary text-uppercase text-xs font-weight-bolder">Duration</h6>
                            <p className="text-dark font-weight-bold">{flight.airTime} mins</p>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4 pt-4 border-top">
                        <Link to="/" className="btn btn-outline-secondary px-4">← Back to List</Link>
                        {!isAdmin && !isViewOnly && (
                            <Link to={`/book/${flight.id}`} className="btn btn-premium px-5 py-2 shadow-sm">Book Now</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightInfo;
