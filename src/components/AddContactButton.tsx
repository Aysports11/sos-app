import { useNavigate } from 'react-router-dom';

export default function AddContactButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/settings')}
      className="mt-6 px-6 py-3 bg-white border-2 border-black text-black rounded-full font-bold shadow hover:bg-gray-50 active:scale-95 transition"
    >
      Add Emergency Contact
    </button>
  );
}