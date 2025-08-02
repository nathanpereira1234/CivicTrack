import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import IssueCard from '../components/issues/IssueCard';
import './HomePage.css'; // Import custom styles

const HomePage = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Use the AuthContext to get the current user and the logout function.
    // This centralizes authentication logic and state management.
    const { user, logout } = useAuth(); 

    // This effect hook fetches the list of issues from the backend when the component mounts.
    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/issues');
                setIssues(data);
            } catch (error) {
                console.error('Failed to fetch issues:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []); // The empty dependency array ensures this runs only once on mount.

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="w-full max-w-7xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden md:p-8">
                
                {/* Header Section */}
                <header className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-300 space-y-4 md:space-y-0">
                    {/* Display a welcome message with the user's name from the context */}
                    <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.name || 'User'}!</h1>
                    <nav className="flex items-center space-x-4 md:space-x-6">
                        <Link to="/my-issues" className="text-gray-600 hover:text-gray-900 font-semibold no-underline">My Issues</Link>
                        <Link to="/report" className="px-4 py-2 text-gray-700 bg-white hover:bg-gray-100 border border-gray-400 rounded-lg font-semibold no-underline">Report New Issue</Link>
                        {/* The logout button now calls the logout function directly from the context */}
                        <button onClick={logout} className="px-6 py-2 text-green-700 bg-white hover:bg-green-100 sketchy-button text-base font-semibold">Logout</button>
                    </nav>
                </header>

                {/* Filter and Search Section */}
                <div className="flex flex-wrap items-center justify-between p-4 border-b border-gray-300 space-y-4 md:space-y-0">
                    <div className="flex flex-wrap items-center space-x-4">
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>Category</option>
                            <option>Roads</option>
                            <option>Lighting</option>
                            <option>Water</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="text" placeholder="Search Issues" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Main content area with issue cards */}
                <main className="p-4">
                    {loading ? (
                        <p>Loading issues...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {issues.map(issue => (
                                <IssueCard key={issue._id} issue={issue} />
                            ))}
                        </div>
                    )}
                </main>

                {/* Pagination Section */}
                <footer className="flex items-center justify-center p-4 border-t border-gray-300 mt-4">
                    <nav className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-lg text-gray-500">&lt;</span>
                        <span className="px-3 py-1 rounded-lg bg-indigo-500 text-white font-bold">1</span>
                        <span className="px-3 py-1 rounded-lg text-gray-500">&gt;</span>
                    </nav>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;
