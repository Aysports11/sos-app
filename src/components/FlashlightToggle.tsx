
import { useState } from 'react';
import { CapacitorFlash } from '@capgo/capacitor-flash';

export default function FlashlightToggle() {
  const [isOn, setIsOn] = useState(false);

  const toggle = async () => {
    try {
      if (isOn) await CapacitorFlash.switchOff();
      else await CapacitorFlash.switchOn({ intensity: 100 });
      setIsOn(!isOn);
    } catch {
      alert('Flashlight not available');
    }
  };

  return (
    <button onClick={toggle} className="flex flex-col items-center space-y-2">
      <div className={`w-16 h-16 rounded-full ${isOn ? 'bg-yellow-400' : 'bg-gray-300'} transition-colors`} />
      <span className="text-sm font-medium">{isOn ? 'ON' : 'Tap for Light'}</span>
    </button>
  );
}