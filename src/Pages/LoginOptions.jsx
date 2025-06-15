import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/rentezeLOGO.png";
import adminIcon from "../assets/admin-icon.svg";
import tenantIcon from "../assets/tenant-icon.svg";
import propertyIcon from "../assets/property-icon.svg";
import reportIcon from "../assets/report-icon.svg";

const LoginOptions = () => {
  const navigate = useNavigate();

  const cards = [
    {
      role: "admin",
      label: "Admin",
      icon: adminIcon,
      borderColor: "hover:border-t-[#009CDC]",
    },
    {
      role: "tenant",
      label: "Tenant",
      icon: tenantIcon,
      borderColor: "hover:border-t-[#009CDC]",
    },
    {
      role: "property",
      label: "Property",
      icon: propertyIcon,
      borderColor: "hover:border-t-[#009CDC]",
    },
    {
      role: "report",
      label: "Report",
      icon: reportIcon,
      borderColor: "hover:border-t-[#009CDC]",
    },
  ];

  const handleClick = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-5 px-4 bg-gray-100">
      {/* Logo */}
      <div className=" flex justify-center">
        <img src={logo} alt="Renteze Logo" className="h-80 " />
      </div>

      <h1 className="text-3xl font-semibold text-gray-800">Login as:</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {cards.map((card) => (
          <div
            key={card.role}
            onClick={() => handleClick(card.role)}
            className={` cursor-pointer flex flex-col items-center justify-center gap-4 p-20 border-2 border-gray-300  transition-all duration-300 bg-[#dfdfdf] ${card.borderColor} hover:shadow-xl`}
          >
            <img
              src={card.icon}
              alt={`${card.label} Icon`}
              className="w-20 h-20 object-contain"
            />
            <span className="text-xl font-semibold text-gray-700">
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginOptions;
