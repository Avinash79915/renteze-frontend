import React, { useState } from 'react';
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
  Upload,
  Calendar,
  DollarSign,
  Bell,
  MessageSquare,
  Building,
  Zap,
  Droplets,
  X,
  Save,
  AlertCircle,
} from 'lucide-react';

const TenantManagement = () => {
  const [tenants, setTenants] = useState([
    {
      id: '1',
      firstName: 'Ravi',
      lastName: 'Kumar',
      age: 32,
      fatherHusbandName: 'Suresh Kumar',
      businessNature: 'Software Engineer',
      primaryPhone: '+91 98765 43210',
      secondaryPhone: '+91 87654 32109',
      email: 'ravi.kumar@email.com',
      contractType: 'Lease',
      duration: '11 months',
      amount: 12000,
      advanceAmount: 24000,
      property: 'Palm Residency',
      unit: 'A-101',
      status: 'Active',
      joinDate: '2024-01-15',
      waterType: 'Individual',
      powerType: 'Individual',
      gstRequired: 'No',
      address: {
        doorNo: '123',
        street: 'MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
      },
    },
    {
      id: '2',
      firstName: 'Anjali',
      lastName: 'Sharma',
      age: 28,
      fatherHusbandName: 'Rajesh Sharma',
      businessNature: 'Marketing Manager',
      primaryPhone: '+91 98765 43211',
      secondaryPhone: '+91 87654 32108',
      email: 'anjali.sharma@email.com',
      contractType: 'Rent',
      duration: '12 months',
      amount: 15000,
      advanceAmount: 30000,
      property: 'Sky View Flats',
      unit: 'B-205',
      status: 'Active',
      joinDate: '2024-02-20',
      waterType: 'Common',
      powerType: 'Individual',
      gstRequired: 'Yes',
      address: {
        doorNo: '456',
        street: 'Brigade Road',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
      },
    },
  ]);

  const [properties] = useState([
    'Palm Residency',
    'Sky View Flats',
    'Green Villas',
    'Ocean Heights',
    'Downtown Office',
    'Warehouse A',
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVacationModal, setShowVacationModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('basic');

  const [tenantForm, setTenantForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    fatherHusbandName: '',
    businessNature: '',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    contractType: 'Lease',
    duration: '',
    amount: '',
    advanceAmount: '',
    property: '',
    unit: '',
    waterType: 'Individual',
    waterMeterNo: '',
    waterCharges: '',
    powerType: 'Individual',
    powerMeterNo: '',
    powerCharges: '',
    fixtures: '',
    idProofType: 'Aadhar',
    gstNo: '',
    gstRequired: 'No',
    panNo: '',
    lateFeePerDay: '',
    paymentMode: 'Bank Transfer',
    maintenanceCharges: '',
    notes: '',
    address: {
      doorNo: '',
      street: '',
      city: '',
      state: '',
      country: 'India',
    },
  });

  const [vacationForm, setVacationForm] = useState({
    noticeDate: '',
    vacationDate: '',
    reason: '',
  });

  const resetForm = () => {
    setTenantForm({
      firstName: '',
      lastName: '',
      age: '',
      fatherHusbandName: '',
      businessNature: '',
      primaryPhone: '',
      secondaryPhone: '',
      email: '',
      contractType: 'Lease',
      duration: '',
      amount: '',
      advanceAmount: '',
      property: '',
      unit: '',
      waterType: 'Individual',
      waterMeterNo: '',
      waterCharges: '',
      powerType: 'Individual',
      powerMeterNo: '',
      powerCharges: '',
      fixtures: '',
      idProofType: 'Aadhar',
      gstNo: '',
      gstRequired: 'No',
      panNo: '',
      lateFeePerDay: '',
      paymentMode: 'Bank Transfer',
      maintenanceCharges: '',
      notes: '',
      address: {
        doorNo: '',
        street: '',
        city: '',
        state: '',
        country: 'India',
      },
    });
  };

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || tenant.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddTenant = () => {
    const newTenant = {
      id: Date.now().toString(),
      ...tenantForm,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
    };
    setTenants([...tenants, newTenant]);
    resetForm();
    setShowAddForm(false);
  };

  const handleEditTenant = () => {
    setTenants(
      tenants.map((tenant) =>
        tenant.id === selectedTenant.id ? { ...tenant, ...tenantForm } : tenant
      )
    );
    setShowEditModal(false);
    setSelectedTenant(null);
    resetForm();
  };

  const handleDeleteTenant = (tenantId) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      setTenants(tenants.filter((tenant) => tenant.id !== tenantId));
    }
  };

  const openEditModal = (tenant) => {
    setSelectedTenant(tenant);
    setTenantForm({ ...tenant });
    setShowEditModal(true);
  };

  const openViewModal = (tenant) => {
    setSelectedTenant(tenant);
    setShowViewModal(true);
  };

  const openVacationModal = (tenant) => {
    setSelectedTenant(tenant);
    setShowVacationModal(true);
  };

  const handleVacationNotice = () => {
    console.log('Vacation notice submitted:', vacationForm);
    setShowVacationModal(false);
    setVacationForm({ noticeDate: '', vacationDate: '', reason: '' });
  };

  const generateContract = (tenant) => {
    console.log('Generating contract for:', tenant);
    alert('Contract draft generated successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const TenantForm = ({ isEdit = false }) => (
    <div className="bg-white rounded-lg border border-gray-200 mb-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-[#1652A1]">
            {isEdit ? 'Edit Tenant' : 'Add New Tenant'}
          </h3>
          <button
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
        <div className="flex space-x-1 mt-4 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'basic', label: 'Basic Info', icon: User },
            { id: 'contact', label: 'Contact', icon: Phone },
            { id: 'property', label: 'Property', icon: Home },
            { id: 'utilities', label: 'Utilities', icon: Zap },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'financial', label: 'Financial', icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-[#1652A1] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
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
        {activeTab === 'basic' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={tenantForm.firstName}
                  onChange={(e) =>
                    setTenantForm({ ...tenantForm, firstName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={tenantForm.lastName}
                  onChange={(e) =>
                    setTenantForm({ ...tenantForm, lastName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={tenantForm.age}
                  onChange={(e) => setTenantForm({ ...tenantForm, age: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father/Husband's Name
                </label>
                <input
                  type="text"
                  value={tenantForm.fatherHusbandName}
                  onChange={(e) =>
                    setTenantForm({ ...tenantForm, fatherHusbandName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nature of Business
                </label>
                <input
                  type="text"
                  value={tenantForm.businessNature}
                  onChange={(e) =>
                    setTenantForm({ ...tenantForm, businessNature: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Permanent Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Door No
                  </label>
                  <input
                    type="text"
                    value={tenantForm.address.doorNo}
                    onChange={(e) =>
                      setTenantForm({
                        ...tenantForm,
                        address: { ...tenantForm.address, doorNo: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street
                  </label>
                  <input
                    type="text"
                    value={tenantForm.address.street}
                    onChange={(e) =>
                      setTenantForm({
                        ...tenantForm,
                        address: { ...tenantForm.address, street: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={tenantForm.address.city}
                    onChange={(e) =>
                      setTenantForm({
                        ...tenantForm,
                        address: { ...tenantForm.address, city: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={tenantForm.address.state}
                    onChange={(e) =>
                      setTenantForm({
                        ...tenantForm,
                        address: { ...tenantForm.address, state: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={tenantForm.address.country}
                    onChange={(e) =>
                      setTenantForm({
                        ...tenantForm,
                        address: { ...tenantForm.address, country: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
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
                    setTenantForm({ ...tenantForm, primaryPhone: e.target.value })
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
                    setTenantForm({ ...tenantForm, secondaryPhone: e.target.value })
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
        {activeTab === 'property' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property *
                </label>
                <select
                  value={tenantForm.property}
                  onChange={(e) =>
                    setTenantForm({ ...tenantForm, property: e.target.value })
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
                    setTenantForm({ ...tenantForm, contractType: e.target.value })
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
                    setTenantForm({ ...tenantForm, duration: e.target.value })
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
                    setTenantForm({ ...tenantForm, advanceAmount: e.target.value })
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
                    setTenantForm({ ...tenantForm, fixtures: e.target.value })
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
        {activeTab === 'utilities' && (
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
                      setTenantForm({ ...tenantForm, waterType: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Common">Common</option>
                  </select>
                </div>
                {tenantForm.waterType === 'Individual' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Water Meter Number
                    </label>
                    <input
                      type="text"
                      value={tenantForm.waterMeterNo}
                      onChange={(e) =>
                        setTenantForm({ ...tenantForm, waterMeterNo: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                  </div>
                )}
                {tenantForm.waterType === 'Common' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Water Charges (₹)
                    </label>
                    <input
                      type="number"
                      value={tenantForm.waterCharges}
                      onChange={(e) =>
                        setTenantForm({ ...tenantForm, waterCharges: e.target.value })
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
                      setTenantForm({ ...tenantForm, powerType: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                  >
                    <option value="Individual">Individual Meter</option>
                    <option value="Common">Common (Fixed)</option>
                  </select>
                </div>
                {tenantForm.powerType === 'Individual' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Electric Meter Number
                    </label>
                    <input
                      type="text"
                      value={tenantForm.powerMeterNo}
                      onChange={(e) =>
                        setTenantForm({ ...tenantForm, powerMeterNo: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                    />
                  </div>
                )}
                {tenantForm.powerType === 'Common' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fixed Charges (₹)
                    </label>
                    <input
                      type="number"
                      value={tenantForm.powerCharges}
                      onChange={(e) =>
                        setTenantForm({ ...tenantForm, powerCharges: e.target.value })
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
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Identification Proof
                </label>
                <select
                  value={tenantForm.idProofType}
                  onChange={(e) =>
                    setTenantForm({ ...tenantForm, idProofType: e.target.value })
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
                    onChange={(e) => console.log('ID Proof uploaded:', e.target.files[0])}
                  />
                  <label
                    htmlFor="idProofUpload"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Upload File</span>
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
                  onChange={(e) => setTenantForm({ ...tenantForm, gstNo: e.target.value })}
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
                    setTenantForm({ ...tenantForm, gstRequired: e.target.value })
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
                  onChange={(e) => setTenantForm({ ...tenantForm, panNo: e.target.value })}
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
                    onChange={(e) => console.log('PAN uploaded:', e.target.files[0])}
                  />
                  <label
                    htmlFor="panUpload"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Upload File</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financial Tab */}
        {activeTab === 'financial' && (
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
                    setTenantForm({ ...tenantForm, lateFeePerDay: e.target.value })
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
                    setTenantForm({ ...tenantForm, paymentMode: e.target.value })
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
                    setTenantForm({ ...tenantForm, maintenanceCharges: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={tenantForm.notes}
                onChange={(e) => setTenantForm({ ...tenantForm, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
                rows="3"
                placeholder="Additional notes about the tenant"
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-200">
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              isEdit ? setShowEditModal(false) : setShowAddForm(false);
              resetForm();
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={isEdit ? handleEditTenant : handleAddTenant}
            className="px-4 py-2 bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e] flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isEdit ? 'Save Changes' : 'Add Tenant'}
          </button>
        </div>
      </div>
    </div>
  );

  const ViewTenantModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#1652A1]">
              Tenant Details - {selectedTenant?.firstName} {selectedTenant?.lastName}
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
            <h4 className="text-lg font-medium text-gray-900 mb-3">Basic Information</h4>
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
                <p className="text-gray-900">{selectedTenant?.fatherHusbandName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nature of Business</p>
                <p className ="text-gray-900" >{selectedTenant?.businessNature}</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Primary Phone</p>
                <p className="text-gray-900">{selectedTenant?.primaryPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Secondary Phone</p>
                <p className="text-gray-900">{selectedTenant?.secondaryPhone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-900">{selectedTenant?.email}</p>
              </div>
            </div>
          </div>

          {/* Property Info */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Property Information</h4>
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
                <p className="text-gray-900">₹{selectedTenant?.advanceAmount}</p>
              </div>
            </div>
          </div>

          {/* Address Info */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Permanent Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Door No</p>
                <p className="text-gray-900">{selectedTenant?.address.doorNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Street</p>
                <p className="text-gray-900">{selectedTenant?.address.street}</p>
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
                <p className="text-gray-900">{selectedTenant?.address.country}</p>
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
              Vacation Notice - {selectedTenant?.firstName} {selectedTenant?.lastName}
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
                setVacationForm({ ...vacationForm, noticeDate: e.target.value })
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
                setVacationForm({ ...vacationForm, vacationDate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <textarea
              value={vacationForm.reason}
              onChange={(e) =>
                setVacationForm({ ...vacationForm, reason: e.target.value })
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
    <div className="p-5 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Tenant Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e]"
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

      {/* Add Tenant Form (Inline) */}
      {showAddForm && <TenantForm />}

      {/* Tenant Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b border-gray-200">Tenant Name</th>
              <th className="p-3 border-b border-gray-200">Property</th>
              <th className="p-3 border-b border-gray-200">Unit</th>
              <th className="p-3 border-b border-gray-200">Join Date</th>
              <th className="p-3 border-b border-gray-200">Contract Type</th>
              <th className="p-3 border-b border-gray-200">Status</th>
              <th className="p-3 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-3 text-center text-gray-500">
                  No tenants found.
                </td>
              </tr>
            ) : (
              filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-200">
                    {tenant.firstName} {tenant.lastName}
                  </td>
                  <td className="p-3 border-b border-gray-200">{tenant.property}</td>
                  <td className="p-3 border-b border-gray-200">{tenant.unit}</td>
                  <td className="p-3 border-b border-gray-200">{tenant.joinDate}</td>
                  <td className="p-3 border-b border-gray-200">{tenant.contractType}</td>
                  <td className="p-3 border-b border-gray-200">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        tenant.status
                      )}`}
                    >
                      {tenant.status}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openViewModal(tenant)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(tenant)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit Tenant"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTenant(tenant.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete Tenant"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => generateContract(tenant)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Generate Contract"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openVacationModal(tenant)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                        title="Vacation Notice"
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showEditModal && <TenantForm isEdit />}
      {showViewModal && <ViewTenantModal />}
      {showVacationModal && <VacationNoticeModal />}
    </div>
  );
};

export default TenantManagement;