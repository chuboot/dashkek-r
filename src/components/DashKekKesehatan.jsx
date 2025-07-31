import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronDown, HeartPulse, Stethoscope, ClipboardPlus, BriefcaseMedical, UserPlus } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



const DashKekKesehatan = () => {
  const { areaId } = useParams();
  const [listPU, setListPU] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [showTable, setShowTable] = useState(false);
  const [showPasien, setShowPasien] = useState(false);
  const [showSDM, setShowSDM] = useState(false);
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
    <div className="flex min-h-screen mt-4  bg-gradient-to-b from-[#FFF7EF] to-orange-200 text-gray-800 rounded-4xl shadow-2xl">
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
              <div className="mb-6 flex flex-col lg:flex-row gap-4">
                <div className="bg-white rounded-2xl shadow p-6 flex-1">
                  <div className="text-lg font-semibold">
                    Total Pelaku Usaha
                  </div>
                  <div className="text-4xl font-bold text-blue-600">{listPU.length}</div>
                </div>
                <div className="bg-white rounded-2xl shadow p-6 flex-1">
                  <div className="text-lg font-semibold">Total Pasien WNI</div>
                  <div className="text-4xl font-bold text-blue-600">
                    {listPU.reduce((sum, pu) => {
                      const val = pu.pasien?.WNI ? Number(pu.pasien.WNI) : 0;
                      return sum + val;
                    }, 0)}
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow p-6 flex-1">
                  <div className="text-lg font-semibold">Total Pasien WNA</div>
                  <div className="text-4xl font-bold text-blue-600">
                    {listPU.reduce((sum, pu) => {
                      const val = pu.pasien?.WNA ? Number(pu.pasien.WNA) : 0;
                      return sum + val;
                    }, 0)}
                  </div>
                </div>
              </div>
              <div>
                {/* Accordion untuk tabel pelaku usaha */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowPasien((prev) => !prev)}
                    className="w-full hover:bg-orange-200 text-gray-900 font-semibold py-3 px-6 border-b border-orange-200 transition-colors flex items-center justify-between"
                  >
                    <span>Rekap Pasien per Pelaku Usaha</span>
                    <ChevronDown
                      className={
                        showPasien
                          ? "rotate-180 transition-transform"
                          : "transition-transform"
                      }
                    />
                  </button>
                  {showPasien && (
                    <div className="mt-4 animate-fade-in">
                      <table className="min-w-full bg-white rounded shadow">
                        <thead>
                          <tr>
                            <th className="py-2 px-4 border-b border-gray-200">
                              Nama Pelaku Usaha
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 text-right">
                              Pasien WNI
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 text-right">
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
                              <td className="py-2 px-4 border-b border-gray-200 text-right">
                                {pu.pasien?.WNI || "-"}
                              </td>
                              <td className="py-2 px-4 border-b border-gray-200 text-right">
                                {pu.pasien?.WNA || "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* awal sdm */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {/* card 1 > */}
                  <div class="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center transition-transform transform hover:shadow-lg">
                    <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                      <Stethoscope className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 class="text-xl font-bold text-gray-800 mb-4">Dokter</h2>
                    <div class="flex items-center justify-around w-full mb-4">
                      <div class="text-center">
                        <p class="text-sm text-gray-500">WNI</p>
                        <p class="text-4xl font-bold text-blue-600">{totalDokter.WNI}</p>
                      </div>
                      <div class="h-16 w-px bg-gray-200"></div>
                      <div class="text-center">
                        <p class="text-sm text-gray-500">WNA</p>
                        <p class="text-4xl font-bold text-green-500">{totalDokter.WNA}</p>
                      </div>
                    </div>
                    <div class="border-t border-gray-100 pt-3 w-full">
                      <p class="text-sm text-gray-600">Total: <span class="font-semibold text-gray-800">{totalDokter.WNI + totalDokter.WNA}</span></p>
                    </div>
                  </div>
                  {/* card 1 <*/}
                  {/* card 2 > */}
                  <div class="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center transition-transform transform hover:shadow-lg">
                    <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                      <ClipboardPlus className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 class="text-xl font-bold text-gray-800 mb-4">Perawat</h2>
                    <div class="flex items-center justify-around w-full mb-4">
                      <div class="text-center">
                        <p class="text-sm text-gray-500">WNI</p>
                        <p class="text-4xl font-bold text-blue-600">{totalPerawat.WNI}</p>
                      </div>
                      <div class="h-16 w-px bg-gray-200"></div>
                      <div class="text-center">
                        <p class="text-sm text-gray-500">WNA</p>
                        <p class="text-4xl font-bold text-green-500">{totalPerawat.WNA}</p>
                      </div>
                    </div>
                    <div class="border-t border-gray-100 pt-3 w-full">
                      <p class="text-sm text-gray-600">Total: <span class="font-semibold text-gray-800">{totalPerawat.WNI + totalPerawat.WNA}</span></p>
                    </div>
                  </div>
                  {/* card 2 <*/}
                  {/* card 3 > */}
                  <div class="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center transition-transform transform hover:shadow-lg">
                    <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                      <BriefcaseMedical className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 class="text-xl font-bold text-gray-800 mb-4">Tenaga Medis Lainnya</h2>
                    <div class="flex items-center justify-around w-full mb-4">
                      <div class="text-center">
                        <p class="text-sm text-gray-500">WNI</p>
                        <p class="text-4xl font-bold text-blue-600">{totalTenagaMedisLainnya.WNI}</p>
                      </div>
                      <div class="h-16 w-px bg-gray-200"></div>
                      <div class="text-center">
                        <p class="text-sm text-gray-500">WNA</p>
                        <p class="text-4xl font-bold text-green-500">{totalTenagaMedisLainnya.WNA}</p>
                      </div>
                    </div>
                    <div class="border-t border-gray-100 pt-3 w-full">
                      <p class="text-sm text-gray-600">Total: <span class="font-semibold text-gray-800">{totalTenagaMedisLainnya.WNI + totalTenagaMedisLainnya.WNA}</span></p>
                    </div>
                  </div>
                  {/* card 3 <*/}
                  {/* card 4 > */}
                  <div class="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center transition-transform transform hover:shadow-lg">
                    <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                      <UserPlus className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 class="text-xl font-bold text-gray-800 mb-4">Tenaga Non Kesehatan</h2>
                    <div class="flex items-center justify-around w-full mb-4">
                      <div class="text-center">
                        <p class="text-sm text-gray-500">WNI</p>
                        <p class="text-4xl font-bold text-blue-600">{totalTenagaNonKesehatan.WNI}</p>
                      </div>
                      <div class="h-16 w-px bg-gray-200"></div>
                      <div class="text-center">
                        <p class="text-sm text-gray-500">WNA</p>
                        <p class="text-4xl font-bold text-green-500">{totalTenagaNonKesehatan.WNA}</p>
                      </div>
                    </div>
                    <div class="border-t border-gray-100 pt-3 w-full">
                      <p class="text-sm text-gray-600">Total: <span class="font-semibold text-gray-800">{totalTenagaNonKesehatan.WNI + totalTenagaNonKesehatan.WNA}</span></p>
                    </div>
                  </div>
                  {/* card 4 <*/}
                
                  
                </div>
                {/* akhir sdm */}
                {/* Accordion untuk tabel SDM per Pelaku Usaha */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowSDM((prev) => !prev)}
                    className="w-full hover:bg-orange-200 text-gray-900 font-semibold py-3 px-6 border-b border-orange-300 transition-colors flex items-center justify-between"
                  >
                    <span>Rekap SDM per Pelaku Usaha</span>
                    <ChevronDown
                      className={
                        showSDM
                          ? "rotate-180 transition-transform"
                          : "transition-transform"
                      }
                    />
                  </button>
                  {showSDM && (
                    <div className="mt-4 animate-fade-in">
                      <table className="min-w-full bg-white rounded shadow">
                        <thead>
                          <tr>
                            <th className="py-2 px-4 border-b border-gray-200 text-left">Pelaku Usaha</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-center">Dokter WNI</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-center">Dokter WNA</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-center">Perawat WNI</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-center">Perawat WNA</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-center">Tenaga Kesehatan Lainnya WNI</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-center">Tenaga Kesehatan Lainnya WNA</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-center">Tenaga Non Kesehatan WNI</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-center">Tenaga Non Kesehatan WNA</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listPU.map((pu, idx) => {
                            // Helper to get WNI/WNA for a profesi
                            const getSDM = (profesi, type) => {
                              if (!Array.isArray(pu.sdm)) return "-";
                              const found = pu.sdm.find((s) => s.Profesi === profesi);
                              return found && found[type] ? found[type] : "-";
                            };
                            return (
                              <tr key={idx}>
                                <td className="py-2 px-4 border-b border-gray-200">{pu.nama}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">{getSDM("Dokter", "WNI")}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">{getSDM("Dokter", "WNA")}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">{getSDM("Perawat", "WNI")}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">{getSDM("Perawat", "WNA")}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">{getSDM("Tenaga Medis Lainnya", "WNI")}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">{getSDM("Tenaga Medis Lainnya", "WNA")}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">{getSDM("Tenaga Non Kesehatan", "WNI")}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-center">{getSDM("Tenaga Non Kesehatan", "WNA")}</td>
                              </tr>
                            );
                          })}
                          {/* Total row */}
                          <tr className="font-bold bg-orange-50">
                            <td className="py-2 px-4 border-t border-gray-300">Total</td>
                            <td className="py-2 px-4 border-t border-gray-300 text-center">{totalDokter.WNI}</td>
                            <td className="py-2 px-4 border-t border-gray-300 text-center">{totalDokter.WNA}</td>
                            <td className="py-2 px-4 border-t border-gray-300 text-center">{totalPerawat.WNI}</td>
                            <td className="py-2 px-4 border-t border-gray-300 text-center">{totalPerawat.WNA}</td>
                            <td className="py-2 px-4 border-t border-gray-300 text-center">{totalTenagaMedisLainnya.WNI}</td>
                            <td className="py-2 px-4 border-t border-gray-300 text-center">{totalTenagaMedisLainnya.WNA}</td>
                            <td className="py-2 px-4 border-t border-gray-300 text-center">{totalTenagaNonKesehatan.WNI}</td>
                            <td className="py-2 px-4 border-t border-gray-300 text-center">{totalTenagaNonKesehatan.WNA}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
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
