import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RequireAuth from './components/auth/RequireAuth';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import GetStarted from './pages/GetStarted';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/inventory/Inventory';
import Sales from './pages/sales/Sales';
import Orders from './pages/orders/Orders';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><LandingPage /></>} />
          <Route path="/features" element={<><Navbar /><Features /></>} />
          <Route path="/pricing" element={<><Navbar /><Pricing /></>} />
          <Route path="/faq" element={<><Navbar /><FAQ /></>} />
          <Route path="/get-started" element={<><Navbar /><GetStarted /></>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/inventory"
            element={
              <RequireAuth requiredRole="staff">
                <Inventory />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/sales"
            element={
              <RequireAuth requiredRole="staff">
                <Sales />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/orders"
            element={
              <RequireAuth requiredRole="manager">
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/reports"
            element={
              <RequireAuth requiredRole="manager">
                <Reports />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <RequireAuth requiredRole="admin">
                <Settings />
              </RequireAuth>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}