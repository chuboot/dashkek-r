// src/components/TenagaKerjaCard.jsx
import React, { useEffect, useState } from 'react';
import { Circle } from 'rc-progress';
import { useParams } from 'react-router-dom'; // <-- Add this import


const TenagaKerjaCard = () => {
  const [jumlahPekerja, setJumlahPekerja] = useState(null);
  const [loading, setLoading] = useState(true);
  const { areaId } = useParams(); // <-- Get areaId from route params

  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ECkK7QC1cAwstl9nqLf-HA3ySzXySjugSqVCsXiendHwEun3giJBH6SyIuiQR9M63K_IR6FQ2UYH/pub?output=csv')
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split('\n').filter(row => row.trim() !== '');
        const headers = rows[0].split(',').map(header => header.trim());
        let totalPekerja = 0;
        const pekerjaColumnIndex = headers.indexOf('Pekerja');
        const lokasiColumnIndex = headers.indexOf('LokasiKEK');

        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(',').map(value => value.trim());
          if (
            values.length > pekerjaColumnIndex &&
            values.length > lokasiColumnIndex
          ) {
            const lokasiValue = values[lokasiColumnIndex].toLowerCase();
            if (lokasiValue === areaId?.toLowerCase()) {
              const pekerjaValue = parseFloat(values[pekerjaColumnIndex]);
              if (!isNaN(pekerjaValue)) {
                totalPekerja += pekerjaValue;
              }
            }
          }
        }

        setJumlahPekerja(totalPekerja);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, [areaId]);

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-red-100 text-red-500 p-2 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                   
                  <path d="M18.5 19.5L20 21M11 14C7.13401 14 4 17.134 4 21H11M19 17.5C19 18.8807 17.8807 20 16.5 20C15.1193 20 14 18.8807 14 17.5C14 16.1193 15.1193 15 16.5 15C17.8807 15 19 16.1193 19 17.5ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
                <span className="font-semibold">Tenaga Kerja</span>
              </div>
              <div className="w-16 h-16">
                <Circle percent={50} strokeWidth={8} strokeColor="#f87171" />
              </div>
            </div>
            <div className="text-3xl font-bold text-center">{loading ? 'Loading...' : jumlahPekerja}</div>
          </div>
    
  );
};

export default TenagaKerjaCard;
