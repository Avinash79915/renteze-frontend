import React, { useState } from "react";
import {
  FiHome,         
  FiUsers,        
  FiDollarSign,   
  FiSettings,     
  FiMapPin,       
  FiUser,        
  FiCheckCircle, 
  FiClock,       
  FiAlertCircle,  
  FiTrendingUp,  
  FiEye,         
  FiEdit,        
  FiPlus        
} from "react-icons/fi";


// Mock data - replace with your API calls
const mockProperties = [
  {
    id: 1,
    name: "Sky Residency",
    location: "Bangalore, Koramangala",
    totalUnits: 50,
    occupiedUnits: 45,
    vacantUnits: 5,
    monthlyRent: 450000,
    adminAssigned: "Raj Kumar",
    adminId: 1,
    status: "Active",
    pendingIssues: 3,
    collectionRate: 95
  },
  {
    id: 2,
    name: "Palm Heights",
    location: "Mumbai, Bandra",
    totalUnits: 80,
    occupiedUnits: 72,
    vacantUnits: 8,
    monthlyRent: 720000,
    adminAssigned: "Priya Sharma",
    adminId: 2,
    status: "Active",
    pendingIssues: 1,
    collectionRate: 98
  },
  {
    id: 3,
    name: "Green View",
    location: "Delhi, Gurgaon",
    totalUnits: 60,
    occupiedUnits: 55,
    vacantUnits: 5,
    monthlyRent: 550000,
    adminAssigned: "Amit Singh",
    adminId: 3,
    status: "Active",
    pendingIssues: 5,
    collectionRate: 92
  },
  {
    id: 4,
    name: "Ocean View",
    location: "Chennai, OMR",
    totalUnits: 40,
    occupiedUnits: 35,
    vacantUnits: 5,
    monthlyRent: 350000,
    adminAssigned: "Anita Desai",
    adminId: 4,
    status: "Under Maintenance",
    pendingIssues: 8,
    collectionRate: 88
  }
];

const mockAdmins = [
  {
    id: 1,
    name: "Raj Kumar",
    email: "raj@renteze.com",
    propertiesManaged: 1,
    totalTenants: 45,
    performance: 95
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@renteze.com",
    propertiesManaged: 1,
    totalTenants: 72,
    performance: 98
  },
  {
    id: 3,
    name: "Amit Singh",
    email: "amit@renteze.com",
    propertiesManaged: 1,
    totalTenants: 55,
    performance: 92
  },
  {
    id: 4,
    name: "Anita Desai",
    email: "anita@renteze.com",
    propertiesManaged: 1,
    totalTenants: 35,
    performance: 88
  }
];

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const totalProperties = mockProperties.length;
  const totalUnits = mockProperties.reduce((sum, prop) => sum + prop.totalUnits, 0);
  const occupiedUnits = mockProperties.reduce((sum, prop) => sum + prop.occupiedUnits, 0);
  const vacantUnits = mockProperties.reduce((sum, prop) => sum + prop.vacantUnits, 0);
  const totalMonthlyRevenue = mockProperties.reduce((sum, prop) => sum + prop.monthlyRent, 0);
  const totalPendingIssues = mockProperties.reduce((sum, prop) => sum + prop.pendingIssues, 0);
  const averageCollectionRate = Math.round(mockProperties.reduce((sum, prop) => sum + prop.collectionRate, 0) / mockProperties.length);

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
    <div className="bg-white md:p-6 p-3  rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Icon className={`h-8 w-8 text-${color}-500`} />
      </div>
    </div>
  );

  const PropertyCard = ({ property }) => (
    <div className="bg-white md:p-6 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <FiMapPin size={12} />
            {property.location}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          property.status === "Active" 
            ? "bg-green-100 text-green-800" 
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {property.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Occupancy</p>
          <p className="text-lg font-semibold">{property.occupiedUnits}/{property.totalUnits}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{width: `${(property.occupiedUnits/property.totalUnits)*100}%`}}
            ></div>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">Monthly Revenue</p>
          <p className="text-lg font-semibold text-green-600">₹{(property.monthlyRent/1000)}K</p>
          <p className="text-xs text-gray-500">{property.collectionRate}% collected</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2">
          <FiUser size={14} className="text-gray-500" />
          <span className="text-sm text-gray-700">{property.adminAssigned}</span>
        </div>
        <div className="flex items-center gap-2">
          {property.pendingIssues > 0 && (
            <span className="flex items-center gap-1 text-xs text-orange-600">
              <FiAlertCircle size={12} />
              {property.pendingIssues} issues
            </span>
          )}
          <button 
            onClick={() => setSelectedProperty(property)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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
          <p className="text-lg font-semibold text-blue-600">{admin.propertiesManaged}</p>
          <p className="text-xs text-gray-600">Properties</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-green-600">{admin.totalTenants}</p>
          <p className="text-xs text-gray-600">Tenants</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-purple-600">{admin.performance}%</p>
          <p className="text-xs text-gray-600">Performance</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
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
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={FiHome} 
          title="Total Properties" 
          value={totalProperties} 
          subtitle={`${totalUnits} total units`}
          color="blue"
        />
        <StatCard 
          icon={FiUsers} 
          title="Occupancy Rate" 
          value={`${Math.round((occupiedUnits/totalUnits)*100)}%`}
          subtitle={`${occupiedUnits} occupied / ${vacantUnits} vacant`}
          color="green"
        />
        <StatCard 
          icon={FiDollarSign} 
          title="Monthly Revenue" 
          value={`₹${(totalMonthlyRevenue/100000).toFixed(1)}L`}
          subtitle={`${averageCollectionRate}% collection rate`}
          color="purple"
        />
        <StatCard 
          icon={FiAlertCircle} 
          title="Pending Issues" 
          value={totalPendingIssues}
          subtitle="Across all properties"
          color="orange"
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-3 md:p-6 rounded-lg border  border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="space-y-4">
            {mockProperties.map(property => (
              <div key={property.id} className="flex items-center justify-between md:p-3 p-1 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{property.name}</p>
                  <p className="text-sm text-gray-600">{property.occupiedUnits} units occupied</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">₹{(property.monthlyRent/1000)}K</p>
                  <p className="text-sm text-gray-600">{property.collectionRate}% collected</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white md:p-6 p-3 rounded-l  border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab("properties")}
              className="w-full flex items-center gap-3 md:p-3 p-2 text-left hover:bg-gray-50 rounded transition-colors"
            >
              <FiHome className="text-blue-600" />
              <span>Manage Properties</span>
            </button>
            <button 
              onClick={() => setActiveTab("admins")}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded transition-colors"
            >
              <FiUsers className="text-green-600" />
              <span>Manage Admins</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded transition-colors">
              <FiUsers className="text-purple-600" />
              <span>View Reports</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded transition-colors">
              <FiPlus className="text-orange-600" />
              <span>Add New Property</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PropertiesTab = () => (
    <div className="space-y-6  ">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Property Management</h2>
        <button className="bg-blue-600 text-white md:text-md text-xs px-2 md:px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
          <FiPlus size={16} />
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );

  const AdminsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Admin Management</h2>
        <button className="bg-blue-600 text-white px-2 md:px-4 py-2 text-sm md:text-md rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
          <FiPlus size={16} />
          Add Admin
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAdmins.map(admin => (
          <AdminCard key={admin.id} admin={admin} />
        ))}
      </div>
    </div>
  );

  return (
     <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-2 sm:px-6 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1652A1]">
            Super Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage all properties and administrators
          </p>
        </div>

        {/* Navigation Tabs */}
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

      {/* Main Content */}
      <div className="py-6   sm:p-6">
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

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md sm:max-w-2xl mx-4 max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                {selectedProperty.name} Details
              </h2>
              <button
                onClick={() => setSelectedProperty(null)}
                className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Location</p>
                <p className="font-medium text-sm sm:text-base">
                  {selectedProperty.location}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Admin Assigned
                </p>
                <p className="font-medium text-sm sm:text-base">
                  {selectedProperty.adminAssigned}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Units</p>
                <p className="font-medium text-sm sm:text-base">
                  {selectedProperty.totalUnits}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Monthly Revenue
                </p>
                <p className="font-medium text-sm sm:text-base text-green-600">
                  ₹{selectedProperty.monthlyRent.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm hover:bg-blue-700 transition-colors">
                Edit Property
              </button>
              <button
                onClick={() => setShowAssignModal(true)}
                className="bg-green-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm hover:bg-green-700 transition-colors"
              >
                Reassign Admin
              </button>
              <button className="border border-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm hover:bg-gray-50 transition-colors">
                View Tenants
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;