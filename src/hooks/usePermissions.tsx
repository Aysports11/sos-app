import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Permissions } from '@capacitor/core';
import { SmsManager } from '@byteowls/capacitor-sms';

export function usePermissions() {
  const [locationGranted, setLocationGranted] = useState(false);
  const [smsGranted, setSmsGranted] = useState(false);

  const requestLocation = async () => {
    const status = await Geolocation.requestPermissions();
    setLocationGranted(status.location === 'granted');
  };

  const requestSMS = async () => {
    try {
      const permission = await Permissions.requestPermissions({ permissions: ['SEND_SMS'] });
      setSmsGranted(permission.sms === 'granted');
    } catch (e) {
      setSmsGranted(false);
    }
  };

  return { locationGranted, smsGranted, requestLocation, requestSMS };
}