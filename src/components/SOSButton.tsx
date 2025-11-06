import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { SmsManager } from '@byteowls/capacitor-sms';
import { getContacts } from '../utils/storage';

const alertTypes = [
  { id: 'danger', label: 'EMERGENCY DANGER ALERT', icon: 'EMERGENCY' },
  { id: 'lost', label: 'HELP – I’m Lost', icon: 'MAP' },
  { id: 'money', label: 'HELP – Out of Money', icon: 'MONEY' },
  { id: 'fire', label: 'HELP – House on Fire', icon: 'FIRE' },
  { id: 'suspicious', label: 'SUSPICIOUS PERSON', icon: 'EYE' },
];

// Add props interface
interface SOSButtonProps {
  onNeedLocation?: () => Promise<void>;
}

export default function SOSButton({ onNeedLocation }: SOSButtonProps) {
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
      const device = navigator.userAgent.split('(')[1]?.split(')')[0] ?? 'Unknown';

      const message = `${selected.icon} ${selected.label}\n\nLocation: ${mapsUrl}\nDevice: ${device}\nTime: ${new Date().toLocaleString()}`;

      await SmsManager.send({
        numbers: contacts.map(c => c.phone),
        text: message
      });

      await Haptics.impact({ style: ImpactStyle.Heavy });
      alert('SOS Alert Sent!');
    } catch (err: any) {
      if (err.message?.includes('permission')) {
        alert('Location denied. Enable in Settings.');
        onNeedLocation?.();
      } else {
        alert('Failed: ' + (err.message || 'Check permissions'));
      }
      await Haptics.impact({ style: ImpactStyle.Light });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <select
        value={selected.id}
        onChange={e => setSelected(alertTypes.find(t => t.id === e.target.value)!)}
        className="w-64 p-3 text-lg font-medium border-2 border-sos rounded-xl bg-white dark:bg-gray-900 text-black dark:text-white"
      >
        {alertTypes.map(t => (
          <option key={t.id} value={t.id}>
            {t.icon} {t.label}
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