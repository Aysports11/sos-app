import { useState, useEffect } from 'react';
import { getContacts, saveContacts, Contact } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => setContacts(getContacts()), []);

  const add = () => {
    if (!name || !phone) return;
    const updated = [...contacts, { id: uuidv4(), name, phone }];
    setContacts(updated);
    saveContacts(updated);
    setName(''); setPhone('');
  };

  const remove = (id: string) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    saveContacts(updated);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Emergency Contacts</h2>
      {contacts.map(c => (
        <div key={c.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-3 flex justify-between">
          <div>
            <p className="font-medium">{c.name}</p>
            <p className="text-sm text-gray-600">{c.phone}</p>
          </div>
          <button onClick={() => remove(c.id)} className="text-sos">Remove</button>
        </div>
      ))}
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded mb-2" />
      <input placeholder="Phone (+123...)" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 border rounded mb-2" />
      <button onClick={add} className="w-full bg-sos text-white py-3 rounded font-medium">Add Contact</button>
    </div>
  );
}