import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Using the hook for auth logic

// This component now handles the UI and user input, while the actual
// login logic (API calls, storing tokens) is managed by the AuthContext.
const LoginPage = () => {
    // State for the form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Get the login function from your AuthContext
    const { login } = useAuth(); 
    
    // Hook for programmatic navigation after login
    const navigate = useNavigate();

    // This function is called when the user submits the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation to ensure fields are not empty
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        try {
            // Call the login function from the context. This function will
            // contain the axios API call and localStorage logic.
            await login(email, password);
            
            // On successful login, redirect the user to the homepage.
            navigate('/'); 
        } catch (error) {
            // The context's login function should throw an error on failure
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    // The JSX is taken from your more detailed example, providing a rich UI.
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 font-sans">
            <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden md:p-8">
                
                <header className="flex items-center justify-between p-4 border-b border-gray-300">
                    <h1 className="text-2xl font-bold text-gray-800">CivicTrack</h1>
                    <Link to="/" className="px-6 py-2 text-green-700 bg-white hover:bg-green-100 sketchy-button text-base font-semibold no-underline">Home</Link>
                </header>

                <main className="w-full p-4 md:p-8 mt-4 flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-6">User Login</h2>
                    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-gray-700">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                                placeholder="e.g. johndoe@example.com"
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password" className="text-gray-700">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                                placeholder="********"
                                required
                            />
                        </div>

                        <p className="text-sm text-gray-600 text-center">
                            Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Register here</Link>
                        </p>

                        <div className="flex justify-center pt-4">
                            <button type="submit" className="w-40 py-2 text-green-700 bg-white hover:bg-green-100 sketchy-button font-bold text-lg">Login</button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default LoginPage;
