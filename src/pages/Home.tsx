import SOSButton from '../components/SOSButton';
import Flashlight from '../components/FlashlightToggle';

export default function Home() {
  return (
    <div className="max-w-md mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Tap SOS in Emergency
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-12">
        Sends your location to trusted contacts instantly.
      </p>

      <SOSButton />

      <div className="mt-16">
        <Flashlight />
      </div>

      <div className="mt-12 text-sm text-gray-500">
        <p>Works offline • PWA Installable • Privacy First</p>
      </div>
    </div>
  );
}