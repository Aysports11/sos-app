import { Haptics } from '@capacitor/haptics';
import { useSOS } from '../hooks/useSOS';

export default function SOSButton() {
  const { contacts, isSending, sendSOS } = useSOS();

  const handleSOS = async () => {
    await Haptics.vibrate();
    await sendSOS();
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <button
        onClick={handleSOS}
        disabled={isSending || contacts.length === 0}
        className={`
          w-64 h-64 rounded-full shadow-2xl transition-all
          ${isSending ? 'bg-gray-400' : 'bg-sos hover:bg-sosDark active:scale-95'}
          text-white font-black text-5xl uppercase tracking-wider
          flex items-center justify-center
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isSending ? 'SENDING...' : 'SOS'}
      </button>
      {contacts.length === 0 && (
        <p className="text-sos font-medium">Add emergency contacts first!</p>
      )}
    </div>
  );
}