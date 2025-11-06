import { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import SOSButton from '../components/SOSButton';
import FlashlightToggle from '../components/FlashlightToggle';   // ← NEW

export default function Home() {
  const [locationOk, setLocationOk] = useState(false);

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
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Tap SOS in Emergency</h2>
      <SOSButton />
      <div className="mt-16">
        <FlashlightToggle />   {/* ← NEW */}
      </div>
    </div>
  );
}