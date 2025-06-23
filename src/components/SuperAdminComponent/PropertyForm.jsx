import React, { useState } from "react";
import {
  Plus,
  X,
  Save,
  Upload,
  Home,
  Zap,
  Droplets,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const PropertyForm = ({ setShowAddForm, setProperties }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [units, setUnits] = useState([]);
  const [propertyForm, setPropertyForm] = useState({
    name: "",
    address: "",
    propertyNo: "",
    locationPin: "",
    type: "",
    floors: "",
    waterMeterNo: "",
    electricMeterNo: "",
    amenities: "",
    occupancyStatus: "Vacant",
    unitHistory: "",
  });

  const [unitForm, setUnitForm] = useState({
    unitNumber: "",
    area: "",
    floorNumber: "",
    unitType: "Apartment",
    waterMeterNo: "",
    electricMeterNo: "",
    amenities: "",
    occupancyStatus: "Vacant",
  });

  const resetPropertyForm = () => {
    setPropertyForm({
      name: "",
      address: "",
      propertyNo: "",
      locationPin: "",
      type: "",
      floors: "",
      waterMeterNo: "",
      electricMeterNo: "",
      amenities: "",
      occupancyStatus: "Vacant",
      unitHistory: "",
    });
    setUnits([]);
    setUnitForm({
      unitNumber: "",
      area: "",
      floorNumber: "",
      unitType: "Apartment",
      waterMeterNo: "",
      electricMeterNo: "",
      amenities: "",
      occupancyStatus: "Vacant",
    });
  };

 const handleAddProperty = async () => {
  const { name, propertyNo, address, locationPin } = propertyForm;

  if (!name.trim() || !propertyNo.trim() || !address.trim() || !locationPin.trim()) {
    alert("Please fill all required fields");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  const payload = {
    propertyName: name,
    propertyAddress: address,
    propertyLocation: locationPin,
  };

  try {
    const response = await axios.post(
      `http://localhost:3000/create-property?testEmail=${email}`,
      payload
    );

    if (response.status === 201 || response.status === 200) {
      const updated = await axios.get(`http://localhost:3000/dashboard?testEmail=${email}`);
      setProperties(updated.data.properties || []);
      resetPropertyForm();
      setShowAddForm(false);
    } else {
      alert("Failed to create property.");
    }
  } catch (error) {
    console.error("Error creating property:", error);
    alert("Internal Server Error: " + error?.response?.data?.message);
  }
};


const handleAddUnit = () => {
  const { unitNumber } = unitForm;

  if (!unitNumber.trim()) {
    alert("Unit Number is required to add a unit.");
    return;
  }

  setUnits([...units, { id: Date.now().toString(), ...unitForm }]);
  setUnitForm({
    unitNumber: "",
    area: "",
    floorNumber: "",
    unitType: "Apartment",
    waterMeterNo: "",
    electricMeterNo: "",
    amenities: "",
    occupancyStatus: "Vacant",
  });
};


  const handleDeleteUnit = (unitId) => {
    setUnits(units.filter((unit) => unit.id !== unitId));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6   shadow-lg">
      <div className="p-3 md:p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-[#1652A1]">
            Add New Property
          </h3>
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

        <div className="flex flex-wrap gap-3 mt-4 bg-gray-100 p-1 sm:p-3 rounded-lg">
          {[
            { id: "basic", label: "Basic Info", icon: Home },
            { id: "units", label: "Units", icon: Home },
            { id: "utilities", label: "Utilities", icon: Zap },
            { id: "documents", label: "Documents", icon: Home },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-[#1652A1] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-2 md:p-6">
        {activeTab === "basic" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name *
                </label>
                <input
                  type="text"
                  value={propertyForm.name}
                  onChange={(e) =>
                    setPropertyForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  required
                  autoFocus
                />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Number *
                </label>
                <input
                  type="text"
                  value={propertyForm.propertyNo}
                  onChange={(e) =>
                    setPropertyForm((prev) => ({
                      ...prev,
                      propertyNo: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  value={propertyForm.address}
                  onChange={(e) =>
                    setPropertyForm((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Location Pin *
                </label>
                <input
                  type="text"
                  value={propertyForm.locationPin}
                  onChange={(e) =>
                    setPropertyForm((prev) => ({
                      ...prev,
                      locationPin: e.target.value,
                    }))
                  }
                  required
                  placeholder="Enter location pin"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select
                  value={propertyForm.type}
                  onChange={(e) =>
                    setPropertyForm((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Floors
                </label>
                <input
                  type="number"
                  value={propertyForm.floors}
                  onChange={(e) =>
                    setPropertyForm((prev) => ({
                      ...prev,
                      floors: e.target.value,
                    }))
                  }
                  placeholder="e.g. 3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  min={0}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Image Upload
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    id="propertyImageUpload"
                    onChange={(e) =>
                      console.log("Property Image uploaded:", e.target.files[0])
                    }
                  />
                  <label
                    htmlFor="propertyImageUpload"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Upload Image</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "units" && (
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-2 md:p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-3">
                Add Unit
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Number *
                  </label>
                  <input
                    type="text"
                    value={unitForm.unitNumber}
                    onChange={(e) =>
                      setUnitForm((prev) => ({
                        ...prev,
                        unitNumber: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area (Sqft)
                  </label>
                  <input
                    type="number"
                    value={unitForm.area}
                    onChange={(e) =>
                      setUnitForm((prev) => ({ ...prev, area: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floor Number
                  </label>
                  <input
                    type="number"
                    value={unitForm.floorNumber}
                    onChange={(e) =>
                      setUnitForm((prev) => ({
                        ...prev,
                        floorNumber: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Type
                  </label>
                  <select
                    value={unitForm.unitType}
                    onChange={(e) =>
                      setUnitForm((prev) => ({
                        ...prev,
                        unitType: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Office">Office</option>
                    <option value="Shop">Shop</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Images
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      className="hidden"
                      id="unitImagesUpload"
                      onChange={(e) =>
                        console.log("Unit Images uploaded:", e.target.files)
                      }
                    />
                    <label
                      htmlFor="unitImagesUpload"
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <Upload className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">
                        Upload Images
                      </span>
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amenities and Fixtures
                  </label>
                  <textarea
                    value={unitForm.amenities}
                    onChange={(e) =>
                      setUnitForm((prev) => ({
                        ...prev,
                        amenities: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    rows="3"
                    placeholder="List of amenities and fixtures"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Occupancy Status
                  </label>
                  <select
                    value={unitForm.occupancyStatus}
                    onChange={(e) =>
                      setUnitForm((prev) => ({
                        ...prev,
                        occupancyStatus: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  >
                    <option value="Vacant">Vacant</option>
                    <option value="Occupied">Occupied</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleAddUnit}
                  className="px-4 py-2 bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e] flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Unit
                </button>
              </div>
            </div>

            {units.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Added Units
                </h4>
                <div className="space-y-3">
                  {units.map((unit) => (
                    <div
                      key={unit.id}
                      className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Unit {unit.unitNumber} ({unit.unitType})
                        </p>
                        <p className="text-sm text-gray-600">
                          Floor: {unit.floorNumber}, Area: {unit.area} Sqft,
                          Status: {unit.occupancyStatus}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteUnit(unit.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "utilities" && (
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                Water
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Water Meter Number
                  </label>
                  <input
                    type="text"
                    value={propertyForm.waterMeterNo}
                    onChange={(e) =>
                      setPropertyForm((prev) => ({
                        ...prev,
                        waterMeterNo: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Power
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Electric Meter Number
                  </label>
                  <input
                    type="text"
                    value={propertyForm.electricMeterNo}
                    onChange={(e) =>
                      setPropertyForm((prev) => ({
                        ...prev,
                        electricMeterNo: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amenities and Fixtures
                </label>
                <textarea
                  value={propertyForm.amenities}
                  onChange={(e) =>
                    setPropertyForm((prev) => ({
                      ...prev,
                      amenities: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  rows="3"
                  placeholder="List of amenities and fixtures"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupancy Status
                </label>
                <select
                  value={propertyForm.occupancyStatus}
                  onChange={(e) =>
                    setPropertyForm((prev) => ({
                      ...prev,
                      occupancyStatus: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                >
                  <option value="Vacant">Vacant</option>
                  <option value="Occupied">Occupied</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Agreement Templates
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    multiple
                    className="hidden"
                    id="agreementTemplatesUpload"
                    onChange={(e) =>
                      console.log(
                        "Agreement Templates uploaded:",
                        e.target.files
                      )
                    }
                  />
                  <label
                    htmlFor="agreementTemplatesUpload"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Upload Files</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Past Agreements
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    multiple
                    className="hidden"
                    id="pastAgreementsUpload"
                    onChange={(e) =>
                      console.log("Past Agreements uploaded:", e.target.files)
                    }
                  />
                  <label
                    htmlFor="pastAgreementsUpload"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Upload Files</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit History
              </label>
              <textarea
                value={propertyForm.unitHistory}
                onChange={(e) =>
                  setPropertyForm((prev) => ({
                    ...prev,
                    unitHistory: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                rows="3"
                placeholder="Enter unit history details"
              />
            </div>
          </div>
        )}
      </div>

      <div className=" p-2 md:p-6 border-t border-gray-200">
        <div className="flex justify-end gap-3">
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
            className="px-4 py-2 bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e] flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Add Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
