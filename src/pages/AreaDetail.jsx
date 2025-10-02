import { useParams, useNavigate, Link } from "react-router-dom";
import TenagaKerjaCard from "../components/TenagaKerjaCard";
import InvestasiCard from "../components/InvestasiCard";
import PelakuUsahaCard from "../components/PelakuUsahaCard";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import { useState, useEffect } from "react";
import {
  Users,
  MessageSquareQuote,
  Image,
  ChevronDown,
  ChevronUp,
  FileText,
  MapPin,
  Landmark,
  Building2,
  Play,
  ScrollText,
  Briefcase,
  Map,
  Layers,
  LandPlot,
  CheckSquare,
} from "lucide-react";
import DashKekKesehatan from "../components/DashKekKesehatan";
import { PieChart, Pie, Cell } from "recharts";
import MapLokasi from "../components/MapLokasi";
const AreaDetail = () => {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const [area, setArea] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengubah status sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(
      // "https://script.google.com/macros/s/AKfycbzuZ4GYed2KUNvp6tqVhijo0du79igUdULyiYZHK_2cy4zoWj9Yt4ReEnqK8sFcTAO9/exec"
      "https://script.google.com/macros/s/AKfycbw9ykhJi8PY2HuwqYs_vkAbuh_KWi_HQf9XuxuVuxyxb8QoPars5blIgTOUTLrshTiY8A/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        // data: array of object, cari berdasarkan areaId
        const found = data.KEK.filter(
          (item) => item.ID?.toLowerCase() === areaId?.toLowerCase()
        );
        // const found = data.KEK
        setArea(found[0]);
        setLoading(false);
        console.log(found[0]);
      })
      .catch(() => setLoading(false));
  }, [areaId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FFF7EF]">
        <div className="w-full max-w-3xl space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
            <div className="flex gap-4 mb-4">
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!area) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Area not found</h1>
      </div>
    );
  }

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

        {/* Main Content */}
        <main className="flex-1 p-5 md:p-10">
          <h2 className="text-3xl font-semibold mb-2">
            Welcome, Administrator KEK
          </h2>
          <p className="text-gray-600 mb-4">
            "Welcome to Dashboard KEK — shaping sustainable economic zones for a
            better tomorrow. Your strategic journey starts here."
          </p>
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", to: "/dashboard" },
              { label: `${areaId}-SEZ`, active: true },
            ]}
          />

          {/* <div className="mb-8">
                        <img
                            src={area.Image}
                            alt={area.Title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                        <h3 className="text-2xl font-semibold mt-4">{area.Title}</h3>
                        <p className="text-gray-600">{area.Description}</p>
                    </div> */}
          <div className="mb-8 relative">
            <img
              src={area.Image}
              alt={area.Title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-white p-4 rounded-b-lg">
              <div className="flex items-center">
                <MapPin size={15} />
                <span className="ml-2 font-light">
                  {area.City}, {area.Province}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{area.Title}</h3>
              <p className="text-gray-200">{area.Description}</p>
            </div>
          </div>
          {/* Tombol Show All */}
          <div className="flex justify-center my-4">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-4 py-2 shadow rounded-full text-gray-700 hover:text-orange-700 hover:bg-orange-100 transition"
            >
              {open ? "Hide Detail" : "Show Detail"}
              {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Accordion Detail */}
          {open && (
            <div className="my-4 p-4  rounded-lg bg-white shadow text-gray-700 space-y-3">
              <DetailItem
                icon={<Building2 size={18} />}
                label="BUPP"
                value={area.BUPP}
              />
              <DetailItem
                icon={<Play size={18} />}
                label="Beroperasi"
                value={area.Beroperasi}
              />
              <DetailItem
                icon={<Landmark size={18} />}
                label="Landasan Hukum"
                value={area["Landasan Hukum"]}
              />
              <DetailItem
                icon={<Briefcase size={18} />}
                label="Kegiatan Utama"
                value={area["Kegiatan Utama"]}
              />
              <DetailItem
                icon={<Map size={18} />}
                label="Total Lahan (Ha)"
                value={area["Total Lahan"]}
              />
              <DetailItem
                icon={<Layers size={18} />}
                label="Lahan Dikuasai (Ha)"
                value={area["Lahan Dikuasai"]}
              />
              <DetailItem
                icon={<CheckSquare size={18} />}
                label="Lahan Dimanfaatkan (Ha)"
                value={area["Lahan Dimanfaatkan"]}
              />
            </div>
          )}
          {/* Statistic Cards */}
          <div className="grid grid-cols-1  lg:grid-cols-3 gap-10">
            {/* Card 1 */}
            <TenagaKerjaCard />
            {/* Card 2 */}
            <InvestasiCard />
            {/* Card 3 */}
            <PelakuUsahaCard />
          </div>
          {/* Other Menu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer ">
              <div className="flex items-center space-x-2 ">
                <div className="bg-orange-100 text-orange-500 p-2 rounded-full">
                  <LandPlot />
                </div>
                <span className="font-semibold">Okupansi Lahan</span>
              </div>
              <div className="flex flex-col items-center justify-between w-full my-4 border border-amber-200 p-2 rounded-2xl">
                <div className="flex justify-between items-center ">
                  <PieChart width={200} height={200}>
                    <Pie
                      data={[
                        {
                          name: "Lahan Dikuasai",
                          value:
                            (area["Lahan Dikuasai"] / area["Total Lahan"]) *
                            100,
                        }, // Menggunakan nilai persentase aktual
                        {
                          name: "Lahan Tidak Dikuasai",
                          value:
                            ((area["Total Lahan"] - area["Lahan Dikuasai"]) /
                              area["Lahan Dikuasai"]) *
                            100,
                        }, // Menggunakan nilai persentase aktual
                      ]}
                      cx={70}
                      cy={70}
                      innerRadius={35}
                      outerRadius={45}
                      startAngle={90}
                      endAngle={450}
                      dataKey="value"
                    >
                      {/* Definisikan warna untuk setiap Cell */}
                      <Cell key="cell-0" fill="#f8cf2c" />{" "}
                      {/* Warna untuk Lahan Dikuasai */}
                      <Cell key="cell-1" fill="#cccccc" />{" "}
                      {/* Warna untuk Lahan Tidak Dikuasai */}
                    </Pie>
                  </PieChart>
                  <div className="text-right ">
                    <p className="text-xs text-gray-600">Total Luas Lahan</p>
                    <p className="text-xl font-bold">
                      {area["Total Lahan"]} Ha
                    </p>
                  <div className="mt-2 text-xs text-gray-600 ">
                    <p>Luas lahan telah dikuasai</p>
                   
                      {(
                        (area["Lahan Dikuasai"] / area["Total Lahan"]) *
                        100
                      ).toFixed(2)}{" "}
                      % ({area["Lahan Dikuasai"]} Ha dari Luas sesuai PP)
                  </div>
                  </div>
                </div>
                <div className="flex justify-between items-center ">
                  <PieChart width={200} height={200}>
                    <Pie
                      data={[
                        {
                          name: "Lahan Dimanfaatkan",
                          value:
                            (area["Lahan Dimanfaatkan"] /
                              area["Lahan Dikuasai"]) *
                            100,
                        }, // Menggunakan nilai persentase aktual
                        {
                          name: "Lahan Tidak Dimanfaatkan",
                          value:
                            ((area["Lahan Dikuasai"] -
                              area["Lahan Dimanfaatkan"]) /
                              area["Lahan Dikuasai"]) *
                            100,
                        }, // Menggunakan nilai persentase aktual
                      ]}
                      cx={70}
                      cy={70}
                      innerRadius={35}
                      outerRadius={45}
                      startAngle={90}
                      endAngle={450}
                      dataKey="value"
                    >
                      {/* Definisikan warna untuk setiap Cell */}
                      <Cell key="cell-0" fill="#f8cf2c" />{" "}
                      {/* Warna untuk Lahan Dikuasai */}
                      <Cell key="cell-1" fill="#cccccc" />{" "}
                      {/* Warna untuk Lahan Tidak Dikuasai */}
                    </Pie>
                  </PieChart>
                  <div className="text-right ">
                    <p className="text-xs text-gray-600">Total Pemanfaatan Lahan</p>
                    <p className="text-xl font-bold">
                      {area["Lahan Dimanfaatkan"]} Ha
                    </p>
                  <div className="mt-2 text-xs text-gray-600">
                    Luas lahan yang dimanfaatkan
                    <br />
                    {area["Lahan Dimanfaatkan"]} Ha (
                    {(
                      (area["Lahan Dimanfaatkan"] / area["Lahan Dikuasai"]) *
                      100
                    ).toFixed(2)}{" "}
                    % dari Luas sesuai PP )
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 text-blue-500 p-2 rounded-full">
                  <MapPin />
                </div>
                <span className="font-semibold">Lokasi KEK</span>
              </div>
              <div className="my-8  overflow-hidden border-1 rounded-2xl border-orange-300">
                {/* Minimap */}

                <MapLokasi data={area} />
                {/* <div className="w-full h-64 rounded-lg overflow-hidden shadow">
                  <iframe
                    title="Mini Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.openstreetmap.org/export/embed.html?layer=mapnik&marker=-8.73185327657203,115.23144358972414&map=18/-8.73185327657203/115.23144358972414"
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                  ></iframe>

                  <div className="text-xs mt-1 text-gray-500">
                    <a
                      href="https://www.openstreetmap.org/?mlat=-8.73185327657203&mlon=115.23144358972414#map=18/-8.73185/115.23144"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Lihat peta lebih besar
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* Pie Chart Section */}

          {/* <div className="flex flex-col items-start my-4 p-4 bg-white rounded-xl w-64 shadow hover:shadow-lg cursor-pointer">
            <div className="bg-orange-500 text-white text-sm font-semibold px-2 py-1 rounded mb-2 w-max">
              Okupansi Lahan
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-center">
                <PieChart width={80} height={80}>
                  <Pie
                    data={[
                      { name: "Dikuasai", value: 100 },
                      {
                        name: "Sisa",
                        value:
                          100 -
                          (area["Lahan Dikuasai"] / area["Total Lahan"]) * 100,
                      },
                    ]}
                    cx={40}
                    cy={40}
                    innerRadius={25}
                    outerRadius={35}
                    startAngle={90}
                    endAngle={450}
                    dataKey="value"
                  >
                    <Cell fill="#f8cf2c" />
                  </Pie>
                </PieChart>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Total Luas Lahan</p>
                <p className="text-xl font-bold">{area["Total Lahan"]} Ha</p>
              </div>
            </div>
            <div className="mt-1 text-sm">
              <p>Lahan telah dikuasai</p>
              <p className="font-bold">
                {(area["Lahan Dikuasai"] / area["Total Lahan"]) * 100}
              </p>
              <p className="font-bold">{area["Lahan Dikuasai"]} Ha</p>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              Luas lahan yang dimanfaatkan
              <br />
              {area["Lahan Dimanfaatkan"]} Ha (
              {(area["Lahan Dimanfaatkan"] / area["Lahan Dikuasai"]) * 100} %
              dari Luas sesuai PP)
            </div>
          </div> */}

          {/* Khusus untuk sektor Kesehatan */}
          {areaId === "sanur" && <DashKekKesehatan />}
        </main>
      </div>
    </div>
  );
};

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-gray-500 mt-1">{icon}</div>
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-sm text-gray-600">{value || "-"}</p>
      </div>
    </div>
  );
}

export default AreaDetail;
