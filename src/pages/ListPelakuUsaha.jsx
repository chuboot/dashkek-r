import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import { ChevronRight } from 'lucide-react';


const ListPelakuUsaha = () => {
  const { areaId } = useParams();
  const [listPU, setListPU] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbz1klGLrgBUrtJBf5q_L01Ch9m-luFUpCwks9cJAodvJ410pVJa7-AJz25csQSPszZG5Q/exec')
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
            progress: row.Progress || '-',
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
            { label: "Pelaku Usaha", active: true }
          ]}
        />
        
        {/* End Breadcrumb */}

        <h2 className="text-2xl font-bold mb-4">Daftar Pelaku Usaha</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className='flex justify-between text-[12px] font-semibold text-gray-500'><span>Nama Pelaku Usaha</span><span>Progress Pembangunan</span></div>
            {listPU.map((item, index) => (
              // console.log(item),
              <div key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div className="text-lg font-semibold">{item.nama}</div>
                <div className="flex items-center space-x-2">
                  <div className="text-blue-500 font-bold">{item.progress * 100 + "%"}</div>
                  <Link
                    to={`/dashboard/${areaId}/pelaku-usaha/${encodeURIComponent(item.nama)}`}
                    state={{ item }}
                    className="text-orange-500 hover:text-orange-700"
                    title="Lihat Detail"
                  >
                    {/* <button
                  // onClick={() => navigate(`/detail/${encodeURIComponent(item.nama)}`)}
                  onClick={() => navigate(`/dashboard/${areaId}/pelaku-usaha/${encodeURIComponent(item.nama)}`)}
                  className="text-gray-500 hover:text-blue-500"
                > */}
                    
                    <ChevronRight size={20} />
                  </Link>
                  {/* </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      </div>
    </div>
  );
};

export default ListPelakuUsaha;