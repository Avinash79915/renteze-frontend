import React, { useState } from "react";
import { X, Home } from "lucide-react";
import api from "../../Pages/utils/axios";
import { useAuth0 } from "@auth0/auth0-react";

const AddUnitForm = ({ property, existingUnit, onSave, onCancel }) => {
  const initialUnitState = existingUnit
    ? {
        unitNumber: existingUnit.roomId || "",
        unitType: existingUnit.unitType || "Apartment",
        floorNumber: existingUnit.floor?.toString() || "",
        area: existingUnit.roomArea || "",
        bedrooms: existingUnit.bedrooms || "",
        bathrooms: existingUnit.bathrooms || "",
        rentCost: existingUnit.rentCost?.toString() || "",
        maintenanceCost: existingUnit.maintenanceCost?.toString() || "",
        bescomNumber: existingUnit.bescomNumber || "",
        image: existingUnit.image || "",
        occupancyStatus: existingUnit.occupancyStatus || "Vacant",
      }
    : {
        unitNumber: "",
        unitType: "",
        floorNumber: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        rentCost: "",
        maintenanceCost: "",
        bescomNumber: "",
        image: "",
        occupancyStatus: "Vacant",
      };

  const [newUnit, setNewUnit] = useState(initialUnitState);

  const { user, isAuthenticated, isLoading } = useAuth0();
  const email = user?.email;

  const handleSave = async () => {
    if (!newUnit.unitNumber || !newUnit.unitType || !newUnit.bescomNumber) {
      alert("Unit Number, Unit Type, and BESCOM Number are required");
      return;
    }

    const payload = {
      roomId: newUnit.unitNumber,
      roomArea: newUnit.area || "0",
      floor: parseInt(newUnit.floorNumber) || 0,
      rentCost: parseFloat(newUnit.rentCost) || 0,
      maintenanceCost: parseFloat(newUnit.maintenanceCost) || 0,
      bescomNumber: newUnit.bescomNumber,
      hasWaterConnection: false,
      hasIndependentToilet: false,
      isOccupied: newUnit.occupancyStatus === "Occupied",
    };


    try {
      let response;
      if (existingUnit) {
        response = await api.patch(`/unit/${existingUnit._id}`, payload, {
          params: { testEmail: email },
        });
      } else {
        response = await api.post(
          `/unit/property/${property._id}/create`,
          payload,
          { params: { testEmail: email } }
        );
      }

      
      alert(
        existingUnit
          ? "Unit updated successfully!"
          : "Unit created successfully!"
      );
      onSave();
    } catch (error) {
      console.error("Request failed:", error.response?.data || error.message);
      alert(
        `Failed to save unit: ${
          error.response?.data?.message || "Please try again."
        }`
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Home className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {existingUnit
              ? `Edit Unit ${existingUnit.roomId}`
              : `Add New Unit to ${property.name}`}
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          title="Cancel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit Number
          </label>
          <input
            type="text"
            value={newUnit.unitNumber}
            onChange={(e) =>
              setNewUnit({ ...newUnit, unitNumber: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
            placeholder="Enter unit number"
            required={!existingUnit}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit Type
          </label>
          <select
            value={newUnit.unitType}
            onChange={(e) =>
              setNewUnit({ ...newUnit, unitType: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
            required={!existingUnit && newUnit.unitType === ""}
          >
            <option value="">Select unit type</option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="Studio">Studio</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Floor Number
          </label>
          <input
            type="number"
            value={newUnit.floorNumber}
            onChange={(e) =>
              setNewUnit({ ...newUnit, floorNumber: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
            placeholder="Enter floor number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Area (Sqft)
          </label>
          <input
            type="number"
            value={newUnit.area}
            onChange={(e) => setNewUnit({ ...newUnit, area: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
            placeholder="Enter area in sqft"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            BESCOM Number
          </label>
          <input
            type="text"
            value={newUnit.bescomNumber}
            onChange={(e) =>
              setNewUnit({ ...newUnit, bescomNumber: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
            placeholder="Enter BESCOM number"
            required={!existingUnit}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupancy Status
          </label>
          <select
            value={newUnit.occupancyStatus}
            onChange={(e) =>
              setNewUnit({ ...newUnit, occupancyStatus: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
          >
            <option value="Vacant">Vacant</option>
            <option value="Occupied">Occupied</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-2 bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e] transition-colors"
        >
          {existingUnit ? "Update Unit" : "Add Unit"}
        </button>
      </div>
    </div>
  );
};

export default AddUnitForm;
