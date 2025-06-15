import React, { useState } from "react";
import property1 from "../../assets/property-1.jpg";

const demoProperties = [
  {
    id: 1,
    name: "Sunrise Apartments",
    image: property1,
    tenants: [
      { id: 101, name: "Avinash kushwaha", email: "Avinash@example.com" },
      { id: 102, name: " Avinash kushwaha", email: "Avinash@example.com" },
    ],
  },
  {
    id: 2,
    name: "Palm Residency",
    image: property1,
    tenants: [{ id: 201, name: "Avinash ", email: "Avinash@example.com" }],
  },
  {
    id: 3,
    name: "Sunrise Towers",
    image: property1,
    tenants: [{ id: 301, name: "Avinash ", email: "Avinash@example.com" },
        { id: 3031, name: "Avinash ", email: "Avinash@example.com" },
        { id: 3021, name: "Avinash ", email: "Avinash@example.com" }
    ],
  },
];

const TenantManagement = () => {
  const [properties, setProperties] = useState(demoProperties);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [newTenant, setNewTenant] = useState({ name: "", email: "" });

  const handleSelectProperty = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setNewTenant({ name: "", email: "" });
  };

  const handleInputChange = (e) => {
    setNewTenant({ ...newTenant, [e.target.name]: e.target.value });
  };

  const handleAddTenant = () => {
    if (!newTenant.name || !newTenant.email) return;
    setProperties((prev) =>
      prev.map((property) =>
        property.id === selectedPropertyId
          ? {
              ...property,
              tenants: [
                ...property.tenants,
                {
                  id: Date.now(),
                  ...newTenant,
                },
              ],
            }
          : property
      )
    );
    setNewTenant({ name: "", email: "" });
  };

  const handleDeleteTenant = (propertyId, tenantId) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              tenants: property.tenants.filter((t) => t.id !== tenantId),
            }
          : property
      )
    );
  };

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold text-[#1652A1] mb-4">
        Tenant Management
      </h1>
      <h1 className="text-lg font-light text-[#1652A1] mb-4">
      Please Select property to manage tentant
      </h1>

      {/* Property Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className=" rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
            onClick={() => handleSelectProperty(property.id)}
          >
            <img
              src={property.image}
              alt={property.name}
              className="h-50 w-full object-cover"
            />
            <div className="p-3 bg-gray-100">
              <h2 className="text-lg font-medium">{property.name}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Tenant List for Selected Property */}
      {selectedProperty && (
        <div className="bg-white  rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">
            Tenants in {selectedProperty.name}
          </h2>

          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="name"
              value={newTenant.name}
              onChange={handleInputChange}
              placeholder="Tenant Name"
              className="border p-2 rounded w-full sm:w-1/3"
            />
            <input
              type="email"
              name="email"
              value={newTenant.email}
              onChange={handleInputChange}
              placeholder="Tenant Email"
              className="border p-2 rounded w-full sm:w-1/3"
            />
            <button
              onClick={handleAddTenant}
              className="bg-[#1652A1] text-white px-4 py-2 rounded hover:bg-[#0d3d78]"
            >
              Add Tenant
            </button>
          </div>

          {/* Tenants Table */}
          <table className="min-w-full text-left border-t border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedProperty.tenants.map((tenant, index) => (
                <tr
                  key={tenant.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{tenant.name}</td>
                  <td className="px-4 py-2">{tenant.email}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() =>
                        handleDeleteTenant(selectedProperty.id, tenant.id)
                      }
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {selectedProperty.tenants.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-gray-500">
                    No tenants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TenantManagement;
