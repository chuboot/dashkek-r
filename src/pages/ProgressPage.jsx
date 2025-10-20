import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from '../components/Sidebar';


const ProgressPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState("All");
    const [selectedRow, setSelectedRow] = useState(null);
    const areaOptions = ["All", "sanur", "kura-kura"];
    const [listPU, setListPU] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
            .then((response) => response.json())
            .then((data) => {
                // data adalah array of object
                const filtered = data.pelakuUsaha;
                setListPU(
                    filtered.map((row) => ({
                        nama: row.NamaPU,
                        area: row.LokasiKEK,
                        progress: row.Progress || "-",
                    }))
                );
                setLoading(false);
            });
    }, []); // tambahkan dependency agar tidak infinite loop

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const area = params.get("area");
        if (area && areaOptions.includes(area)) {
            setSelectedArea(area);
        }
    }, [location.search]);

    const filteredData = selectedArea === "All"
        ? listPU
        : listPU.filter(item => item.area === selectedArea);
    console.log("Filtered Data:", filteredData);



    return (
        <div className="flex min-h-screen bg-[#FFF7EF] text-gray-800">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col">
                <header className="md:hidden flex items-center px-4 h-16 shadow bg-white">
                    <button onClick={() => setSidebarOpen(true)}>☰</button>
                    <h1 className="ml-4 font-semibold">DashKEK</h1>
                </header>
                <main className="flex-1 p-5 md:p-10">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Capaian Progress Pembangunan</h2>
                        {/* Filter Area */}
                        <div className='flex gap-3 mb-6'>
                            {areaOptions.map(area => (
                                <button
                                    key={area}
                                    onClick={() => setSelectedArea(area)}
                                    className={`px-4 py-2 rounded ${selectedArea === area ? 'bg-orange-500 text-white text-xs rounded-full' : 'bg-gray-200 text-xs text-gray-700 rounded-full'}`}
                                >
                                    {area}
                                </button>
                            ))}
                        </div>
                        {/* Table */}
                        <table className="min-w-2xl border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border-b border-gray-300">No</th>
                                    <th className="py-2 px-4 border-b border-gray-300">Name PU</th>
                                    <th className="py-2 px-4 border-b border-gray-300">Progress Pembangunan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    // Skeleton rows
                                    Array.from({ length: 6 }).map((_, idx) => (
                                        <tr key={idx}>
                                            <td className="py-2 px-4 border-b border-gray-300">
                                                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-gray-300">
                                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-gray-300">
                                                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    filteredData.map((item, index) => (
                                        <tr key={index} className={`border-b border-gray-300 ${selectedRow === index ? 'bg-blue-100' : ''}`} onClick={() => setSelectedRow(index)}>
                                            <td className="py-2 px-4 border-b border-gray-300">{index + 1}</td>
                                            <td className="py-2 px-4 border-b border-gray-300">{item.nama}</td>
                                            <td className="py-2 px-4 border-b border-gray-300 text-right">{(item.progress *100).toFixed(0)} %</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ProgressPage;