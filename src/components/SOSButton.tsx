import { useState } from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { SmsManager } from '@byteowls/capacitor-sms';
import { getContacts } from '../utils/storage';

const alertTypes = [
  { id: 'danger', label: '🚨 DANGER ALERT - Immediate Help Needed', icon: '🚨' },
  { id: 'lost', label: '🗺️ HELP - I\'m Lost and Need Directions', icon: '🗺️' },
  { id: 'money', label: '💰 HELP - Out of Money, Need Assistance', icon: '💰' },
  { id: 'fire', label: '🔥 EMERGENCY - House on Fire, Evacuate Area', icon: '🔥' },
  { id: 'suspicious', label: '👀 SUSPICIOUS PERSON DETECTED - Need Backup', icon: '👀' },
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
      const device = navigator.userAgent.split('(')[1]?.split(')')[0] ?? 'Unknown Device';
      const time = new Date().toLocaleString();

      const message = `${selected.icon} ${selected.label}\n\nDevice: ${device}\nTime: ${time}\n\nPlease call me immediately!`;

      await SmsManager.send({
        numbers: contacts.map(c => c.phone),
        text: message,
      });

      await Haptics.impact({ style: ImpactStyle.Heavy });
      alert('SOS Alert Sent! Native SMS app opened with prefilled message.');
    } catch (err: any) {
      await Haptics.impact({ style: ImpactStyle.Light });
      alert('SMS failed: ' + (err.message || 'Check SMS permissions.'));
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
        {alertTypes.map((t) => (
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

      {contacts.length === 0 && (
        <p className="text-sos font-medium">
          Add emergency contacts first!
        </p>
      )}
    </div>
  );
}