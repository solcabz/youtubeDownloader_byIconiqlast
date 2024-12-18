import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { getCookie } from "../../services/cookieService";

const AddUserModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before submission

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.role ||
      !formData.password
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const token = getCookie("token");
      await axios.post(
        "https://youtubedownloader-byiconiqlast.onrender.com/users/addUser",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      //console.log("User added:", response.data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        setError(
          `Server responded with error: ${
            error.response.data.message || error.response.data
          }`
        );
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error setting up the request: ${error.message}`);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white dark:bg-stone-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-stone-900 dark:text-white text-xl font-bold mb-4">
          Add User
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Full Name"
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Username"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Email"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Role"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Password"
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="text-white hover:text-gray-700 mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Prop type validation
AddUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddUserModal;
