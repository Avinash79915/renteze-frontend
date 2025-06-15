import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Search,
  Filter,
  X,
  Save,
  Upload,
  Home,
  Zap,
  Droplets,
} from "lucide-react";
import property1 from "../../assets/property-1.jpg";

const initialProperties = [
  {
    id: 1,
    name: "Sunrise Apartments",
    address: "123 Main St, Cityville",
    units: [],
  },
  {
    id: 2,
    name: "Palm Residency",
    address: "456 Palm Ave, Townsville",
    units: [],
  },
  { id: 3, name: "Sky Towers", address: "789 Sky Rd, Metro City", units: [] },
  { id: 4, name: "Ocean View", address: "101 Ocean Dr, Beachside", units: [] },
  {
    id: 5,
    name: "Green Heights",
    address: "202 Green Ln, Hilltown",
    units: [],
  },
  {
    id: 6,
    name: "Lakefront Villa",
    address: "303 Lake St, Lakeside",
    units: [],
  },
  {
    id: 7,
    name: "Mountain Edge",
    address: "404 Mountain Rd, Peaksville",
    units: [],
  },
  { id: 8, name: "City Lights", address: "505 Light Ave, Downtown", units: [] },
];

const PropertyListing = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [units, setUnits] = useState([]); // For managing units in the form

  const [propertyForm, setPropertyForm] = useState({
    name: "",
    address: "",
    propertyNo: "",
    waterMeterNo: "",
    electricMeterNo: "",
    amenities: "",
    occupancyStatus: "Vacant",
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
      waterMeterNo: "",
      electricMeterNo: "",
      amenities: "",
      occupancyStatus: "Vacant",
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

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProperty = () => {
    const newProperty = {
      id: Date.now().toString(),
      ...propertyForm,
      units,
    };
    setProperties([...properties, newProperty]);
    resetPropertyForm();
    setShowAddForm(false);
  };

  const handleDeleteProperty = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties(
        properties.filter((property) => property.id !== propertyId)
      );
    }
  };

  const openViewModal = (property) => {
    setSelectedProperty(property);
    setShowViewModal(true);
  };

  const handleAddUnit = () => {
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

  const PropertyForm = () => (
    <div className="bg-white rounded-lg border border-gray-200 mb-6">
      <div className="p-6 border-b border-gray-200">
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

        {/* Tab Navigation */}
        <div className="flex space-x-1 mt-4 bg-gray-100 p-1 rounded-lg">
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

      <div className="p-6">
        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Property Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name *
                </label>
                <input
                  type="text"
                  value={propertyForm.name}
                  onChange={(e) =>
                    setPropertyForm({ ...propertyForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  required
                />
              </div>

              {/* Property Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Number *
                </label>
                <input
                  type="text"
                  value={propertyForm.propertyNo}
                  onChange={(e) =>
                    setPropertyForm({
                      ...propertyForm,
                      propertyNo: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  required
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  value={propertyForm.address}
                  onChange={(e) =>
                    setPropertyForm({
                      ...propertyForm,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  required
                />
              </div>

              {/* Property Location Pin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Location Pin
                </label>
                <input
                  type="text"
                  value={propertyForm.locationPin}
                  onChange={(e) =>
                    setPropertyForm({
                      ...propertyForm,
                      locationPin: e.target.value,
                    })
                  }
                  placeholder="Enter location pin"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select
                  value={propertyForm.type}
                  onChange={(e) =>
                    setPropertyForm({ ...propertyForm, type: e.target.value })
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

              {/* Number of Floors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Floors
                </label>
                <input
                  type="number"
                  value={propertyForm.floors}
                  onChange={(e) =>
                    setPropertyForm({ ...propertyForm, floors: e.target.value })
                  }
                  placeholder="e.g. 3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  min={0}
                />
              </div>

              {/* Property Image Upload */}
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

        {/* Units Tab */}
        {activeTab === "units" && (
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-4">
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
                      setUnitForm({ ...unitForm, unitNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    required
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
                      setUnitForm({ ...unitForm, area: e.target.value })
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
                      setUnitForm({ ...unitForm, floorNumber: e.target.value })
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
                      setUnitForm({ ...unitForm, unitType: e.target.value })
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
                      setUnitForm({ ...unitForm, amenities: e.target.value })
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
                      setUnitForm({
                        ...unitForm,
                        occupancyStatus: e.target.value,
                      })
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

            {/* Unit List */}
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

        {/* Utilities Tab */}
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
                      setPropertyForm({
                        ...propertyForm,
                        waterMeterNo: e.target.value,
                      })
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
                      setPropertyForm({
                        ...propertyForm,
                        electricMeterNo: e.target.value,
                      })
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
                    setPropertyForm({
                      ...propertyForm,
                      amenities: e.target.value,
                    })
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
                    setPropertyForm({
                      ...propertyForm,
                      occupancyStatus: e.target.value,
                    })
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

        {/* Documents Tab */}
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
                  setPropertyForm({
                    ...propertyForm,
                    unitHistory: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                rows="3"
                placeholder="Enter unit history details"
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-200">
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

  const ViewPropertyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#1652A1]">
              Property Details - {selectedProperty?.name}
            </h3>
            <button
              onClick={() => setShowViewModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Property Name</p>
                <p className="text-gray-900">{selectedProperty?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Property Number</p>
                <p className="text-gray-900">
                  {selectedProperty?.propertyNo || "N/A"}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-gray-900">{selectedProperty?.address}</p>
              </div>
            </div>
          </div>

          {/* Units Info */}
          {selectedProperty?.units?.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Units</h4>
              <div className="space-y-3">
                {selectedProperty.units.map((unit) => (
                  <div
                    key={unit.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      Unit {unit.unitNumber} ({unit.unitType})
                    </p>
                    <p className="text-sm text-gray-600">
                      Floor: {unit.floorNumber}, Area: {unit.area} Sqft, Status:{" "}
                      {unit.occupancyStatus}
                    </p>
                    <p className="text-sm text-gray-600">
                      Amenities: {unit.amenities || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Utilities Info */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Utilities
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Water Meter Number</p>
                <p className="text-gray-900">
                  {selectedProperty?.waterMeterNo || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Electric Meter Number</p>
                <p className="text-gray-900">
                  {selectedProperty?.electricMeterNo || "N/A"}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Amenities and Fixtures</p>
                <p className="text-gray-900">
                  {selectedProperty?.amenities || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Occupancy Status</p>
                <p className="text-gray-900">
                  {selectedProperty?.occupancyStatus || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowViewModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 flex-1 relative overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Super Admin Property Listings
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e]"
        >
          <Plus className="w-5 h-5" />
          Add Property
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
          />
        </div>
      </div>

      {/* Add Property Form (Inline) */}
      {showAddForm && <PropertyForm />}

      {/* Property Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProperties.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No properties found.
          </div>
        ) : (
          filteredProperties.map((property) => (
            <div
              key={property.id}
              className="relative group overflow-hidden rounded shadow-lg cursor-pointer"
            >
              {/* Property Image */}
              <img
                src={property1}
                alt={property.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#009CDC] bg-opacity-80 translate-y-full group-hover:translate-y-0 transition-all duration-500 flex flex-col items-center justify-center p-4">
                <p className="text-white text-lg font-semibold">
                  {property.name}
                </p>
                <p className="text-white text-sm">{property.address}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => openViewModal(property)}
                    className="p-2 bg-white text-[#009CDC] rounded-lg hover:bg-gray-100"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="p-2 bg-white text-red-600 rounded-lg hover:bg-gray-100"
                    title="Delete Property"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {showViewModal && <ViewPropertyModal />}
    </div>
  );
};

export default PropertyListing;
