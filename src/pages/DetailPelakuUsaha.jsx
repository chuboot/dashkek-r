import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import { ChartNoAxesCombined, Layers, Factory, CircleUserRound, RulerDimensionLine, LayoutGrid } from "lucide-react";
import KesehatanDetail from '../components/KesehatanDetail';

const DetailPelakuUsaha = () => {
    const { areaId, nama } = useParams();
    const [detail, setDetail] = useState(null);
    const [headers, setHeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    // Fungsi untuk mengubah status sidebar
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        // fetch(`https://sheetdb.io/api/v1/g9tm6es3iwk8i/search?NamaPU=${encodeURIComponent(nama)}`)
        // fetch(`https://script.google.com/macros/s/AKfycbzrPEY_RMqX-91XaSygT8_wMWxudu85T2ZNdcG6t4iHgqEeH_dQ2gqkz-c4CVInOwwA3Q/exec?NamaPU=${encodeURIComponent(nama)}`)
        //https://script.google.com/macros/s/AKfycbz1klGLrgBUrtJBf5q_L01Ch9m-luFUpCwks9cJAodvJ410pVJa7-AJz25csQSPszZG5Q/exec?namapu=PT%20Hotel%20International%20Sanur%20Indonesia
        // fetch(`https://script.google.com/macros/s/AKfycbz1klGLrgBUrtJBf5q_L01Ch9m-luFUpCwks9cJAodvJ410pVJa7-AJz25csQSPszZG5Q/exec?namapu=${encodeURIComponent(nama)}`)
        fetch(`https://script.google.com/macros/s/AKfycbyRjzYapewb4kFAiBZq60RI1SBxvI8WNO11RHCvy3e7xslQSdaJzlWJC2AXnzs-qkM8Bg/exec?namapu=${encodeURIComponent(nama)}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.pelakuUsaha.length > 0) {
                    setHeaders(data.pelakuUsaha[0]);
                    console.log(data.pelakuUsaha[0]);
                }
                setLoading(false);
            });
    }, [areaId, nama]);

    if (loading) {
        return <div className="text-center text-lg mt-10">Loading...</div>;
    }

    if (!headers) {
        return <div className="text-center text-lg mt-10">Data tidak ditemukan.</div>;
    }

    

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
                <main className="flex-1 p-5 md:p-10">
                    {/* Breadcrumb */}
                    <Breadcrumb
                        items={[
                            { label: "Home", to: "/dashboard" },
                            { label: `${areaId.slice(0, 4) + ".."}`, to: `/dashboard/${areaId}` },
                            { label: "PU", to: `/dashboard/${areaId}/pelaku-usaha` },
                            { label: detail ? detail.NamaPU : nama, active: true }
                        ]}
                    />
                    {/* End Breadcrumb */}
                    <h2 className="text-2xl font-bold mb-4">Detail Pelaku Usaha</h2>
                    <div className="min-h-screen">
                        <div className="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow">
                            {console.log(headers)}
                            <div className="p-4 md:p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold mb-4">{headers.NamaPU}</h2>
                                <h4 className="text-xl text-gray-500 mb-4">&#40;{headers.BrandPU}&#41;</h4>
                            </div>
                            {/* Overview Section */}
                            <div className="p-4 md:p-6 border-b border-gray-200">
                                <div className="flex items-center mb-4">
                                    <LayoutGrid size={20} />
                                    <h2 className="text-xl font-semibold text-gray-700 ml-2 flex items-center">Overview</h2>
                                </div>


                                <div className="grid grid-cols-1  gap-4 text-gray-700">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <ChartNoAxesCombined size={15} />
                                            <span className="ml-2 font-medium">Total Investasi</span>
                                        </div>
                                        <span>Rp.{headers.Investasi}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className='flex items-center'>
                                            <Layers size={15} />
                                            <span className="ml-2 font-medium">Sektor</span>
                                        </div>
                                        <span>{headers.Sektor}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className='flex items-center'>
                                            <Factory size={15} />
                                            <span className="ml-2 font-medium">Progres Pembangunan</span>
                                        </div>
                                        <span>{(headers.Progress * 100).toFixed(2) + "%"}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className='flex items-center'>
                                            <CircleUserRound size={15} />
                                            <span className="ml-2 font-medium">Tenaga Kerja</span>
                                        </div>
                                        <span>{headers.Pekerja}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className='flex items-center'>
                                            <RulerDimensionLine size={15} />
                                            <span className="ml-2 font-medium">Luas Lahan</span>
                                        </div>
                                        <span>{headers.LuasLahan}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Khusus untuk sektor Kesehatan */}
                            {headers.Sektor === "Kesehatan" && (
                                <KesehatanDetail data={headers} />
                            )}

                            {/* Description Section */}
                            <div className="p-4 md:p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                                    Deskripsi
                                </h2>
                                <p className="text-gray-700 leading-relaxed">{headers.Desc}</p>
                            </div>
                            {/* Update Section */}
                            <div className="p-4 md:p-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Update
                                </h2>
                                <ul className="space-y-4">
                                    {Array.isArray(headers.Update) ? (
                                        headers.Update.map((upd, index) => (
                                            <li key={index} className="relative pl-6">
                                                <div className="absolute left-1 top-1.5 w-2 h-2 bg-gray-300 rounded-full"></div>
                                                <div className="absolute left-1.5 top-1.5 h-full border-l border-gray-300"></div>
                                                <p className="text-sm font-semibold text-gray-800">{upd.date}</p>
                                                <p className="text-gray-700">{upd.description}</p>
                                            </li>
                                        ))
                                    ) : (
                                        Array.isArray(JSON.parse(headers.Update || "[]")) &&
                                        JSON.parse(headers.Update || "[]").map((upd, index) => (
                                            <li key={index} className="relative pl-6">
                                                <div className="absolute left-1 top-1.5 w-2 h-2 bg-gray-300 rounded-full"></div>
                                                <div className="absolute left-1.5 top-1.5 h-full border-l border-gray-300"></div>
                                                <p className="text-sm font-semibold text-gray-800">{upd.date}</p>
                                                <p className="text-gray-700">{upd.description}</p>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default DetailPelakuUsaha;