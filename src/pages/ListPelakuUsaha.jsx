import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import { ChevronRight, Landmark } from "lucide-react";

const ListPelakuUsaha = () => {
  const { areaId } = useParams();
  const [listPU, setListPU] = useState([]);
  const [loading, setLoading] = useState(true);

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
            row.LokasiKEK.toLowerCase() === areaId?.toLowerCase()
        );
        setListPU(
          filtered.map((row) => ({
            nama: row.NamaPU,
            brandx: row.BrandPU,
            progress: row.Progress || "-",
          }))
        );
        setLoading(false);
      });
  }, [areaId]);

  // Fungsi untuk mengubah status sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FFF7EF] text-gray-800">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* Header untuk mobile */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center px-4 h-16 shadow bg-white">
          <button onClick={() => setSidebarOpen(true)}>☰</button>
          <h1 className="ml-4 font-semibold">DashKEK</h1>
        </header>
        <main className="flex-1 p-5 md:p-10">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", to: "/dashboard" },
              { label: `${areaId}-SEZ`, to: `/dashboard/${areaId}` },
              { label: "Pelaku Usaha", active: true },
            ]}
          />

          {/* End Breadcrumb */}

          <h2 className="text-2xl font-bold mb-4">Daftar Pelaku Usaha</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            // <div className="space-y-4 max-w-2xl mx-auto">
            //   <div className='flex justify-between text-[12px] font-semibold text-gray-500'><span>Nama Pelaku Usaha</span><span>Progress Pembangunan</span></div>
            //   {listPU.map((item, index) => (
            //     // console.log(item),
            //     <div key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            //       <div className="text-lg font-semibold">{item.nama}</div>
            //       <div className="flex items-center space-x-2">
            //         <div className="text-blue-500 font-bold">{item.progress * 100 + "%"}</div>
            //         <Link
            //           to={`/dashboard/${areaId}/pelaku-usaha/${encodeURIComponent(item.nama)}`}
            //           state={{ item }}
            //           className="text-orange-500 hover:text-orange-700"
            //           title="Lihat Detail"
            //         >
            //           {/* <button
            //         // onClick={() => navigate(`/detail/${encodeURIComponent(item.nama)}`)}
            //         onClick={() => navigate(`/dashboard/${areaId}/pelaku-usaha/${encodeURIComponent(item.nama)}`)}
            //         className="text-gray-500 hover:text-blue-500"
            //       > */}

            //           <ChevronRight size={20} />
            //         </Link>
            //         {/* </button> */}
            //       </div>
            //     </div>
            //   ))}
            // </div>
            <div className="space-y-4 max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
              <div className="flex justify-between text-[12px] font-semibold text-gray-500">
                <span>Nama Pelaku Usaha</span>
                <span>Progress Pembangunan</span>
              </div>

              <ul role="list" className="divide-y divide-gray-100">
                {listPU.map((item, index) => (
                  <li key={index} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="bg-orange-100 text-orange-500 p-2 rounded-full">
                          <Landmark />
                        </div>
                      </div>
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm/6 font-semibold text-gray-900">
                          {item.nama}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          {item.brandx}
                        </p>
                      </div>
                    </div>
                    <div className=" shrink-0 flex flex-col items-center justify-center">
                      <div className="flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full p-1">
                          <p className="text-xs/5 text-gray-500">
                            {item.progress * 100 + "%"}
                          </p>
                          {/* <div className="size-1.5 rounded-full bg-emerald-500" /> */}
                        </div>
                        <Link
                          to={`/dashboard/${areaId}/pelaku-usaha/${encodeURIComponent(
                            item.nama
                          )}`}
                          state={{ item }}
                          className="text-orange-500 hover:text-orange-700"
                          title="Lihat Detail"
                        >
                          <ChevronRight size={20} />
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ListPelakuUsaha;
