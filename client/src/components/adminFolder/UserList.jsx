import { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import AddUserModal from "./AddUserModal"; // Adjust the path as necessary
import { getCookie } from "../../services/cookieService";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [editedData, setEditedData] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");
      const response = await axios.get("http://localhost:3000/users/userlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching users.");
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = getCookie("token");
      await axios.delete(`http://localhost:3000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId)); // Optimistic UI update
    } catch (error) {
      setError("Error deleting user.");
    }
  };

  const toggleEditMode = (userId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [userId]: !prevEditMode[userId],
    }));

    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [userId]: { ...users.find((user) => user._id === userId) },
    }));
  };

  const handleInputChange = (userId, e) => {
    const { name, value } = e.target;
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [userId]: {
        ...prevEditedData[userId],
        [name]: value,
      },
    }));
  };

  const saveEditedData = async (userId) => {
    try {
      const token = getCookie("token");
      await axios.put(
        `http://localhost:3000/users/${userId}`,
        editedData[userId],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) => (user._id === userId ? editedData[userId] : user))
      ); // Optimistic UI update
      toggleEditMode(userId);
    } catch (error) {
      setError("Error saving user data.");
    }
  };

  const openAddUserModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddUserModal = () => {
    setIsAddModalOpen(false);
    fetchUsers();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-stone-800  text-stone-900 dark:text-gray-300">
        <div className="max-w-4xl w-full mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">User List</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4 flex justify-end">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              onClick={openAddUserModal}
            >
              <PlusIcon className="h-5 w-5 inline-block -mt-1 mr-1" /> Add User
            </button>
          </div>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white dark:bg-stone-900">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-stone-700 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase border-b border-gray-300 dark:border-stone-700 text-left">
                    ID
                  </th>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-stone-700 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase border-b border-gray-300 dark:border-stone-700 text-left">
                    Name
                  </th>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-stone-700 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase border-b border-gray-300 dark:border-stone-700 text-left">
                    Username
                  </th>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-stone-700 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase border-b border-gray-300 dark:border-stone-700 text-left">
                    Email
                  </th>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-stone-700 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase border-b border-gray-300 dark:border-stone-700 text-left">
                    Role
                  </th>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-stone-700 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase border-b border-gray-300 dark:border-stone-700 text-left">
                    Password
                  </th>
                  <th className="py-2 px-4 bg-gray-200 dark:bg-stone-700 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase border-b border-gray-300 dark:border-stone-700 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 dark:border-stone-700"
                  >
                    <td className="py-2 px-4 text-sm">{user._id}</td>
                    <td className="py-2 px-4 text-sm">
                      {editMode[user._id] ? (
                        <input
                          type="text"
                          name="name"
                          value={editedData[user._id]?.name || ""}
                          onChange={(e) => handleInputChange(user._id, e)}
                          className="border border-gray-300 dark:border-stone-700 px-2 py-1 rounded-md w-full"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      {editMode[user._id] ? (
                        <input
                          type="text"
                          name="username"
                          value={editedData[user._id]?.username || ""}
                          onChange={(e) => handleInputChange(user._id, e)}
                          className="border border-gray-300 dark:border-stone-700 px-2 py-1 rounded-md w-full"
                        />
                      ) : (
                        user.username
                      )}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      {editMode[user._id] ? (
                        <input
                          type="text"
                          name="email"
                          value={editedData[user._id]?.email || ""}
                          onChange={(e) => handleInputChange(user._id, e)}
                          className="border border-gray-300 dark:border-stone-700 px-2 py-1 rounded-md w-full"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      {editMode[user._id] ? (
                        <input
                          type="text"
                          name="role"
                          value={editedData[user._id]?.role || ""}
                          onChange={(e) => handleInputChange(user._id, e)}
                          className="border border-gray-300 dark:border-stone-700 px-2 py-1 rounded-md w-full"
                        />
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      {editMode[user._id] ? (
                        <input
                          type="password"
                          name="password"
                          value={editedData[user._id]?.password || ""}
                          onChange={(e) => handleInputChange(user._id, e)}
                          className="border border-gray-300 dark:border-stone-700 px-2 py-1 rounded-md w-full"
                        />
                      ) : (
                        "••••••••"
                      )}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      {editMode[user._id] ? (
                        <>
                          <button
                            onClick={() => saveEditedData(user._id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 inline-block"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 0c-.553 0-1.045.47-1 .987L2 2v14a2 2 0 002 2h12a2 2 0 002-2V4a1 1 0 00-2 0v12H4V2.197C4 1.577 3.583 1 3 1zm3 3h6a1 1 0 100-2H6a1 1 0 100 2zm6 10a1 1 0 01-2 0V8a1 1 0 012 0v5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => toggleEditMode(user._id)}
                            className="text-red-600 hover:text-red-700 ml-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 inline-block"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleEditMode(user._id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <PencilIcon className="h-5 w-5 inline-block" />
                          </button>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="text-red-600 hover:text-red-700 ml-2"
                          >
                            <TrashIcon className="h-5 w-5 inline-block" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isAddModalOpen && (
        <AddUserModal isOpen={true} onClose={closeAddUserModal} />
      )}
    </>
  );
};

export default UserList;
