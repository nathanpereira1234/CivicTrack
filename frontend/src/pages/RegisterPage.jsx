import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css'; // Import your custom styles

const RegisterPage = () => {
    // State for each form field
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name || !email || !password) {
            alert('Name, email, and password are required.');
            return;
        }

        try {
            // Send registration data to your backend API
            const { data } = await axios.post('http://localhost:5000/api/auth/register', { 
                name, 
                email, 
                password,
                phone // We will add this to the backend next
            });
            
            // On success, save user info and token, then redirect to the homepage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/'); 
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            alert('Registration failed. The email might already be in use.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 font-sans">
            <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden md:p-8">
                
                <header className="flex items-center justify-between p-4 border-b border-gray-300">
                    <h1 className="text-2xl font-bold text-gray-800">CivicTrack</h1>
                    <Link to="/" className="px-6 py-2 text-green-700 bg-white hover:bg-green-100 sketchy-button text-base font-semibold no-underline">Home</Link>
                </header>
                
                <div className="w-full h-16 bg-indigo-500 sketchy-banner mt-4 flex items-center justify-center">
                    <span className="text-white text-lg font-bold tracking-wider">User Registration</span>
                </div>

                <main className="w-full p-4 md:p-8 mt-4 flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
                        
                        <div className="flex items-center space-x-4">
                            <label htmlFor="userName" className="w-32 text-gray-700">User Name</label>
                            <input type="text" id="userName" value={name} onChange={(e) => setName(e.target.value)} className="flex-grow border-b border-gray-400 focus:outline-none focus:border-indigo-500" placeholder="e.g. John Doe" required />
                        </div>

                        <div className="flex items-center space-x-4">
                            <label htmlFor="email" className="w-32 text-gray-700">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-grow border-b border-gray-400 focus:outline-none focus:border-indigo-500" placeholder="e.g. johndoe@example.com" required />
                        </div>

                        <div className="flex items-center space-x-4">
                            <label htmlFor="phone" className="w-32 text-gray-700">Phone</label>
                            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="flex-grow border-b border-gray-400 focus:outline-none focus:border-indigo-500" placeholder="e.g. 555-123-4567" />
                        </div>

                        <div className="flex items-center space-x-4">
                            <label htmlFor="password" className="w-32 text-gray-700">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex-grow border-b border-gray-400 focus:outline-none focus:border-indigo-500" placeholder="********" required />
                        </div>

                        <p className="text-sm text-gray-600 text-center">
                            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                        </p>

                        <div className="flex justify-center pt-4">
                            <button type="submit" className="w-40 py-2 text-green-700 bg-white hover:bg-green-100 sketchy-button font-bold text-lg">Register</button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default RegisterPage;
