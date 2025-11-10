import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import { Users, ArrowUpRight } from "lucide-react"; // Import the Users icon from lucide-react
import { Line } from 'rc-progress';
import qrcodeImg1 from '../assets/qr_bp_perizinan_bgn.png';
import qrcodeImg2 from '../assets/qr_pendaftaran.jpeg';

const ListMediaPublic = () => {
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
                    {/* <Breadcrumb
                        items={[
                            { label: "Home", to: "/dashboard" },
                            { label: `${areaId}-SEZ`, to: `/dashboard/${areaId}` },
                            { label: "Tenaga Kerja", active: true },
                        ]}
                    /> */}
                    <h2 className="text-3xl font-semibold mb-2">Media Publik</h2>
                    <p className="text-base text-gray-600 mb-6 max-w-xl">
                        "Welcome to Pojok Media Public — Kumpulan dokumen publik yang berisi panduan, prosedur, dan informasi resmi terkait kegiatan di Kawasan Ekonomi Khusus."
                    </p>
                    

                    {/* Media Publik: daftar dokumen / alur */}
                    {(() => {
                        const resources = [
                            {
                                id: "buku-panduan",
                                title: "Buku Panduan Perizinan",
                                href: "https://heyzine.com/flip-book/218bd63f55.html#page/1",
                                qrcode: qrcodeImg1, // existing imported QR image
                            },
                            {
                                id: "alur-pendaftaran",
                                title: "Alur pendaftaran pelaku usaha",
                                href: "https://qrco.de/bgQQwr",
                                qrcode: qrcodeImg2, // tambahkan file QR baru di /src/assets atau gunakan path publik
                            },
                        ];
                        return (
                            <div className="mb-6">
                                <ul className="space-y-2 max-w-xl">
                                    {resources.map((r) => (
                                        <li key={r.id}>
                                            <a
                                                href={r.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between bg-white p-3 rounded-lg shadow hover:shadow-md transition"
                                            >
                                                <div className="flex flex-col">
                                                    <h3 className="font-medium text-gray-800">{r.title}</h3>
                                                    <p className="text-sm text-orange-500">Lihat Dokumen <span><ArrowUpRight className="text-gray-400" /></span> </p>
                                                </div>

                                                <div className="flex items-center gap-4">


                                                    <img
                                                        src={r.qrcode}
                                                        alt="QR Buku Panduan"
                                                        className="w-20 h-20 object-contain rounded-md shadow-sm"
                                                    />
                                                   
                                                </div>
                                            </a>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })()}


                </main>
            </div>
        </div>
    )
}

export default ListMediaPublic;
