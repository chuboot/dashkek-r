import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Circle } from "rc-progress";
import TenagaKerjaCard from "../components/TenagaKerjaCard";
import InvestasiCard from "../components/InvestasiCard";
import PelakuUsahaCard from "../components/PelakuUsahaCard";
import Sidebar from "../components/Sidebar";


const areaData = {
  sanur: {
    title: "Sanur SEZ",
    description:
      "A hub for medical excellence and world-class tourism experiences",
    image: "https://chuboot.github.io/melalilali/assets/img/bg-snr.png",
    tenagaKerja: 373,
    investasi: 167,
    pelakuUsaha: 13,
  },
  "kura-kura": {
    title: "Kura Kura Bali SEZ",
    description:
      "A dynamic hub for creative industries, sustainable tourism, and cultural innovation",
    image: "https://chuboot.github.io/melalilali/assets/img/bg-kkb.png",
    tenagaKerja: 556,
    investasi: 110,
    pelakuUsaha: 2,
  },
};

export default function AreaDetail() {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const area = areaData[areaId];

  if (!area) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Area not found</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FFF7EF] text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-2">Welcome, Mr. Raihan</h2>
        <p className="text-gray-600 mb-4">
          "Welcome to Dashboard KEK — shaping sustainable economic zones for a
          better tomorrow. Your strategic journey starts here."
        </p>
        <nav
          className="border-y border-y-gray-200 px-6 py-3 mb-6 flex items-center"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link to="/dashboard" className="hover:underline text-blue-600 font-medium">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li className="text-orange-500 font-semibold">{area.title}</li>
          </ol>
        </nav>
        <div className="mb-8">
          <img
            src={area.image}
            alt={area.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3 className="text-2xl font-semibold mt-4">{area.title}</h3>
          <p className="text-gray-600">{area.description}</p>
        </div>
        {/* Statistic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <TenagaKerjaCard />
          {/* Card 2 */}
          <InvestasiCard />
          {/* Card 3 */}
          <PelakuUsahaCard />
        </div>
        {/* Other Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer">
            <h4 className="text-lg font-semibold mb-2">Isu Strategis</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer">
            <h4 className="text-lg font-semibold mb-2">Gallery</h4>
          </div>
        </div>
      </main>
    </div>
  );
}
