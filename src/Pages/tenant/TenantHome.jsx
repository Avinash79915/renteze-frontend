import React from "react";
import Communication from "../../components/TenantCommunication";
import Report from "../../components/TenantComponents/TenantReport";
import Home from "../../components/TenantHome";

const TenantHome = ({ activeSection, setActiveSection }) => {
  const renderComponent = () => {
    switch (activeSection) {
      case "home":
        return <Home />;
      case "communication":
        return <Communication />;
      case "report":
        return <Report />;
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
