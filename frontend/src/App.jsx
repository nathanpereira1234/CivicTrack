import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReportIssuePage from './pages/ReportIssuePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import IssueDetailPage from './pages/IssueDetailPage';
import MyIssuesPage from './pages/MyIssuesPage'; // Import the new page

// This component checks if a user is logged in.
// If not, it redirects them to the login page.
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes (User must be logged in to access) */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/report" 
          element={
            <PrivateRoute>
              <ReportIssuePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/issue/:id" 
          element={
            <PrivateRoute>
              <IssueDetailPage />
            </PrivateRoute>
          } 
        />
        
        {/* New route for the "My Issues" page */}
        <Route 
          path="/my-issues" 
          element={
            <PrivateRoute>
              <MyIssuesPage />
            </PrivateRoute>
          } 
        />
        
      </Routes>
    </Router>
  );
}

export default App;
