// src/components/TenagaKerjaCard.jsx
import React, { useEffect, useState } from "react";
import { Circle } from "rc-progress";
import { useParams } from "react-router-dom"; // <-- Add this import
import { ChartLine, ArrowUpRight } from "lucide-react";

const InvestasiCard = () => {
  const [jumlahInvestasi, setJumlahInvestasi] = useState(null);
  const [loading, setLoading] = useState(true);
  const { areaId } = useParams(); // <-- Get areaId from route params

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbz1klGLrgBUrtJBf5q_L01Ch9m-luFUpCwks9cJAodvJ410pVJa7-AJz25csQSPszZG5Q/exec")
      .then((response) => response.json())
      .then((data) => {
        let totalInvestasi = 0;
        data.forEach((row) => {
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

        function formatLargeNumber(num) {
          const absNum = Math.abs(num);
          if (absNum >= 1e12) {
            return (num / 1e12).toFixed(2) + " T";
          }
          if (absNum >= 1e9) {
            return (num / 1e9).toFixed(2) + " M";
          }
          return num.toLocaleString("id-ID");
        }
        setJumlahInvestasi(formatLargeNumber(totalInvestasi));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [areaId]);

  return (
    <div className="bg-white p-6 rounded-4xl shadow hover:shadow-lg cursor-pointer flex justify-between">
      <div className="flex flex-col justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-green-100 text-green-500 p-2 rounded-full">
            <ChartLine />
          </div>
          <span className="font-semibold">Investasi</span>
        </div>
        <div className="flex items-end space-x-2 py-3">
          <span className="text-lg md:text-xl font-semibold text-gray-500">Rp.</span>
          {/* <span className="text-4xl md:text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-900">{loading ? "Loading..." : jumlahInvestasi}</span> */}
          <span className="text-[clamp(1.5rem,2vw,4rem)] font-bold text-gray-900">{loading ? "Loading..." : jumlahInvestasi}</span>
          {/* <div className="flex items-center text-green-600 text-sm font-semibold ml-auto">
          <ArrowUpRight className="w-4 h-4 mr-1" />
          2.8%
          </div> */}
        </div>
        <div>
          {/* Optional: Add a tooltip or additional information here */}
          <p className="text-sm text-gray-500 italic">Data Q1 2025 </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-1/4 xl:w-1/3">
        <div className="w-18 h-18 md:w-24 md:h-24">
          <Circle percent={25} strokeWidth={8} strokeColor="#4ade80" steps={{ count: 15, gap: -1 }} />
        </div>
      </div>
    </div>
  );
};

export default InvestasiCard;
