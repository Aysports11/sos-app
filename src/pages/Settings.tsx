import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { Haptics } from '@capacitor/haptics';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'unknown' | 'granted' | 'denied'>('unknown');

  // Load dark mode
  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
    document.documentElement.classList.toggle('dark', saved);
  }, []);

  // Check location permission (native only)
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      Geolocation.checkPermissions()
        .then(p => setLocationStatus(p.location as any))
        .catch(() => setLocationStatus('denied'));
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
    Haptics.vibrate();
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

      {/* Dark Mode */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 flex justify-between items-center">
        <div>
          <p className="font-medium">Dark Mode</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Better at night</p>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`w-12 h-6 rounded-full p-1 transition-all ${darkMode ? 'bg-sos' : 'bg-gray-300'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full shadow transition-all ${darkMode ? 'translate-x-6' : ''}`} />
        </button>
      </div>

      {/* Permission Status */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="font-medium mb-2">Location</p>
        <p className={`text-sm ${locationStatus === 'granted' ? 'text-green-600' : 'text-red-600'}`}>
          {locationStatus === 'granted' ? 'Allowed' : locationStatus === 'denied' ? 'Blocked' : 'Checking...'}
        </p>
      </div>

      {/* App Info */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>SOS Emergency v1.0.0</p>
        <p>© 2025</p>
      </div>
    </div>
  );
}