import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronDown, HeartPulse } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const bedOccupancyData = [
  { name: "Jan 2025", BOR: 35 },
  { name: "Feb 2025", BOR: 45 },
  { name: "Maret 2025", BOR: 75 },
  { name: "April 2025", BOR: 65 },
  { name: "May 2025", BOR: 55 },
  { name: "Juni 2025", BOR: 75 },
  { name: "Juli 2025", BOR: 87 },
];

const DashKekKesehatan = () => {
  const { areaId } = useParams();
  const [listPU, setListPU] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  // Fetch data for KEK Kesehatan
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbz1klGLrgBUrtJBf5q_L01Ch9m-luFUpCwks9cJAodvJ410pVJa7-AJz25csQSPszZG5Q/exec"
    )
      .then((response) => response.json())
      .then((data) => {
        // data adalah array of object
        const filtered = data.filter(
          (row) =>
            row.LokasiKEK &&
            row.LokasiKEK.toLowerCase() === areaId?.toLowerCase() &&
            row.Sektor === "Kesehatan"
        );
        setListPU(
          filtered.map((row) => ({
            nama: row.NamaPU,
            pasien: row.Pasien || "-",
            sdm: row.SDM || "-",
          }))
        );
        setLoading(false);
      });
  }, [areaId]);

  // Calculate the total number of WNI and WNA doctors across all facilities
  const totalDokter = listPU.reduce(
    (acc, facility) => {
      // Find the 'Dokter' profession within the current facility's SDM
      if (Array.isArray(facility.sdm)) {
        const dokter = facility.sdm.find((item) => item.Profesi === "Dokter");
        if (dokter) {
          // Add WNI and WNA counts if 'Dokter' profession is found
          acc.WNI += Number(dokter.WNI) || 0;
          acc.WNA += Number(dokter.WNA) || 0;
        }
      }
      return acc;
    },
    { WNI: 0, WNA: 0 }
  );

  // Calculate the total number of WNI and WNA for each profession
  const getTotalByProfesi = (profesi) => {
    return listPU.reduce(
      (acc, facility) => {
        if (Array.isArray(facility.sdm)) {
          const prof = facility.sdm.find((item) => item.Profesi === profesi);
          if (prof) {
            acc.WNI += Number(prof.WNI) || 0;
            acc.WNA += Number(prof.WNA) || 0;
          }
        }
        return acc;
      },
      { WNI: 0, WNA: 0 }
    );
  };

  const totalPerawat = getTotalByProfesi("Perawat");
  const totalTenagaMedisLainnya = getTotalByProfesi("Tenaga Medis Lainnya");
  const totalTenagaNonKesehatan = getTotalByProfesi("Tenaga Non Kesehatan");

  return (
    <div className="flex min-h-screen  bg-gradient-to-b from-[#FFF7EF] to-green-400 text-gray-800">
      {/* Area konten */}
      <div className="flex-1 flex flex-col">
        {/* Header untuk mobile */}

        {console.log("List Pelaku Usaha:", listPU)}
        <div className="flex flex-col py-5  md:p-10 justify-center items-center">
            <HeartPulse size={48} />
          <h2 className="text-2xl font-bold my-4 text-center">KEK Kesehatan</h2>
          <p className="text-gray-600">"Welcome to Dashboard KEK Kesehatan"</p>
          <ChevronDown className="inline-block ml-2" />
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : (
          <div className="p-4 md:p-6">
            <div className="overflow-x-auto">
              {/* Statistik ringkas */}
              <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="bg-white rounded shadow p-4 flex-1">
                  <div className="text-lg font-semibold">
                    Total Pelaku Usaha
                  </div>
                  <div className="text-2xl font-bold">{listPU.length}</div>
                </div>
                <div className="bg-white rounded shadow p-4 flex-1">
                  <div className="text-lg font-semibold">Total Pasien WNI</div>
                  <div className="text-2xl font-bold">
                    {listPU.reduce((sum, pu) => {
                      const val = pu.pasien?.WNI ? Number(pu.pasien.WNI) : 0;
                      return sum + val;
                    }, 0)}
                  </div>
                </div>
                <div className="bg-white rounded shadow p-4 flex-1">
                  <div className="text-lg font-semibold">Total Pasien WNA</div>
                  <div className="text-2xl font-bold">
                    {listPU.reduce((sum, pu) => {
                      const val = pu.pasien?.WNA ? Number(pu.pasien.WNA) : 0;
                      return sum + val;
                    }, 0)}
                  </div>
                </div>
              </div>
              <div>
                {/* awal sdm */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {/* Dokter Card */}
                  <div className="bg-white rounded-lg shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
                      Dokter
                    </h2>
                    <div className="flex justify-around items-center space-x-4">
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-600 mb-1">
                          WNI
                        </p>
                        <p className="text-5xl font-bold text-blue-700">
                          {totalDokter.WNI}
                        </p>
                      </div>
                      <div className="h-20 w-1 bg-gradient-to-b from-blue-400 to-green-400 rounded-full"></div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-600 mb-1">
                          WNA
                        </p>
                        <p className="text-5xl font-bold text-green-700">
                          {totalDokter.WNA}
                        </p>
                      </div>
                    </div>
                    <p className="text-center text-gray-700 mt-6 text-base">
                      Total:{" "}
                      <span className="font-extrabold text-indigo-600">
                        {totalDokter.WNI + totalDokter.WNA}
                      </span>
                    </p>
                  </div>
                  {/* Perawat Card */}
                  <div className="bg-white rounded-lg shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
                      Perawat
                    </h2>
                    <div className="flex justify-around items-center space-x-4">
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-600 mb-1">
                          WNI
                        </p>
                        <p className="text-5xl font-bold text-blue-700">
                          {totalPerawat.WNI}
                        </p>
                      </div>
                      <div className="h-20 w-1 bg-gradient-to-b from-blue-400 to-green-400 rounded-full"></div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-600 mb-1">
                          WNA
                        </p>
                        <p className="text-5xl font-bold text-green-700">
                          {totalPerawat.WNA}
                        </p>
                      </div>
                    </div>
                    <p className="text-center text-gray-700 mt-6 text-base">
                      Total:{" "}
                      <span className="font-extrabold text-indigo-600">
                        {totalPerawat.WNI + totalPerawat.WNA}
                      </span>
                    </p>
                  </div>
                  {/* Tenaga Medis Lainnya Card */}
                  <div className="bg-white rounded-lg shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
                      Tenaga Medis Lainnya
                    </h2>
                    <div className="flex justify-around items-center space-x-4">
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-600 mb-1">
                          WNI
                        </p>
                        <p className="text-5xl font-bold text-blue-700">
                          {totalTenagaMedisLainnya.WNI}
                        </p>
                      </div>
                      <div className="h-20 w-1 bg-gradient-to-b from-blue-400 to-green-400 rounded-full"></div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-600 mb-1">
                          WNA
                        </p>
                        <p className="text-5xl font-bold text-green-700">
                          {totalTenagaMedisLainnya.WNA}
                        </p>
                      </div>
                    </div>
                    <p className="text-center text-gray-700 mt-6 text-base">
                      Total:{" "}
                      <span className="font-extrabold text-indigo-600">
                        {totalTenagaMedisLainnya.WNI +
                          totalTenagaMedisLainnya.WNA}
                      </span>
                    </p>
                  </div>
                  {/* Tenaga Non Kesehatan Card */}
                  <div className="bg-white rounded-lg shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
                      Tenaga Non Kesehatan
                    </h2>
                    <div className="flex justify-around items-center space-x-4">
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-600 mb-1">
                          WNI
                        </p>
                        <p className="text-5xl font-bold text-blue-700">
                          {totalTenagaNonKesehatan.WNI}
                        </p>
                      </div>
                      <div className="h-20 w-1 bg-gradient-to-b from-blue-400 to-green-400 rounded-full"></div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-600 mb-1">
                          WNA
                        </p>
                        <p className="text-5xl font-bold text-green-700">
                          {totalTenagaNonKesehatan.WNA}
                        </p>
                      </div>
                    </div>
                    <p className="text-center text-gray-700 mt-6 text-base">
                      Total:{" "}
                      <span className="font-extrabold text-indigo-600">
                        {totalTenagaNonKesehatan.WNI +
                          totalTenagaNonKesehatan.WNA}
                      </span>
                    </p>
                  </div>
                </div>
                {/* akhir sdm */}
              </div>

              {/* Accordion untuk tabel pelaku usaha */}
              <div className="mb-6">
                <button
                  onClick={() => setShowTable((prev) => !prev)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow transition-colors flex items-center justify-between"
                >
                  <span>Daftar Pelaku Usaha Kesehatan</span>
                  <ChevronDown
                    className={
                      showTable
                        ? "rotate-180 transition-transform"
                        : "transition-transform"
                    }
                  />
                </button>
                {showTable && (
                  <div className="mt-4 animate-fade-in">
                    <table className="min-w-full bg-white rounded shadow">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b border-gray-200">
                            Nama Pelaku Usaha
                          </th>
                          <th className="py-2 px-4 border-b border-gray-200">
                            Pasien WNI
                          </th>
                          <th className="py-2 px-4 border-b border-gray-200">
                            Pasien WNA
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {listPU.map((pu, idx) => (
                          <tr key={idx}>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {pu.nama}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {pu.pasien?.WNI || "-"}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {pu.pasien?.WNA || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* End Area konten */}
    </div>
  );
};

export default DashKekKesehatan;
