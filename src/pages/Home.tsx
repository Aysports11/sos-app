import { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Link } from 'react-router-dom';
import SOSButton from '../components/SOSButton';
import FlashlightToggle from '../components/FlashlightToggle';
import AddContactButton from '../components/AddContactButton';
import { getContacts } from '../utils/storage';

export default function Home() {
  const [locationOk, setLocationOk] = useState(false);
  const contacts = getContacts();

  useEffect(() => {
    (async () => {
      const loc = await Geolocation.checkPermissions();
      setLocationOk(loc.location === 'granted');
    })();
  }, []);

  const requestLocation = async () => {
    await Geolocation.requestPermissions();
    const loc = await Geolocation.checkPermissions();
    setLocationOk(loc.location === 'granted');
  };

  if (!locationOk) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Enable Location</h2>
        <p className="mb-6">SOS needs your location to send help.</p>
        <button
          onClick={requestLocation}
          className="bg-sos text-white py-3 px-6 rounded-full text-lg font-bold"
        >
          Grant Location
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Tap SOS in Emergency
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        {contacts.length} contact{contacts.length !== 1 ? 's' : ''} ready
      </p>

      <SOSButton />

      <AddContactButton />

      <div className="mt-16">
        <FlashlightToggle />
      </div>

      <Link
        to="/settings"
        className="mt-8 inline-block text-blue-600 dark:text-blue-400 underline"
      >
        More Settings
      </Link>
    </div>
  );
}