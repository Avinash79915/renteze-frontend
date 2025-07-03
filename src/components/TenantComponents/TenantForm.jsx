import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { Save, X } from "lucide-react";
import api from "../../Pages/utils/axios";

const TenantForm = ({ setShowAddForm }) => {
  const [properties, setProperties] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, isAuthenticated, isLoading } = useAuth0();
  const email = user?.email;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      property: "",
      unit: "",
      nameOfBusiness: "",
      natureOfBusiness: "",
      rent: "",
      advance: "",
      agreementStartDate: "",
      agreementEndDate: "",
      annualIncrement: "",
    },
  });

  const selectedPropertyId = watch("property");

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      if (!email) return;
      try {
        const res = await api.get(`/dashboard?testEmail=${email}`);
        setProperties(res.data.properties || []);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        alert("Failed to load properties. Please try again.");
      }
    };
    fetchProperties();
  }, [email]);

  // Fetch units for selected property
  useEffect(() => {
    const fetchUnits = async () => {
      if (!selectedPropertyId) {
        setUnits([]);
        return;
      }
      try {
        const res = await api.get(`/property/${selectedPropertyId}/units?testEmail=${email}`);
        setUnits(res.data.units || []);
      } catch (error) {
        console.error("Failed to fetch units:", error);
        alert("Failed to load units. Please try again.");
      }
    };
    fetchUnits();
  }, [selectedPropertyId, email]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        unit: data.unit,
        nameOfBusiness: data.nameOfBusiness || "",
        natureOfBusiness: data.natureOfBusiness || "",
        rent: data.rent,
        advance: data.advance,
        agreementStartDate: data.agreementStartDate,
        agreementEndDate: data.agreementEndDate,
        annualIncrement: data.annualIncrement,
      };


      const response = await api.post(`/property/${data.property}/tenant?testEmail=${email}`, payload, { headers: { "Content-Type": "application/json" } });

      alert("✅ Tenant added successfully!");
      console.log("Tenant added:", response.data);
      reset();
      setShowAddForm(false);
    } catch (error) {
      console.error("❌ Failed to add tenant:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add tenant. Please check your input and try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6 shadow-lg">
      <div className="p-3 md:p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-[#1652A1]">
            Add New Tenant
          </h3>
          <button
            onClick={() => {
              setShowAddForm(false);
              reset();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <form className="p-2 md:p-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
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
                <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name of Business <span className="text-red-500">*</span>
              </label>
              <input
                {...register("nameOfBusiness", {
                  required: "Name of Business is required",
                  validate: (value) =>
                    value !== "N/A" || "Name of Business cannot be 'N/A'",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
              />
              {errors.nameOfBusiness && (
                <p className="text-red-500 text-sm">
                  {errors.nameOfBusiness.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nature of Business <span className="text-red-500">*</span>
              </label>
              <input
                {...register("natureOfBusiness", {
                  required: "Nature of Business is required",
                  validate: (value) =>
                    value !== "N/A" || "Nature of Business cannot be 'N/A'",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
              />
              {errors.natureOfBusiness && (
                <p className="text-red-500 text-sm">
                  {errors.natureOfBusiness.message}
                </p>
              )}
            </div>
          </div>

          {/* Property and Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property <span className="text-red-500">*</span>
              </label>
              <select
                {...register("property", { required: "Property is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
              >
                <option value="">Select Property</option>
                {properties.map((property) => (
                  <option key={property._id} value={property._id}>
                    {property.name}
                  </option>
                ))}
              </select>
              {errors.property && (
                <p className="text-red-500 text-sm">
                  {errors.property.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit <span className="text-red-500">*</span>
              </label>
              <select
                {...register("unit", { required: "Unit is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                disabled={!selectedPropertyId}
              >
                <option value="">Select Unit</option>
                {units.map((unit) => (
                  <option key={unit._id} value={unit._id}>
                    {unit.displayID}
                  </option>
                ))}
              </select>
              {errors.unit && (
                <p className="text-red-500 text-sm">{errors.unit.message}</p>
              )}
            </div>
          </div>

          {/* Rent & Advance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Rent <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("rent", {
                  required: "Rent is required",
                  min: { value: 1, message: "Rent must be greater than 0" },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
              />
              {errors.rent && (
                <p className="text-red-500 text-sm">{errors.rent.message}</p>
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
                  min: { value: 0, message: "Advance cannot be negative" },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
              />
              {errors.advance && (
                <p className="text-red-500 text-sm">{errors.advance.message}</p>
              )}
            </div>
          </div>

          {/* Agreement Dates & Increment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agreement Start Date <span className="text-red-500">*</span>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Increment (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("annualIncrement", {
                  required: "Annual increment is required",
                  min: { value: 0, message: "Increment cannot be negative" },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
              />
              {errors.annualIncrement && (
                <p className="text-red-500 text-sm">
                  {errors.annualIncrement.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-2 md:p-6 border-t border-gray-200">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                reset();
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e] flex items-center gap-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Save className="w-4 h-4" />
              {loading ? "Submitting..." : "Add Tenant"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TenantForm;
