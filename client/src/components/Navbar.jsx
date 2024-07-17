import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import solcabzImage from "../assets/solcabz.png";
import { removeCookie, getCookie } from "../services/cookieService";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = getCookie("token");
  const userRole = getCookie("userRole");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    removeCookie("token"); // Remove the token cookie
    removeCookie("userRole"); // Remove the user role cookie
    navigate("/login"); // Redirect to the login page
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-gray-100 dark:bg-stone-800 text-stone-900 dark:text-gray-300 border-b-2 border-b-stone-900 dark:border-b-white p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div
            className="text-lg font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={solcabzImage} alt="Solcabz Logo" className="w-10 h-10" />
          </div>

          <div className="hidden md:flex space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/">Mp4</Link>
                <Link to="/audio">Mp3</Link>
                <Link to="/user-profile">Profile</Link>
                {userRole === "admin" && <Link to="/all-users">Users</Link>}
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button className="" onClick={toggleMenu}>
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
                fill="text-stone-900 dark:hover:text-white"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 w-full h-full flex justify-center items-center  bg-gray-100  dark:bg-stone-800 z-40 transform transition-transform ease-in-out duration-300 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="containertext-stone-900 dark:text-gray-300 mx-auto py-4">
          <div className="flex text-center flex-col space-y-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/"
                  className=" hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  Mp4
                </Link>
                <Link
                  to="/audio"
                  className=" hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  Mp3
                </Link>

                <Link
                  to="/user-profile"
                  className=" hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  profile
                </Link>

                {userRole === "admin" && (
                  <Link
                    to="/all-users"
                    className="hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    User List
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="hover:text-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hover:text-gray-300"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
