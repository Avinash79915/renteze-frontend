import React, { useState } from "react";
import {
  Plus,
  User,
  Home,
  MapPin,
  Users,
  Phone,
  Mail,
  Calendar,
  Edit,
  Save,
  X,
} from "lucide-react";
import AddUnitForm from "../SuperAdminComponent/AddUnitForm";

const PropertyDetail = ({ property, setShowAddUnitForm, showAddUnitForm }) => {
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [editingTenant, setEditingTenant] = useState(null);
  const [units, setUnits] = useState(property.units || []);
  
  const [newTenant, setNewTenant] = useState({
    name: "",
    contact: "",
    email: "",
    moveInDate: "",
  });

  if (!property) return null;

  const handleAddTenant = (unit) => {
    setSelectedUnit(unit);
    setShowAddTenantModal(true);
    setNewTenant({ name: "", contact: "", email: "", moveInDate: "" });
  };

  const handleSaveTenant = () => {
    // This would typically update the property/unit data
    console.log("Saving tenant:", newTenant, "to unit:", selectedUnit.id);
    setShowAddTenantModal(false);
    setSelectedUnit(null);
  };

  const handleEditTenant = (unit) => {
    setEditingTenant(unit.id);
    setNewTenant({
      name: unit.tenant?.name || "",
      contact: unit.tenant?.contact || "",
      email: unit.tenant?.email || "",
      moveInDate: unit.tenant?.moveInDate || "",
    });
  };

  const handleSaveEdit = () => {
    console.log("Updating tenant:", newTenant, "for unit:", editingTenant);
    setEditingTenant(null);
  };

  const handleCancelEdit = () => {
    setEditingTenant(null);
    setNewTenant({ name: "", contact: "", email: "", moveInDate: "" });
  };
const handleAddUnit = (newUnit) => {
    setUnits([...units, { ...newUnit, id: units.length + 1 }]);
    setShowAddUnitForm(false);
  };
  return (
    <div className="space-y-8 ">
    
      {showAddUnitForm && (
        <AddUnitForm
          property={property}
          onSave={handleAddUnit}
          onCancel={() => setShowAddUnitForm(false)}
        />
      )}
      {/* Property Header Card */}
      <div className="bg-gradient-to-r from-[#1652A1] to-[#009CDC] rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-xl">
        {/* Top Section: Icon + Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <div className="p-3 bg-white/20 rounded-lg self-start">
            <Home className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold break-words">
              {property.name}
            </h2>
            <p className="text-blue-100 text-sm sm:text-base">
              Property #{property.propertyNo || "N/A"}
            </p>
          </div>
        </div>

        {/* Address Section */}
        <div className="flex flex-wrap items-center gap-2 text-blue-100">
          <MapPin className="w-5 h-5" />
          <p className="text-sm sm:text-base break-words">{property.address}</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {/* Total Units */}
        <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-100 rounded-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-[#1652A1]">
                {property.units.length}
              </p>
              <p className="text-sm sm:text-base text-gray-600">Total Units</p>
            </div>
          </div>
        </div>

        {/* Occupied Units */}
        <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-100 rounded-lg">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-[#1652A1]">
                {
                  property.units.filter(
                    (unit) => unit.occupancyStatus === "Occupied"
                  ).length
                }
              </p>
              <p className="text-sm sm:text-base text-gray-600">Occupied</p>
            </div>
          </div>
        </div>

        {/* Vacant Units */}
        <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-100 rounded-lg">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-[#1652A1]">
                {
                  property.units.filter(
                    (unit) => unit.occupancyStatus === "Vacant"
                  ).length
                }
              </p>
              <p className="text-sm sm:text-base text-gray-600">Vacant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Units Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-3 md:p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Unit Management
          </h3>
          <p className="text-gray-600 mt-1">
            Manage all units and tenant assignments
          </p>
        </div>

        {property.units.length === 0 ? (
          <div className="p-12 text-center">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No units added to this property yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full table-auto hidden md:table">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900">
                    Unit
                  </th>
                  <th className="px-2 py-2 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900">
                    Details
                  </th>
                  <th className="px-2 py-2 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900">
                    Tenant
                  </th>
                  <th className="px-2 py-2 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900">
                    Contact
                  </th>
                  <th className="px-2 py-2 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-2 py-2 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {property.units.map((unit) => (
                  <tr
                    key={unit.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Unit Info */}
                    <td className="px-2 py-2 md:px-6 md:py-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden bg-gray-200">
                          <img
                            src={unit.image}
                            alt={`Unit ${unit.unitNumber}`}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target.src = "")}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-xs md:text-base">
                            Unit {unit.unitNumber}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600">
                            {unit.unitType}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Unit Details */}
                    <td className="px-2 py-2 md:px-6 md:py-4">
                      <div className="text-xs md:text-sm">
                        <p className="text-gray-900">
                          Floor {unit.floorNumber || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          {unit.area || "N/A"} Sqft
                        </p>
                        <p className="text-gray-600">
                          {unit.rooms?.bedrooms}BR • {unit.rooms?.bathrooms}BA
                        </p>
                      </div>
                    </td>

                    {/* Tenant Info */}
                    <td className="px-2 py-2 md:px-6 md:py-4">
                      {unit.occupancyStatus === "Occupied" ? (
                        editingTenant === unit.id ? (
                          <div className="space-y-1 md:space-y-2">
                            <input
                              type="text"
                              value={newTenant.name}
                              onChange={(e) =>
                                setNewTenant({
                                  ...newTenant,
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-2 py-0.5 md:px-3 md:py-1 border border-gray-300 rounded-md text-xs md:text-sm"
                              placeholder="Tenant name"
                            />
                            <input
                              type="email"
                              value={newTenant.email}
                              onChange={(e) =>
                                setNewTenant({
                                  ...newTenant,
                                  email: e.target.value,
                                })
                              }
                              className="w-full px-2 py-0.5 md:px-3 md:py-1 border border-gray-300 rounded-md text-xs md:text-sm"
                              placeholder="Email"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium text-gray-900 text-xs md:text-base">
                              {unit.tenant?.name || "N/A"}
                            </p>
                            <p className="text-xs md:text-sm text-gray-600">
                              {unit.tenant?.email || "No email"}
                            </p>
                          </div>
                        )
                      ) : (
                        <p className="text-gray-500 italic text-xs md:text-sm">
                          No tenant assigned
                        </p>
                      )}
                    </td>

                    {/* Contact Info */}
                    <td className="px-2 py-2 md:px-6 md:py-4">
                      {unit.occupancyStatus === "Occupied" ? (
                        editingTenant === unit.id ? (
                          <input
                            type="text"
                            value={newTenant.contact}
                            onChange={(e) =>
                              setNewTenant({
                                ...newTenant,
                                contact: e.target.value,
                              })
                            }
                            className="w-full px-2 py-0.5 md:px-3 md:py-1 border border-gray-300 rounded-md text-xs md:text-sm"
                            placeholder="Phone number"
                          />
                        ) : (
                          <div className="flex items-center gap-1 md:gap-2">
                            <Phone className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                            <span className="text-xs md:text-sm text-gray-900">
                              {unit.tenant?.contact || "N/A"}
                            </span>
                          </div>
                        )
                      ) : (
                        <span className="text-gray-400 text-xs md:text-sm">
                          -
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-2 py-2 md:px-6 md:py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium ${
                          unit.occupancyStatus === "Occupied"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {unit.occupancyStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-2 py-2 md:px-6 md:py-4">
                      <div className="flex items-center gap-1 md:gap-2">
                        {editingTenant === unit.id ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="p-1 md:p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Save changes"
                            >
                              <Save className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-1 md:p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <X className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            {unit.occupancyStatus === "Vacant" ? (
                              <button
                                onClick={() => handleAddTenant(unit)}
                                className="flex items-center gap-0.5 md:gap-1 px-2 py-0.5 md:px-3 md:py-1 bg-[#1652A1] text-white text-xs rounded-lg hover:bg-[#134a8e] transition-colors"
                              >
                                <Plus className="w-2 h-2 md:w-3 md:h-3" />
                                Add Tenant
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEditTenant(unit)}
                                className="p-1 md:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit tenant"
                              >
                                <Edit className="w-3 h-3 md:w-4 md:h-4" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card Layout */}
            <div className="md:hidden divide-y divide-gray-200">
              {property.units.map((unit) => (
                <div
                  key={unit.id}
                  className="p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col gap-5">
                    {/* Unit Info */}
                    <div className="flex items-center gap-10">
                      <div className="w-15 h-15 rounded-lg overflow-hidden bg-gray-200">
                        <img
                          src={unit.image}
                          alt={`Unit ${unit.unitNumber}`}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.target.src = "")}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          Unit {unit.unitNumber}
                        </p>
                        <p className="text-md text-gray-600">{unit.unitType}</p>
                      </div>
                    </div>

                    {/* Unit Details */}
                    <div className="text-md">
                      <p className="text-gray-900">
                        Floor {unit.floorNumber || "N/A"}
                      </p>
                      <p className="text-gray-600">{unit.area || "N/A"} Sqft</p>
                      <p className="text-gray-600">
                        {unit.rooms?.bedrooms}BR • {unit.rooms?.bathrooms}BA
                      </p>
                    </div>

                    {/* Tenant Info */}
                    <div>
                      {unit.occupancyStatus === "Occupied" ? (
                        editingTenant === unit.id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={newTenant.name}
                              onChange={(e) =>
                                setNewTenant({
                                  ...newTenant,
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-2 py-0.5 border border-gray-300 rounded-md text-xs"
                              placeholder="Tenant name"
                            />
                            <input
                              type="email"
                              value={newTenant.email}
                              onChange={(e) =>
                                setNewTenant({
                                  ...newTenant,
                                  email: e.target.value,
                                })
                              }
                              className="w-full px-2 py-0.5 border border-gray-300 rounded-md text-xs"
                              placeholder="Email"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium text-gray-900 text-md">
                              {unit.tenant?.name || "N/A"}
                            </p>
                            <p className="text-xs text-gray-600">
                              {unit.tenant?.email || "No email"}
                            </p>
                          </div>
                        )
                      ) : (
                        <p className="text-gray-500 italic text-xs">
                          No tenant assigned
                        </p>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div>
                      {unit.occupancyStatus === "Occupied" ? (
                        editingTenant === unit.id ? (
                          <input
                            type="text"
                            value={newTenant.contact}
                            onChange={(e) =>
                              setNewTenant({
                                ...newTenant,
                                contact: e.target.value,
                              })
                            }
                            className="w-full px-2 py-0.5 border border-gray-300 rounded-md text-xs"
                            placeholder="Phone number"
                          />
                        ) : (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-900">
                              {unit.tenant?.contact || "N/A"}
                            </span>
                          </div>
                        )
                      ) : (
                        <span className="text-gray-400 text-md">-</span>
                      )}
                    </div>

                    {/* Status */}
                    <div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-md font-medium ${
                          unit.occupancyStatus === "Occupied"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {unit.occupancyStatus}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      {editingTenant === unit.id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Save changes"
                          >
                            <Save className="w-3 h-3" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <>
                          {unit.occupancyStatus === "Vacant" ? (
                            <button
                              onClick={() => handleAddTenant(unit)}
                              className="flex items-center gap-0.5 px-2 py-0.5 bg-[#1652A1] text-white text-xs rounded-lg hover:bg-[#134a8e] transition-colors"
                            >
                              <Plus className="w-3 h-5" />
                              Add Tenant
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditTenant(unit)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit tenant"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Tenant Modal */}
      {showAddTenantModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Add Tenant to Unit {selectedUnit?.unitNumber}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenant Name
                </label>
                <input
                  type="text"
                  value={newTenant.name}
                  onChange={(e) =>
                    setNewTenant({ ...newTenant, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  placeholder="Enter tenant name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newTenant.contact}
                  onChange={(e) =>
                    setNewTenant({ ...newTenant, contact: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newTenant.email}
                  onChange={(e) =>
                    setNewTenant({ ...newTenant, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Move-in Date
                </label>
                <input
                  type="date"
                  value={newTenant.moveInDate}
                  onChange={(e) =>
                    setNewTenant({ ...newTenant, moveInDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowAddTenantModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTenant}
                className="flex-1 px-4 py-2 bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e] transition-colors"
              >
                Add Tenant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
