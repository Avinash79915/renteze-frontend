import React, { useState } from "react";
import { X, Home } from "lucide-react";
import api from "../../Pages/utils/axios";
import { useAuth0 } from "@auth0/auth0-react";
import StatusPopup from "../StatusPopup";

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
        occupancyStatus: existingUnit.occupancyStatus || "Vacant",
        waterMeterNo: existingUnit.waterMeterNo || "",
        electricMeterNo: existingUnit.electricMeterNo || "",
        amenities: existingUnit.amenities || "",
        agreementTemplates: [],
        pastAgreements: [],
        unitHistory: existingUnit.unitHistory || "",
        waterConnectionType: existingUnit.waterConnectionType || "Common",
        toiletType: existingUnit.toiletType || "Western",
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
        occupancyStatus: "Vacant",
        waterMeterNo: "",
        electricMeterNo: "",
        amenities: "",
        agreementTemplates: [],
        pastAgreements: [],
        unitHistory: "",
        waterConnectionType: "Common",
        toiletType: "Western",
      };

  const [newUnit, setNewUnit] = useState(initialUnitState);
  const { user } = useAuth0();
  const email = user?.email;
  const [status, setStatus] = useState({ type: null, message: "" });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const handleSave = async () => {
    if (!newUnit.unitNumber || !newUnit.unitType || !newUnit.bescomNumber) {
      setStatus({ type: "error", message: "Required fields are missing." });
      return;
    }

    setLoading(true);
    setStatus({ type: "loading", message: "Saving unit..." });

    const payload = {
      roomId: newUnit.unitNumber,
      unitType: newUnit.unitType,
      floor: parseInt(newUnit.floorNumber) || 0,
      roomArea: newUnit.area || "0",
      bedrooms: parseInt(newUnit.bedrooms) || 0,
      bathrooms: parseInt(newUnit.bathrooms) || 0,
      rentCost: parseFloat(newUnit.rentCost) || 0,
      maintenanceCost: parseFloat(newUnit.maintenanceCost) || 0,
      bescomNumber: newUnit.bescomNumber,
      isOccupied: newUnit.occupancyStatus === "Occupied",
      waterMeterNo: newUnit.waterMeterNo,
      electricMeterNo: newUnit.electricMeterNo,
      amenities: newUnit.amenities,
      unitHistory: newUnit.unitHistory,
      waterConnectionType: newUnit.waterConnectionType,
      toiletType: newUnit.toiletType,
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

      setStatus({
        type: "success",
        message: existingUnit
          ? "Unit updated successfully!"
          : "Unit created successfully!",
      });

      setTimeout(() => {
        setStatus({ type: null, message: "" });
        setLoading(false);
        onSave();
      }, 1500);
    } catch (error) {
      setStatus({
        type: "error",
        message: `Failed to save unit: ${
          error.response?.data?.message || "Please try again."
        }`,
      });
      setLoading(false);
    }
  };

  const tabs = [
    { key: "basic", label: "Basic Info" },
    { key: "utilities", label: "Utilities" },
    { key: "documents", label: "Documents" },
  ];

  const renderTabContent = () => {
    if (activeTab === "basic") {
      return (
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit Type
            </label>
            <input
              type="text"
              value={newUnit.unitType}
              onChange={(e) =>
                setNewUnit({ ...newUnit, unitType: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
              placeholder="Enter unit type"
            />
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
              Area (sqft)
            </label>
            <input
              type="number"
              value={newUnit.area}
              onChange={(e) =>
                setNewUnit({ ...newUnit, area: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
              placeholder="Enter area"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms
            </label>
            <input
              type="number"
              value={newUnit.bedrooms}
              onChange={(e) =>
                setNewUnit({ ...newUnit, bedrooms: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
              placeholder="Bedrooms"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bathrooms
            </label>
            <input
              type="number"
              value={newUnit.bathrooms}
              onChange={(e) =>
                setNewUnit({ ...newUnit, bathrooms: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
              placeholder="Bathrooms"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rent Cost
            </label>
            <input
              type="number"
              value={newUnit.rentCost}
              onChange={(e) =>
                setNewUnit({ ...newUnit, rentCost: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
              placeholder="Rent Cost"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maintenance Cost
            </label>
            <input
              type="number"
              value={newUnit.maintenanceCost}
              onChange={(e) =>
                setNewUnit({ ...newUnit, maintenanceCost: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
              placeholder="Maintenance Cost"
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
      );
    } else if (activeTab === "utilities") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Meter Number
            </label>
            <input
              type="text"
              value={newUnit.waterMeterNo}
              onChange={(e) =>
                setNewUnit({ ...newUnit, waterMeterNo: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
              placeholder="Water Meter Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electric Meter Number
            </label>
            <input
              type="text"
              value={newUnit.electricMeterNo}
              onChange={(e) =>
                setNewUnit({ ...newUnit, electricMeterNo: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
              placeholder="Electric Meter Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Connection Type
            </label>
            <select
              value={newUnit.waterConnectionType}
              onChange={(e) =>
                setNewUnit({ ...newUnit, waterConnectionType: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
            >
              <option value="Common">Common</option>
              <option value="Individual">Individual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Toilet Type
            </label>
            <select
              value={newUnit.toiletType}
              onChange={(e) =>
                setNewUnit({ ...newUnit, toiletType: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
            >
              <option value="Attached">Attached</option>
              <option value="Shared">Shared</option>
              <option value="Western">Western</option>
              <option value="Indian">Indian</option>
            </select>
          </div>
        </div>
      );
    } else if (activeTab === "documents") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Agreement Templates
            </label>
            <input
              type="file"
              multiple
              onChange={(e) =>
                setNewUnit({ ...newUnit, agreementTemplates: e.target.files })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
              accept=".pdf,.doc,.docx"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Past Agreements
            </label>
            <input
              type="file"
              multiple
              onChange={(e) =>
                setNewUnit({ ...newUnit, pastAgreements: e.target.files })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {status.type && (
        <StatusPopup type={status.type} message={status.message} />
      )}

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex justify-between border-b border-gray-200 pb-4 mb-4">
          <div className="flex gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  activeTab === tab.key
                    ? "bg-[#1652A1] text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {renderTabContent()}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1652A1] hover:bg-[#134a8e]"
            }`}
          >
            {loading ? (existingUnit ? "Updating..." : "Adding...") : (existingUnit ? "Update Unit" : "Add Unit")}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddUnitForm;