// components/KesehatanDetail.js
import React from "react";
import { HeartPulse } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const KesehatanDetail = ({ data }) => {
  // Ambil jumlah tempat tidur dari object terakhir di data.BOR
  const lastBOR = Array.isArray(data.BOR) && data.BOR.length > 0 ? data.BOR[data.BOR.length - 1] : null;
  const jumlahTempatTidur = lastBOR ? lastBOR.jumlahTempatTidur : 0;
  const periodeBOR = lastBOR ? lastBOR.periode : 0;
  const hariTerpakai = lastBOR ? lastBOR.hariTerpakai : 0;
  const borRatio = lastBOR ? lastBOR.bor : 0;

  return (
    <div className="p-4 md:p-6 border-b border-gray-200">
      <div className="flex items-center mb-4">
        <HeartPulse size={20} />
        <h2 className="text-xl font-semibold text-gray-700 ml-2 flex items-center">
          Detail Kesehatan
        </h2>
      </div>
      {/* Section Pasien */}
      <section className="mb-6">
        <h2 className="font-semibold mb-4 text-gray-700">Jumlah Pasien</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="font-medium text-gray-700">WNI</p>
            <p className="text-2xl font-bold text-orange-500">
              {data.Pasien.WNI} pasien
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="font-medium text-gray-700">WNA</p>
            <p className="text-2xl font-bold text-orange-500">
              {data.Pasien.WNA} pasien
            </p>
          </div>
        </div>
      </section>

      {/* Tabel SDM */}
      {Array.isArray(data.SDM) && data.SDM.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-4 text-gray-700">SDM Kesehatan</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg border border-gray-200 text-[12px] md:text-base">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-2">Profesi</th>
                  <th className="px-2 text-right">WNI</th>
                  <th className="px-2 text-right">WNA</th>
                  <th className="px-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.SDM.map((sd, index) => (
                  <tr key={index}>
                    <td className="px-2">{sd.Profesi}</td>
                    <td className="px-2 text-right">{sd.WNI}</td>
                    <td className="px-2 text-right">{sd.WNA}</td>
                    <td className="px-2 text-right">{sd.Total}</td>
                  </tr>
                ))}
                <tr className="font-semibold bg-gray-50">
                  <td className="px-2">Total</td>
                  <td className="px-2 text-right">
                    {data.SDM.reduce(
                      (sum, sd) => sum + (Number(sd.WNI) || 0),
                      0
                    )}
                  </td>
                  <td className="px-2 text-right">
                    {data.SDM.reduce(
                      (sum, sd) => sum + (Number(sd.WNA) || 0),
                      0
                    )}
                  </td>
                  <td className="px-2 text-right">
                    {data.SDM.reduce(
                      (sum, sd) => sum + (Number(sd.Total) || 0),
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {data.Layanan && (
        <div className="mb-6">
          <h2 className="font-semibold mb-4 text-gray-700">
            Jenis Layanan yang Tersedia
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
            {Object.entries(data.Layanan).map(([key, value]) => (
              <div key={key} className="bg-white rounded-2xl shadow p-4">
                <p className="font-semibold text-orange-500">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data BOR */}
      <section>
        <h2 className="text-gray-700 font-semibold mb-4">
          Rasio Okupansi Tempat Tidur (BOR)
        </h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Jumlah Tempat Tidur: {jumlahTempatTidur}</li>
          <li>Periode: {periodeBOR}</li>
          <li>Hari Terpakai: {hariTerpakai} hari</li>
          <li>BOR: {borRatio} %</li>
        </ul>

        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.BOR}>
              <XAxis dataKey="periode" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bor" fill="oklch(70.5% 0.213 47.604)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default KesehatanDetail;
