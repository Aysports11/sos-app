import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { SmsManager } from '@byteowls/capacitor-sms';
import { Capacitor } from '@capacitor/core';
import { Media } from '@capacitor-community/media';
import { getContacts } from '../utils/storage';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export function useSOS() {
  const [contacts] = useState<Contact[]>(getContacts());
  const [isSending, setIsSending] = useState(false);
  const [alertType, setAlertType] = useState('danger'); // Default

  const sendSOS = async () => {
    if (contacts.length === 0) return;

    setIsSending(true);
    await Haptics.vibrate({ duration: 1000 });

    try {
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      const { latitude, longitude } = pos.coords;
      const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
      const userInfo = navigator.userAgent; // Device info for detection

      // Custom messages by type
      const messages = {
        danger: `🚨 DANGER ALERT 🚨\nI need immediate help!\nLocation: ${mapsUrl}\nDevice: ${userInfo}`,
        lost: `🗺️ HELP - I'm lost!\nSend directions.\nLocation: ${mapsUrl}\nDevice: ${userInfo}`,
        money: `💰 HELP - Out of money!\nNeed financial assistance.\nLocation: ${mapsUrl}\nDevice: ${userInfo}`,
        fire: `🔥 EMERGENCY - Fire!\nEvacuate area.\nLocation: ${mapsUrl}\nDevice: ${userInfo}`,
        suspicious: `👀 SUSPICIOUS PERSON DETECTED\nNeed backup.\nLocation: ${mapsUrl}\nDevice: ${userInfo}`
      };

      const message = messages[alertType as keyof typeof messages] || messages.danger;

      if (Capacitor.isNativePlatform()) {
        await SmsManager.send({ numbers: contacts.map(c => c.phone), text: message });
        // Play sound
        const player = await Media.createPlayer({
          url: `./assets/sounds/${alertType}.mp3`,
          volume: 1.0,
        });
        await player.play();
        await Haptics.impact({ style: ImpactStyle.Heavy });
        alert('SOS sent with logo!');
      } else {
        navigator.clipboard.writeText(message);
        alert(`SOS Copied! Paste in SMS:\n\n${message}`);
      }
    } catch (err) {
      await Haptics.impact({ style: ImpactStyle.Light });
      alert('Failed. Check permissions.');
    } finally {
      setIsSending(false);
    }
  };

  return { contacts, isSending, sendSOS, alertType, setAlertType };
}