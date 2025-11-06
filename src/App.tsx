import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './index.css';

// Simple animated SOS logo (3 seconds)
function LogoScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-sos">
      <div className="animate-pulse text-white text-8xl font-black tracking-wider">
        SOS
      </div>
    </div>
  );
}

export default function App() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000); // 3-second splash

    return () => clearTimeout(timer);
  }, []);

  if (showLogo) {
    return <LogoScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}