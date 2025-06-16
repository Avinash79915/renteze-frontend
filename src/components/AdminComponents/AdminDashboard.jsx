// import React from "react";
// import property1 from "../../assets/property-1.jpg";

// const AdminDashboard = ({ setActiveSection }) => {
//   const stats = [
//     { label: "Total Properties", value: 12 },
//     { label: "Total Tenants", value: 35 },
//     { label: "Pending Payments", value: 5 },
//     { label: "Maintenance Requests", value: 3 },
//   ];

//   const properties = [
//     {
//       id: 1,
//       name: "Palm Residency",
//       image: property1,
//     },
//     {
//       id: 2,
//       name: "Sky View Flats",
//       image: property1,
//     },
//     {
//       id: 3,
//       name: "Green Villas",
//       image: property1,
//     },
//     {
//       id: 4,
//       name: "Ocean Heights",
//       image: property1,
//     },
//   ];

//   const recentTenants = [
//     { name: "Ravi Kumar", property: "Palm Residency", joined: "2024-04-21" },
//     { name: "Anjali Sharma", property: "Sky View Flats", joined: "2024-04-18" },
//     { name: "Rahul Mehta", property: "Green Villas", joined: "2024-04-10" },
//   ];

//   return (
//     <div className="space-y-10">
//       <h1 className="text-2xl font-semibold text-[#1652A1]">Admin Dashboard</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((item, index) => (
//           <div key={index} className="bg-white p-5 rounded shadow hover:shadow-md border">
//             <p className="text-gray-600">{item.label}</p>
//             <p className="text-xl font-bold text-[#1652A1]">{item.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Property Grid */}
//       <div>
//         <h2 className="text-xl font-semibold text-[#1652A1] mb-4">Properties</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {properties.map((property) => (
//             <div
//               key={property.id}
//               className="cursor-pointer border rounded-md shadow hover:shadow-md transition"
//               onClick={() => setActiveSection("property")}
//             >
//               <img
//                 src={property.image}
//                 alt={property.name}
//                 className="w-full h-40 object-cover rounded-t-md"
//               />
//               <div className="p-3 text-center">
//                 <h3 className="text-md font-semibold text-[#1652A1]">{property.name}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Recent Tenants */}
//       <div>
//         <h2 className="text-xl font-semibold text-[#1652A1] mb-4">Recent Tenants</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white rounded-md overflow-hidden">
//             <thead className="bg-blue-100 text-left">
//               <tr>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Property</th>
//                 <th className="px-4 py-2">Joined</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-700">
//               {recentTenants.map((tenant, index) => (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   <td className="px-4 py-2">{tenant.name}</td>
//                   <td className="px-4 py-2">{tenant.property}</td>
//                   <td className="px-4 py-2">{tenant.joined}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import property1 from "../../assets/property-1.jpg";

import {
  Home,
  Users,
  CreditCard,
  Wrench,
  TrendingUp,
  TrendingDown,
  Eye,
  Plus,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Bell,
  DollarSign,
  House,
} from "lucide-react";

const AdminDashboard = ({ setActiveSection }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      label: "Total Properties",
      value: 12,
      icon: House,
      change: "+2",
      trend: "up",
      color: "bg-blue-50",
    },
    {
      label: "Total Tenants",
      value: 35,
      icon: Users,
      change: "+5",
      trend: "up",
      color: "bg-green-50",
    },
    {
      label: "Pending Payments",
      value: 5,
      icon: CreditCard,
      change: "-2",
      trend: "down",
      color: "bg-yellow-50",
    },
    {
      label: "Maintenance Requests",
      value: 3,
      icon: Wrench,
      change: "+1",
      trend: "up",
      color: "bg-red-50",
    },
  ];

  const properties = [
    {
      id: 1,
      name: "Palm Residency",
      image: property1,
      units: 24,
      occupied: 22,
      revenue: "₹2,40,000",
      status: "Excellent",
      location: "Koramangala",
    },
    {
      id: 2,
      name: "Sky View Flats",
      image: property1,
      units: 18,
      occupied: 16,
      revenue: "₹1,80,000",
      status: "Good",
      location: "Indiranagar",
    },
    {
      id: 3,
      name: "Green Villas",
      image: property1,
      units: 12,
      occupied: 10,
      revenue: "₹1,20,000",
      status: "Average",
      location: "Whitefield",
    },
    {
      id: 4,
      name: "Ocean Heights",
      image: property1,
      units: 30,
      occupied: 28,
      revenue: "₹3,20,000",
      status: "Excellent",
      location: "Electronic City",
    },
  ];

  const recentTenants = [
    {
      name: "Ravi Kumar",
      property: "Palm Residency",
      joined: "2024-04-21",
      phone: "+91 98765 43210",
      email: "ravi.kumar@email.com",
      status: "Active",
      rent: "₹12,000",
    },
    {
      name: "Anjali Sharma",
      property: "Sky View Flats",
      joined: "2024-04-18",
      phone: "+91 98765 43211",
      email: "anjali.sharma@email.com",
      status: "Active",
      rent: "₹15,000",
    },
    {
      name: "Rahul Mehta",
      property: "Green Villas",
      joined: "2024-04-10",
      phone: "+91 98765 43212",
      email: "rahul.mehta@email.com",
      status: "Payment Due",
      rent: "₹18,000",
    },
    {
      name: "Priya Singh",
      property: "Ocean Heights",
      joined: "2024-04-08",
      phone: "+91 98765 43213",
      email: "priya.singh@email.com",
      status: "Active",
      rent: "₹20,000",
    },
    {
      name: "Amit Patel",
      property: "Palm Residency",
      joined: "2024-04-05",
      phone: "+91 98765 43214",
      email: "amit.patel@email.com",
      status: "Active",
      rent: "₹11,000",
    },
  ];

  const recentActivities = [
    {
      type: "payment",
      message: "Payment received from Ravi Kumar - ₹12,000",
      time: "2 hours ago",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      type: "maintenance",
      message: "New maintenance request from Sky View Flats",
      time: "4 hours ago",
      icon: Wrench,
      color: "text-orange-600",
    },
    {
      type: "tenant",
      message: "New tenant application for Green Villas",
      time: "6 hours ago",
      icon: Users,
      color: "text-blue-600",
    },
    {
      type: "alert",
      message: "Rent reminder sent to 5 tenants",
      time: "1 day ago",
      icon: Bell,
      color: "text-purple-600",
    },
  ];

  const filteredTenants = recentTenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOccupancyPercentage = (occupied, total) => {
    return Math.round((occupied / total) * 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Average":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTenantStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Payment Due":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1652A1]">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your properties.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-[#1652A1] hover:bg-[#143d7a] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Add Property
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;
          const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown;
          const textColor = item.color.replace("bg-", "text-");

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${item.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${textColor}`} strokeWidth={2} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    item.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendIcon className="w-4 h-4" />
                  {item.change}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{item.label}</p>
              <p className="text-2xl font-bold text-[#1652A1]">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-[#1652A1] mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveSection("tenants")}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="w-8 h-8 text-[#1652A1] mb-2" />
            <span className="text-sm text-gray-700">Manage Tenants</span>
          </button>
          <button
            onClick={() => setActiveSection("payments")}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <CreditCard className="w-8 h-8 text-[#1652A1] mb-2" />
            <span className="text-sm text-gray-700">Payments</span>
          </button>
          <button
            onClick={() => setActiveSection("maintenance")}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Wrench className="w-8 h-8 text-[#1652A1] mb-2" />
            <span className="text-sm text-gray-700">Maintenance</span>
          </button>
          <button
            onClick={() => setActiveSection("reports")}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <TrendingUp className="w-8 h-8 text-[#1652A1] mb-2" />
            <span className="text-sm text-gray-700">Reports</span>
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#1652A1]">
            Properties Overview
          </h2>
          <button
            onClick={() => setActiveSection("properties")}
            className="text-[#1652A1] hover:text-[#143d7a] flex items-center gap-2 text-sm font-medium"
          >
            View All <Eye className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="cursor-pointer border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105"
              onClick={() => setActiveSection("property")}
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#1652A1] mb-2">
                  {property.name}
                </h3>
                <div className="flex items-center gap-1 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Occupancy</span>
                    <span className="font-medium">
                      {property.occupied}/{property.units}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#1652A1] h-2 rounded-full"
                      style={{
                        width: `${getOccupancyPercentage(
                          property.occupied,
                          property.units
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Monthly Revenue
                    </span>
                    <span className="font-semibold text-green-600">
                      {property.revenue}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tenants */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-[#1652A1]">
              Recent Tenants
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tenants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent text-sm"
                />
              </div>
              <button
                onClick={() => setActiveSection("tenants")}
                className="text-[#1652A1] hover:text-[#143d7a] flex items-center gap-2 text-sm font-medium whitespace-nowrap"
              >
                View All <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Tenant
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Property
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Rent
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTenants.slice(0, 5).map((tenant, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {tenant.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {tenant.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {tenant.property}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {tenant.rent}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTenantStatusColor(
                          tenant.status
                        )}`}
                      >
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {tenant.joined}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#1652A1] mb-6">
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div
                    className={`p-2 rounded-full bg-gray-100 ${activity.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 mb-1">
                      {activity.message}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-4 text-center text-[#1652A1] hover:text-[#143d7a] text-sm font-medium py-2 border-t border-gray-100">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
