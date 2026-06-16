'use client';

import { useState } from 'react';
import Dashboard from "./component/Dashboard";
import LandingPage from "./landing-page/page";

export default function Home() {
  // Track whether the user has initialized a guest session
  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  const handleEnterGuest = () => {
    setShowDashboard(true);
  };

  // Conditionally render the Dashboard HUD or the core Landing Page
  if (showDashboard) {
    return <Dashboard />;
  }

  return <LandingPage onEnterGuest={handleEnterGuest} />;
}