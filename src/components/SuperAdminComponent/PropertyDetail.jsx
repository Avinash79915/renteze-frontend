import React, { useState, useEffect } from "react";
import { User, Home, MapPin, Users } from "lucide-react";
import axios from "axios";
import AddUnitForm from "../SuperAdminComponent/AddUnitForm";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import api from "../../Pages/utils/axios";

const PropertyDetail = ({ property, setShowAddUnitForm, showAddUnitForm }) => {
  const [units, setUnits] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [editingUnit, setEditingUnit] = useState(null);

  if (!property) return null;

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;
  useEffect(() => {
    const fetchUnits = async () => {
      setLoadingUnits(true);

      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email;

      try {
        const response = await api.get(`/unit/property/${property._id}`, {
          params: { testEmail: email },
        });

        setUnits(response.data.units || []);
        setFetchError(null);
      } catch (error) {
        console.error(
          "Error fetching units:",
          error.response?.data || error.message
        );
        setFetchError("Failed to load units. Please try again later.");
      } finally {
        setLoadingUnits(false);
      }
    };

    if (property?._id) fetchUnits();
  }, [property?._id]);

  const reloadUnits = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    try {
      const response = await api.get(`/unit/property/${property._id}`, {
        params: { testEmail: email },
      });
      setUnits(response.data.units || []);
    } catch (error) {
      console.error(
        "Error reloading units:",
        error.response?.data || error.message
      );
      setFetchError("Failed to reload units after update. Please refresh.");
    }
  };

  const handleEditUnit = (unit) => {
    setEditingUnit(unit);
    setShowAddUnitForm(true);
  };

  const handleDeleteUnit = async (unitId) => {
    if (!window.confirm("Are you sure you want to delete this unit?")) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    try {
      await api.delete(
        `/unit/${unitId}`,
        { params: { testEmail: email } }
      );
      alert("Unit deleted successfully!");
      reloadUnits();
    } catch (error) {
      console.error(
        "Error deleting unit:",
        error.response?.data || error.message
      );
      alert("Failed to delete unit. Please try again.");
    }
  };

  const handleAddOrEditUnit = async () => {
    setShowAddUnitForm(false);
    setEditingUnit(null);
    await reloadUnits();
  };

  return (
    <div className="space-y-8">
      {showAddUnitForm && (
        <AddUnitForm
          property={property}
          existingUnit={editingUnit}
          onSave={handleAddOrEditUnit}
          onCancel={() => {
            setShowAddUnitForm(false);
            setEditingUnit(null);
          }}
        />
      )}

      {/* Property Header */}
      <div className="bg-gradient-to-r from-[#1652A1] to-[#009CDC] rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-xl">
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
        <div className="flex flex-wrap items-center gap-2 text-blue-100">
          <MapPin className="w-5 h-5" />
          <p className="text-sm sm:text-base break-words">{property.address}</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-100 rounded-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-[#1652A1]">
                {units.length}
              </p>
              <p className="text-sm sm:text-base text-gray-600">Total Units</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-100 rounded-lg">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-[#1652A1]">
                {
                  units.filter((unit) => unit.occupancyStatus === "Occupied")
                    .length
                }
              </p>
              <p className="text-sm sm:text-base text-gray-600">Occupied</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-100 rounded-lg">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-[#1652A1]">
                {
                  units.filter((unit) => unit.occupancyStatus === "Vacant")
                    .length
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

        {loadingUnits ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg">Loading units...</p>
          </div>
        ) : fetchError ? (
          <div className="p-12 text-center text-red-500">
            <p>{fetchError}</p>
          </div>
        ) : units.length === 0 ? (
          <div className="p-12 text-center">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No units added to this property yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">Unit Number</th>
                  <th className="px-6 py-4">Floor</th>
                  <th className="px-6 py-4">Rent</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {units.map((unit) => (
                  <tr key={unit._id}>
                    <td className="px-6 py-4">{unit.roomId || "N/A"}</td>
                    <td className="px-6 py-4">{unit.floor ?? "N/A"}</td>
                    <td className="px-6 py-4">₹{unit.rentCost ?? "0"}</td>
                    <td className="px-6 py-4">
                      {unit.occupancyStatus || "Vacant"}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <FaRegEdit
                        className="text-blue-600 hover:underline h-5 w-5"
                        onClick={() => handleEditUnit(unit)}
                      >
                        Edit
                      </FaRegEdit>
                      <MdOutlineDeleteForever
                        className="text-red-600 hover:underline h-5 w-5"
                        onClick={() => handleDeleteUnit(unit._id)}
                      >
                        Delete
                      </MdOutlineDeleteForever>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;
