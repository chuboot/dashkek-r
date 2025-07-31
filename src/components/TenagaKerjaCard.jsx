// src/components/TenagaKerjaCard.jsx
import React, { useEffect, useState } from 'react';
import { Circle } from 'rc-progress';
import { useParams } from 'react-router-dom'; // <-- Add this import
import { Users, ArrowUpRight } from 'lucide-react'; // Import the Users icon from lucide-react


const TenagaKerjaCard = () => {
  const [jumlahPekerja, setJumlahPekerja] = useState(null);
  const [loading, setLoading] = useState(true);
  const { areaId } = useParams(); // <-- Get areaId from route params

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbz1klGLrgBUrtJBf5q_L01Ch9m-luFUpCwks9cJAodvJ410pVJa7-AJz25csQSPszZG5Q/exec')
      .then((response) => response.json())
      .then((data) => {
        // data adalah array of object
        let totalPekerja = 0;
        data.forEach((row) => {
          if (
            row.LokasiKEK &&
            row.LokasiKEK.toLowerCase() === areaId?.toLowerCase()
          ) {
            const pekerjaValue = parseFloat(row.Pekerja);
            if (!isNaN(pekerjaValue)) {
              totalPekerja += pekerjaValue;
            }
          }
        });
        setJumlahPekerja(totalPekerja);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, [areaId]);

  return (
    <div className="bg-white p-6 rounded-4xl shadow hover:shadow-lg cursor-pointer flex justify-between">
      <div className="flex flex-col justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-red-100 text-red-500 p-2 rounded-full">
            <Users />
          </div>
          <span className="font-semibold">Tenaga Kerja</span>
        </div>
        <div className="flex items-end space-x-2 py-3">
          <span className="text-4xl md:text-5xl font-bold text-gray-900">{loading ? "Loading..." : jumlahPekerja}</span>
          <span className="text-2xl font-semibold text-gray-500">orang</span>
          {/* <div className="flex items-center text-green-600 text-sm font-semibold ml-auto">
          <ArrowUpRight className="w-4 h-4 mr-1" />
          2.8%
        </div> */}
        </div>
        <div>
          {/* Optional: Add a tooltip or additional information here */}
          <p className="text-sm text-gray-500 italic">Data Q1 2025</p>
        </div>
      </div>
      <div className="flex items-center justify-center w-1/4 xl:w-1/3 ">
        <div className="w-18 h-18 md:w-24 md:h-24">
          <Circle percent={80} strokeWidth={8} strokeColor="#f87171" steps={{ count: 15, gap: -1 }} />
        </div>
      </div>

    </div>

  );
};

export default TenagaKerjaCard;
