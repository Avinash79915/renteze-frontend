import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { sidebarItemsByRole } from "../config/sidebarConfig";
import logo from "../assets/white-logo.svg";
import api from "../Pages/utils/axios";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true); // ✅ Loader state
  const { user, isAuthenticated, isLoading } = useAuth0();

  const items = sidebarItemsByRole[role] || [];

  useEffect(() => {
    const fetchRole = async () => {
      if (!isAuthenticated || isLoading) return;

      const email = user?.email;
      if (!email) {
        setRole("guest");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/dashboard?testEmail=${email}`);
        const fetchedRole = res.data.role || "guest";
        setRole(fetchedRole);
      } catch (err) {
        console.error("Sidebar - Failed to fetch user role:", err);
        setRole("guest");
      } finally {
        setLoading(false); // ✅ hide loader
      }
    };

    fetchRole();
  }, [isAuthenticated, isLoading, user]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleItemClick = (itemKey) => {
    setActiveSection(itemKey);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-2 left-2 z-50 p-2 text-[#004C86]"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-20"
          onClick={toggleMobileMenu}
        />
      )}

      <aside
        className={`w-80 bg-[#004C86] text-white h-screen fixed top-0 left-0 overflow-hidden py-20 pl-8 z-10 md:z-10 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0 z-30" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <button
          onClick={toggleMobileMenu}
          className="md:hidden absolute top-4 right-4 p-2 text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="md:mb-15 mb-10 flex flex-col pr-12 justify-center">
          <img src={logo} alt="Renteze Logo" className="md:h-25 h-20" />
        </div>

        {loading ? (
          <div className="text-white text-center mt-10">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm">Loading menu...</p>
          </div>
        ) : items.length === 0 ? (
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
                  activeSection === item.key ? "bg-[#009CDC]" : "hover:bg-[#009CDC]"
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
