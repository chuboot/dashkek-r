// src/components/TenagaKerjaCard.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Tambahkan Link
import { Circle } from 'rc-progress';
import { Building2 } from 'lucide-react';


const PelakuUsahaCard = () => {
  const [jumlahPelakuUsaha, setJumlahPelakuUsaha] = useState(null);
  const [loading, setLoading] = useState(true);
  const { areaId } = useParams(); // <-- Get areaId from route params

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
        setJumlahPelakuUsaha(filtered.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, [areaId]); // <-- Add areaId as dependency

  return (
    <Link to={`/dashboard/${areaId}/pelaku-usaha`}>
      <div className="bg-white p-6 rounded-4xl shadow hover:shadow-lg flex flex-col justify-between cursor-pointer">
        <div className="flex items-center space-x-2">
          <div className="bg-purple-100 text-purple-500 p-2 rounded-full">
            <Building2 />
          </div>
          <span className="font-semibold">Pelaku Usaha</span>
        </div>
        <div className="text-5xl font-bold text-gray-900 text-center py-3">
          {loading ? <span className="inline-block w-32 h-10 bg-gray-200 rounded animate-pulse" /> : jumlahPelakuUsaha}
        </div>
        <div>
          {/* Optional: Add a tooltip or additional information here */}
          <p className="text-sm text-gray-500 italic">Data s/d Q2 2025</p>
        </div>
      </div>
    </Link>
  );
};

export default PelakuUsahaCard;
