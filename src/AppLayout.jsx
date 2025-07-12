import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminHome from "./Pages/admin/AdminHome";
import SuperAdminHome from "./Pages/SuperAdmin/SuperAdmin";
import TenantHome from "./Pages/tenant/TenantHome";
import GlobalLoader from "./components/GlobalLoader"; // ✅ import

const AppLayout = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem("activeSection") || "dashboard";
  });

  const [userRole, setUserRole] = useState("guest");
  const [loading, setLoading] = useState(true); // ✅ loader
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const roleFromStore = user?.role;
    const roleFromStorage = localStorage.getItem("userRole");

    if (roleFromStore) {
      setUserRole(roleFromStore);
      localStorage.setItem("userRole", roleFromStore);
    } else if (roleFromStorage) {
      setUserRole(roleFromStorage);
    }

    // Simulate loading for smoother UX
    const timer = setTimeout(() => setLoading(false), 400); // ⏳
    return () => clearTimeout(timer);
  }, [user]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    localStorage.setItem("activeSection", section);
  };

  const renderPage = () => {
    switch (location.pathname) {
      case "/admin/home":
        return (
          <AdminHome
            activeSection={activeSection}
            setActiveSection={handleSectionChange}
          />
        );
      case "/superadmin/home":
        return (
          <SuperAdminHome
            activeSection={activeSection}
            setActiveSection={handleSectionChange}
          />
        );
      case "/tenant/home":
        return (
          <TenantHome
            activeSection={activeSection}
            setActiveSection={handleSectionChange}
          />
        );
      default:
        return <Outlet />;
    }
  };

  if (loading) return <GlobalLoader />; // ✅ show loading

  return (
    <div className="min-h-screen">
      <Sidebar
        role={userRole}
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
      />
      <div className="flex flex-col min-h-screen pl-0 md:pl-80">
        <Navbar
          role={userRole}
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
        />
        <main className="flex-1 p-0 md:p-4 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
