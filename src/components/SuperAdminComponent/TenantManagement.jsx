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
  const [showVacationModal, setShowVacationModal] = useState(false);
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

  // Memoize openVacationModal
  const openVacationModal = useCallback((tenant) => {
    setSelectedTenant(tenant);
    setShowVacationModal(true);
  }, []);

  // Memoize handleDeleteTenant
  const handleDeleteTenant = useCallback((tenantId) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      setTenants((prev) => prev.filter((tenant) => tenant.id !== tenantId));
    }
  }, []);

  // Memoize handleVacationNotice
  const handleVacationNotice = useCallback(() => {
    console.log("Vacation notice submitted:", vacationForm);
    setShowVacationModal(false);
    setVacationForm({ noticeDate: "", vacationDate: "", reason: "" });
  }, [vacationForm]);

  // Memoize generateContract
  const generateContract = useCallback((tenant) => {
    console.log("Generating contract for:", tenant);
    alert("Contract draft generated successfully!");
  }, []);

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

  const ViewTenantModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#1652A1]">
              Tenant Details - {selectedTenant?.firstName}{" "}
              {selectedTenant?.lastName}
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
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-gray-900">
                  {selectedTenant?.firstName} {selectedTenant?.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="text-gray-900">{selectedTenant?.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Father/Husband's Name</p>
                <p className="text-gray-900">
                  {selectedTenant?.fatherHusbandName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nature of Business</p>
                <p className="text-gray-900">
                  {selectedTenant?.businessNature}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Primary Phone</p>
                <p className="text-gray-900">{selectedTenant?.primaryPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Secondary Phone</p>
                <p className="text-gray-900">
                  {selectedTenant?.secondaryPhone}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-900">{selectedTenant?.email}</p>
              </div>
            </div>
          </div>

          {/* Property Info */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Property Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Property</p>
                <p className="text-gray-900">{selectedTenant?.property}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Unit</p>
                <p className="text-gray-900">{selectedTenant?.unit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contract Type</p>
                <p className="text-gray-900">{selectedTenant?.contractType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-gray-900">{selectedTenant?.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Amount</p>
                <p className="text-gray-900">₹{selectedTenant?.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Advance Amount</p>
                <p className="text-gray-900">
                  ₹{selectedTenant?.advanceAmount}
                </p>
              </div>
            </div>
          </div>

          {/* Address Info */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Permanent Address
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Door No</p>
                <p className="text-gray-900">
                  {selectedTenant?.address.doorNo}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Street</p>
                <p className="text-gray-900">
                  {selectedTenant?.address.street}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p className="text-gray-900">{selectedTenant?.address.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">State</p>
                <p className="text-gray-900">{selectedTenant?.address.state}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Country</p>
                <p className="text-gray-900">
                  {selectedTenant?.address.country}
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

  const VacationNoticeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#1652A1]">
              Vacation Notice - {selectedTenant?.firstName}{" "}
              {selectedTenant?.lastName}
            </h3>
            <button
              onClick={() => setShowVacationModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notice Date *
            </label>
            <input
              type="date"
              value={vacationForm.noticeDate}
              onChange={(e) =>
                setVacationForm((prev) => ({
                  ...prev,
                  noticeDate: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vacation Date *
            </label>
            <input
              type="date"
              value={vacationForm.vacationDate}
              onChange={(e) =>
                setVacationForm((prev) => ({
                  ...prev,
                  vacationDate: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <textarea
              value={vacationForm.reason}
              onChange={(e) =>
                setVacationForm((prev) => ({
                  ...prev,
                  reason: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
              rows="3"
              placeholder="Reason for vacation"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowVacationModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleVacationNotice}
              className="px-4 py-2 bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e] flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Submit Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
                    {tenant.property}
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
                      <button
                        onClick={() => generateContract(tenant)}
                        className="p-1 md:p-2 text-black hover:bg-green-50 rounded-lg"
                        title="Generate Contract"
                      >
                        <FileText className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <button
                        onClick={() => openVacationModal(tenant)}
                        className="p-1 md:p-2 text-black hover:bg-yellow-50 rounded-lg"
                        title="Vacation Notice"
                      >
                        <Bell className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
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
                    {tenant.property}
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
                    <button
                      onClick={() => generateContract(tenant)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded-lg"
                      title="Generate Contract"
                    >
                      <FileText className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openVacationModal(tenant)}
                      className="p-1 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                      title="Vacation Notice"
                    >
                      <Bell className="w-5 h-5" />
                    </button>
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
        />
      )}

      {/* Other Modals */}
      {showViewModal && <ViewTenantModal />}
      {showVacationModal && <VacationNoticeModal />}
    </div>
  );
};

export default TenantManagement;
