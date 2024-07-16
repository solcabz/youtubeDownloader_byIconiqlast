import { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const DownloadForm = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  useEffect(() => {
    const fetchVideoInfo = async () => {
      if (url) {
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
      }
    };
    fetchVideoInfo();
  }, [url]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:3000/downloadMp3", {
        params: { url },
        responseType: "blob",
      });

      const filename = videoTitle ? `${videoTitle}.mp3` : "downloaded.mp3";
      saveAs(response.data, filename);
    } catch (error) {
      setError(
        "Failed to download the MP3. Please check the URL and try again."
      );
      console.error("Error downloading MP3:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleDownload}>
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading || !url}
        className="px-6 py-3 text-lg font-semibold bg-blue-500 dark:bg-orange-400 dark:hover:bg-amber-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
      >
        {isLoading ? "Downloading..." : "Download"}
      </button>
    </form>
  );
};

export default DownloadForm;
