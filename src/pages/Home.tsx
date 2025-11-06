import { Link } from 'react-router-dom';
import SOSButton from '../components/SOSButton';
import FlashlightToggle from '../components/FlashlightToggle';
import { getContacts } from '../utils/storage';

export default function Home() {
  const contacts = getContacts();

  return (
    <div className="max-w-md mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-between">
      {/* Top */}
      <div className="text-center">
        <h2 className="text-4xl font-black text-black dark:text-white mb-2">
          Farmrod SOS
        </h2>
        <p className="text-sm text-black dark:text-white">
          {contacts.length} contact{contacts.length !== 1 ? 's' : ''} ready
        </p>
      </div>

      {/* Middle */}
      <div className="flex flex-col items-center space-y-6">
        <SOSButton />
        <Link
          to="/add-contact"
          className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-black dark:border-white text-black dark:text-white rounded-full font-bold shadow hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition"
        >
          Add Emergency Contact
        </Link>
      </div>

      {/* Bottom */}
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