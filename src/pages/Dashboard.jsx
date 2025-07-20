// src/pages/Dashboard.jsx
import { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import Header from '../components/Header'; // Assuming you have a Header component


// Komponen Utama Aplikasi
const Dashboard = () => {
  const navigate = useNavigate();

  // Fungsi untuk mengubah status sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="flex min-h-screen">
      {/* Sidebar (drawer on mobile) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Area konten */}
      <div className="flex-1 flex flex-col">
        {/* Header untuk mobile */}
        <header className="md:hidden flex items-center px-4 h-16 shadow bg-white">
          <button onClick={() => setSidebarOpen(true)}>☰</button>
          <h1 className="ml-4 font-semibold">DashKEK</h1>
        </header>

        <main className="flex-1 p-5 md:p-10">
          <h2 className="text-3xl font-semibold mb-2">Welcome, Administrator KEK</h2>
          <p className="text-base text-gray-600 mb-6 max-w-xl">
            "Welcome to Dashboard KEK — shaping sustainable economic zones for a better tomorrow. Your strategic journey starts here."
          </p>

          <h3 className="text-xl font-semibold mb-4">Select Area</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div
              onClick={() => navigate('/dashboard/sanur')}
              className="border-2 border-orange-400 rounded-xl overflow-hidden hover:shadow-lg cursor-pointer"
            >
              <img
                src="https://chuboot.github.io/melalilali/assets/img/hisi.png"
                alt="Sanur SEZ"
                className="w-full h-48 object-contain bg-white"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">Sanur SEZ</h4>
                <p className="text-gray-600 text-sm">
                  A hub for medical excellence and world-class tourism experiences
                </p>
              </div>
            </div>

            {/* Card 2 - Link to Kura Kura Bali SEZ */}
            <div
              onClick={() => navigate('/dashboard/kura-kura')}
              className="border-2 border-green-500 rounded-xl overflow-hidden hover:shadow-lg cursor-pointer"
            >
              <img
                src="https://chuboot.github.io/melalilali/assets/img/kkb-sez.png"
                alt="Kura Kura Bali SEZ"
                className="w-full h-48 object-contain bg-[#FBFBF1]"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">Kura Kura Bali SEZ</h4>
                <p className="text-gray-600 text-sm">
                  A dynamic hub for creative industries, sustainable tourism, and cultural innovation
                </p>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};



export default Dashboard
