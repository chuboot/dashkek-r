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
      deskripsi:
        "Peraturan Pemerintah No. 23 Tahun 2023 tentang Kawasan Ekonomi Khusus Kura Kura Bali",
      kategori: "Peraturan Pemerintah",
      tglTerbit: "07 April 2023",
      fileUrl: "/pdfs/pp-no23-2023.pdf", // lokasi file
    },
    {
      id: 102,
      title: "PP No.41 Tahun 2022",
      deskripsi:
        "Peraturan Pemerintah No. 41 Tahun 2022 tentang Kawasan Ekonomi Khusus Kura Kura Bali",
      kategori: "Peraturan Pemerintah",
      tglTerbit: "29 Desember 2022",
      fileUrl: "/pdfs/pp-no41-2022.pdf",
    },
    ,
{
id: 103,
title: "PERSEKJEN DENAS KEK No.9 TAHUN 2025",
deskripsi: "Peraturan Sekretaris Jenderal Dewan Nasional Kawasan Ekonomi Khusus Nomor 9 Tahun 2025 tentang Perubahan Keenam Atas Peraturan Sekretaris Jendral Dewan Nasional Kawasan Ekonomi Khusus Nomor 1 tahun 2022 tentang Perubahan Kegiatan Utama Kawasan Ekonomi Khusus",
kategori: "Peraturan Sekretaris Jenderal Dewan Nasional Kawasan Ekonomi Khusus",
tglTerbit: "25 Agustus 2025",
fileUrl: "/pdfs/PERSEKJEN-DENAS-KEK-No9-2025.pdf",
},
{
id: 104,
title: "PERSEKJEN DENAS KEK No.4 TAHUN 2025",
deskripsi: "Peraturan Sekretaris Jenderal Dewan Nasional Kawasan Ekonomi Khusus Nomor 4 Tahun 2025 tentang Pedoman Penerbitan, Perubahan, dan Pencabutan Tanda Pengenal Khusus Badan Usaha dan/atau Pelaku Usaha di Kawasan Ekonomi Khusus",
kategori: "Peraturan Sekretaris Jenderal Dewan Nasional Kawasan Ekonomi Khusus",
tglTerbit: "21 April 2025",
fileUrl: "/pdfs/PERSEKJEN-DENAS-KEK-No4-2025.pdf",
},
{
id: 105,
title: "PERSEKJEN DENAS KEK No.2 TAHUN 2025",
deskripsi: "Peraturan Sekretaris Jenderal Dewan Nasional Kawasan Ekonomi Khusus Nomor 2 Tahun 2025 tentang Perubahan Kelima Atas Peraturan Sekretaris Jendral Dewan Nasional Kawasan Ekonomi Khusus Nomor 1 tahun 2022 tentang Perubahan Kegiatan Utama Kawasan Ekonomi Khusus",
kategori: "Peraturan Sekretaris Jenderal Dewan Nasional Kawasan Ekonomi Khusus",
tglTerbit: "25 Maret 2025",
fileUrl: "/pdfs/PERSEKJEN-DENAS-KEK-No2-2025.pdf",
},
{
id: 106,
title: "PERSEKJEN DENAS KEK No.7 TAHUN 2024",
deskripsi: "Peraturan Sekretaris Jenderal Dewan Nasional Kawasan Ekonomi Khusus Nomor 7 Tahun 2024 tentang Perubahan Keempat Atas Peraturan Sekretaris Jendral Dewan Nasional Kawasan Ekonomi Khusus Nomor 1 tahun 2022 tentang Perubahan Kegiatan Utama Kawasan Ekonomi Khusus",
kategori: "Peraturan Sekretaris Jenderal Dewan Nasional Kawasan Ekonomi Khusus",
tglTerbit: "9 Oktober 2024",
fileUrl: "/pdfs/PERSEKJEN-DENAS-KEK-No7-2024.pdf",
},
{
id: 107,
title: "PERSEKJEN DENAS KEK No.5 TAHUN 2024",
deskripsi: "Peraturan Sekretaris Jenderal Dewan Nasional Kawasan Ekonomi Khusus Nomor 5 Tahun 2024 tentang Pedoman Pengelolaan dan Evaluasi Pengelolaan Kawasan Ekonomi Khusus",
kategori: "Peraturan Sekretaris Jenderal Dewan Nasional Kawasan Ekonomi",
tglTerbit: "31 Mei 2024",
fileUrl: "/pdfs/PERSEKJEN-DENAS-KEK-No5-2024.pdf",
},
{
id: 108,
title: "PERSEKJEN No.4 Tahun 2024",
deskripsi: "Peraturan Sekretaris Jenderal Dewan Nasional Kawasan Ekonomi Khusus Nomor 4 Tahun 2024 tentang Pedoman Pelaporan Perkembangan, Evaluasi Pelaksanaan Pembangunan, dan Evaluasi Kesiapan Beroperasi Kawasan Ekonomi Khusus",
kategori: "Peraturan Sekretaris Jenderal Dewan Nasional Kawasan Ekonomi Khusus",
tglTerbit: "31 Mei 2024",
fileUrl: "/pdfs/PERSEKJEN-DENAS-KEK-No4-2024.pdf",
},
{
id: 109,
title: "PERDENAS KEK No.2 Tahun 2024",
deskripsi: "Peraturan Dewan Nasional Kawasan Ekonomi Khusus Nomor 2 Tahun 2024 tentang Pedoman Evaluasi Kelengkapan dan Pengkajian Usulan Pembentukan Kawasan Ekonomi Khusus",
kategori: "Peraturan Dewan Nasional Kawasan Ekonomi Khusus",
tglTerbit: "3 April 2024",
fileUrl: "/pdfs/PERDENAS-KEK-No2-2024.pdf",
},
{
id: 111,
title: "PERWAKO DENPASAR No.8 Tahun 2023",
deskripsi: "Peraturan Walikota Denpasar Nomor 8 ahun 2023 tentang Rencana Detail Tata Ruang Wilayah Perencanaan Selatan",
kategori: "Peraturan Walikota Denpasar",
tglTerbit: "3 Maret 2023",
fileUrl: "/pdfs/PERWAKO-DENPASAR-No8-2023.pdf",
},
{
id: 112,
title: "UU No.6 Tahun 2023",
deskripsi: "Undang-Undang Republik Indonesia Nomor 6 tahun 2023 tentang Penetapan Peraturan Pemerintah Penggangi Undang-Undang Nomor 2 tahun 2022 tentang Cipta Kerja Menjadi Undang-Undang",
kategori: "Undang-Undang",
tglTerbit: "31 Maret 2023",
fileUrl: "/pdfs/UU-No6-2023.pdf",
},
{
id: 113,
title: "KEPPRES RI No. 6 tahun 2023",
deskripsi: "Keputusan Presiden Republik Indonesia Nomor 6 tahun 2023 tentang Dewan Kawasan Kawasan Ekonomi Khusus",
kategori: "Keputusan Presiden Republik Indonesia",
tglTerbit: "5 April 2023",
fileUrl: "/pdfs/KEPPRES RI-No6-2023.pdf",
},
{
id: 115,
title: "HIMPUNAN SATU NASKAH PENGATURAN KAWASAN EKONOMI KHUSUS",
deskripsi: "Himpunan Satu Naskah UU No. 39 tahun 2009 tentang Kawasan Ekonomi Khusus dan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 tahun 2022 tentang Cipta Kerja",
kategori: "Himpunan Satu Naskah Pengaturan KEK",
tglTerbit: "25 Mei 2023",
fileUrl: "/pdfs/HIMPUNAN-SATU-NASKAH-PENGATURAN-KAWASAN-EKONOMI-KHUSUS.pdf",
},
{
id: 116,
title: "PP No.40 TAHUN 2021",
deskripsi: "Peraturan Pemerintah No. 40 Tahun 2021 tentang Penyelenggaraan Kawasan Ekonomi Khusus",
kategori: "Peraturan Pemerintah",
tglTerbit: "29 Desember 2022",
fileUrl: "/pdfs/PP-Nomor-40-Tahun-2021.pdf",
},
{
id: 109,
title: "PERDENAS KEK No.1 Tahun 2024",
deskripsi: "Peraturan Dewan Nasional Kawasan Ekonomi Khusus Nomor 1 Tahun 2024 tentang Pedoman Pengusulan Pembentukan Kawasan Ekonomi Khusus",
kategori: "Peraturan Dewan Nasional Kawasan Ekonomi Khusus",
tglTerbit: "3 April 2024",
fileUrl: "/pdfs/PERDENAS-KEK-No1-2024.pdf",
},

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
            "Welcome to JDIH — kumpulan dokumen publik yang berisi peraturan,
            UU, dan informasi resmi terkait Kawasan Ekonomi Khusus."
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
