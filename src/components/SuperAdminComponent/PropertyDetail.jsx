import React, { useState, useEffect } from "react";
import { User, Home, MapPin, Users, Save, X } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import api from "../../Pages/utils/axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import AddUnitForm from "../SuperAdminComponent/AddUnitForm";
import { FiEye } from "react-icons/fi";
import ViewUnitModal from "../../components/ViewUnitDetails"; // adjust path as needed

const PropertyDetail = ({
  property,
  setShowAddUnitForm,
  showAddUnitForm,
  unitSearchTerm,
}) => {
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]); // State for filtered units
  const [loadingUnits, setLoadingUnits] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [editingUnit, setEditingUnit] = useState(null);
  const [showAddTenantForm, setShowAddTenantForm] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showUnitDetailModal, setShowUnitDetailModal] = useState(false);

  const { user, isAuthenticated, isLoading } = useAuth0();
  const email = user?.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      rent: "",
      advance: "",
      annualIncrement: "",
      agreementStartDate: "",
      agreementEndDate: "",
    },
  });

  if (!property) return null;

  useEffect(() => {
    const fetchUnits = async () => {
      setLoadingUnits(true);
      try {
        const response = await api.get(`/unit/property/${property._id}`, {
          params: { testEmail: email },
        });
        setUnits(response.data.units || []);
        setFilteredUnits(response.data.units || []); // Initialize filtered units
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

    if (property?._id && email) fetchUnits();
  }, [property?._id, email]);

  // Filter units based on unitSearchTerm
  useEffect(() => {
    const filtered = units.filter(
      (unit) =>
        (unit.roomId || "")
          .toLowerCase()
          .includes((unitSearchTerm || "").toLowerCase()) ||
        (unit.displayID || "")
          .toLowerCase()
          .includes((unitSearchTerm || "").toLowerCase())
    );
    setFilteredUnits(filtered);
  }, [unitSearchTerm, units]);

  const reloadUnits = async () => {
    try {
      const response = await api.get(`/unit/property/${property._id}`, {
        params: { testEmail: email },
      });
      setUnits(response.data.units || []);
      setFilteredUnits(response.data.units || []); // Update filtered units on reload
    } catch (error) {
      setFetchError("Failed to reload units after update. Please refresh.");
    }
  };

  const handleEditUnit = (unit) => {
    setEditingUnit(unit);
    setShowAddUnitForm(true);
  };

  const handleDeleteUnit = async (unitId) => {
    if (!window.confirm("Are you sure you want to delete this unit?")) return;

    try {
      await api.delete(`/unit/${unitId}`, { params: { testEmail: email } });
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

  const handleAddTenant = (unit) => {
    setSelectedUnit(unit);
    setShowAddTenantForm(true);
    reset({
      name: "",
      email: "",
      phone: "",
      rent: unit.rentCost || "",
      advance: "",
      annualIncrement: "",
      agreementStartDate: "",
      agreementEndDate: "",
    });
  };

  const onSubmitTenant = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        unit: selectedUnit._id,
        rent: data.rent,
        advance: data.advance,
        annualIncrement: data.annualIncrement,
        agreementStartDate: data.agreementStartDate,
        agreementEndDate: data.agreementEndDate,
      };

      await api.post(`/property/${property._id}/tenant`, payload, {
        params: { testEmail: email },
        headers: { "Content-Type": "application/json" },
      });

      alert("Tenant added successfully!");
      setShowAddTenantForm(false);
      reset();
      setSelectedUnit(null);
      reloadUnits();
    } catch (error) {
      console.error(
        "Error adding tenant:",
        error.response?.data || error.message
      );
      alert(
        "Failed to add tenant: " +
          (error.response?.data?.message || "Please try again.")
      );
    }
  };

const handleViewUnit = (unit) => {
  console.log("Viewing Unit:", unit); // ✅ log this
  setSelectedUnit(unit);
  setShowUnitDetailModal(true);
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

      {showAddTenantForm && selectedUnit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay with blur and semi-transparent black */}
          <div
            className="fixed inset-0 backdrop-blur-md bg-black/30"
            onClick={() => {
              setShowAddTenantForm(false);
              setSelectedUnit(null);
              reset();
            }}
          ></div>
          {/* Popup form */}
          <div className="relative bg-white rounded-lg border border-gray-200 w-full max-w-2xl mx-4 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="p-3 md:p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-[#1652A1]">
                  Add Tenant for Unit {selectedUnit.roomId || "N/A"}
                </h3>
                <button
                  onClick={() => {
                    setShowAddTenantForm(false);
                    setSelectedUnit(null);
                    reset();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form
              className="p-2 md:p-6"
              onSubmit={handleSubmit(onSubmitTenant)}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tenant Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      autoFocus
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Phone number must be 10 digits",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Rent <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      {...register("rent", {
                        required: "Rent is required",
                        min: {
                          value: 1,
                          message: "Rent must be greater than 0",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                    {errors.rent && (
                      <p className="text-red-500 text-sm">
                        {errors.rent.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Advance <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      {...register("advance", {
                        required: "Advance is required",
                        min: {
                          value: 0,
                          message: "Advance cannot be negative",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                    {errors.advance && (
                      <p className="text-red-500 text-sm">
                        {errors.advance.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Increment (%){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      {...register("annualIncrement", {
                        required: "Annual increment is required",
                        min: {
                          value: 0,
                          message: "Annual increment cannot be negative",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                    {errors.annualIncrement && (
                      <p className="text-red-500 text-sm">
                        {errors.annualIncrement.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Agreement Start Date{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("agreementStartDate", {
                        required: "Start date is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                    {errors.agreementStartDate && (
                      <p className="text-red-500 text-sm">
                        {errors.agreementStartDate.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Agreement End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("agreementEndDate", {
                        required: "End date is required",
                        validate: (value) =>
                          value > watch("agreementStartDate") ||
                          "End date must be after start date",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                    {errors.agreementEndDate && (
                      <p className="text-red-500 text-sm">
                        {errors.agreementEndDate.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-2 md:p-6 border-t border-gray-200">
                <div className="flex justify-end gapsm-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddTenantForm(false);
                      setSelectedUnit(null);
                      reset();
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e] flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Add Tenant
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
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
              Display ID #{property.displayID || "N/A"}
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
                {units.filter((unit) => unit.isOccupied).length}
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
                {units.filter((unit) => !unit.isOccupied).length}
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
        ) : filteredUnits.length === 0 ? (
          <div className="p-12 text-center">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {unitSearchTerm
                ? "No units match your search."
                : "No units added to this property yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">Unit Number</th>
                  <th className="px-6 py-4">Display ID</th>
                  <th className="px-6 py-4">Floor</th>
                  <th className="px-6 py-4">Rent</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUnits.map((unit) => (
                  <tr key={unit._id}>
                    <td className="px-6 py-4">{unit.roomId || "N/A"}</td>
                    <td className="px-6 py-4">{unit.displayID || "N/A"}</td>
                    <td className="px-6 py-4">{unit.floor ?? "N/A"}</td>
                    <td className="px-6 py-4">₹{unit.rentCost ?? "0"}</td>
                    <td className="px-6 py-4">
                      {unit.isOccupied ? "Occupied" : "Vacant"}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <FiEye
                        className="text-gray-700 hover:text-blue-500 h-5 w-5 cursor-pointer"
                        onClick={() => handleViewUnit(unit)}
                      />
                      <FaRegEdit
                        className="text-blue-600 hover:underline h-5 w-5 cursor-pointer"
                        onClick={() => handleEditUnit(unit)}
                      />
                      <MdOutlineDeleteForever
                        className="text-red-600 hover:underline h-5 w-5 cursor-pointer"
                        onClick={() => handleDeleteUnit(unit._id)}
                      />
                      <HiOutlineUserAdd
                        className="text-green-600 hover:underline h-5 w-5 cursor-pointer"
                        onClick={() => handleAddTenant(unit)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ViewUnitModal
  isOpen={showUnitDetailModal}
  onClose={() => setShowUnitDetailModal(false)}
  unit={selectedUnit}
/>

    </div>
  );
};

export default PropertyDetail;
