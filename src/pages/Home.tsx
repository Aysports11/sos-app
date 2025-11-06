import { useState } from 'react';
import { Link } from 'react-router-dom';
import SOSButton from '../components/SOSButton';
import FlashlightToggle from '../components/FlashlightToggle';
import AddContactButton from '../components/AddContactButton';
import { getContacts } from '../utils/storage';

export default function Home() {
  const contacts = getContacts();

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-center">
      <h2 className="text-4xl font-black text-black mb-8">
        Farmrod SOS
      </h2>

      <p className="text-sm text-black mb-6">
        {contacts.length} contact{contacts.length !== 1 ? 's' : ''} ready
      </p>

      <SOSButton />

      <div className="mt-6">
        <AddContactButton />
      </div>

      <div className="mt-16">
        <FlashlightToggle />
      </div>

      <Link
        to="/settings"
        className="mt-8 inline-block text-blue-600 underline font-medium"
      >
        Settings
      </Link>
    </div>
  );
}