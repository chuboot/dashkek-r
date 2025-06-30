// src/pages/Dashboard.jsx
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Home, User, DollarSign, Briefcase, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#FFF7EF] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#FEEEDC] p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 flex items-center">
            <img src="https://img.icons8.com/ios-filled/50/000000/marker.png" alt="Logo" className="w-6 h-6 mr-2" />
            Dashboard KEK
          </h1>
          <nav className="space-y-4">
            <button className="flex items-center w-full text-left p-2 bg-white rounded-lg">
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            <button className="flex items-center w-full text-left p-2 hover:bg-white rounded-lg">
              <User className="w-5 h-5 mr-3" />
              BUPP / PU
            </button>
            <button className="flex items-center w-full text-left p-2 hover:bg-white rounded-lg">
              <DollarSign className="w-5 h-5 mr-3" />
              Investasi
            </button>
            <button className="flex items-center w-full text-left p-2 hover:bg-white rounded-lg">
              <Briefcase className="w-5 h-5 mr-3" />
              Tenaga Kerja
            </button>
            <button className="flex items-center w-full text-left p-2 hover:bg-white rounded-lg">
              <BarChart3 className="w-5 h-5 mr-3" />
              Progress
            </button>
          </nav>
        </div>
        <button onClick={handleLogout} className="mt-10 bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-2">Welcome, Mr. Raihan</h2>
        <p className="text-gray-600 mb-6 max-w-xl">
          "Welcome to Dashboard KEK — shaping sustainable economic zones for a better tomorrow. Your strategic journey starts here."
        </p>

        <h3 className="text-xl font-semibold mb-4">Select Area</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-200 rounded-xl overflow-hidden hover:shadow-lg cursor-pointer">
            <img
              src="https://chuboot.github.io/melalilali/assets/img/hisi.png"
              alt="Sanur SEZ"
              className="w-full h-48 object-contain bg-gray-300"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2">Sanur SEZ</h4>
              <p className="text-gray-600 text-sm">
                A hub for medical excellence and world-class tourism experiences
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border-2 border-green-500 rounded-xl overflow-hidden hover:shadow-lg cursor-pointer">
            <img
              src="https://chuboot.github.io/melalilali/assets/img/hisi.png"
              alt="Kura Kura Bali SEZ"
              className="w-full h-48 object-contain bg-white"
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
