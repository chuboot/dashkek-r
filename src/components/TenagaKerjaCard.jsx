// src/components/TenagaKerjaCard.jsx
import React, { useEffect, useState } from 'react';
import { Circle } from 'rc-progress';
import { useParams } from 'react-router-dom'; // <-- Add this import
import { Users } from 'lucide-react'; // Import the Users icon from lucide-react


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
                  <Users />
                </div>
                <span className="font-semibold">Tenaga Kerja</span>
              </div>
              <div className="w-16 h-16">
                <Circle percent={80} strokeWidth={15} strokeColor="#f87171" railWidth={6} />
              </div>
            </div>
            <div className="text-3xl font-bold text-center">{loading ? 'Loading...' : jumlahPekerja}</div>
          </div>
    
  );
};

export default TenagaKerjaCard;
