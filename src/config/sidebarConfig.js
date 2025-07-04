import adminIcon from "../assets/admin-icon.svg";
import propertyIcon from "../assets/property-icon.svg";
import tenantIcon from "../assets/tenant-icon.svg";
import reportIcon from "../assets/report-icon.svg";

export const sidebarItemsByRole = {
  guest: [
    { key: "home", label: "Home", icon: adminIcon },
    // { key: "about", label: "About Us", icon: tenantIcon },
    // { key: "contact", label: "Contact", icon: reportIcon },
  ],

  owner: [
    { key: "dashboard", label: "Dashboard", icon: adminIcon },
    { key: "property", label: "Property List", icon: propertyIcon },
    { key: "user", label: "User Management", icon: adminIcon },
    { key: "tenant", label: "Tenant Management", icon: tenantIcon },
    { key: "report", label: "Reports", icon: reportIcon },
    { key: "communication", label: "Communication", icon: reportIcon },
  ],

  admin: [
    { key: "dashboard", label: "Dashboard", icon: adminIcon },
    { key: "property", label: "Property List", icon: propertyIcon },
    { key: "tenant", label: "Tenant Management", icon: tenantIcon },
    { key: "report", label: "Reports", icon: reportIcon },
    { key: "communication", label: "Communication", icon: reportIcon },
  ],

  tenant: [
    { key: "home", label: "Home", icon: adminIcon },
    { key: "communication", label: "Communication", icon: reportIcon },
    { key: "report", label: "Reports", icon: reportIcon },
  ],
};
