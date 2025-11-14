import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import JdihCard from "../components/JdihCard";

const ListJdih = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const resources = [
    {
  id: 101,
  title: "PP No.23 Tahun 2023",
  deskripsi: "Peraturan Pemerintah No. 23 Tahun 2023 tentang Kawasan Ekonomi Khusus Kura Kura Bali",
  kategori: "Peraturan Pemerintah",
  tglTerbit: "07 April 2023",
  size: "178.03 KB",
  fileUrl: "/pdfs/pp-no23-2023.pdf"   // lokasi file
},{
      id: 102,
      title: "PP No.41 Tahun 2022",
      deskripsi: "Peraturan Pemerintah No. 41 Tahun 2022 tentang Kawasan Ekonomi Khusus Kura Kura Bali",
      kategori: "Peraturan Pemerintah",
      tglTerbit: "29 Desember 2022",
      size: "150.22 KB",
     fileUrl: "/pdfs/pp-no41-2022.pdf"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#FFF7EF] text-gray-800">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        
        {/* Mobile Header */}
        <header className="md:hidden flex items-center px-4 h-16 shadow bg-white">
          <button onClick={() => setSidebarOpen(true)}>☰</button>
          <h1 className="ml-4 font-semibold">DashKEK</h1>
        </header>

        <main className="flex-1 p-5 md:p-10">
          <Breadcrumb items={["Dashboard", "JDIH"]} />

          <h2 className="text-3xl font-semibold mb-2">JDIH</h2>
          <p className="text-base text-gray-600 mb-6 max-w-xl">
            "Welcome to JDIH — kumpulan dokumen publik yang berisi peraturan, UU,
            dan informasi resmi terkait Kawasan Ekonomi Khusus."
          </p>

          <ul className="space-y-4 max-w-2xl">
            {resources.map((r) => (
              <li key={r.id}>
                <JdihCard {...r} />
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default ListJdih;
