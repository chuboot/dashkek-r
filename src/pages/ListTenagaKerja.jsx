import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import { Users, ArrowUpRight } from "lucide-react"; // Import the Users icon from lucide-react
import { Line } from 'rc-progress';

const ListTenagaKerja = () => {
    const { areaId } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [listPU, setListPU] = useState([]);
    const [area, setArea] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch TargetTK dari API area KEK
    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
            .then(res => res.json())
            .then(data => {
                // data: array of object, cari berdasarkan KEK === areaId
                const found = data.KEK.filter(
                    (item) => item.ID?.toLowerCase() === areaId?.toLowerCase()
                );
                setArea(found[0]);
                setLoading(false);
                // console.log("Area Data:", found[0].TargetTK);
            }).catch(() => setLoading(false));
    }, [areaId]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
            .then((response) => response.json())
            .then((data) => {
                // data adalah array of object
                const filtered = data.pelakuUsaha.filter(
                    (row) =>
                        row.LokasiKEK &&
                        row.LokasiKEK.toLowerCase() === areaId?.toLowerCase()
                );
                setListPU(
                    filtered.map((row) => ({
                        nama: row.NamaPU,
                        pekerja: row.Pekerja || "-",
                    }))
                );
                setLoading(false);
            });
    }, [areaId]);

  


    // State for sorting
    const [sortConfig, setSortConfig] = useState({ key: "nama", direction: "asc" });
    // Function to sort data
    const sortedListPU = React.useMemo(() => {
        let sortableItems = [...listPU];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (sortConfig.key === "pekerja") {
                    // Pastikan pekerja dibandingkan sebagai angka
                    const aVal = parseFloat(a.pekerja) || 0;
                    const bVal = parseFloat(b.pekerja) || 0;
                    return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
                } else {
                    // Default string comparison
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === "asc" ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === "asc" ? 1 : -1;
                    }
                    return 0;
                }
            });
        }
        return sortableItems;
    }, [listPU, sortConfig]);

    

       let totalTKBU = 0;
   if (area && area.CapaianTKBU) {
     totalTKBU = parseInt(listPU.reduce((sum, item) => sum + (parseFloat(item.pekerja) || 0), 0)) + parseInt(area.CapaianTKBU);
   }

    // Handler for sorting
    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "asc" };
        });
    };

    return (
        <div className="flex min-h-screen bg-[#FFF7EF] text-gray-800">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col">
                <header className="md:hidden flex items-center px-4 h-16 shadow bg-white">
                    <button onClick={() => setSidebarOpen(true)}>☰</button>
                    <h1 className="ml-4 font-semibold">DashKEK</h1>
                </header>
                <main className="flex-1 p-5 md:p-10">
                    <Breadcrumb
                        items={[
                            { label: "Home", to: "/dashboard" },
                            { label: `${areaId}-SEZ`, to: `/dashboard/${areaId}` },
                            { label: "Tenaga Kerja", active: true },
                        ]}
                    />
                    <h2 className="text-2xl font-bold mb-4">Capaian Target Tenaga Kerja</h2>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <div className="flex justify-center w-1/2 mx-auto mb-4">
                                <div className="bg-white p-6 rounded-4xl shadow w-full hover:shadow-lg cursor-pointer flex justify-between my-4">
                                    <div className="flex flex-col justify-between w-full">
                                        <div className="flex items-center space-x-2">
                                            <div className="bg-red-100 text-red-500 p-2 rounded-full">
                                                <Users />
                                            </div>
                                            <span className="font-semibold">Tenaga Kerja</span>
                                        </div>
                                        <div className="flex items-end text-gray-600 text-sm font-semibold mr-auto pt-8">
                                            <ArrowUpRight className="w-4 h-4 mr-1" />
                                            Capain / Target 2025
                                        </div>
                                        <div className="flex items-end space-x-2 pb-2">
                                            <span className="text-4xl md:text-5xl font-bold text-gray-900">  {loading ? "Loading..." : totalTKBU}</span>
                                            <span className="text-2xl font-semibold text-gray-500">/ {area.TargetTK} orang</span>
                                            <div className="flex items-center text-green-600 text-sm font-semibold ml-auto">
                                                <ArrowUpRight className="w-4 h-4 mr-1" />
                                                Tercapai : {((totalTKBU / area.TargetTK) * 100).toFixed(2)}%
                                            </div>
                                        </div>
                                        <div className="w-full h-16">
                                            <Line percent={((totalTKBU / area.TargetTK) * 100).toFixed(2)} strokeWidth={3} strokeColor="#f87171" steps={{ count: 15, gap: -1 }} />
                                        </div>
                                        <div>
                                            {/* Optional: Add a tooltip or additional information here */}
                                            <p className="text-sm text-gray-500 italic">Data s/d Q2 2025</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="min-w-full bg-white rounded-lg shadow">
                                <thead>
                                    <tr>
                                        <th
                                            className="py-2 px-4 cursor-pointer text-left"
                                            onClick={() => handleSort("nama")}
                                        >
                                            Nama PU
                                            {sortConfig.key === "nama" && (
                                                <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
                                            )}
                                        </th>
                                        <th
                                            className="py-2 px-4 cursor-pointer text-left"
                                            onClick={() => handleSort("pekerja")}
                                        >
                                            Pekerja
                                            {sortConfig.key === "pekerja" && (
                                                <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
                                            )}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 font-medium">{area.BUPP} (BUPP)</td>
                                        <td className="py-2 px-4 font-medium">{area.CapaianTKBU}</td>

                                    </tr>
                                    {sortedListPU.map((item, index) => (
                                        <tr key={index} className="border-t border-gray-200">
                                            <td className="py-2 px-4">{item.nama}</td>
                                            <td className="py-2 px-4">{item.pekerja}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default ListTenagaKerja;
