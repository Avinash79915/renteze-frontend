import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { setQuery } from "../features/filter/filterSlice";
import { toast } from "react-toastify";
import {
  FiSearch,
  FiSettings,
  FiLogOut,
  FiEdit,
  FiLogIn,
  FiUserPlus,
  FiBell,
  FiClock,
} from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";
import { FaHistory } from "react-icons/fa";

import demo from "../assets/Avatar.svg";

const Navbar = ({ activeSection, setActiveSection }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { query } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const recentActivities = [
    {
      icon: MdOutlineMessage,
      message: "Pipe leaking",
      time: "2 hours ago",
      color: "text-[#1652A1]",
    },
    {
      icon: FiBell,
      message: "New property listed in your area",
      time: "2 hours ago",
      color: "text-[#1652A1]",
    },
    {
      icon: FiEdit,
      message: "Your profile was updated",
      time: "Yesterday",
      color: "text-[#1652A1]",
    },
    {
      icon: FiLogIn,
      message: "New login detected",
      time: "2 days ago",
      color: "text-[#1652A1]",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully!");
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-white shadow-md md:px-6 px-3 py-3 flex justify-between items-center sticky top-0 z-40 pl-16 md:pl-6">
      <Link
        onClick={() => setActiveSection && setActiveSection("dashboard")}
        className="text-2xl font-light text-[#004C86] hover:text-blue-700 transition-colors"
      >
        Renteze
      </Link>

      <div className="flex items-center space-x-5 relative">
        {isAuthenticated ? (
          <div className="flex items-center ">
            <div className="flex items-center space-x-4" ref={dropdownRef}>
              <img
                src={user?.profilePicture || demo}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-transparent hover:border-blue-300 transition-colors cursor-pointer"
              />

              <span className="text-gray-700 font-medium hidden sm:inline">
                {user?.username || user?.name || "User"}
              </span>

              <button
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setNotificationOpen(false);
                }}
                className="text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Settings menu"
              >
                <FiSettings size={22} />
              </button>

              <div
                className={`absolute right-0 top-12 w-48 bg-white border border-gray-300 shadow-lg rounded-lg z-50 py-1 transition-all duration-200 transform origin-top-right ${
                  dropdownOpen
                    ? "scale-100 opacity-100 pointer-events-auto"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                <div className="px-2 py-2 border-b border-gray-100">
                  <p className="text-xl font-semibold text-[#1652A1]">
                    {user?.username || user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "user@example.com"}
                  </p>
                </div>

                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setDropdownOpen(false);
                    setActiveSection("editProfile");
                  }}
                >
                  <FiEdit className="mr-3" size={16} />
                  Edit Profile
                </button>

                {/* <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setDropdownOpen(false);
                    setActiveSection("settings");
                  }}
                >
                  <FiSettings className="mr-3" size={16} />
                  Settings
                </button> */}

                <button
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setDropdownOpen(false);
                    setActiveSection("history");
                  }}
                >
                  <FaHistory  className="mr-3" size={16}  />

                  History 
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                >
                  <FiLogOut className="mr-3" size={16} />
                  Logout
                </button>
              </div>
            </div>

            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => {
                  setNotificationOpen(!notificationOpen);
                  setDropdownOpen(false);
                }}
                className="relative text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FiBell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div
                className={`absolute right-0 top-12 w-80 bg-white border border-gray-300 shadow-lg rounded-xl z-50 py-1 transition-all duration-200 transform origin-top-right ${
                  notificationOpen
                    ? "scale-100 opacity-100 pointer-events-auto"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                <div className="bg-white p-2 rounded-xl">
                  <h2 className="text-xl font-semibold text-[#1652A1] mb-3">
                    Recent Activities
                  </h2>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-1 p-1 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div
                            className={`p-2 rounded-full bg-gray-100 ${activity.color}`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 mb-1">
                              {activity.message}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <FiClock className="w-3 h-3" />
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className="w-full mt-4 text-center text-[#1652A1] hover:text-[#143d7a] text-sm font-medium py-2 border-t border-gray-100"
                    onClick={() => {
                      setNotificationOpen(false);
                      setActiveSection("notifications");
                    }}
                  >
                    View All Activities
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="flex items-center gap-2 text-[#1652A1] font-medium hover:text-blue-500 transition-colors px-3 py-1 rounded-md hover:bg-blue-50"
            >
              <FiLogIn size={18} />
              <span className="hidden sm:inline">Login</span>
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 bg-[#1652A1] text-white font-medium hover:bg-blue-500 transition-colors px-3 py-1 rounded-md"
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
