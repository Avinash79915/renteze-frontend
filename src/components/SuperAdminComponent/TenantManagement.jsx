import React, { useState, useCallback } from "react";
import {
  Users,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Search,
  Filter,
  User,
  Phone,
  Mail,
  Home,
  FileText,
  Download,
  Calendar,
  Bell,
  MessageSquare,
  Building,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import TenantForm from "../TenantComponents/TenantForm";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../../Pages/utils/axios";
import ViewTenantModal from "../ViewTenantModal";

const TenantManagement = () => {
  const { unitId } = useParams();
  const [tenants, setTenants] = useState([]); // ✅ add this line
  const { user, isAuthenticated, isLoading } = useAuth0();
  const email = user?.email;

  useEffect(() => {
    const fetchTenants = async () => {
      if (!email) return;

      try {
        const res = await api.get(`/tenants/owner-by-email?email=${email}`);
        const apiTenants = res.data.tenants || [];

        const mappedTenants = apiTenants.map((t) => ({
          id: t._id,
          firstName: t.name?.split(" ")[0] || t.name,
          lastName: t.name?.split(" ").slice(1).join(" ") || "",
          age: "",
          fatherHusbandName: "",
          businessNature: t.natureOfBusiness,
          primaryPhone: t.phone,
          secondaryPhone: "",
          email: t.email,
          contractType: "Lease",
          duration: `${Math.round(
            (new Date(t.agreementEndDate) - new Date(t.agreementStartDate)) /
              (1000 * 60 * 60 * 24 * 30)
          )} months`,
          amount: t.rent,
          advanceAmount: t.advance,
          property: t.unit.propertyId, // you can populate property name in backend
          unit: t.unit.roomId,
          status: t.rentStatus === "due" ? "Pending" : "Active",
          joinDate: new Date(t.agreementStartDate).toISOString().split("T")[0],
          waterType: "Individual",
          powerType: "Individual",
          gstRequired: "No",
          address: {
            doorNo: "",
            street: "",
            city: "",
            state: "",
            country: "India",
          },
        }));

        setTenants(mappedTenants);
      } catch (error) {
        console.error("Failed to fetch tenants:", error);
        setTenants([]);
      }
    };

    fetchTenants();
  }, [email]);

  const [properties] = useState([
    "Palm Residency",
    "Sky View Flats",
    "Green Villas",
    "Ocean Heights",
    "Downtown Office",
    "avinash ki property A",
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [activeTab, setActiveTab] = useState("basic");

  const [tenantForm, setTenantForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    fatherHusbandName: "",
    businessNature: "",
    primaryPhone: "",
    secondaryPhone: "",
    email: "",
    contractType: "Lease",
    duration: "",
    amount: "",
    advanceAmount: "",
    property: "",
    unit: "",
    waterType: "Individual",
    waterMeterNo: "",
    waterCharges: "",
    powerType: "Individual",
    powerMeterNo: "",
    powerCharges: "",
    fixtures: "",
    idProofType: "Aadhar",
    gstNo: "",
    gstRequired: "No",
    panNo: "",
    lateFeePerDay: "",
    paymentMode: "Bank Transfer",
    maintenanceCharges: "",
    notes: "",
    address: {
      doorNo: "",
      street: "",
      city: "",
      state: "",
      country: "India",
    },
  });

  const [vacationForm, setVacationForm] = useState({
    noticeDate: "",
    vacationDate: "",
    reason: "",
  });

  // Memoize resetForm
  const resetForm = useCallback(() => {
    setTenantForm({
      firstName: "",
      lastName: "",
      age: "",
      fatherHusbandName: "",
      businessNature: "",
      primaryPhone: "",
      secondaryPhone: "",
      email: "",
      contractType: "Lease",
      duration: "",
      amount: "",
      advanceAmount: "",
      property: "",
      unit: "",
      waterType: "Individual",
      waterMeterNo: "",
      waterCharges: "",
      powerType: "Individual",
      powerMeterNo: "",
      powerCharges: "",
      fixtures: "",
      idProofType: "Aadhar",
      gstNo: "",
      gstRequired: "No",
      panNo: "",
      lateFeePerDay: "",
      paymentMode: "Bank Transfer",
      maintenanceCharges: "",
      notes: "",
      isSplitPayment: false,
      splitStatus: "Pending",
      address: {
        doorNo: "",
        street: "",
        city: "",
        state: "",
        country: "India",
      },
    });
  }, []);

  // Memoize handleAddTenant
  const handleAddTenant = useCallback(() => {
    const newTenant = {
      id: uuidv4(),
      ...tenantForm,
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
    };
    setTenants((prev) => [...prev, newTenant]);
    resetForm();
    setShowAddForm(false);
  }, [tenantForm, resetForm]);

  // Memoize handleEditTenant
  const handleEditTenant = useCallback(() => {
    setTenants((prev) =>
      prev.map((tenant) =>
        tenant.id === selectedTenant.id ? { ...tenant, ...tenantForm } : tenant
      )
    );
    setShowEditModal(false);
    setSelectedTenant(null);
    resetForm();
  }, [tenantForm, selectedTenant, resetForm]);

  // Memoize openEditModal
  const openEditModal = useCallback((tenant) => {
    setSelectedTenant(tenant);
    setTenantForm({ ...tenant });
    setShowEditModal(true);
  }, []);

  // Memoize openViewModal
  const openViewModal = useCallback((tenant) => {
    setSelectedTenant(tenant);
    setShowViewModal(true);
  }, []);

  // Memoize handleDeleteTenant
  const handleDeleteTenant = async (tenantId) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      try {
        await api.delete(`/tenants/${tenantId}?testEmail=${email}`);
        setTenants((prev) => prev.filter((t) => t.id !== tenantId));
      } catch (error) {
        console.error("Failed to delete tenant:", error);
      }
    }
  };

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || tenant.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-0 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Tenant Management
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e] text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          Add Tenant
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tenants by name, email, or property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Add Tenant Form */}
      {showAddForm && (
        <TenantForm
          isEdit={false}
          tenantForm={tenantForm}
          setTenantForm={setTenantForm}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          resetForm={resetForm}
          properties={properties}
          handleAddTenant={handleAddTenant}
          setShowAddForm={setShowAddForm}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {/* Tenant Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse text-md md:text-md hidden md:table">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 md:p-3 border-b border-gray-200">
                Tenant Name
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">Property</th>
              <th className="p-2 md:p-3 border-b border-gray-200">Unit</th>
              <th className="p-2 md:p-3 border-b border-gray-200">Join Date</th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Contract Type
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">Status</th>
              <th className="p-2 md:p-3 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="p-2 md:p-3 text-center text-gray-500 text-xs md:text-sm"
                >
                  No tenants found.
                </td>
              </tr>
            ) : (
              filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50">
                  <td className="p-2 md:p-3 border-b border-gray-200">
                    {tenant.firstName} {tenant.lastName}
                  </td>
                  <td className="p-2 md:p-3 border-b border-gray-200">
                    {tenant.property?.name || "Unknown Property"}
                  </td>

                  <td className="p-2 md:p-3 border-b border-gray-200">
                    {tenant.unit}
                  </td>
                  <td className="p-2 md:p-3 border-b border-gray-200">
                    {tenant.joinDate}
                  </td>
                  <td className="p-2 md:p-3 border-b border-gray-200">
                    {tenant.contractType}
                  </td>
                  <td className="p-2 md:p-3 border-b border-gray-200">
                    <span
                      className={`px-2 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium ${getStatusColor(
                        tenant.status
                      )}`}
                    >
                      {tenant.status}
                    </span>
                  </td>
                  <td className="p-2 md:p-3 border-b border-gray-200">
                    <div className="flex gap-1 md:gap-2">
                      <button
                        onClick={() => openViewModal(tenant)}
                        className="p-1 md:p-2 text-black hover:bg-gray-100 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(tenant)}
                        className="p-1 md:p-2 text-black hover:bg-blue-50 rounded-lg"
                        title="Edit Tenant"
                      >
                        <Edit3 className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTenant(tenant.id)}
                        className="p-1 md:p-2 text-black hover:bg-red-50 rounded-lg"
                        title="Delete Tenant"
                      >
                        <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      {/* <button
                        onClick={() => generateContract(tenant)}
                        className="p-1 md:p-2 text-black hover:bg-green-50 rounded-lg"
                        title="Generate Contract"
                      >
                        <FileText className="w-3 h-3 md:w-4 md:h-4" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Mobile Card Layout */}
        <div className="md:hidden divide-y divide-gray-200">
          {filteredTenants.length === 0 ? (
            <div className="p-2 text-center text-gray-500 text-md">
              No tenants found.
            </div>
          ) : (
            filteredTenants.map((tenant) => (
              <div
                key={tenant.id}
                className="p-3 bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col gap-2 text-md">
                  <div>
                    <span className="font-medium text-gray-900">
                      Tenant Name:
                    </span>{" "}
                    {tenant.firstName} {tenant.lastName}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Property:</span>{" "}
                    {tenant.property?.name || "Unknown Property"}
                  </div>

                  <div>
                    <span className="font-medium text-gray-900">Unit:</span>{" "}
                    {tenant.unit}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">
                      Join Date:
                    </span>{" "}
                    {tenant.joinDate}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">
                      Contract Type:
                    </span>{" "}
                    {tenant.contractType}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Status:</span>{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        tenant.status
                      )}`}
                    >
                      {tenant.status}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openViewModal(tenant)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded-lg"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openEditModal(tenant)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Edit Tenant"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTenant(tenant.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete Tenant"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    {/* <button
                      onClick={() => generateContract(tenant)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded-lg"
                      title="Generate Contract"
                    >
                      <FileText className="w-5 h-5" />
                    </button> */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Tenant Modal */}
      {showEditModal && (
        <TenantForm
          isEdit={true}
          tenantForm={tenantForm}
          setTenantForm={setTenantForm}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          resetForm={resetForm}
          properties={properties}
          handleEditTenant={handleEditTenant}
          setShowEditModal={setShowEditModal}
              onClose={() => setShowEditModal(false)}

        />
      )}

      {/* Other Modals */}
      {/* View Tenant Modal */}
      {showViewModal && selectedTenant && (
        <ViewTenantModal
          tenant={selectedTenant}
          onClose={() => {
            setShowViewModal(false);
            setSelectedTenant(null);
          }}
        />
      )}
    </div>
  );
};

export default TenantManagement;
