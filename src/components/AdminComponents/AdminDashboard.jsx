import React, { useState, useEffect } from "react";
import axios from "axios";
import property1 from "../../assets/property-1.jpg";
import {
  House,
  Users,
  CreditCard,
  Wrench,
  TrendingUp,
  TrendingDown,
  Eye,
  MapPin,
  Clock,
  DollarSign,
  Bell,
} from "lucide-react";

const AdminDashboard = ({
  setActiveSection = () => {},
  setActiveProperty = () => {},
}) => {
  const [dashboardData, setDashboardData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/dashboard?testEmail=${email}`
        );
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [email]);

  if (!dashboardData) {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  const properties = dashboardData.properties || [];
  const totalUnits = properties.reduce(
    (acc, prop) => acc + prop.units.length,
    0
  );

  const stats = [
    {
      label: "Total Properties",
      value: properties.length,
      icon: House,
      color: "bg-blue-50",
    },
    {
      label: "Total Units",
      value: totalUnits,
      icon: Users,
      trend: "up",
      color: "bg-green-50",
    },
    {
      label: "Pending Payments",
      value: 0,
      icon: CreditCard,
      trend: "down",
      color: "bg-yellow-50",
    },
    {
      label: "Maintenance Requests",
      value: 0,
      icon: Wrench,
      trend: "up",
      color: "bg-red-50",
    },
  ];

  const recentActivities = [
    {
      type: "payment",
      message: "Payment received from Ravi Kumar - ₹12,000",
      time: "2 hours ago",
      icon: DollarSign,
      color: "text-[#1652A1]",
    },
    {
      type: "maintenance",
      message: "New maintenance request from Sky View Flats",
      time: "4 hours ago",
      icon: Wrench,
      color: "text-[#1652A1]",
    },
    {
      type: "tenant",
      message: "New tenant application for Green Villas",
      time: "6 hours ago",
      icon: Users,
      color: "text-[#1652A1]",
    },
    {
      type: "alert",
      message: "Rent reminder sent to 5 tenants",
      time: "1 day ago",
      icon: Bell,
      color: "text-[#1652A1]",
    },
  ];

  const getOccupancyPercentage = (occupied, total) => {
    return total === 0 ? 0 : Math.round((occupied / total) * 100);
  };

  return (
    <div className="space-y-8 p-0 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1652A1]">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {dashboardData.name}! Here's what's happening with
            your properties.
          </p>
        </div>
      </div>

      {/* Stats */}
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
                  <Icon className={`w-8 h-8 ${textColor}`} strokeWidth={2} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{item.label}</p>
              <p className="text-2xl font-bold text-[#1652A1]">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      {/* Quick Actions */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-[#1652A1] mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveSection("tenant")}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="w-8 h-8 text-[#1652A1] mb-2" />
            <span className="text-sm text-gray-700">Manage Tenants</span>
          </button>
          <button
            onClick={() => setActiveSection("communication")}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Wrench className="w-8 h-8 text-[#1652A1] mb-2" />
            <span className="text-sm text-gray-700">Communication</span>
          </button>
          <button
            onClick={() => setActiveSection("report")}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <TrendingUp className="w-8 h-8 text-[#1652A1] mb-2" />
            <span className="text-sm text-gray-700">Reports</span>
          </button>
          <button
            onClick={() => setActiveSection("property")}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <House className="w-8 h-8 text-[#1652A1] mb-2" />
            <span className="text-sm text-gray-700">Properties</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#1652A1]">
            Properties Overview
          </h2>
          <button
            onClick={() => setActiveSection("property")}
            className="text-[#1652A1] hover:text-[#143d7a] flex items-center gap-2 text-sm font-medium"
          >
            View All <Eye className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.slice(0, 4).map((property) => (
            <div
              key={property._id}
              className="cursor-pointer border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105"
              onClick={() => {
                setActiveSection("property");
                setActiveProperty(property);
              }}
            >
              <div className="relative">
                <img
                  src={property1}
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
                    <span className="text-gray-600">Units</span>
                    <span className="font-medium">{property.units.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#1652A1] h-2 rounded-full"
                      style={{
                        width: `${getOccupancyPercentage(
                          property.units.length - 1,
                          property.units.length
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Monthly Revenue
                    </span>
                    <span className="font-semibold text-[#1652A1]">₹--</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
  );
};

export default AdminDashboard;
