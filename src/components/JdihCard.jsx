import { FileText, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const JdihCard = ({ title, deskripsi, kategori, tglTerbit, size, fileUrl }) => {
  const fileName = fileUrl.split("/").pop(); // ambil nama file

  return (
    <div className="w-full bg-white border border-amber-400 rounded-xl shadow-sm p-4">
      <div className="flex gap-4 items-start">

        <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
          <FileText className="w-8 h-8 text-red-500" />
        </div>

        <div className="flex-1">
          <h2 className="text-gray-900 font-semibold text-lg">{title}</h2>
          <p className="text-gray-600 text-sm">{deskripsi}</p>

          <span className="inline-block mt-2 bg-yellow-400 text-gray-900 text-xs font-medium px-2 py-1 rounded">
            {size}
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-4 text-xs text-gray-700 bg-red-50 p-2 rounded-md">
        <span>{kategori}</span>
        <span>{tglTerbit}</span>
      </div>

      {/* ACTION BUTTON */}
      <div className="flex gap-4 mt-3 text-sm font-medium">
        {/* View Online */}
        <Link
          to={`/view/${fileName}`}
          className="flex items-center gap-1 text-red-600 hover:text-red-800"
        >
          <ExternalLink size={16} /> Lihat
        </Link>

        {/* Download */}
        <a
          href={fileUrl}
          download
          className="flex items-center gap-1 text-gray-600 hover:text-black"
        >
          <Download size={16} /> Unduh
        </a>
      </div>
    </div>
  );
};

export default JdihCard;
