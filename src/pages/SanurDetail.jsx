import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Circle } from 'rc-progress';

const areaData = {
  sanur: {
    title: 'Sanur SEZ',
    description: 'A hub for medical excellence and world-class tourism experiences',
    image: 'https://chuboot.github.io/melalilali/assets/img/bg-snr.png',
    tenagaKerja: 373,
    investasi: 167,
    pelakuUsaha: 13,
  },
  'kura-kura': {
    title: 'Kura Kura Bali SEZ',
    description: 'A dynamic hub for creative industries, sustainable tourism, and cultural innovation',
    image: 'https://chuboot.github.io/melalilali/assets/img/bg-kkb.png',
    tenagaKerja: 556,
    investasi: 110,
    pelakuUsaha: 2,
  },
};

export default function SanurDetail() {
  const { areaId } = useParams();
  const navigate = useNavigate();

  const area = areaData[areaId];

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
      <aside className="w-64 bg-[#FEEEDC] p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 flex items-center">
            <img src="https://img.icons8.com/ios-filled/50/000000/marker.png" alt="Logo" className="w-6 h-6 mr-2" />
            Dashboard KEK
          </h1>
          <nav className="space-y-4">
            <button onClick={() => navigate('/dashboard')} className="flex items-center w-full text-left p-2 bg-white rounded-lg">
              Dashboard
            </button>
            <button className="flex items-center w-full text-left p-2 hover:bg-white rounded-lg">
              BUPP / PU
            </button>
            <button className="flex items-center w-full text-left p-2 hover:bg-white rounded-lg">
              Investasi
            </button>
            <button className="flex items-center w-full text-left p-2 hover:bg-white rounded-lg">
              Tenaga Kerja
            </button>
            <button className="flex items-center w-full text-left p-2 hover:bg-white rounded-lg">
              Progress
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-2">Welcome, Mr. Raihan</h2>
        <p className="text-gray-600 mb-4">
          "Welcome to Dashboard KEK — shaping sustainable economic zones for a better tomorrow. Your strategic journey starts here."
        </p>

        {/* <div className="mb-6 text-sm">
          Home &gt; <span className="text-orange-500 font-semibold">{area.title}</span>
        </div> */}
        {/* <div className="mb-6 text-sm flex items-center space-x-2">
            <Link to="/dashboard" className="text-blue-500 hover:underline">Home</Link>
            <span>&gt;</span>
            <span className="text-orange-500 font-semibold">{area.title}</span>
        </div> */}
        <div className="mb-6 text-sm flex items-center space-x-2">
  {/* Home */}
  <Link
    to="/dashboard"
    className="text-blue-500 hover:underline hover:text-blue-700 transition-colors flex items-center"
  >
    Home
  </Link>
  
  <ChevronRight className="w-4 h-4 text-gray-400" />

 

  {/* Current Page */}
  <span className="text-orange-500 font-semibold">{area.title}</span>
</div>

        <div className="mb-8">
          <img
            src={area.image}
            alt={area.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3 className="text-2xl font-semibold mt-4">{area.title}</h3>
          <p className="text-gray-600">
            {area.description}
          </p>
        </div>

        {/* Statistic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-red-100 text-red-500 p-2 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                   
<path d="M18.5 19.5L20 21M11 14C7.13401 14 4 17.134 4 21H11M19 17.5C19 18.8807 17.8807 20 16.5 20C15.1193 20 14 18.8807 14 17.5C14 16.1193 15.1193 15 16.5 15C17.8807 15 19 16.1193 19 17.5ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
                <span className="font-semibold">Tenaga Kerja</span>
              </div>
              <div className="w-16 h-16">
                <Circle percent={50} strokeWidth={8} strokeColor="#f87171" />
              </div>
            </div>
            <div className="text-3xl font-bold text-center">{area.tenagaKerja} Orang</div>
          </div>

          {/* Card 2 */}
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
            <div className="text-3xl font-bold text-center">Rp. {area.investasi}M</div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex flex-col justify-between">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-purple-100 text-purple-500 p-2 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                 <path fill-rule="evenodd" d="M11,2 C12.6568542,2 14,3.34314575 14,5 L14.0000889,6.17067428 C14.3128427,6.06014282 14.6493978,6 15,6 L19,6 C20.6568542,6 22,7.34314575 22,9 L22,19 C22,20.6568542 20.6568542,22 19,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,5 C2,3.34314575 3.34314575,2 5,2 L11,2 Z M11,4 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,19 C4,19.5522847 4.44771525,20 5,20 L12,20 L12,5 C12,4.44771525 11.5522847,4 11,4 Z M19,8 L15,8 C14.4477153,8 14,8.44771525 14,9 L14,20 L19,20 C19.5522847,20 20,19.5522847 20,19 L20,9 C20,8.44771525 19.5522847,8 19,8 Z M9,14 C9.55228475,14 10,14.4477153 10,15 C10,15.5522847 9.55228475,16 9,16 L7,16 C6.44771525,16 6,15.5522847 6,15 C6,14.4477153 6.44771525,14 7,14 L9,14 Z M18,14 C18.5522847,14 19,14.4477153 19,15 C19,15.5522847 18.5522847,16 18,16 L16,16 C15.4477153,16 15,15.5522847 15,15 C15,14.4477153 15.4477153,14 16,14 L18,14 Z M9,10 C9.55228475,10 10,10.4477153 10,11 C10,11.5522847 9.55228475,12 9,12 L7,12 C6.44771525,12 6,11.5522847 6,11 C6,10.4477153 6.44771525,10 7,10 L9,10 Z M18,10 C18.5522847,10 19,10.4477153 19,11 C19,11.5522847 18.5522847,12 18,12 L16,12 C15.4477153,12 15,11.5522847 15,11 C15,10.4477153 15.4477153,10 16,10 L18,10 Z M9,6 C9.55228475,6 10,6.44771525 10,7 C10,7.55228475 9.55228475,8 9,8 L7,8 C6.44771525,8 6,7.55228475 6,7 C6,6.44771525 6.44771525,6 7,6 L9,6 Z"></path>
                </svg>
              </div>
              <span className="font-semibold">Pelaku Usaha</span>
            </div>
            <div className="text-4xl font-bold text-center mb-4">{area.pelakuUsaha}</div>
          </div>
        </div>

        {/* Other Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer">
            <h4 className="text-lg font-semibold mb-2">Isu Strategis</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer">
            <h4 className="text-lg font-semibold mb-2">Gallery</h4>
          </div>
        </div>
      </main>
    </div>
  );
}
