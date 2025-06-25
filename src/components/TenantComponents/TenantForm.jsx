import React from "react";
import { useForm } from "react-hook-form";
import {
  X,
  User,
  Phone,
  Home,
  Zap,
  FileText,
  DollarSign,
  Save,
  Droplets,
  Upload,
} from "lucide-react";

const TenantForm = React.memo(
  ({
    isEdit = false,
    tenantForm,
    setTenantForm,
    activeTab,
    setActiveTab,
    resetForm,
    properties,
    handleAddTenant,
    handleEditTenant,
    setShowAddForm,
    setShowEditModal,
  }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: tenantForm,
    });

    const onSubmit = (data) => {
      setTenantForm(data);
      if (isEdit) {
        handleEditTenant();
      } else {
        handleAddTenant();
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-1 md:p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-[#1652A1]">
                {isEdit ? "Edit Tenant" : "Add New Tenant"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  isEdit ? setShowEditModal(false) : setShowAddForm(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-1 gap-2 sm:gap-0 mt-4 bg-gray-100 p-2 sm:p-1 rounded-lg overflow-x-auto">
              {[
                { id: "basic", label: "Basic Info", icon: User },
                { id: "contact", label: "Contact", icon: Phone },
                { id: "property", label: "Property", icon: Home },
                { id: "utilities", label: "Utilities", icon: Zap },
                { id: "documents", label: "Documents", icon: FileText },
                { id: "financial", label: "Financial", icon: DollarSign },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
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

          <div className="p-1 md:p-6">
            {/* Basic Info Tab */}
            {activeTab === "basic" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      {...register("age")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Father/Husband's Name
                    </label>
                    <input
                      {...register("fatherHusbandName")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nature of Business
                    </label>
                    <input
                      {...register("businessNature")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">
                    Permanent Address
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Door No
                      </label>
                      <input
                        {...register("address.doorNo")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street
                      </label>
                      <input
                        {...register("address.street")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        {...register("address.city")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        {...register("address.state")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        {...register("address.country")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Phone *
                    </label>
                    <input
                      type="tel"
                      value={tenantForm.primaryPhone}
                      onChange={(e) =>
                        setTenantForm({
                          ...tenantForm,
                          primaryPhone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Secondary Phone
                    </label>
                    <input
                      type="tel"
                      value={tenantForm.secondaryPhone}
                      onChange={(e) =>
                        setTenantForm({
                          ...tenantForm,
                          secondaryPhone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={tenantForm.email}
                      onChange={(e) =>
                        setTenantForm({ ...tenantForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Property Tab */}
            {activeTab === "property" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property *
                    </label>
                    <select
                      value={tenantForm.property}
                      onChange={(e) =>
                        setTenantForm({
                          ...tenantForm,
                          property: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      required
                    >
                      <option value="">Select Property</option>
                      {properties.map((property) => (
                        <option key={property} value={property}>
                          {property}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      value={tenantForm.unit}
                      onChange={(e) =>
                        setTenantForm({ ...tenantForm, unit: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      placeholder="e.g., A-101"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contract Type
                    </label>
                    <select
                      value={tenantForm.contractType}
                      onChange={(e) =>
                        setTenantForm({
                          ...tenantForm,
                          contractType: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    >
                      <option value="Lease">Lease</option>
                      <option value="Rent">Rent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={tenantForm.duration}
                      onChange={(e) =>
                        setTenantForm({
                          ...tenantForm,
                          duration: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      placeholder="e.g., 11 months"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={tenantForm.amount}
                      onChange={(e) =>
                        setTenantForm({ ...tenantForm, amount: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Advance Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={tenantForm.advanceAmount}
                      onChange={(e) =>
                        setTenantForm({
                          ...tenantForm,
                          advanceAmount: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fixtures and Amenities
                    </label>
                    <textarea
                      value={tenantForm.fixtures}
                      onChange={(e) =>
                        setTenantForm({
                          ...tenantForm,
                          fixtures: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      rows="3"
                      placeholder="List of fixtures and amenities included"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Utilities Tab */}
            {activeTab === "utilities" && (
              <div className="space-y-6">
                {/* Water Section */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    Water
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Water Type
                      </label>
                      <select
                        value={tenantForm.waterType}
                        onChange={(e) =>
                          setTenantForm({
                            ...tenantForm,
                            waterType: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      >
                        <option value="Individual">Individual</option>
                        <option value="Common">Common</option>
                      </select>
                    </div>
                    {tenantForm.waterType === "Individual" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Water Meter Number
                        </label>
                        <input
                          type="text"
                          value={tenantForm.waterMeterNo}
                          onChange={(e) =>
                            setTenantForm({
                              ...tenantForm,
                              waterMeterNo: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                        />
                      </div>
                    )}
                    {tenantForm.waterType === "Common" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Water Charges (₹)
                        </label>
                        <input
                          type="number"
                          value={tenantForm.waterCharges}
                          onChange={(e) =>
                            setTenantForm({
                              ...tenantForm,
                              waterCharges: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Power Section */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Power
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Power Type
                      </label>
                      <select
                        value={tenantForm.powerType}
                        onChange={(e) =>
                          setTenantForm({
                            ...tenantForm,
                            powerType: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      >
                        <option value="Individual">Individual Meter</option>
                        <option value="Common">Common (Fixed)</option>
                      </select>
                    </div>
                    {tenantForm.powerType === "Individual" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Electric Meter Number
                        </label>
                        <input
                          type="text"
                          value={tenantForm.powerMeterNo}
                          onChange={(e) =>
                            setTenantForm({
                              ...tenantForm,
                              powerMeterNo: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                        />
                      </div>
                    )}
                    {tenantForm.powerType === "Common" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fixed Charges (₹)
                        </label>
                        <input
                          type="number"
                          value={tenantForm.powerCharges}
                          onChange={(e) =>
                            setTenantForm({
                              ...tenantForm,
                              powerCharges: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                        />
                      </div>
                    )}
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
                      Identification Proof
                    </label>
                    <select
                      value={tenantForm.idProofType}
                      onChange={(e) =>
                        setTenantForm({
                          ...tenantForm,
                          idProofType: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    >
                      <option value="Aadhar">Aadhar Card</option>
                      <option value="License">Driving License</option>
                      <option value="Voters">Voter ID</option>
                      <option value="Passport">Passport</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload ID Proof
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        id="idProofUpload"
                        onChange={(e) =>
                          console.log("ID Proof uploaded:", e.target.files[0])
                        }
                      />
                      <label
                        htmlFor="idProofUpload"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <Upload className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          Upload File
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST Number
                    </label>
                    <input
                      type="text"
                      value={tenantForm.gstNo}
                      onChange={(e) =>
                        setTenantForm({ ...tenantForm, gstNo: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      placeholder="Enter GST Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST Bill Required
                    </label>
                    <select
                      value={tenantForm.gstRequired}
                      onChange={(e) =>
                        setTenantForm({
                          ...tenantForm,
                          gstRequired: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      value={tenantForm.panNo}
                      onChange={(e) =>
                        setTenantForm({ ...tenantForm, panNo: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                      placeholder="Enter PAN Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload PAN Copy
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        id="panUpload"
                        onChange={(e) =>
                          console.log("PAN uploaded:", e.target.files[0])
                        }
                      />
                      <label
                        htmlFor="panUpload"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <Upload className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          Upload File
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Financial Tab */}
{activeTab === "financial" && (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Late Fee Per Day (₹)
        </label>
        <input
          type="number"
          value={tenantForm.lateFeePerDay}
          onChange={(e) =>
            setTenantForm({
              ...tenantForm,
              lateFeePerDay: e.target.value,
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Mode
        </label>
        <select
          value={tenantForm.paymentMode}
          onChange={(e) =>
            setTenantForm({
              ...tenantForm,
              paymentMode: e.target.value,
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
        >
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Cheque">Cheque</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Maintenance Charges (₹)
        </label>
        <input
          type="number"
          value={tenantForm.maintenanceCharges}
          onChange={(e) =>
            setTenantForm({
              ...tenantForm,
              maintenanceCharges: e.target.value,
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Notes
      </label>
      <textarea
        value={tenantForm.notes}
        onChange={(e) =>
          setTenantForm({ ...tenantForm, notes: e.target.value })
        }
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
        rows="3"
        placeholder="Additional notes about the tenant"
      />
    </div>

    {/* 🔄 Split Payment Section */}
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={tenantForm.isSplitPayment}
          onChange={(e) =>
            setTenantForm({
              ...tenantForm,
              isSplitPayment: e.target.checked,
            })
          }
          className="h-4 w-4 text-[#1652A1] border-gray-300 rounded"
        />
        <label className="text-sm text-gray-700">
          Enable Split Payment
        </label>
      </div>

      {tenantForm.isSplitPayment && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Split Payment Status
          </label>
          <select
            value={tenantForm.splitStatus}
            onChange={(e) =>
              setTenantForm({
                ...tenantForm,
                splitStatus: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
          >
            <option value="Pending">Pending</option>
            <option value="Partially Paid">Partially Paid</option>
            <option value="Fully Paid">Fully Paid</option>
          </select>
        </div>
      )}
    </div>
  </div>
)}


          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  isEdit ? setShowEditModal(false) : setShowAddForm(false);
                  resetForm();
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
                {isEdit ? "Save Changes" : "Add Tenant"}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
);

export default TenantForm;
