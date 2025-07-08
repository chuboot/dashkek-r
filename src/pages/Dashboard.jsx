// src/pages/Dashboard.jsx
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Home, User, DollarSign, Briefcase, BarChart3, ChevronRight } from 'lucide-react';
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#FFF7EF] text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-5 md:p-10">
        <h2 className="text-3xl font-semibold mb-2">Welcome, Mr. Raihan</h2>
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
  );
}
