// components/KesehatanDetail.js
import React from 'react';

const KesehatanDetail = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 mt-4">
      <h3 className="text-lg font-bold mb-2">Detail Kesehatan</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* <div><strong>Jumlah Pasien:</strong> {data.jumlahPasien}</div>
        <div><strong>Jumlah SDM:</strong> {data.jumlahSDM}</div>
        <div><strong>Jumlah Layanan:</strong> {data.jumlahLayanan}</div>
        <div><strong>BOR:</strong> {data.bor}%</div> */}
        <div><strong>Jumlah Pasien:</strong> 1232</div>
        <div><strong>Jumlah SDM:</strong> 588</div>
        <div><strong>Jumlah Layanan:</strong> 24</div>
        <div><strong>BOR:</strong> 60%</div>
      </div>
    </div>
  );
};

export default KesehatanDetail;
