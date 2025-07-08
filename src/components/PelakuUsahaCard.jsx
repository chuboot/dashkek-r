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
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ECkK7QC1cAwstl9nqLf-HA3ySzXySjugSqVCsXiendHwEun3giJBH6SyIuiQR9M63K_IR6FQ2UYH/pub?output=csv')
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split('\n').filter(row => row.trim() !== '');
        const headers = rows[0].split(',').map(header => header.trim());
        let filteredRowCount = 0;
        const locationColumnIndex = headers.indexOf('LokasiKEK');
        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(',').map(value => value.trim());
          if (values.length > locationColumnIndex) {
            const locationValue = values[locationColumnIndex].trim().toLowerCase();
            if (locationValue === areaId?.toLowerCase()) { // <-- Compare with areaId from params
              filteredRowCount++;
            }
          }
        }
        setJumlahPelakuUsaha(filteredRowCount);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, [areaId]); // <-- Add areaId as dependency

  return (
    <Link to={`/dashboard/${areaId}/pelaku-usaha`}>
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex flex-col justify-between cursor-pointer">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-purple-100 text-purple-500 p-2 rounded-full">
            <Building2 />
          </div>
          <span className="font-semibold">Pelaku Usaha</span>
        </div>
        <div className="text-4xl font-bold text-center mb-4">{loading ? 'Loading...' : jumlahPelakuUsaha}</div>
      </div>
    </Link>
  );
};

export default PelakuUsahaCard;
