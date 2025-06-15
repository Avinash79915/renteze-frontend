// src/AppLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminHome from "./Pages/admin/AdminHome";
import SuperAdminHome from "./Pages/SuperAdmin/SuperAdmin";
import TenantHome from "./Pages/tenant/TenantHome";

const AppLayout = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [userRole, setUserRole] = useState("admin"); // fallback role

  // Get user data from Redux store
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Priority: Redux store > localStorage > default
    const roleFromStore = user?.role;
    const roleFromStorage = localStorage.getItem("userRole");

    if (roleFromStore) {
      setUserRole(roleFromStore);
      localStorage.setItem("userRole", roleFromStore); // Sync with localStorage
    } else if (roleFromStorage) {
      setUserRole(roleFromStorage);
    }
  }, [user]);

  const renderPage = () => {
    switch (location.pathname) {
      case "/admin/home":
        return (
          <AdminHome
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        );
      case "/superadmin/home":
        return (
          <SuperAdminHome
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        );
      case "/tenant/home":
        return (
          <TenantHome
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        );
      default:
        return <Outlet />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Responsive Sidebar */}
      <Sidebar
        role={userRole}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Right section: responsive padding */}
      <div className="flex flex-col min-h-screen pl-0 md:pl-80">
        <Navbar role={userRole} />
        <main className="flex-1 p-4 overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  );
};

export default AppLayout;