import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FlightList = () => {

    const [flights, setFlight] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const { user } = useAuth();
    const isAdmin = user && user.email.endsWith('@admin.com');

    useEffect(() => {
        loadFlights();
    }, []);

    const loadFlights = async () => {
        const res = await fetch("http://localhost:6161/getAll");
        const data = await res.json();
        setFlight(data);
    }

    const deleteFlight = async (id) => {
        await fetch(`http://localhost:6161/delete/flight/${id}`, {
            method: "DELETE"
        })
        loadFlights();
    }

    // Sorting Logic
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Derived State: Filtered and Sorted Flights
    const getProcessedFlights = () => {
        let processedFlights = [...flights];

        // 1. Filter
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            processedFlights = processedFlights.filter(f =>
                f.flightName.toLowerCase().includes(lowerTerm) ||
                f.source.toLowerCase().includes(lowerTerm) ||
                f.destination.toLowerCase().includes(lowerTerm) ||
                f.id.toString().includes(lowerTerm)
            );
        }

        // 2. Sort
        if (sortConfig.key) {
            processedFlights.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return processedFlights;
    };

    const displayFlights = getProcessedFlights();

    const getClassNamesFor = (name) => {
        if (!sortConfig.key) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4 font-weight-bold" style={{ color: 'var(--accent-primary)' }}>Available Flights</h3>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    className="glass-input"
                    placeholder="Search flights by name, source, or destination..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: '100%' }}
                />
            </div>

            <div className="glass-panel p-4">
                <table className="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th scope="col" onClick={() => requestSort('id')} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                ID {getClassNamesFor('id') === 'ascending' ? '↑' : getClassNamesFor('id') === 'descending' ? '↓' : ''}
                            </th>
                            <th scope="col" onClick={() => requestSort('flightName')} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                Flight Name {getClassNamesFor('flightName') === 'ascending' ? '↑' : getClassNamesFor('flightName') === 'descending' ? '↓' : ''}
                            </th>
                            <th scope="col" onClick={() => requestSort('source')} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                Source {getClassNamesFor('source') === 'ascending' ? '↑' : getClassNamesFor('source') === 'descending' ? '↓' : ''}
                            </th>
                            <th scope="col" onClick={() => requestSort('destination')} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                Destination {getClassNamesFor('destination') === 'ascending' ? '↑' : getClassNamesFor('destination') === 'descending' ? '↓' : ''}
                            </th>
                            <th scope="col" onClick={() => requestSort('carrier')} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                Carrier {getClassNamesFor('carrier') === 'ascending' ? '↑' : getClassNamesFor('carrier') === 'descending' ? '↓' : ''}
                            </th>
                            <th scope="col" onClick={() => requestSort('price')} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                Price {getClassNamesFor('price') === 'ascending' ? '↑' : getClassNamesFor('price') === 'descending' ? '↓' : ''}
                            </th>
                            <th scope="col" style={{ color: 'var(--text-secondary)' }}> Actions </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            displayFlights.length > 0 ? (
                                displayFlights.map(f => (
                                    <tr key={f.id}>
                                        <td className="font-weight-bold text-muted">{f.id}</td>
                                        <td className="font-weight-bold text-dark">{f.flightName}</td>
                                        <td className="text-secondary">{f.source}</td>
                                        <td className="text-secondary">{f.destination}</td>
                                        <td className="text-secondary">{f.carrier}</td>
                                        <td className="font-weight-bold" style={{ color: 'var(--accent-secondary)' }}>${f.price}</td>
                                        {isAdmin && (
                                            <td>
                                                <Link to={`/edit/${f.id}`} className="btn btn-outline-primary btn-sm me-2"> Edit </Link>
                                                <button onClick={() => deleteFlight(f.id)} className="btn btn-outline-danger btn-sm"> Delete </button>
                                            </td>
                                        )}
                                        {!isAdmin && (
                                            <td>
                                                <Link to={`/flight/${f.id}`} className="btn btn-premium btn-sm me-2"> View </Link>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={isAdmin ? "7" : "6"} className="text-center text-muted py-4">No flights found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FlightList;