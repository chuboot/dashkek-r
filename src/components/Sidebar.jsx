import { useNavigate } from "react-router-dom";
import { Home, User, DollarSign, Briefcase, BarChart3, ChevronRight } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';




export default function Sidebar() {
  const navigate = useNavigate();
   const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <aside className="w-64 bg-[#FEEEDC] p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 flex items-center">
            <img src="https://img.icons8.com/ios-filled/50/000000/marker.png" alt="Logo" className="w-6 h-6 mr-2" />
            Dashboard KEK
          </h1>
          <nav className="space-y-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center w-full text-left p-2 bg-white rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => navigate('/dashboard/sanur/pelaku-usaha')}
              className="flex items-center w-full text-left p-2 hover:bg-white rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
            >
              <User className="w-5 h-5 mr-3" />
              BUPP / PU
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center w-full text-left p-2 hover:bg-white rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
            >
              <DollarSign className="w-5 h-5 mr-3" />
              Investasi
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center w-full text-left p-2 hover:bg-white rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
            >
              <Briefcase className="w-5 h-5 mr-3" />
              Tenaga Kerja
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center w-full text-left p-2 hover:bg-white rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
            >
              <BarChart3 className="w-5 h-5 mr-3" />
              Progress
            </button>
          </nav>
        </div>
        <button onClick={handleLogout} className="mt-10 bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </aside>
  );
}
