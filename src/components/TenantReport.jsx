import React, { useState } from "react";

const TenantReport = ({ tenantData, statusColors }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredTenants = tenantData.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.shop.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "" || tenant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2 className="text-2xl mb-3 text-[#1652A1]">Tenant Report</h2>

      {/* Status Indicators */}
      <div className="flex gap-2 md:gap-3 mb-5 flex-wrap">
        {Object.entries(statusColors).map(([label, color]) => {
          const isActive = statusFilter === label;
          return (
            <div
              key={label}
              onClick={() => setStatusFilter(isActive ? "" : label)}
              className={`flex items-center gap-2 rounded-full cursor-pointer 
                transition-all duration-200 ease-in-out 
                bg-gray-50 p-2 md:p-3 w-full sm:w-1/2 md:w-60 
                shadow-md hover:shadow-none active:shadow-none 
                ${isActive ? "shadow-none bg-gray-200" : ""}`}
            >
              <span
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full shrink-0 mt-1 ${color}`}
              ></span>
              <span className="break-words flex-1 text-sm md:text-base">
                {label}
              </span>
            </div>
          );
        })}
      </div>

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
      <div className="overflow-x-auto mb-8 w-full">
        <table className="w-full border-collapse text-sm md:text-md hidden md:table">
          <thead>
            <tr className="bg-gray-100 text-left text-[#1652A1]">
              <th className="p-2 md:p-3 border-b border-gray-200">
                Tenant Name
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">Shop No.</th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Building/Property
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Tenancy Start
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Tenancy End
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.length > 0 ? (
              filteredTenants.map((tenant, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 md:p-3">{tenant.name}</td>
                  <td className="p-2 md:p-3">{tenant.shop}</td>
                  <td className="p-2 md:p-3">{tenant.property}</td>
                  <td className="p-2 md:p-3">{tenant.start}</td>
                  <td className="p-2 md:p-3">{tenant.end}</td>
                  <td className="p-2 md:p-3">
                    <span
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-full inline-block ${
                        statusColors[tenant.status]
                      }`}
                    ></span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-3 md:py-4 text-gray-500 text-sm md:text-md"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile Card Layout */}
        <div className="md:hidden divide-y-5 divide-gray-200">
          {filteredTenants.length > 0 ? (
            filteredTenants.map((tenant, index) => (
              <div key={index} className="p-1 bg-white">
                <div className="flex flex-col gap-2 text-md">
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Tenant Name:
                    </span>{" "}
                    {tenant.name}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Shop No.:
                    </span>{" "}
                    {tenant.shop}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Building/Property:
                    </span>{" "}
                    {tenant.property}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Tenancy Start:
                    </span>{" "}
                    {tenant.start}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Tenancy End:
                    </span>{" "}
                    {tenant.end}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">Status:</span>{" "}
                    <span
                      className={`w-3 h-3 rounded-full inline-block ${
                        statusColors[tenant.status]
                      }`}
                    ></span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500 text-sm">
              No records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantReport;