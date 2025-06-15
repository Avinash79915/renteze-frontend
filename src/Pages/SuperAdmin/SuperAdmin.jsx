// src/Pages/admin/AdminHome.jsx
import React from "react";
import PropertyList from "../../components/SuperAdminComponent/PropertyListing";
import Communication from "../../components/Communication";
import Report from "../../components/Report";
import Dashboard from "../../components/SuperAdminComponent/SuperAdminDashboard";
import TenantManagement from "../../components/SuperAdminComponent/TenantManagement";
import UserManagement from "../../components/SuperAdminComponent/UserManagement";
import AdminManagement from "../../components/SuperAdminComponent/AdminManagement";
const SuperAdmin = ({ activeSection, setActiveSection }) => {
  const renderComponent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "user":
        return <UserManagement />;
      case "admin":
        return <AdminManagement />;
      case "tenant":
        return <TenantManagement />;
      case "property":
        return <PropertyList />;
      case "communication":
        return <Communication />;
      case "report":
        return <Report />;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex-1 p-6">{renderComponent()}</div>
    </div>
  );
};

export default SuperAdmin;
