import { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Link } from 'react-router-dom';
import SOSButton from '../components/SOSButton';
import FlashlightToggle from '../components/FlashlightToggle';
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

  const openAppSettings = () => {
    if (typeof window !== 'undefined') {
      window.open('app-settings:', '_system');
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
        openAppSettings();
      }
    } catch {
      openAppSettings();
    } finally {
      setIsRequesting(false);
    }
  };

  if (!locationOk) {
    return (
      <div className="max-w-md mx-auto p-8 text-center min-h-screen flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Enable Location</h2>
        <p className="mb-6 text-black dark:text-white">SOS needs your location to send help.</p>
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
        <p className="text-sm text-black dark:text-white">
          If denied, go to <strong>Settings → Apps → Farmrod SOS → Permissions → Location</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-between">
      {/* Top: Title + Contact Count */}
      <div className="text-center">
        <h2 className="text-4xl font-black text-black dark:text-white mb-2">
          Farmrod SOS
        </h2>
        <p className="text-sm text-black dark:text-white">
          {contacts.length} contact{contacts.length !== 1 ? 's' : ''} ready
        </p>
      </div>

      {/* Middle: SOS Button + Dropdown */}
      <div className="flex flex-col items-center space-y-6">
        <SOSButton />
        <Link
          to="/add-contact"
          className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-black dark:border-white text-black dark:text-white rounded-full font-bold shadow hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition"
        >
          Add Emergency Contact
        </Link>
      </div>

      {/* Bottom: Flashlight + Settings */}
      <div className="flex flex-col items-center space-y-8">
        <FlashlightToggle />
        <Link
          to="/settings"
          className="text-blue-600 dark:text-blue-400 underline font-medium"
        >
          Settings
        </Link>
      </div>
    </div>
  );
}