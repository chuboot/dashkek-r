// src/components/TenagaKerjaCard.jsx
import React, { useEffect, useState } from "react";
import { Circle } from "rc-progress";
import { useParams } from "react-router-dom"; // <-- Add this import
import { ChartLine, ArrowUpRight } from "lucide-react";
import { Link } from 'react-router-dom'

const InvestasiCard = () => {
  // const [jumlahInvestasi, setJumlahInvestasi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState(null);
  const [totalInv, setTotalInv] = useState(null);
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
        let totalInvestasi = 0;
        data.pelakuUsaha.forEach((row) => {
          if (
            row.LokasiKEK &&
            row.LokasiKEK.toLowerCase() === areaId?.toLowerCase()
          ) {
            // Hapus karakter non-digit (kecuali koma/desimal)
            const cleanInvestasiString = String(row.Investasi).replace(/[^0-9]/g, "");
            const investasiValue = parseFloat(cleanInvestasiString);
            if (!isNaN(investasiValue)) {
              totalInvestasi += investasiValue;
            }
          }
        });

        setTotalInv(totalInvestasi);
        // Format number ke dalam format Indonesia dengan satuan Miliar atau Triliun

        
        // setJumlahInvestasi(formatLargeNumber(totalInvestasi));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [areaId]);
  // Optionally log the percentage before returning JSX
  let persen = 0;
  if (totalInv !== null && area && area.TargetInvestasi) {
    persen = ((parseInt(totalInv) + parseInt(area?.CapaianInvBU || 0)) / area.TargetInvestasi * 100).toFixed(2);
    console.log(`persen investasi: ${persen}`);
  }

  let jumlahInvestasi = 0;
  jumlahInvestasi = parseInt(totalInv) + parseInt(area?.CapaianInvBU || 0);

  function formatLargeNumber(num) {
    if (typeof num !== "number" || isNaN(num)) return "0";
    const absNum = Math.abs(num);
    if (absNum >= 1e12) {
      return (num / 1e12).toFixed(2) + " T";
    }
    if (absNum >= 1e9) {
      return (num / 1e9).toFixed(2) + " M";
    }
    return num.toLocaleString("id-ID");
  }

  return (
    <Link to={`/dashboard/${areaId}/investasi`}>
      <div className="bg-white p-6 rounded-4xl shadow hover:shadow-lg cursor-pointer flex justify-between">
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 text-green-500 p-2 rounded-full">
              <ChartLine />
            </div>
            <span className="font-semibold">Investasi</span>
          </div>
          <div className="flex items-start space-x-2 py-3">
            <span className="text-sm md:text-md font-semibold text-gray-500">Rp.</span>
            {loading ? (
              <span className="inline-block w-32 h-10 bg-gray-200 rounded animate-pulse" />
            ) : (
              <span className="text-[clamp(2rem,2vw,4rem)] font-bold text-gray-900">{formatLargeNumber(jumlahInvestasi)}</span>
            )}
          </div>
          <div>
            {/* Optional: Add a tooltip or additional information here */}
            <p className="text-sm text-gray-500 italic">Data s/d Q2 2025</p>
          </div>
        </div>
        <div className="flex items-center justify-center w-1/3">
          <div className="relative w-18 h-18">
            <Circle
              percent={persen}
              strokeWidth={8}
              strokeColor="#4ade80"
              steps={{ count: 15, gap: -1 }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold">
              {persen}%
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default InvestasiCard;
