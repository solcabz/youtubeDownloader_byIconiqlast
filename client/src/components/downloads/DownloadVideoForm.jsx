import { useState, useEffect } from "react";
import axios from "axios";

const DownloadForm = () => {
  const [url, setUrl] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("4k");
  const [isLoading, setIsLoading] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (url) {
      const fetchVideoInfo = async () => {
        setIsLoading(true);
        setError("");
        try {
          const response = await axios.get(
            "http://localhost:3000/getVideoInfo",
            {
              params: { url },
            }
          );
          const { videoDetails } = response.data;
          if (videoDetails) {
            setVideoTitle(videoDetails.title);
          } else {
            throw new Error("No video details found in response.");
          }
        } catch (error) {
          setError(
            "Error fetching video info. Please check the URL and try again."
          );
          console.error("Error fetching video info:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchVideoInfo();
    }
  }, [url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:3000/downloadMp4", {
        params: { url, format: selectedFormat },
        responseType: "blob",
      });
      const fileName = videoTitle ? `${videoTitle}.mp4` : "video.mp4";
      const blob = new Blob([response.data], { type: "video/mp4" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      setError("Error downloading video. Please try again.");
      console.error("Error details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleFormatChange = (e) => setSelectedFormat(e.target.value);
  const isValidYoutubeUrl = (url) =>
    /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(url);

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6 font-montserrat">
      <div>
        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
          YouTube URL:
        </label>
        <input
          type="url"
          value={url}
          onChange={handleUrlChange}
          required
          className="mt-1 block w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-gray-400 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
          placeholder="Enter YouTube URL"
        />
        {!isValidYoutubeUrl(url) && url && (
          <p className="text-red-500 text-sm">
            Please enter a valid YouTube URL.
          </p>
        )}
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
          Format:
        </label>
        <select
          value={selectedFormat}
          onChange={handleFormatChange}
          className="block w-full px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-gray-400 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
        >
          <option value="4k">4k</option>
          <option value="1080p">1080p</option>
          <option value="720p">720p</option>
        </select>
      </div>

      {videoTitle && (
        <p className="text-lg font-medium text-stone-700 dark:text-gray-300">
          Video Title: {videoTitle}
        </p>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isLoading || !isValidYoutubeUrl(url)}
        className="px-6 py-3 text-lg font-semibold bg-blue-500 dark:bg-orange-400 dark:hover:bg-amber-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
      >
        {isLoading ? "Downloading..." : "Download"}
      </button>
    </form>
  );
};

export default DownloadForm;
