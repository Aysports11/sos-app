import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-sos text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-sos font-black text-xl">SOS</span>
          </div>
          <h1 className="text-xl font-bold">SOS Emergency</h1>
        </Link>
        <nav className="flex space-x-4">
          <Link to="/contacts" className="hover:underline">Contacts</Link>
          <Link to="/settings" className="hover:underline">Settings</Link>
        </nav>
      </div>
    </header>
  );
}