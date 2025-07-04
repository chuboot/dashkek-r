import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ChevronRight } from "lucide-react";

// Fungsi slugify sederhana
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, '')       // Hapus karakter non-word
    .replace(/\-\-+/g, '-');        // Ganti multiple - dengan single -
}

const DetailPelakuUsaha = () => {
  const { areaId, namaPU } = useParams();
  const [detail, setDetail] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ECkK7QC1cAwstl9nqLf-HA3ySzXySjugSqVCsXiendHwEun3giJBH6SyIuiQR9M63K_IR6FQ2UYH/pub?output=csv')
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split('\n').filter(row => row.trim() !== '');
        const headersArr = rows[0].split(',').map(header => header.trim());
        setHeaders(headersArr);
        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(',').map(v => v.trim());
          const lokasiIdx = headersArr.indexOf('LokasiKEK');
          const namaPUIdx = headersArr.indexOf('NamaPU');
          if (
            values.length === headersArr.length &&
            values[lokasiIdx].trim().toLowerCase() === areaId?.trim().toLowerCase() &&
            slugify(values[namaPUIdx]) === namaPU // <-- gunakan slugify di sini
          ) {
            setDetail(values);
            break;
          }
        }
        setLoading(false);
      });
  }, [areaId, namaPU]);

  return (
    <div className="flex min-h-screen bg-[#FFF7EF] text-gray-800">
      <Sidebar />
      <main className="flex-1 p-10">
        {/* Breadcrumb */}
        <nav className="bg-white rounded-lg shadow px-6 py-3 mb-6 flex items-center" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link to="/dashboard" className="hover:underline text-blue-600 font-medium">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link
                to={`/dashboard/${areaId}`}
                className="hover:underline text-blue-600 font-medium capitalize"
              >
                {areaId}-SEZ
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link
                to={`/dashboard/${areaId}/pelaku-usaha`}
                className="hover:underline text-blue-600 font-medium"
              >
                Pelaku Usaha
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li className="text-orange-500 font-semibold">{detail ? detail[headers.indexOf('NamaPU')] : namaPU}</li>
          </ol>
        </nav>
        {/* End Breadcrumb */}

        <h2 className="text-2xl font-bold mb-4">Detail Pelaku Usaha</h2>
        {loading ? (
          <div>Loading...</div>
        ) : detail ? (
          <>
            {/* List NamaPU, LuasLahan, Sektor */}
            <ul className="mb-6 list-disc pl-6">
              <li>
                <span className="font-semibold text-orange-700">Nama Pelaku Usaha:</span>{' '}
                {detail[headers.indexOf('NamaPU')]}
              </li>
              <li>
                <span className="font-semibold text-orange-700">Luas Lahan:</span>{' '}
                {detail[headers.indexOf('LuasLahan')]}
              </li>
              <li>
                <span className="font-semibold text-orange-700">Sektor:</span>{' '}
                {detail[headers.indexOf('Sektor')]}
              </li>
            </ul>
            {/* Tabel detail semua kolom */}
            <div className="overflow-x-auto">
              <table className="min-w-fit bg-[#FFF3E0] rounded-lg shadow">
                <tbody>
                  {headers.map((header, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 font-semibold text-orange-700">{header}</td>
                      <td className="px-4 py-2 text-gray-800">{detail[idx]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-gray-500">Data tidak ditemukan.</div>
        )}
      </main>
    </div>
  );
};

export default DetailPelakuUsaha;