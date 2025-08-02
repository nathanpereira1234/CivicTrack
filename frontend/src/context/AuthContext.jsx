import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('authToken')); // Use a function to read from localStorage only once
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                const savedUser = JSON.parse(localStorage.getItem('user'));
                if (savedUser) {
                    setUser(savedUser);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } else {
                    // Handle case where token exists but user data doesn't
                    localStorage.removeItem('authToken');
                    setToken(null);
                }
            } catch (error) {
                console.error("Failed to parse user data from localStorage", error);
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                setToken(null);
                setUser(null);
            }
        }
        setLoading(false);
    }, [token]);

    // Login function (no longer navigates)
    const login = async (email, password) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };
    
    // Register function (no longer navigates)
    const register = async (name, email, phone, password) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, phone, password });
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };

    // Logout function (no longer navigates, App will handle redirect)
    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    const authContextValue = { user, token, loading, login, register, logout };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// 3. Custom hook to use the context
export const useAuth = () => {
    return useContext(AuthContext);
};
