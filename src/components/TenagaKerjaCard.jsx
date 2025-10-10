// src/components/TenagaKerjaCard.jsx
import React, { useEffect, useState } from 'react';
import { Circle } from 'rc-progress';
import { useParams } from 'react-router-dom'; // <-- Add this import
import { Users, ArrowUpRight } from 'lucide-react'; // Import the Users icon from lucide-react
import { Link } from 'react-router-dom'



const TenagaKerjaCard = () => {
  const [jumlahPekerja, setJumlahPekerja] = useState(null);
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState(null);
  const { areaId } = useParams(); // <-- Get areaId from route params

   // Fetch TargetTK dari API area KEK
      useEffect(() => {
          fetch(import.meta.env.VITE_API_URL)
              .then(res => res.json())
              .then(data => {
                  // data: array of object, cari berdasarkan KEK === areaId
                  const found = data.KEK.filter(
                      (item) => item.ID?.toLowerCase() === areaId?.toLowerCase()
                  );
                  setArea(found[0]);
                  setLoading(false);
                  // console.log("Area Data:", found[0].TargetTK);
              }).catch(() => setLoading(false));
      }, [areaId]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((response) => response.json())
      .then((data) => {
        // data adalah array of object
        let totalPekerja = 0;
        data.pelakuUsaha.forEach((row) => {
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

  // Optionally log the percentage before returning JSX
   let persen = 0;
   let totalTKBU = 0;
   if (area && area.CapaianTKBU) {
     totalTKBU = parseInt(jumlahPekerja) + parseInt(area.CapaianTKBU);
   }
  if (jumlahPekerja !== null && area && area.TargetTK) {
     persen = (totalTKBU / area.TargetTK * 100).toFixed(2);
    console.log(`persen tenaga kerja: ${persen}`);
  }
  return (
    <Link to={`/dashboard/${areaId}/tenaga-kerja`}>
      <div className="bg-white p-6 rounded-4xl shadow hover:shadow-lg cursor-pointer flex justify-between">
        <div className="flex flex-col justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-red-100 text-red-500 p-2 rounded-full">
              <Users />
            </div>
            <span className="font-semibold">Tenaga Kerja</span>
          </div>
          <div className="flex items-end space-x-2 py-3">
            <span className="text-4xl md:text-5xl font-bold text-gray-900">{loading ? <span className="inline-block w-32 h-10 bg-gray-200 rounded animate-pulse" /> : totalTKBU}</span>
            <span className="text-2xl font-semibold text-gray-500">orang</span>
            {/* <div className="flex items-center text-green-600 text-sm font-semibold ml-auto">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            2.8%
          </div> */}
          </div>
          <div>
            {/* Optional: Add a tooltip or additional information here */}
            <p className="text-sm text-gray-500 italic">Data s/d Q2 2025</p>
          </div>
        </div>
        <div className="flex items-center justify-center w-1/4 xl:w-1/3">
          <div className="relative w-18 h-18 md:w-24 md:h-24">
            <Circle percent={persen} strokeWidth={8} strokeColor="#f87171" steps={{ count: 15, gap: -1 }} />
            <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold">
              {persen}%
            </span>
          </div>
        </div>

      </div>
    </Link>

  );
};

export default TenagaKerjaCard;
