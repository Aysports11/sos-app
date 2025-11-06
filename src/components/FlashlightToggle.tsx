import { useState } from 'react';
import { CapacitorFlash } from '@capgo/capacitor-flash';

export default function FlashlightToggle() {
  const [isOn, setIsOn] = useState(false);

  const toggle = async () => {
    try {
      if (isOn) {
        await CapacitorFlash.switchOff();
      } else {
        await CapacitorFlash.switchOn({ intensity: 100 });
      }
      setIsOn(!isOn);
    } catch (err) {
      alert('Flashlight not available on this device');
    }
  };

  return (
    <button
      onClick={toggle}
      className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white shadow-lg transition-transform active:scale-95"
    >
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOn ? 'bg-yellow-400 shadow-glow' : 'bg-gray-300'
        }`}
      >
        {isOn ? (
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-9a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-9a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <span className="text-sm font-semibold text-gray-700">
        {isOn ? 'ON' : 'Tap for Light'}
      </span>
    </button>
  );
}