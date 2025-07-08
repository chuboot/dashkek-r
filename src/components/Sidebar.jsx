import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, DollarSign, Briefcase, BarChart3, Menu, X, Gem } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/dashboard' },
    { label: 'BUPP / PU', icon: User, path: '/dashboard/sanur/pelaku-usaha' },
    { label: 'Investasi', icon: DollarSign, path: '/dashboard/investasi' },
    { label: 'Tenaga Kerja', icon: Briefcase, path: '/dashboard/tenaga-kerja' },
    { label: 'Progress', icon: BarChart3, path: '/dashboard/progress' },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex-col items-start justify-between bg-[#FEEEDC] p-4 shadow">
       <div className="flex items-center">
         <Gem />
       </div>
        <button onClick={toggleSidebar}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-[#FEEEDC] p-6 flex flex-col justify-between z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:static md:translate-x-0 md:flex md:z-auto`}>
        <div>
          {/* Desktop logo only */}
          <div className="items-center hidden md:flex mb-8">
            <Gem />
            <h1 className='text-2xl font-bold ml-2'>Dashboard KEK</h1>
          </div>

          <nav className="space-y-4">
            {menuItems.map(({ label, icon: Icon, path }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={label}
                  onClick={() => {
                    navigate(path);
                    setIsOpen(false); // Close on mobile after navigation
                  }}
                  className={`flex items-center w-full text-left p-2 rounded-lg transition-colors cursor-pointer ${
                    isActive ? 'bg-orange-200' : 'bg-white hover:bg-orange-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>

        <button onClick={handleLogout} className="mt-10 bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
