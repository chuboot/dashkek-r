import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  Home,
  Users,
  BarChart3,
  DollarSign,
  Briefcase,
  LogOut,
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const menu = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/dashboard/badan-pelaku-usaha", label: "BUPP / PU", icon: Users },
    { to: "/dashboard/investasi", label: "Investasi", icon: DollarSign },
    { to: "/dashboard/tenagakerja", label: "Tenaga Kerja", icon: Briefcase },
    { to: "/dashboard/progress", label: "Progress", icon: BarChart3 },
  ];

  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 z-20 w-48 flex flex-col
                  bg-orange-400 text-white
                  transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
                  md:translate-x-0 transition-transform duration-200`}
    >
      {/* Logo / Header */}
      <div className="flex items-center justify-between px-6 h-16">
        <span className="text-xl font-bold tracking-wide">DashKEK</span>
        <button className="md:hidden" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-2">
        {menu.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition
               ${
                 isActive
                   ? "bg-amber-600 text-white"
                   : "text-white/80 hover:bg-amber-800/80 hover:text-white"
               }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={() => signOut(auth)}
        className="flex items-center gap-3 px-6 py-3 text-white -500 hover:bg-orange-700/80 hover:text-white transition"
      >
        <LogOut size={20} />
        Logout
      </button>
      <div className="p-4 text-center text-xs text-white/70 border-t border-white/20">
        <p className="text-sm mb-2">© 2025 DashKEK </p>
        <p className="text-xs">Develop by </p>
        <p className="text-xs">Pranata Komputer Administrator</p>  
        <p className="text-xs">KEK Sanur & Kura Kura Bali</p>  
      </div>
      
    </aside>
  );
}
