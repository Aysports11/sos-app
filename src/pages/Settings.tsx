import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const isDark = document.documentElement.classList.contains('dark');

  const setLightMode = () => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  };

  const setDarkMode = () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-600 dark:text-blue-400 font-medium flex items-center"
      >
        ← Back to Home
      </button>

      <h2 className="text-2xl font-bold mb-8 text-center text-black dark:text-white">
        Choose Theme
      </h2>

      <div className="space-y-4">
        {/* Light Mode Button */}
        <button
          onClick={setLightMode}
          className={`w-full py-4 rounded-xl font-bold text-lg transition ${
            !isDark
              ? 'bg-white border-2 border-sos text-sos shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          ☀️ Light Mode
        </button>

        {/* Dark Mode Button */}
        <button
          onClick={setDarkMode}
          className={`w-full py-4 rounded-xl font-bold text-lg transition ${
            isDark
              ? 'bg-sos text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          🌙 Dark Mode
        </button>
      </div>
    </div>
  );
}