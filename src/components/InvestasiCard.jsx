// src/components/TenagaKerjaCard.jsx
import React, { useEffect, useState } from 'react';
import { Circle } from 'rc-progress';


const InvestasiCard = () => {
  const [jumlahInvestasi, setJumlahInvestasi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ECkK7QC1cAwstl9nqLf-HA3ySzXySjugSqVCsXiendHwEun3giJBH6SyIuiQR9M63K_IR6FQ2UYH/pub?output=csv')
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split('\n').filter(row => row.trim() !== '');

        const headers = rows[0].split(',').map(header => header.trim()); // Mengambil header dan membersihkan spasi
        let totalInvestasi = 0; // Initialize total for summation
        // Mencari indeks kolom "Pekerja"
                const investasiColumnIndex = headers.indexOf('Investasi');

                // Hanya memparsing kolom "Pekerja" dan menghitung totalnya
                for (let i = 1; i < rows.length; i++) {
                    const values = rows[i].split(',').map(value => value.trim()); // Mengambil nilai dan membersihkan spasi
                    if (values.length > investasiColumnIndex) { // Memastikan ada cukup kolom
                        let rawInvestasiValue = values[investasiColumnIndex];
                        // Remove all non-digit characters except for a leading minus sign
                        // This assumes the numbers are integers and separators are dots or commas
                        const cleanInvestasiString = rawInvestasiValue.replace(/[^0-9-]/g, '');
                        const investasiValue = parseFloat(cleanInvestasiString);
                        if (!isNaN(investasiValue)) { // Check if it's a valid number
                            totalInvestasi += investasiValue; // Add to total
                        } else {
                            console.warn(`Baris ${i + 1}: Nilai "${values[investasiColumnIndex]}" di kolom "Pekerja" bukan angka. Dilewati dari total.`);
                        }
                    }
                }
        // const formatter = new Intl.NumberFormat('id-ID', {
        //             style: 'currency',
        //             currency: 'IDR',
        //             minimumFractionDigits: 0, // No decimal places for Rupiah
        //             maximumFractionDigits: 0,
        //         });
        /**
         * Fungsi untuk memformat angka besar menjadi M (Miliar) atau T (Triliun).
         * @param {number} num - Angka yang akan diformat.
         * @returns {string} - String angka yang diformat.
         */
        function formatLargeNumber(num) {
            const absNum = Math.abs(num);
            if (absNum >= 1e12) { // Trillions
                return (num / 1e12).toFixed(2) + ' T';
            }
            if (absNum >= 1e9) { // Billions
                return (num / 1e9).toFixed(2) + ' M';
            }
            // If less than a billion, use standard formatting
            return num.toLocaleString('id-ID');
        }
        setJumlahInvestasi(formatLargeNumber(totalInvestasi));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);

  return (
<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 text-green-500 p-2 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C5 4.44772 4.55228 4 4 4C3.44772 4 3 4.44772 3 5L3 13.9998C3 13.9999 3 14.0001 3 14.0002V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18H5V14.4142L9 10.4142L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071L19 8.41421V11C19 11.5523 19.4477 12 20 12C20.5523 12 21 11.5523 21 11V6C21 5.44772 20.5523 5 20 5H15C14.4477 5 14 5.44772 14 6C14 6.55228 14.4477 7 15 7H17.5858L13 11.5858L9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289L5 11.5858V5Z" ></path>
                  </svg>
                </div>
                <span className="font-semibold">Investasi</span>
              </div>
              <div className="w-16 h-16">
                <Circle percent={75} strokeWidth={8} strokeColor="#4ade80" />
              </div>
            </div>
            <div className="text-3xl font-bold text-center">{loading ? 'Loading...' : jumlahInvestasi}</div>
          </div>
    
  );
};

export default InvestasiCard;
