import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
            const response = await fetch('http://localhost:6161/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Auto-login after registration
                login(data);
                navigate('/'); // Redirect to dashboard
            } else {
                const errorText = await response.text();
                setMessage(errorText || "Registration failed. Try again.");
            }
        } catch (error) {
            console.error("Registration error", error);
            setMessage("An error occurred during registration.");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h3 className="text-center mb-4 font-weight-bold" style={{ color: 'var(--accent-primary)' }}>Register</h3>
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
                        <label className="text-secondary mb-2 font-weight-bold">Email</label>
                        <input
                            type="email"
                            className="glass-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="btn btn-premium w-100 mt-3 shadow-sm">Register</button>
                    <div className="mt-4 text-center">
                        <small className="text-muted">Already have an account? <Link to="/login" className="text-primary font-weight-bold ml-1">Login here</Link></small>
                    </div>
                </form>
                {message && <p className="text-danger mt-3 text-center font-weight-bold">{message}</p>}
            </div>
        </div>
    );
}

export default Register;
