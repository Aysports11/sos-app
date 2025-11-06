import { useState } from 'react';
import { saveContacts, getContacts, Contact } from '../utils/storage';

export default function Settings() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState<Contact[]>(getContacts());
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  const addContact = () => {
    if (!name || !phone) return;
    const newContact: Contact = {
      id: Date.now().toString(),
      name,
      phone
    };
    const updated = [...contacts, newContact];
    saveContacts(updated);
    setContacts(updated);
    setName('');
    setPhone('');
  };

  const deleteContact = (id: string) => {
    const updated = contacts.filter(c => c.id !== id);
    saveContacts(updated);
    setContacts(updated);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <span className="font-medium">Dark Mode</span>
        <button
          onClick={toggleDarkMode}
          className={`w-14 h-8 rounded-full p-1 transition ${
            darkMode ? 'bg-sos' : 'bg-gray-400'
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow transition-transform ${
              darkMode ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>

      {/* Add Contact */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="tel"
          placeholder="Phone (e.g. +1234567890)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <button
          onClick={addContact}
          className="w-full py-3 bg-sos text-white rounded-lg font-bold"
        >
          Add Contact
        </button>
      </div>

      {/* Contact List */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Emergency Contacts</h3>
        {contacts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No contacts yet</p>
        ) : (
          contacts.map(c => (
            <div
              key={c.id}
              className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{c.phone}</p>
              </div>
              <button
                onClick={() => deleteContact(c.id)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}