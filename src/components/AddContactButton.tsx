import { useNavigate } from 'react-router-dom';

export default function AddContactButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/settings')}
      className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 active:scale-95 transition"
    >
      Add Emergency Contact
    </button>
  );
}