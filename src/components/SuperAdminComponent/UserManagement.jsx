import React, { useState, useEffect } from "react";
import {
  User,
  Plus,
  Edit3,
  Trash2,
  Building,
  Mail,
  UserCheck,
  UserX,
  Search,
  Filter,
} from "lucide-react";

const UserManagement = () => {
  const [admins, setAdmins] = useState([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Property Admin",
      status: "Active",
      assignedProperties: ["Downtown Office", "Warehouse A"],
      joinDate: "2024-01-15",
      lastLogin: "2024-06-14",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      role: "Property Admin",
      status: "Active",
      assignedProperties: ["Mall Complex", "Retail Store B"],
      joinDate: "2024-02-20",
      lastLogin: "2024-06-15",
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike.davis@company.com",
      role: "Property Admin",
      status: "Inactive",
      assignedProperties: ["Industrial Park"],
      joinDate: "2023-12-01",
      lastLogin: "2024-06-10",
    },
  ]);

  const [properties] = useState([
    "Downtown Office",
    "Warehouse A",
    "Mall Complex",
    "Retail Store B",
    "Industrial Park",
    "Corporate HQ",
    "Distribution Center",
    "Shopping Plaza",
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    selectedProperties: [],
  });

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    status: "Active",
    selectedProperties: [],
  });

  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || admin.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleInviteAdmin = () => {
    if (!inviteForm.name || !inviteForm.email) return;

    const newAdmin = {
      id: Date.now().toString(),
      name: inviteForm.name,
      email: inviteForm.email,
      role: "Property Admin",
      status: "Active",
      assignedProperties: inviteForm.selectedProperties,
      joinDate: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
    };

    setAdmins([...admins, newAdmin]);
    setInviteForm({ name: "", email: "", selectedProperties: [] });
    setShowInviteModal(false);
  };

  const handleEditAdmin = () => {
    if (!selectedAdmin) return;

    setAdmins(
      admins.map((admin) =>
        admin.id === selectedAdmin.id
          ? {
              ...admin,
              name: editForm.name,
              email: editForm.email,
              status: editForm.status,
              assignedProperties: editForm.selectedProperties,
            }
          : admin
      )
    );
    setShowEditModal(false);
    setSelectedAdmin(null);
  };

  const handleRemoveAdmin = (adminId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this admin? Their properties will need to be reassigned."
      )
    ) {
      setAdmins(admins.filter((admin) => admin.id !== adminId));
    }
  };

  const openEditModal = (admin) => {
    setSelectedAdmin(admin);
    setEditForm({
      name: admin.name,
      email: admin.email,
      status: admin.status,
      selectedProperties: admin.assignedProperties,
    });
    setShowEditModal(true);
  };

  const openAssignModal = (admin) => {
    setSelectedAdmin(admin);
    setEditForm({
      ...editForm,
      selectedProperties: admin.assignedProperties,
    });
    setShowAssignModal(true);
  };

  const handlePropertyAssignment = () => {
    if (!selectedAdmin) return;

    setAdmins(
      admins.map((admin) =>
        admin.id === selectedAdmin.id
          ? { ...admin, assignedProperties: editForm.selectedProperties }
          : admin
      )
    );
    setShowAssignModal(false);
    setSelectedAdmin(null);
  };

  const togglePropertySelection = (property, formType = "invite") => {
    const currentForm = formType === "invite" ? inviteForm : editForm;
    const setForm = formType === "invite" ? setInviteForm : setEditForm;

    const isSelected = currentForm.selectedProperties.includes(property);
    const updatedProperties = isSelected
      ? currentForm.selectedProperties.filter((p) => p !== property)
      : [...currentForm.selectedProperties, property];

    setForm({ ...currentForm, selectedProperties: updatedProperties });
  };

  return (
    <div className="p-1 md:p-6 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1652A1] mb-2">
          User Management
        </h1>
        <p className="text-gray-600">
          Manage property administrators and their assigned properties
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-[#1652A1] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Invite Admin
        </button>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Admins</p>
              <p className="text-2xl font-bold text-black">
                {admins.length}
              </p>
            </div>
            <User className="w-8 h-8 text-[#1652A1]" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Admins</p>
              <p className="text-2xl font-bold text-black">
                {admins.filter((a) => a.status === "Active").length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-[#1652A1]" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive Admins</p>
              <p className="text-2xl font-bold text-black">
                {admins.filter((a) => a.status === "Inactive").length}
              </p>
            </div>
            <UserX className="w-8 h-8 text-[#1652A1]" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Properties</p>
              <p className="text-2xl font-bold text-black">
                {properties.length}
              </p>
            </div>
            <Building className="w-8 h-8 text-[#1652A1]" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            Admin List
          </h2>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-sm md:text-base hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-2 py-2 md:px-6 md:py-3 font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="text-left px-2 py-2 md:px-6 md:py-3 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-2 py-2 md:px-6 md:py-3 font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Properties
                </th>
                <th className="text-left px-2 py-2 md:px-6 md:py-3 font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="text-left px-2 py-2 md:px-6 md:py-3 font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="text-left px-2 py-2 md:px-6 md:py-3 font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                      </div>
                      <div className="ml-2 md:ml-4">
                        <div className="text-sm md:text-base font-medium text-gray-900">
                          {admin.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {admin.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-1 py-0.5 md:px-2 md:py-1 text-xs md:text-xs font-semibold rounded-full ${
                        admin.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-4">
                    <div className="flex flex-wrap gap-1">
                      {admin.assignedProperties
                        .slice(0, 2)
                        .map((property, index) => (
                          <span
                            key={index}
                            className="inline-flex px-1 py-0.5 md:px-2 md:py-1 text-xs bg-blue-100 text-blue-800 rounded"
                          >
                            {property}
                          </span>
                        ))}
                      {admin.assignedProperties.length > 2 && (
                        <span className="inline-flex px-1 py-0.5 md:px-2 md:py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          +{admin.assignedProperties.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-900">
                    {admin.joinDate}
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-900">
                    {admin.lastLogin}
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base font-medium">
                    <div className="flex gap-1 md:gap-2">
                      <button
                        onClick={() => openEditModal(admin)}
                        className="text-[#1652A1] hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="Edit Admin"
                      >
                        <Edit3 className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <button
                        onClick={() => openAssignModal(admin)}
                        className="text-[#1652A1] hover:text-green-900 p-1 rounded hover:bg-green-50"
                        title="Assign Properties"
                      >
                        <Building className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveAdmin(admin.id)}
                        className="text-[#1652A1] hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Remove Admin"
                      >
                        <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card Layout */}
          <div className="md:hidden divide-y divide-gray-200">
            {filteredAdmins.map((admin) => (
              <div key={admin.id} className="p-3 bg-white">
                <div className="flex flex-col gap-2 text-md">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="ml-2">
                      <div className="text-sm font-medium text-gray-900">
                        {admin.name}
                      </div>
                      <div className="text-sm text-gray-500">{admin.email}</div>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>{" "}
                    <span
                      className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${
                        admin.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Assigned Properties:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {admin.assignedProperties
                        .slice(0, 2)
                        .map((property, index) => (
                          <span
                            key={index}
                            className="inline-flex px-1 py-0.5 text-xs bg-blue-100 text-blue-800 rounded"
                          >
                            {property}
                          </span>
                        ))}
                      {admin.assignedProperties.length > 2 && (
                        <span className="inline-flex px-1 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                          +{admin.assignedProperties.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Join Date:
                    </span>{" "}
                    {admin.joinDate}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Last Login:
                    </span>{" "}
                    {admin.lastLogin}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Actions:</span>
                    <div className="flex gap-1 mt-1">
                      <button
                        onClick={() => openEditModal(admin)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="Edit Admin"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => openAssignModal(admin)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        title="Assign Properties"
                      >
                        <Building className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleRemoveAdmin(admin.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Remove Admin"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {filteredAdmins.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <User className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-2 md:mb-4" />
            <p className="text-gray-500 text-md md:text-base">
              No admins found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Invite New Admin</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={inviteForm.name}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter admin name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign Properties
                </label>
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {properties.map((property) => (
                    <label
                      key={property}
                      className="flex items-center mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={inviteForm.selectedProperties.includes(
                          property
                        )}
                        onChange={() =>
                          togglePropertySelection(property, "invite")
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {property}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleInviteAdmin}
                className="flex-1 bg-[#1652A1] hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Send Invite
              </button>
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {showEditModal && selectedAdmin && (
<div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Admin</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned Properties
                </label>
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {properties.map((property) => (
                    <label
                      key={property}
                      className="flex items-center mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={editForm.selectedProperties.includes(property)}
                        onChange={() =>
                          togglePropertySelection(property, "edit")
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {property}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleEditAdmin}
                className="flex-1 bg-[#1652A1] hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Properties Modal */}
      {showAssignModal && selectedAdmin && (
<div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              Assign Properties to {selectedAdmin.name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Properties
                </label>
                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {properties.map((property) => (
                    <label
                      key={property}
                      className="flex items-center mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={editForm.selectedProperties.includes(property)}
                        onChange={() =>
                          togglePropertySelection(property, "edit")
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {property}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {editForm.selectedProperties.length} properties
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handlePropertyAssignment}
                className="flex-1 bg-[#1652A1]  text-white px-4 py-2 rounded-lg transition-colors"
              >
                Update Assignment
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
