import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";

const bedOccupancyData = [
    { name: "Jan 2025", BOR: 35 },
    { name: "Feb 2025", BOR: 45 },
    { name: "Maret 2025", BOR: 75 },
    { name: "April 2025", BOR: 65 },
    { name: "May 2025", BOR: 55 },
    { name: "Juni 2025", BOR: 75 },
    { name: "Juli 2025", BOR: 87 },
];

export default function DashKekKesehatan() {
    return (
        <div className="flex min-h-screen bg-[#FFF7EF] text-gray-800">
            <Sidebar />
            <main className="flex-1 p-5 md:p-10">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { label: "Home", to: "/dashboard" },
                        { label: "KEK Kesehatan", active: true }
                    ]}
                />

                <div className="p-6 space-y-6">
                    <h1 className="text-3xl font-bold">KEK Kesehatan</h1>

                    {/* Jumlah Pasien */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Jumlah Pasien</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl shadow p-4">
                                <p className="text-lg font-medium">WNI</p>
                                <p className="text-2xl font-bold text-blue-600">2.540 pasien</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow p-4">
                                <p className="text-lg font-medium">WNA</p>
                                <p className="text-2xl font-bold text-blue-600">460 pasien</p>
                            </div>
                        </div>
                    </section>

                    {/* SDM Kesehatan */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">SDM Kesehatan</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2">Profesi</th>
                                        <th className="p-2">WNI</th>
                                        <th className="p-2">WNA</th>
                                        <th className="p-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="p-2">Dokter</td><td className="p-2">150</td><td className="p-2">20</td><td className="p-2">170</td></tr>
                                    <tr><td className="p-2">Perawat</td><td className="p-2">300</td><td className="p-2">10</td><td className="p-2">310</td></tr>
                                    <tr><td className="p-2">Tenaga Medis Lainnya</td><td className="p-2">80</td><td className="p-2">5</td><td className="p-2">85</td></tr>
                                    <tr className="font-bold"><td className="p-2">Total</td><td className="p-2">530</td><td className="p-2">35</td><td className="p-2">565</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Jenis Layanan */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Jenis Layanan yang Tersedia</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
                            {["Rawat Inap", "Rawat Jalan", "Kardiologi", "Ortopedi", "Laboratorium", "Telemedis", "Farmasi", "Rehabilitasi"].map(service => (
                                <div key={service} className="bg-white rounded-2xl shadow p-4">
                                    <p className="font-medium text-blue-600">{service}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* BOR */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Rasio Okupansi Tempat Tidur (BOR)</h2>
                        <ul className="list-disc ml-5 space-y-1">
                            <li>Jumlah Tempat Tidur: 200</li>
                            <li>Periode: Juni 2025</li>
                            <li>Hari Terpakai: 4.500 hari</li>
                            <li>BOR: 75%</li>
                        </ul>

                        <div className="h-64 mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={bedOccupancyData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="BOR" fill="#3B82F6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
