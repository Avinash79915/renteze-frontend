import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiMapPin,
  FiUser,
  FiAlertCircle,
  FiTrendingUp,
  FiEye,
  FiEdit,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom"; 
import api from "../../Pages/utils/axios";
import { useAuth0 } from "@auth0/auth0-react";
const mockAdmins = [
  {
    id: 1,
    name: "Raj Kumar",
    email: "raj@renteze.com",
    propertiesManaged: 1,
    totalTenants: 45,
    performance: 95,
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@renteze.com",
    propertiesManaged: 1,
    totalTenants: 72,
    performance: 98,
  },
  {
    id: 3,
    name: "Amit Singh",
    email: "amit@renteze.com",
    propertiesManaged: 1,
    totalTenants: 55,
    performance: 92,
  },
  {
    id: 4,
    name: "Anita Desai",
    email: "anita@renteze.com",
    propertiesManaged: 1,
    totalTenants: 35,
    performance: 88,
  },
];

const SuperAdminDashboard = ({ setActiveSection, setActiveProperty }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 👈 hook
  const { user, isAuthenticated, isLoading } = useAuth0();
  const email = user?.email;
  // Fetch data from API
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/dashboard?testEmail=${email}&nocache=${Date.now()}`
        );
        const apiData = response.data;

        // Fetch unit details for each property
        const updatedProperties = await Promise.all(
          apiData.properties.map(async (property, index) => {
            try {
              const unitResponse = await api.get(
                `/unit/property/${property._id}?testEmail=${email}`
              );
              const units = unitResponse.data.units || [];

              // Calculate occupancy
              const totalUnits = units.length;
              const occupiedUnits = units.filter((unit) => unit.isOccupied).length;
              const vacantUnits = totalUnits - occupiedUnits;
              const occupancyRate =
                totalUnits > 0
                  ? Math.round((occupiedUnits / totalUnits) * 100)
                  : 0;

              return {
                id: index + 1,
                _id: property._id,
                name: property.name,
                address: property.address,
                location: property.location,
                propertyNo: property.displayID || "N/A",
                totalUnits,
                occupiedUnits,
                vacantUnits,
                occupancyRate,
                monthlyRent: 100000 * totalUnits, // Placeholder
                adminAssigned: "Unknown", // Placeholder
                adminId: null,
                status: "Active", // Placeholder
                pendingIssues: apiData.issues.filter(
                  (issue) =>
                    issue.status === "open" || issue.status === "in progress"
                ).length,
                collectionRate: 95, // Placeholder
                units, // include units
              };
            } catch (error) {
              console.error(
                `Failed to fetch units for property ${property._id}`,
                error
              );
              const totalUnits = property.units.length;
              return {
                id: index + 1,
                _id: property._id,
                name: property.name,
                address: property.address,
                location: property.location,
                propertyNo: property.displayID || "N/A",
                totalUnits,
                occupiedUnits: totalUnits,
                vacantUnits: 0,
                occupancyRate: 100,
                monthlyRent: 100000 * totalUnits,
                adminAssigned: "Unknown",
                adminId: null,
                status: "Active",
                pendingIssues: apiData.issues.filter(
                  (issue) =>
                    issue.status === "open" || issue.status === "in progress"
                ).length,
                collectionRate: 95,
                units: property.units.map((unitId) => ({
                  _id: unitId,
                  isOccupied: true,
                })),
              };
            }
          })
        );

        setProperties(updatedProperties);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data from the API");
        setLoading(false);
      }
    };

    if (!isLoading && isAuthenticated && email) {
      fetchData();
    }
  }, [isLoading, isAuthenticated, email]);


  // Calculate summary stats
  const totalProperties = properties.length;
  const totalUnits = properties.reduce((sum, prop) => sum + prop.totalUnits, 0);
  const occupiedUnits = properties.reduce(
    (sum, prop) => sum + prop.occupiedUnits,
    0
  );
  const vacantUnits = properties.reduce(
    (sum, prop) => sum + prop.vacantUnits,
    0
  );
  const totalMonthlyRevenue = properties.reduce(
    (sum, prop) => sum + prop.monthlyRent,
    0
  );
  const totalPendingIssues = properties.reduce(
    (sum, prop) => sum + prop.pendingIssues,
    0
  );
  const averageCollectionRate = properties.length
    ? Math.round(
        properties.reduce((sum, prop) => sum + prop.collectionRate, 0) /
          properties.length
      )
    : 0;
  const averageOccupancyRate = properties.length
    ? Math.round(
        properties.reduce((sum, prop) => sum + prop.occupancyRate, 0) /
          properties.length
      )
    : 0;

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = "#1652A1",
  }) => (
    <div className="bg-white md:p-6 p-3 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold" style={{ color }}>
            {value}
          </p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Icon className="h-8 w-8" style={{ color }} />
      </div>
    </div>
  );

  const PropertyCard = ({ property }) => (
    <div className="bg-white md:p-6 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {property.name}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <FiMapPin size={12} />
            {property.location}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Occupancy</p>
          <p className="text-lg font-semibold">
            {property.occupiedUnits}/{property.totalUnits}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-[#1652A1] h-2 rounded-full"
              style={{
                width: `${
                  (property.occupiedUnits / property.totalUnits) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">Monthly Revenue</p>
          <p className="text-lg font-semibold text-[#1652A1]">
            ₹{property.monthlyRent / 1000}K
          </p>
          <p className="text-xs text-gray-500">
            {property.collectionRate}% collected
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2">
          <FiUser size={14} className="text-gray-500" />
          <span className="text-sm text-gray-700">
            {property.adminAssigned}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {property.pendingIssues > 0 && (
            <span className="flex items-center gap-1 text-xs text-orange-600">
              <FiAlertCircle size={12} />
              {property.pendingIssues} issues
            </span>
          )}
          <button
            onClick={() => setActiveSection("property")}
            className="text-[#1652A1] hover:text-blue-800 text-sm font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const AdminCard = ({ admin }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <FiUser className="text-blue-600" size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{admin.name}</h3>
          <p className="text-sm text-gray-600">{admin.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-blue-600">
            {admin.propertiesManaged}
          </p>
          <p className="text-xs text-gray-600">Properties</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-green-600">
            {admin.totalTenants}
          </p>
          <p className="text-xs text-gray-600">Tenants</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-purple-600">
            {admin.performance}%
          </p>
          <p className="text-xs text-gray-600">Performance</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveSection("user")}
          className="flex-1 bg-[#1652A1] text-white py-2 px-3 rounded text-sm transition-colors"
        >
          View Details
        </button>
        <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
          <FiEdit size={14} />
        </button>
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiHome}
          title="Total Properties"
          value={totalProperties}
          subtitle={`${totalUnits} total units`}
          color="#1652A1"
        />
        <StatCard
          icon={FiUsers}
          title="Occupancy Rate"
          value={`${averageOccupancyRate}%`}
          subtitle={`${occupiedUnits} occupied / ${vacantUnits} vacant`}
          color="#1652A1"
        />
        <StatCard
          icon={FiDollarSign}
          title="Monthly Revenue"
          value={`₹${(totalMonthlyRevenue / 100000).toFixed(1)}L`}
          subtitle={`${averageCollectionRate}% collection rate`}
          color="#1652A1"
        />
        {/* <StatCard
          icon={FiAlertCircle}
          title="Pending Issues"
          value={totalPendingIssues}
          subtitle="Across all properties"
          color="#1652A1"
        /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-3 md:p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div
            className={`space-y-4 ${
              properties.length > 4 ? "max-h-[340px] overflow-y-auto pr-2" : ""
            }`}
          >
            {properties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between md:p-3 p-1 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium">{property.name}</p>
                  <p className="text-sm text-gray-600">
                    {property.occupiedUnits} units occupied
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#1652A1]">
                    ₹{property.monthlyRent / 1000}K
                  </p>
                  <p className="text-sm text-gray-600">
                    {property.collectionRate}% collected
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white md:p-6 p-3 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setActiveTab("properties")}
              className="w-full flex items-center gap-3 md:p-3 p-2 text-left hover:bg-gray-50 rounded transition-colors"
            >
              <FiHome className="text-[#1652A1]" />
              <span>Manage Properties</span>
            </button>
            <button
              onClick={() => setActiveTab("admins")}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded transition-colors"
            >
              <FiUsers className="text-[#1652A1]" />
              <span>Manage Admins</span>
            </button>
            <button
            onClick={() => setActiveSection("report")}
             className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded transition-colors">
              <FiUsers className="text-[#1652A1]" />
              <span>View Reports</span>
            </button>
            <button
             onClick={() => setActiveSection("property")} 
            className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded transition-colors">
              <FiPlus className="text-[#1652A1]" />
              <span>Add New Property</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PropertiesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Property Management</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );

  const AdminsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Admin Management</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAdmins.map((admin) => (
          <AdminCard key={admin.id} admin={admin} />
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="px-2 sm:px-6 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1652A1]">
            Super Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage all properties and administrators
          </p>
        </div>
        <div className="px-2 sm:px-6">
          <nav className="flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0">
            {[
              { id: "overview", label: "Overview", icon: FiHome },
              { id: "properties", label: "Properties", icon: FiHome },
              { id: "admins", label: "Admins", icon: FiUsers },
              { id: "analytics", label: "Analytics", icon: FiTrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-md sm:text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon size={14} className="sm:w-4 sm:h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="py-6 sm:p-6">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "properties" && <PropertiesTab />}
        {activeTab === "admins" && <AdminsTab />}
        {activeTab === "analytics" && (
          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm border text-center">
            <FiTrendingUp
              className="mx-auto text-gray-400 mb-4 sm:w-12 sm:h-12"
              size={32}
            />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              Analytics Dashboard
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Detailed analytics and reporting features coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
