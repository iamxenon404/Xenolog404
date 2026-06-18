'use client';

import { useEffect, useState } from 'react';
import Dashboard from "./component/Dashboard";
import LandingPage from "./landing-page/page";

export default function Home() {
  // 1. Initialize state as false during server-side pre-render
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. Check localStorage on mount to see if a guest session is active
  useEffect(() => {
    const activeSession = localStorage.getItem('xen_session_active');
    if (activeSession === 'true') {
      setShowDashboard(true);
    }
    setLoading(false);
  }, []);

  const handleEnterGuest = () => {
    localStorage.setItem('xen_session_active', 'true');
    setShowDashboard(true);
  };

  // Prevent visual flickering during layout hydration checks
  if (loading) {
    return <div className="min-h-screen bg-black" />;
  }

  // Conditionally render based on verified session persistence
  if (showDashboard) {
    return <Dashboard />;
  }

  return <LandingPage onEnterGuest={handleEnterGuest} />;
}