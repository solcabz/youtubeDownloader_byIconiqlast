import Darkmode from "../services/Darkmode";

function Music() {
  return (
    <>
      <Darkmode />
      <div className="min-h-screen bg-gray-100 dark:bg-stone-800 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-50 p-8 dark:bg-stone-700 dark:text-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">YouTube Mp3 Downloader</h1>
          {/* <DownloadForm /> */}
        </div>
      </div>
    </>
  );
}

export default Music;
