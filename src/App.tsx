import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Settings from './pages/Settings';
import Header from './components/Header';
import './index.css';  // Correct

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}