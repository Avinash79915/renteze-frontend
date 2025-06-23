import React from "react";
import Communication from "../../components/TenantCommunication";
import Report from "../../components/TenantComponents/TenantReport";
import Home from "../../components/TenantHome";
import EditProfile from "../../components/EditProfile";
import Settings from "../../components/Settings";
import History from "../../components/History";
const TenantHome = ({ activeSection, setActiveSection }) => {
  const renderComponent = () => {
    switch (activeSection) {
      case "home":
        return <Home />;
      case "communication":
        return <Communication />;
      case "report":
        return <Report />;
      case "editProfile":
        return <EditProfile />;
      case "settings":
        return <Settings />;
      case "history":
        return <History />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex-1 p-3 md:p-6">{renderComponent()}</div>
    </div>
  );
};

export default TenantHome;
