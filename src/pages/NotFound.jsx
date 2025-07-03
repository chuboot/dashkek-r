export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF7EF] text-gray-800">
      <img
        src="https://img.icons8.com/ios-filled/100/ff9800/error-cloud.png"
        alt="404 Not Found"
        className="mb-8 animate-bounce"
      />
      <h1 className="text-5xl font-bold text-orange-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Halaman tidak ditemukan</h2>
      <p className="mb-6 text-gray-600 text-center max-w-md">
        Sepertinya kamu tersesat di KEK yang belum ada. Silakan kembali ke dashboard atau cek URL yang kamu masukkan.
      </p>
      <a
        href="/dashboard"
        className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
      >
        Kembali ke Dashboard
      </a>
    </div>
  );
}
