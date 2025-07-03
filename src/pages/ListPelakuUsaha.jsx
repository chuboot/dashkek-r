import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ListPelakuUsaha = () => {
  const { areaId } = useParams();
  const [listPU, setListPU] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ECkK7QC1cAwstl9nqLf-HA3ySzXySjugSqVCsXiendHwEun3giJBH6SyIuiQR9M63K_IR6FQ2UYH/pub?output=csv')
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split('\n').filter(row => row.trim() !== '');
        const headers = rows[0].split(',').map(header => header.trim());
        const lokasiIdx = headers.indexOf('LokasiKEK');
        const namaPUIdx = headers.indexOf('NamaPU');
        const filtered = [];
        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(',').map(v => v.trim());
          if (
            values.length > Math.max(lokasiIdx, namaPUIdx) &&
            values[lokasiIdx].toLowerCase() === areaId?.toLowerCase()
          ) {
            filtered.push(values[namaPUIdx]);
          }
        }
        setListPU(filtered);
        setLoading(false);
      });
  }, [areaId]);

  return (
    <div className="flex min-h-screen bg-[#FFF7EF] text-gray-800">
      <Sidebar />
      <main className="flex-1 p-10">
        {/* Breadcrumb */}
        <nav className="text-sm mb-4" aria-label="Breadcrumb">
          <ol className="list-reset flex text-gray-600">
            <li>
              <Link to="/dashboard" className="hover:underline text-blue-600">Home</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to={`/dashboard/${areaId}`} className="hover:underline text-blue-600 capitalize">
                Dashboard {areaId}
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-800 font-semibold">Daftar Pelaku Usaha</li>
          </ol>
        </nav>
        {/* End Breadcrumb */}

        <h2 className="text-2xl font-bold mb-4">Daftar Pelaku Usaha</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#FFF3E0] rounded-lg shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-[#FFD8A8] text-left text-orange-700 font-semibold rounded-tl-lg">No</th>
                  <th className="px-4 py-2 bg-[#FFD8A8] text-left text-orange-700 font-semibold rounded-tr-lg">Nama Pelaku Usaha</th>
                </tr>
              </thead>
              <tbody>
                {listPU.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="px-4 py-4 text-center text-gray-500">Tidak ada data</td>
                  </tr>
                ) : (
                  listPU.map((nama, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-[#FFF7EF]' : 'bg-[#FFE0B2]'}
                    >
                      <td className="px-4 py-2 text-orange-900 font-medium">{idx + 1}</td>
                      <td className="px-4 py-2 text-gray-800">{nama}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ListPelakuUsaha;