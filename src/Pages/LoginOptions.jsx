import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/rentezeLOGO.png";
import adminIcon from "../assets/grey-admin.svg";
import tenantIcon from "../assets/grey-tenant.svg";
import propertyIcon from "../assets/grey-property.svg";
import reportIcon from "../assets/grey-report.svg";
import HoveradminIcon from "../assets/hover-admin.svg";
import HovertenantIcon from "../assets/hover-tenant.svg";
import HoverpropertyIcon from "../assets/hover-property.svg";
import HoverreportIcon from "../assets/hover-report.svg";

const LoginOptions = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      role: "admin",
      label: "Admin",
      icon: adminIcon,
      hoverIcon: HoveradminIcon,
      borderColor: "hover:border-t-[#009CDC]",
    },
    {
      role: "tenant",
      label: "Tenant",
      icon: tenantIcon,
      hoverIcon: HovertenantIcon,
      borderColor: "hover:border-t-[#009CDC]",
    },
    {
      role: "property",
      label: "Property",
      icon: propertyIcon,
      hoverIcon: HoverpropertyIcon,
      borderColor: "hover:border-t-[#009CDC]",
    },
    {
      role: "report",
      label: "Report",
      icon: reportIcon,
      hoverIcon: HoverreportIcon,
      borderColor: "hover:border-t-[#009CDC]",
    },
  ];

  const handleClick = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] gap-5 px-0 sm:px-6 md:px-8 bg-gray-100">
      {/* Logo */}
      <div className="flex justify-center">
        <img
          src={logo}
          alt="Renteze Logo"
          className="h-40 sm:h-48 md:h-64 lg:h-80 w-auto"
        />
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
        Login as:
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl">
        {cards.map((card) => (
          <div
            key={card.role}
            onClick={() => handleClick(card.role)}
            onMouseEnter={() => setHoveredCard(card.role)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`cursor-pointer flex flex-col items-center justify-center gap-4 p-20 bg-white transition-all duration-100 hover:shadow-xl
        ${
          hoveredCard === card.role
            ? `border-t-2 ${card.borderColor} border-x-blue-300  border-b-blue-300`
            : "border-2 border-[#009CDC]"
        }`}
          >
            <img
              src={hoveredCard === card.role ? card.hoverIcon : card.icon}
              alt={`${card.label} Icon`}
              className="w-16 sm:w-20 h-16 sm:h-20 object-contain transition-all duration-300"
            />
            <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginOptions;
