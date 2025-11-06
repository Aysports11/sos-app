import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { SmsManager } from '@byteowls/capacitor-sms';
import { Capacitor } from '@capacitor/core';
import { getContacts } from '../utils/storage';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export function useSOS() {
  const [contacts] = useState<Contact[]>(getContacts());
  const [isSending, setIsSending] = useState(false);

  const sendSOS = async () => {
    if (contacts.length === 0) return;

    setIsSending(true);
    await Haptics.vibrate({ duration: 1000 });

    try {
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      const { latitude, longitude } = pos.coords;
      const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
      const message = `SOS ALERT\nI need help!\nLocation: ${mapsUrl}`;

      if (Capacitor.isNativePlatform()) {
        await SmsManager.send({ numbers: contacts.map(c => c.phone), text: message });
        await Haptics.impact({ style: ImpactStyle.Heavy });
        alert('SOS sent!');
      } else {
        navigator.clipboard.writeText(message);
        alert(`SOS Copied!\nPaste into SMS app:\n\n${message}`);
      }
    } catch (err) {
      await Haptics.impact({ style: ImpactStyle.Light });
      alert('Failed. Check permissions.');
    } finally {
      setIsSending(false);
    }
  };

  return { contacts, isSending, sendSOS };
}