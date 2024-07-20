import { useState, useEffect } from "react";
import { getCookie } from "../../services/cookieService";
import api from "../../services/api";

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const authToken = getCookie("token");

        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setProfileData(response.data.profile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-stone-800 text-stone-900 dark:text-gray-300 p-4">
      {loading ? (
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-2">Loading...</p>
          <svg
            className="animate-spin h-8 w-8 text-stone-900 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 40 40"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : profileData ? (
        <div className="bg-white dark:bg-stone-700 rounded-lg shadow-md p-6 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <div className="flex items-center mb-4 gap-2">
            <p className="text-lg font-semibold">Name:</p>
            <p className="text-md">{profileData.name || "N/A"}</p>
          </div>
          <div className="flex items-center mb-4 gap-2">
            <p className="text-lg font-semibold gap-10">Username:</p>
            <p className="text-md">{profileData.username || "N/A"}</p>
          </div>
          <div className="flex items-center mb-4 gap-2">
            <p className="text-lg font-semibold">Role:</p>
            <p className="text-md">{profileData.role || "N/A"}</p>
          </div>
        </div>
      ) : (
        <p className="text-lg font-semibold">No profile data available</p>
      )}
    </div>
  );
};

export default UserProfile;
