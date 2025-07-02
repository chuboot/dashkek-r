// src/components/TenagaKerjaCard.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Tambahkan Link
import { Circle } from 'rc-progress';


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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
             <path fill-rule="evenodd" d="M11,2 C12.6568542,2 14,3.34314575 14,5 L14.0000889,6.17067428 C14.3128427,6.06014282 14.6493978,6 15,6 L19,6 C20.6568542,6 22,7.34314575 22,9 L22,19 C22,20.6568542 20.6568542,22 19,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,5 C2,3.34314575 3.34314575,2 5,2 L11,2 Z M11,4 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,19 C4,19.5522847 4.44771525,20 5,20 L12,20 L12,5 C12,4.44771525 11.5522847,4 11,4 Z M19,8 L15,8 C14.4477153,8 14,8.44771525 14,9 L14,20 L19,20 C19.5522847,20 20,19.5522847 20,19 L20,9 C20,8.44771525 19.5522847,8 19,8 Z M9,14 C9.55228475,14 10,14.4477153 10,15 C10,15.5522847 9.55228475,16 9,16 L7,16 C6.44771525,16 6,15.5522847 6,15 C6,14.4477153 6.44771525,14 7,14 L9,14 Z M18,14 C18.5522847,14 19,14.4477153 19,15 C19,15.5522847 18.5522847,16 18,16 L16,16 C15.4477153,16 15,15.5522847 15,15 C15,14.4477153 15.4477153,14 16,14 L18,14 Z M9,10 C9.55228475,10 10,10.4477153 10,11 C10,11.5522847 9.55228475,12 9,12 L7,12 C6.44771525,12 6,11.5522847 6,11 C6,10.4477153 6.44771525,10 7,10 L9,10 Z M18,10 C18.5522847,10 19,10.4477153 19,11 C19,11.5522847 18.5522847,12 18,12 L16,12 C15.4477153,12 15,11.5522847 15,11 C15,10.4477153 15.4477153,10 16,10 L18,10 Z M9,6 C9.55228475,6 10,6.44771525 10,7 C10,7.55228475 9.55228475,8 9,8 L7,8 C6.44771525,8 6,7.55228475 6,7 C6,6.44771525 6.44771525,6 7,6 L9,6 Z"></path>
            </svg>
          </div>
          <span className="font-semibold">Pelaku Usaha</span>
        </div>
        <div className="text-4xl font-bold text-center mb-4">{loading ? 'Loading...' : jumlahPelakuUsaha}</div>
      </div>
    </Link>
  );
};

export default PelakuUsahaCard;
