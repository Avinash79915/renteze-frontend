import React, { useState } from "react";
import { X, Save, Home } from "lucide-react";
import api from "../../Pages/utils/axios";
import { useAuth0 } from "@auth0/auth0-react";
import StatusPopup from "../StatusPopup";

const PropertyForm = ({ setShowAddForm, setProperties }) => {
  const [propertyForm, setPropertyForm] = useState({
    name: "",
    address: "",
    propertyNo: "",
    locationPin: "",
    type: "",
    floors: "",
  });

  const { user } = useAuth0();
  const email = user?.email;
  const [status, setStatus] = useState({ type: null, message: "" });
  const [loading, setLoading] = useState(false);

  const resetPropertyForm = () => {
    setPropertyForm({
      name: "",
      address: "",
      propertyNo: "",
      locationPin: "",
      type: "",
      floors: "",
    });
  };

  const handleAddProperty = async () => {
    const { name, propertyNo, address, locationPin } = propertyForm;

    if (!name.trim() || !propertyNo.trim() || !address.trim() || !locationPin.trim()) {
      setStatus({ type: "error", message: "Please fill all required fields" });
      return;
    }

    setLoading(true);
    setStatus({ type: "loading", message: "Creating property..." });

    const payload = {
      propertyName: name,
      propertyAddress: address,
      propertyLocation: locationPin,
    };

    try {
      const response = await api.post(`/create-property?testEmail=${email}`, payload);

      if (response.status === 201 || response.status === 200) {
        const updated = await api.get(`/dashboard?testEmail=${email}`);
        setProperties(updated.data.properties || []);
        resetPropertyForm();
        setShowAddForm(false);
        setStatus({ type: "success", message: "Property created successfully!" });
        setTimeout(() => setStatus({ type: null, message: "" }), 2000);
      } else {
        setStatus({ type: "error", message: "Failed to create property." });
      }
    } catch (error) {
      console.error("Error creating property:", error);
      setStatus({
        type: "error",
        message: "Internal Server Error: " + (error?.response?.data?.message || "Please try again."),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {status.type && <StatusPopup type={status.type} message={status.message} />}
      <div className="bg-white rounded-lg border border-gray-200 mb-6 shadow-lg">
        <div className="p-3 md:p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-[#1652A1]">Add New Property</h3>
          <button
            onClick={() => {
              setShowAddForm(false);
              resetPropertyForm();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2 md:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Name *</label>
              <input
                type="text"
                value={propertyForm.name}
                onChange={(e) => setPropertyForm((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Number *</label>
              <input
                type="text"
                value={propertyForm.propertyNo}
                onChange={(e) => setPropertyForm((prev) => ({ ...prev, propertyNo: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <input
                type="text"
                value={propertyForm.address}
                onChange={(e) => setPropertyForm((prev) => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Location Pin *</label>
              <input
                type="text"
                value={propertyForm.locationPin}
                onChange={(e) => setPropertyForm((prev) => ({ ...prev, locationPin: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                value={propertyForm.type}
                onChange={(e) => setPropertyForm((prev) => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
              >
                <option value="">Select Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Industrial">Industrial</option>
                <option value="Retail">Retail</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Floors</label>
              <input
                type="number"
                value={propertyForm.floors}
                onChange={(e) => setPropertyForm((prev) => ({ ...prev, floors: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1]"
                min={0}
              />
            </div>
          </div>
        </div>

        <div className="p-2 md:p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={() => {
              setShowAddForm(false);
              resetPropertyForm();
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAddProperty}
            disabled={loading}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#1652A1] text-white hover:bg-[#134a8e]"
            }`}
          >
            {loading ? "Adding..." : "Add Property"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertyForm;
