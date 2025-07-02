import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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
    <div className="p-6">
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
        <ul className="list-disc pl-6">
          {listPU.map((nama, idx) => (
            <li key={idx}>{nama}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListPelakuUsaha;