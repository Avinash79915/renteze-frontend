import React from "react";
import { X } from "lucide-react";

const ViewTenantModal = ({ tenant, onClose }) => {
  if (!tenant) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#1652A1]">
              Tenant Details - {tenant?.firstName} {tenant?.lastName}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h4 className="text-lg font-medium mb-3">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-gray-900">
                  {tenant?.firstName} {tenant?.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="text-gray-900">{tenant?.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Father/Husband's Name</p>
                <p className="text-gray-900">{tenant?.fatherHusbandName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nature of Business</p>
                <p className="text-gray-900">{tenant?.businessNature}</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-3">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Primary Phone</p>
                <p className="text-gray-900">{tenant?.primaryPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Secondary Phone</p>
                <p className="text-gray-900">{tenant?.secondaryPhone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-900">{tenant?.email}</p>
              </div>
            </div>
          </div>

          {/* Property Info */}
          <div>
            <h4 className="text-lg font-medium mb-3">Property Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Property</p>
                <p>{tenant.property?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Unit</p>
                <p className="text-gray-900">{tenant?.unit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contract Type</p>
                <p className="text-gray-900">{tenant?.contractType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-gray-900">{tenant?.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Amount</p>
                <p className="text-gray-900">₹{tenant?.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Advance Amount</p>
                <p className="text-gray-900">₹{tenant?.advanceAmount}</p>
              </div>
            </div>
          </div>

          {/* Address Info */}
          <div>
            <h4 className="text-lg font-medium mb-3">Permanent Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Door No</p>
                <p className="text-gray-900">{tenant?.address?.doorNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Street</p>
                <p className="text-gray-900">{tenant?.address?.street}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p className="text-gray-900">{tenant?.address?.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">State</p>
                <p className="text-gray-900">{tenant?.address?.state}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Country</p>
                <p className="text-gray-900">{tenant?.address?.country}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTenantModal;
