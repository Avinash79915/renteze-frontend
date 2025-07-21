import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { Save, X } from "lucide-react";
import api from "../../Pages/utils/axios";

const TenantForm = ({
  isEdit = false,
  tenantForm,
  handleAddTenant,
  handleEditTenant,
  onClose,
}) => {
  const [properties, setProperties] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth0();
  const email = user?.email;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
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
      paymentAmount: "",
      invoiceMonth: "",
      invoiceType: "",
    },
  });

  const selectedPropertyId = watch("property");

  // Pre-fill form when editing
  useEffect(() => {
    if (isEdit && tenantForm) {
      setValue("name", `${tenantForm.firstName} ${tenantForm.lastName}`.trim());
      setValue("email", tenantForm.email);
      setValue("phone", tenantForm.primaryPhone);
      setValue("nameOfBusiness", tenantForm.businessNature);
      setValue("natureOfBusiness", tenantForm.businessNature);
      setValue("rent", tenantForm.amount);
      setValue("advance", tenantForm.advanceAmount);
      setValue("property", tenantForm.propertyId);
      setValue("unit", tenantForm.unit);
      setValue("agreementStartDate", tenantForm.joinDate);
      setValue(
        "agreementEndDate",
        tenantForm.agreementEndDate ||
          new Date(
            new Date(tenantForm.joinDate).setMonth(
              new Date(tenantForm.joinDate).getMonth() +
                parseInt(tenantForm.duration || 0)
            )
          )
            .toISOString()
            .split("T")[0]
      );
      setValue("annualIncrement", tenantForm.annualIncrement || 0);
    }
  }, [isEdit, tenantForm, setValue]);

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

  // Fetch units based on selected property
  useEffect(() => {
    const fetchUnits = async () => {
      if (!selectedPropertyId) {
        setUnits([]);
        return;
      }
      try {
        const res = await api.get(
          `/property/${selectedPropertyId}/units?testEmail=${email}`
        );
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
      const paymentHistory = data.paymentAmount
        ? [
            {
              amount: Number(data.paymentAmount),
              invoiceMonth: data.invoiceMonth.match(/^[A-Za-z]+ \d{4}$/)
                ? data.invoiceMonth
                : new Date().toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  }),
              invoiceType: data.invoiceType || "Rent",
              status: "Unpaid",
              paidOn: null,
              paymentMethod: "-",
            },
          ]
        : [];

      // Find the selected property name
      const selectedProperty = properties.find((p) => p._id === data.property);
      const propertyName = selectedProperty ? selectedProperty.name : "Unknown Property";

      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        nameOfBusiness: data.nameOfBusiness,
        natureOfBusiness: data.natureOfBusiness,
        rent: Number(data.rent),
        advance: Number(data.advance),
        agreementStartDate: data.agreementStartDate,
        agreementEndDate: data.agreementEndDate,
        annualIncrement: Number(data.annualIncrement),
        paymentHistory,
        property: data.property,
        propertyName, // Include property name for TenantManagement
        unit: data.unit,
      };

      if (isEdit) {
        await handleEditTenant(payload);
      } else {
        await handleAddTenant(payload);
      }

      alert(isEdit ? "✅ Tenant updated successfully!" : "✅ Tenant added successfully!");
      onClose();
      reset();
    } catch (error) {
      console.error("❌ Error:", error);
      const errorMessage =
        error?.response?.data?.message || error.message || `Failed to ${isEdit ? "update" : "add"} tenant`;
      alert(`❌ Error: ${errorMessage}`);
      console.log("🔍 Full error response:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg border border-gray-200 shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-3 md:p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#1652A1]">
              {isEdit ? "Edit Tenant" : "Add New Tenant"}
            </h3>
            <button
              onClick={() => {
                onClose();
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
                      !value.toLowerCase().startsWith("n/a") ||
                      "Name of Business cannot start with 'N/A'",
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
                      !value.toLowerCase().startsWith("n/a") ||
                      "Nature of Business cannot start with 'N/A'",
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("property", {
                    required: "Property is required",
                  })}
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
                    valueAsNumber: true,
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
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                />
                {errors.advance && (
                  <p className="text-red-500 text-sm">
                    {errors.advance.message}
                  </p>
                )}
              </div>
            </div>

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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
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
                    valueAsNumber: true,
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

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Payment Details (Optional)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Amount
                  </label>
                  <input
                    type="number"
                    {...register("paymentAmount", {
                      min: {
                        value: 0,
                        message: "Payment amount cannot be negative",
                      },
                      valueAsNumber: true,
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    placeholder="e.g., 10000"
                  />
                  {errors.paymentAmount && (
                    <p className="text-red-500 text-sm">
                      {errors.paymentAmount.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Month
                  </label>
                  <input
                    type="text"
                    {...register("invoiceMonth", {
                      pattern: {
                        value: /^[A-Za-z]+ \d{4}$/,
                        message:
                          "Invoice Month must be in format 'Month YYYY' (e.g., 'July 2025')",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    placeholder="e.g., July 2025"
                  />
                  {errors.invoiceMonth && (
                    <p className="text-red-500 text-sm">
                      {errors.invoiceMonth.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Type
                  </label>
                  <select
                    {...register("invoiceType")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    <option value="Rent">Rent</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 md:p-6 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
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
                {loading ? "Submitting..." : isEdit ? "Update Tenant" : "Add Tenant"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantForm;