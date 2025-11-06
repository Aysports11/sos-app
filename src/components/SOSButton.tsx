import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { SmsManager } from '@byteowls/capacitor-sms';
import { Media } from '@capacitor-community/media';
import { getContacts } from '../utils/storage';

const alertTypes = [
  { id: 'danger', label: 'DANGER ALERT', icon: '🚨', sound: 'danger.mp3' },
  { id: 'lost', label: 'HELP - I\'m Lost', icon: '🗺️', sound: 'lost.mp3' },
  { id: 'money', label: 'HELP - Out of Money', icon: '💰', sound: 'money.mp3' },
  { id: 'fire', label: 'HELP - House on Fire', icon: '🔥', sound: 'fire.mp3' },
  { id: 'suspicious', label: 'SUSPICIOUS PERSON', icon: '👀', sound: 'suspicious.mp3' },
];

export default function SOSButton() {
  const [selected, setSelected] = useState(alertTypes[0]);
  const [sending, setSending] = useState(false);
  const contacts = getContacts();

  const sendAlert = async () => {
    if (contacts.length === 0) {
      alert('Add emergency contacts first!');
      return;
    }

    setSending(true);
    await Haptics.vibrate({ duration: 1000 });

    try {
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      const { latitude, longitude } = pos.coords;
      const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
      const device = navigator.userAgent.split('(')[1].split(')')[0];

      const message = `${selected.icon} ${selected.label}\n\nLocation: ${mapsUrl}\nDevice: ${device}\nTime: ${new Date().toLocaleString()}`;

      await SmsManager.send({
        numbers: contacts.map(c => c.phone),
        text: message
      });

      // Play sound
      const player = await Media.createPlayer({
        url: `/assets/sounds/${selected.sound}`,
        volume: 1.0
      });
      await player.play();

      await Haptics.impact({ style: ImpactStyle.Heavy });
      alert('SOS Alert Sent!');
    } catch (err: any) {
      await Haptics.impact({ style: ImpactStyle.Light });
      alert('Failed: ' + (err.message || 'Check permissions'));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <select
        value={selected.id}
        onChange={(e) => setSelected(alertTypes.find(t => t.id === e.target.value)!)}
        className="w-64 p-3 text-lg font-medium border-2 border-sos rounded-xl bg-white"
      >
        {alertTypes.map(type => (
          <option key={type.id} value={type.id}>
            {type.icon} {type.label}
          </option>
        ))}
      </select>

      <button
        onClick={sendAlert}
        disabled={sending}
        className={`w-64 h-64 rounded-full shadow-2xl text-white font-black text-5xl flex items-center justify-center transition-all ${
          sending ? 'bg-gray-400' : 'bg-sos hover:bg-sosDark active:scale-95'
        }`}
      >
        {sending ? 'SENDING...' : 'SOS'}
      </button>
    </div>
  );
}