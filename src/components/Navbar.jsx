import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSearch, FiSettings, FiLogOut, FiEdit } from "react-icons/fi";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

import demo from "../assets/Avatar.svg";

const Navbar = ({ activeSection, setActiveSection, role}) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setDropdownOpen(false);
      
      dispatch(logout());
      
     
      localStorage.removeItem("userRole");
      localStorage.removeItem("token");
      localStorage.removeItem("authToken");
      
      toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Navigate to home page
      navigate("/", { replace: true });
      
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out. Please try again.");
    }
  };

  const handleImageError = (e) => {
    e.target.src = demo;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
 
    }
  };

  const handleEditProfile = () => {
    setDropdownOpen(false);
    navigate("/profile/edit");
    // toast.info("Edit Profile clicked");
  };

  const handleSettings = () => {
    setDropdownOpen(false);
    navigate("/settings");
    // toast.info("Settings clicked");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-40 pl-16 md:pl-6">
      {/* Left side - Logo with responsive padding to avoid hamburger overlap */}
      <Link 
        onClick={() => setActiveSection && setActiveSection('dashboard')} 
        className="text-2xl font-light text-blue-600 hover:text-blue-700 transition-colors"
      >
        Renteze
      </Link>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-gray-700 w-40 sm:w-60 placeholder-gray-500"
          />
        </form>

        {isAuthenticated ? (
          <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
            {/* Profile Image */}
            <img
              src={user?.profilePicture || demo}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-transparent hover:border-blue-300 transition-colors cursor-pointer"
              onError={handleImageError}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {/* Username */}
            <span className="text-gray-700 font-medium hidden sm:inline">
              {user?.username || user?.name || "User"}
            </span>

            {/* Settings Icon */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`text-gray-600 hover:text-gray-800 relative z-30 transition-all duration-300 p-1 rounded-full hover:bg-gray-100 ${
                dropdownOpen ? "rotate-90 bg-gray-100" : "rotate-0"
              }`}
              aria-label="Settings menu"
            >
              <FiSettings size={22} />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white border shadow-lg rounded-lg z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.username || user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={handleEditProfile}
                >
                  <FiEdit className="mr-3 text-gray-500" size={16} />
                  Edit Profile
                </button>
                
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={handleSettings}
                >
                  <FiSettings className="mr-3 text-gray-500" size={16} />
                  Settings
                </button>
                
                <hr className="my-1" />
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FiLogOut className="mr-3" size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors px-3 py-1 rounded-md hover:bg-blue-50"
            >
              <FiLogIn size={18} />
              <span className="hidden sm:inline">Login</span>
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors px-3 py-1 rounded-md"
            >
              <FiUserPlus size={18} />
              <span className="hidden sm:inline">Signup</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;