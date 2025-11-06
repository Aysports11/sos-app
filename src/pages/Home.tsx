import { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { App } from '@capacitor/app';
import { Link } from 'react-router-dom';
import SOSButton from '../components/SOSButton';
import FlashlightToggle from '../components/FlashlightToggle';
import AddContactButton from '../components/AddContactButton';
import { getContacts } from '../utils/storage';

export default function Home() {
  const [locationOk, setLocationOk] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const contacts = getContacts();

  useEffect(() => {
    checkLocation();
  }, []);

  const checkLocation = async () => {
    try {
      const perm = await Geolocation.checkPermissions();
      const granted = perm.location === 'granted' || perm.coarseLocation === 'granted';
      setLocationOk(granted);
    } catch {
      setLocationOk(false);
    }
  };

  const requestLocation = async () => {
    if (isRequesting) return;
    setIsRequesting(true);

    try {
      const result = await Geolocation.requestPermissions();
      if (result.location === 'granted' || result.coarseLocation === 'granted') {
        await checkLocation();
      } else {
        // Open app settings if denied
        await App.openAppSettings();
      }
    } catch {
      await App.openAppSettings();
    } finally {
      setIsRequesting(false);
    }
  };

  if (!locationOk) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Enable Location</h2>
        <p className="mb-6 text-black">
          SOS needs your location to send help.
        </p>
        <button
          onClick={requestLocation}
          disabled={isRequesting}
          className={`py-3 px-6 rounded-full text-lg font-bold transition mb-4 ${
            isRequesting
              ? 'bg-gray-400 text-gray-600'
              : 'bg-sos text-white hover:bg-sosDark active:scale-95'
          }`}
        >
          {isRequesting ? 'Opening...' : 'Grant Location'}
        </button>
        <p className="text-sm text-black">
          If denied, enable in <strong>Settings → Apps → Farmrod SOS → Permissions → Location</strong>
        </p>
      </div>
    );
  }

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
        className="mt-8 inline-block text-blue-600 dark:text-blue-400 underline"
      >
        More Settings
      </Link>
    </div>
  );
}