// src/components/TenagaKerjaCard.jsx
import React, { useEffect, useState } from "react";
import { Circle } from "rc-progress";
import { useParams } from "react-router-dom"; // <-- Add this import
import { ChartLine } from "lucide-react";

const InvestasiCard = () => {
  const [jumlahInvestasi, setJumlahInvestasi] = useState(null);
  const [loading, setLoading] = useState(true);
  const { areaId } = useParams(); // <-- Get areaId from route params

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ECkK7QC1cAwstl9nqLf-HA3ySzXySjugSqVCsXiendHwEun3giJBH6SyIuiQR9M63K_IR6FQ2UYH/pub?output=csv"
    )
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split("\n").filter((row) => row.trim() !== "");

        const headers = rows[0].split(",").map((header) => header.trim()); // Mengambil header dan membersihkan spasi
        let totalInvestasi = 0; // Initialize total for summation
        // Mencari indeks kolom "Pekerja"
        const investasiColumnIndex = headers.indexOf("Investasi");
        const lokasiColumnIndex = headers.indexOf("LokasiKEK");

        // Hanya memparsing kolom "Pekerja" dan menghitung totalnya
        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(",").map((value) => value.trim()); // Mengambil nilai dan membersihkan spasi
          if (
            values.length > investasiColumnIndex &&
            values.length > lokasiColumnIndex
          ) {
            // Memastikan ada cukup kolom
            let rawInvestasiValue = values[investasiColumnIndex];
            // Remove all non-digit characters except for a leading minus sign
            // This assumes the numbers are integers and separators are dots or commas
            const lokasiValue = values[lokasiColumnIndex].toLowerCase();
            const cleanInvestasiString = rawInvestasiValue.replace(
              /[^0-9-]/g,
              ""
            );
            if (lokasiValue === areaId?.toLowerCase()) {
              const investasiValue = parseFloat(cleanInvestasiString);
              if (!isNaN(investasiValue)) {
                // Check if it's a valid number
                totalInvestasi += investasiValue; // Add to total
              } else {
                console.warn(
                  `Baris ${i + 1}: Nilai "${values[investasiColumnIndex]
                  }" di kolom "Pekerja" bukan angka. Dilewati dari total.`
                );
              }
            }
          }
        }

        function formatLargeNumber(num) {
          const absNum = Math.abs(num);
          if (absNum >= 1e12) {
            // Trillions
            return (num / 1e12).toFixed(2) + " T";
          }
          if (absNum >= 1e9) {
            // Billions
            return (num / 1e9).toFixed(2) + " M";
          }
          // If less than a billion, use standard formatting
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
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer flex justify-between">
      <div className="flex flex-col justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-green-100 text-green-500 p-2 rounded-full">
            <ChartLine />
          </div>
          <span className="font-semibold">Investasi</span>
        </div>
        <div className="text-4xl md:text-5xl font-bold  py-3">
          {loading ? "Loading..." : jumlahInvestasi}
        </div>
        <div>
          {/* Optional: Add a tooltip or additional information here */}
          <p className="text-sm text-gray-500 italic">Data dari Laporan Q1 2025 </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-24 h-24r">
          <Circle percent={25} strokeWidth={8} strokeColor="#4ade80" steps={{ count: 15, gap: -1 }} />
        </div>
      </div>
    </div>
  );
};

export default InvestasiCard;
