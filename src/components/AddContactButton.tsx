import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveContacts, getContacts, Contact } from '../utils/storage';

export default function AddContact() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  const addContact = () => {
    if (!name.trim() || !phone.trim()) return;
    const newContact: Contact = { id: Date.now().toString(), name: name.trim(), phone: phone.trim() };
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

  return (
    <div className="max-w-md mx-auto p-6 min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-600 dark:text-blue-400 font-medium flex items-center"
      >
        ← Back to Home
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
        Add Emergency Contact
      </h2>

      <div className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-800"
        />
        <input
          type="tel"
          placeholder="Phone (e.g. +1234567890)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full p-3 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-800"
        />
        <button
          onClick={addContact}
          className="w-full py-3 bg-sos text-white rounded-lg font-bold active:scale-95 transition"
        >
          Add Contact
        </button>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-black dark:text-white mb-3">Emergency Contacts</h3>
        {contacts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">No contacts added</p>
        ) : (
          <div className="space-y-2">
            {contacts.map(c => (
              <div key={c.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-black dark:text-white">{c.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{c.phone}</p>
                </div>
                <button onClick={() => deleteContact(c.id)} className="text-red-500 font-bold text-xl">×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}