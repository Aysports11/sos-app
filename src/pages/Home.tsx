import { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Permissions } from '@capacitor/core';
import SOSButton from '../components/SOSButton';
import Flashlight from '../components/Flashlight';

export default function Home() {
  const [locationOk, setLocationOk] = useState(false);
  const [smsOk, setSmsOk] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const loc = await Geolocation.checkPermissions();
    const sms = await Permissions.query({ name: 'sms' });
    setLocationOk(loc.location === 'granted');
    setSmsOk(sms.state === 'granted');
  };

  const requestAll = async () => {
    await Geolocation.requestPermissions();
    await Permissions.requestPermissions({ permissions: ['sms'] });
    await checkPermissions();
  };

  if (!locationOk || !smsOk) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Enable Permissions</h2>
        <p className="mb-6">SOS needs location & SMS to save you.</p>
        <button
          onClick={requestAll}
          className="bg-sos text-white py-3 px-6 rounded-full text-lg font-bold"
        >
          Grant Permissions
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Tap SOS in Emergency</h2>
      <SOSButton />
      <div className="mt-16"><Flashlight /></div>
    </div>
  );
}