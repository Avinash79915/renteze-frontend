import React, { useState } from "react";

const tenantData = [
  {
    name: "John Doe",
    shop: "1135",
    property: "Birds 1",
    start: "22/01/2023",
    end: "22/01/2024",
    status: "Closing Soon",
  },
  {
    name: "Anita Sharma",
    shop: "101",
    property: "Sunrise Tower",
    start: "01/02/2024",
    end: "01/02/2025",
    status: "Occupied",
  },
  {
    name: "Vikram Singh",
    shop: "203",
    property: "Sky Plaza",
    start: "15/06/2023",
    end: "14/06/2024",
    status: "Available",
  },
  {
    name: "Sara Khan",
    shop: "402",
    property: "Palm Residency",
    start: "10/03/2024",
    end: "10/03/2025",
    status: "Occupied",
  },
  {
    name: "Ravi Patel",
    shop: "309",
    property: "Hill View",
    start: "25/07/2023",
    end: "25/07/2024",
    status: "Concerns Pending",
  },
  {
    name: "Sneha Roy",
    shop: "112",
    property: "Sunset Mall",
    start: "01/09/2023",
    end: "01/09/2024",
    status: "Available",
  },
  {
    name: "Manoj Yadav",
    shop: "507",
    property: "Birds Nest",
    start: "12/12/2023",
    end: "12/12/2024",
    status: "Closing Soon",
  },
  {
    name: "Divya Mehra",
    shop: "218",
    property: "Vista Complex",
    start: "05/04/2023",
    end: "05/04/2024",
    status: "Concerns Pending",
  },
  {
    name: "Ramesh Kumar",
    shop: "302",
    property: "Lake Side",
    start: "18/05/2023",
    end: "18/05/2024",
    status: "Occupied",
  },
  {
    name: "Priya Nair",
    shop: "134",
    property: "Skyline Plaza",
    start: "20/06/2023",
    end: "20/06/2024",
    status: "Available",
  },
];

const statusColors = {
  Occupied: "bg-green-500",
  Available: "bg-red-500",
  "Closing Soon": "bg-orange-500",
  "Concerns Pending": "bg-purple-500",
};

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredTenants = tenantData.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.shop.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "" || tenant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-5 text-[#1652A1]">Reports</h1>

      {/* Status Indicators */}
      <div className="flex gap-3 mb-5 flex-wrap">
        {Object.entries(statusColors).map(([label, color]) => (
          <div
            key={label}
            onClick={() =>
              setStatusFilter(statusFilter === label ? "" : label)
            }
            className={`flex items-center gap-2 rounded-full cursor-pointer bg-[#F6F6F6] p-3 w-60 hover:bg-white hover:shadow transition ${
              statusFilter === label ? "ring-2 ring-blue-400" : ""
            }`}
          >
            <span
              className={`w-10 h-10 rounded-full shrink-0 mt-1 ${color}`}
            ></span>
            <span className="break-words flex-1">{label}</span>
          </div>
        ))}
      </div>

      {/* Tenant Report Section */}
      <h2 className="text-2xl mb-3 text-[#1652A1]">Tenant Report</h2>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by tenant name / Shop No"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tenant Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-md">
          <thead>
            <tr className="bg-gray-100 text-left text-[#1652A1]">
              <th className="p-3 border-b border-gray-200">Tenant Name</th>
              <th className="p-3 border-b border-gray-200">Shop No.</th>
              <th className="p-3 border-b border-gray-200">
                Building/Property
              </th>
              <th className="p-3 border-b border-gray-200">Tenancy Start</th>
              <th className="p-3 border-b border-gray-200">Tenancy End</th>
              <th className="p-3 border-b border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.length > 0 ? (
              filteredTenants.map((tenant, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{tenant.name}</td>
                  <td className="p-3">{tenant.shop}</td>
                  <td className="p-3">{tenant.property}</td>
                  <td className="p-3">{tenant.start}</td>
                  <td className="p-3">{tenant.end}</td>
                  <td className="p-3">
                    <span
                      className={`w-4 h-4 rounded-full inline-block ${
                        statusColors[tenant.status]
                      }`}
                    ></span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
