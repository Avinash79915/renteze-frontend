// src/Pages/admin/AdminHome.jsx
import React from "react";
import PropertyList from "../../components/SuperAdminComponent/PropertyListing";
import Communication from "../../components/Communication";
import Report from "../../components/Report";
import Dashboard from "../../components/AdminComponents/AdminDashboard";
import TenantManagement from "../../components/SuperAdminComponent/TenantManagement";
const AdminHome = ({ activeSection, setActiveSection }) => {
  const renderComponent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "property":
        return <PropertyList />;
      case 'tenant':
        return <TenantManagement />;
      case 'communication':
        return <Communication />;
      case "report":
        return <Report />;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex-1 p-3 md:p-6">{renderComponent()}</div>
    </div>
  );
};

export default AdminHome;
