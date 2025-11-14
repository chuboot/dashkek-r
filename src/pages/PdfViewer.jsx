import { useParams } from "react-router-dom";

const PdfViewer = () => {
  const { file } = useParams();

  const pdfUrl = `/pdfs/${file}`;

  return (
    <div className="h-screen bg-gray-200 p-4">
      <iframe
        src={pdfUrl}
        className="w-full h-full rounded-lg border"
        title="PDF Viewer"
      />
    </div>
  );
};

export default PdfViewer;
