// Add this line to make it a module (fixes TS1208)
export {};

// Optional: Export dark mode toggle (used in Settings)
export const toggleDarkMode = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', String(isDark));
  return isDark;
};