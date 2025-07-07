import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ChevronRight } from "lucide-react";
import axios from 'axios';
import { SquareArrowOutUpRight } from 'lucide-react';


const ListPelakuUsaha = () => {
  const { areaId } = useParams();
  const [listPU, setListPU] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/g9tm6es3iwk8i')
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

  return (
    <div className="flex min-h-screen bg-[#FFF7EF] text-gray-800">
      <Sidebar />
      <main className="flex-1 p-10">
        {/* Breadcrumb */}
        <nav
          className=" border-y border-y-gray-200 px-6 py-3 mb-6 flex items-center"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link to="/dashboard" className="hover:underline text-blue-600 font-medium">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link
                to={`/dashboard/${areaId}`}
                className="hover:underline text-blue-600 font-medium capitalize"
              >
                {areaId}-SEZ
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li className="text-orange-500 font-semibold">Pelaku Usaha</li>
          </ol>
        </nav>
        {/* End Breadcrumb */}

        <h2 className="text-2xl font-bold mb-4">Daftar Pelaku Usaha</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
          {listPU.map((item, index) => (
            // console.log(item),
            <div key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div className="text-lg font-semibold">{item.nama}</div>
              <div className="flex items-center space-x-2">
                <div className="text-blue-500 font-bold">{item.progress}</div>
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
                    <SquareArrowOutUpRight size={20} />
                    </Link>
                {/* </button> */}
              </div>
            </div>
          ))}
        </div>
        )}
      </main>
    </div>
  );
};

export default ListPelakuUsaha;