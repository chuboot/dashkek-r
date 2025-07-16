import { useState } from 'react'

const Header = () => {
  // Fungsi untuk mengubah status sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="md:hidden flex items-center px-4 h-16 shadow bg-white">
      <button onClick={() => setSidebarOpen(true)}>☰</button>
      <h1 className="ml-4 font-semibold">Dashboard</h1>
    </header>
  );
};

export default Header;
