import { useParams, useNavigate, Link } from "react-router-dom";
import TenagaKerjaCard from "../components/TenagaKerjaCard";
import InvestasiCard from "../components/InvestasiCard";
import PelakuUsahaCard from "../components/PelakuUsahaCard";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import { useState } from 'react'
import { Users, MessageSquareQuote, Image } from "lucide-react"; // Import the Users icon from lucide-react
import DashKekKesehatan from "../components/DashKekKesehatan";


const areaData = {
    sanur: {
        title: "Sanur SEZ",
        description:
            "A hub for medical excellence and world-class tourism experiences",
        image: "https://chuboot.github.io/melalilali/assets/img/bg-snr.png",

    },
    "kura-kura": {
        title: "Kura Kura Bali SEZ",
        description:
            "A dynamic hub for creative industries, sustainable tourism, and cultural innovation",
        image: "https://chuboot.github.io/melalilali/assets/img/bg-kkb.png",

    },
};

const AreaDetail = () => {
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

    // Fungsi untuk mengubah status sidebar
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#FFF7EF] text-gray-800">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            {/* Header untuk mobile */}
            <div className="flex-1 flex flex-col">
                <header className="md:hidden flex items-center px-4 h-16 shadow bg-white">
                    <button onClick={() => setSidebarOpen(true)}>☰</button>
                    <h1 className="ml-4 font-semibold">DashKEK</h1>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-5 md:p-10">
                    <h2 className="text-3xl font-semibold mb-2">Welcome, Administrator KEK</h2>
                    <p className="text-gray-600 mb-4">
                        "Welcome to Dashboard KEK — shaping sustainable economic zones for a
                        better tomorrow. Your strategic journey starts here."
                    </p>
                    {/* Breadcrumb */}
                    <Breadcrumb
                        items={[
                            { label: "Home", to: "/dashboard" },
                            { label: `${areaId}-SEZ`, active: true }
                        ]}
                    />

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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
                            {/* <h4 className="text-lg font-semibold mb-2">Isu Strategis</h4> */}
                            <div className="flex items-center space-x-2">
                                <div className="bg-orange-100 text-orange-500 p-2 rounded-full">
                                    <MessageSquareQuote />
                                </div>
                                <span className="font-semibold">Isu Strategis</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer">
                            {/* <h4 className="text-lg font-semibold mb-2">Gallery</h4> */}
                            <div className="flex items-center space-x-2">
                                <div className="bg-blue-100 text-blue-500 p-2 rounded-full">
                                    <Image />
                                </div>
                                <span className="font-semibold">Gallery</span>
                            </div>
                        </div>
                    </div>
                    {/* Khusus untuk sektor Kesehatan */}
                            {areaId === "sanur" && (
                                // <KesehatanDetail data={headers} />
                                <DashKekKesehatan />
                            )}
                </main>
            </div>
        </div>
    );
}

export default AreaDetail;