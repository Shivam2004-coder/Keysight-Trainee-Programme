import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import logo from '../assets/logo.png';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login, user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:6161/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data); // Set user in context
                navigate('/'); // Redirect to dashboard
            } else {
                setMessage("Invalid credentials");
            }
        } catch (error) {
            console.log("Login error", error);
            setMessage("An error occurred during login.");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <div className="text-center mb-4">
                <img src={logo} alt="Shiva Airlines" style={{ height: '80px', marginBottom: '15px' }} />
                <h3 className="font-weight-bold" style={{ color: 'var(--accent-primary)' }}>Shiva Airlines</h3>
            </div>
            <div className="glass-panel p-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className="text-secondary mb-2 font-weight-bold">Username</label>
                        <input
                            type="text"
                            className="glass-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="text-secondary mb-2 font-weight-bold">Password</label>
                        <input
                            type="password"
                            className="glass-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-premium w-100 mt-3 shadow-sm">Login</button>
                    <div className="mt-4 text-center">
                        <small className="text-muted">Don't have an account? <Link to="/register" className="text-primary font-weight-bold ml-1">Register here</Link></small>
                    </div>
                </form>
                {message && <p className="text-danger mt-3 text-center font-weight-bold">{message}</p>}
            </div>
        </div>
    );
}

export default Login;
