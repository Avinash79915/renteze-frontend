import React, { useState } from "react";
import { X, Home } from "lucide-react";

const AddUnitForm = ({ property, onSave, onCancel }) => {
  const [newUnit, setNewUnit] = useState({
    unitNumber: "",
    unitType: "",
    floorNumber: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    image: "",
  });

  const handleSave = () => {
    // Validate required fields
    if (!newUnit.unitNumber || !newUnit.unitType) {
      alert("Unit Number and Unit Type are required");
      return;
    }

    // Pass the new unit data to the parent component
    onSave({
      ...newUnit,
      rooms: {
        bedrooms: parseInt(newUnit.bedrooms) || 0,
        bathrooms: parseInt(newUnit.bathrooms) || 0,
      },
      occupancyStatus: "Vacant",
    });
    // Reset form
    setNewUnit({
      unitNumber: "",
      unitType: "",
      floorNumber: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      image: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Home className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Add New Unit to {property.name}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
            placeholder="Enter unit number"
            required
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
            required
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
            placeholder="Enter area in sqft"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
            placeholder="Enter number of bedrooms"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
            placeholder="Enter number of bathrooms"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL (Optional)
          </label>
          <input
            type="url"
            value={newUnit.image}
            onChange={(e) => setNewUnit({ ...newUnit, image: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
            placeholder="Enter image URL"
          />
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
          Add Unit
        </button>
      </div>
    </div>
  );
};

export default AddUnitForm;