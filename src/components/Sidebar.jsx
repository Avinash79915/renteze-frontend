import React, { useState } from "react";
import { sidebarItemsByRole } from "../config/sidebarConfig";
import logo from "../assets/white-logo.svg";

const Sidebar = ({ activeSection, setActiveSection, role }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const items = sidebarItemsByRole[role] || [];

  console.log("Sidebar - Current role:", role);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleItemClick = (itemKey) => {
    setActiveSection(itemKey);
    setIsMobileMenuOpen(false); // Close mobile menu when item is selected
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#004C86] text-white rounded-md"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-80 bg-[#004C86] text-white h-screen fixed top-0 left-0 overflow-hidden py-8 pl-8 z-10 md:z-10 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0 z-30' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden absolute top-4 right-4 p-2 text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-15 flex justify-start">
          <img src={logo} alt="Renteze Logo" className="h-25" />
        </div>
        
        {items.length === 0 ? (
          <p className="text-white text-sm px-4">
            No menu options available for role: "{role}"
          </p>
        ) : (
          <ul className="divide-y divide-[#009CDC]">
            {items.map((item) => (
              <li
                key={item.key}
                onClick={() => handleItemClick(item.key)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-md transition-colors ${
                  activeSection === item.key
                    ? "bg-[#009CDC]"
                    : "hover:bg-[#009CDC]"
                }`}
              >
                <img src={item.icon} alt={item.label} className="w-6 h-6" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  );
};

export default Sidebar;