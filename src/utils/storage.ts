const KEY = 'sos_contacts';

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export const getContacts = (): Contact[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveContacts = (contacts: Contact[]) => {
  localStorage.setItem(KEY, JSON.stringify(contacts));
};
