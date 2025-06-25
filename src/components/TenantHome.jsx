import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyDetails from "./TenantPropertyDetails";
import property1 from "../assets/property-1.jpg";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiHome,
  FiDollarSign,
  FiDroplet,
  FiZap,
  FiCalendar,
  FiCreditCard,
  FiShield,
  FiExternalLink,
  FiSettings,
} from "react-icons/fi";

const TenantHome = () => {
  const [tenant, setTenant] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const InfoCard = ({ icon: Icon, title, children, className = "" }) => (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-[#1652A1]" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InfoItem = ({ label, value, icon: Icon }) => (
    <div className="flex items-start gap-3 py-2">
      {Icon && <Icon className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <p className="text-sm text-slate-900 mt-1 break-words">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );

  const FileLink = ({ href, children }) =>
    href ? (
      <a
        href={`http://localhost:3000/${href}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
      >
        {children}
        <FiExternalLink className="w-4 h-4" />
      </a>
    ) : (
      <p className="text-sm text-slate-400">N/A</p>
    );

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/dashboard?testEmail=${email}`
        );
        setTenant(res.data.tenant);
      } catch (err) {
        console.error("Failed to fetch tenant:", err);
      }
    };

    fetchTenant();
  }, [email]);

  if (!tenant) return <div className="p-6">Loading tenant data...</div>;

  const uploads = tenant.uploads || {};
  const nameParts = tenant.name?.split(" ") || ["T", "U"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto p-0">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4">
              {/* Profile Circle */}
              <div className="w-20 h-20 bg-[#1652A1] rounded-full flex items-center justify-center mx-auto sm:mx-0">
                <span className="text-3xl font-bold text-white">
                  {nameParts[0][0]}
                  {nameParts[1]?.[0] || ""}
                </span>
              </div>

              {/* Text */}
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-light text-[#1652A1] mb-1 sm:mb-2">
                  Welcome, {tenant.name || "Tenant"}
                </h1>
                <p className="text-slate-600 text-sm sm:text-base">
                  Tenant Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InfoCard icon={FiUser} title="Personal Information">
            <InfoItem label="Full Name" value={tenant.name} />
            <InfoItem label="Age" value={"N/A"} />
            <InfoItem label="Father/Husband's Name" value={"N/A"} />
            <InfoItem
              label="Nature of Business"
              value={tenant.natureOfBusiness}
            />
          </InfoCard>

          <InfoCard icon={FiPhone} title="Contact Information">
            <InfoItem
              icon={FiMail}
              label="Email Address"
              value={tenant.email}
            />
            <InfoItem
              icon={FiPhone}
              label="Primary Phone"
              value={tenant.phone}
            />
            <InfoItem icon={FiPhone} label="Secondary Phone" value={"N/A"} />
            <InfoItem icon={FiMapPin} label="Permanent Address" value={"N/A"} />
          </InfoCard>

          <InfoCard icon={FiFileText} title="Contract Details">
            <InfoItem
              icon={FiFileText}
              label="Contract Type"
              value={"Residential Lease"}
            />
            <InfoItem
              icon={FiCalendar}
              label="Lease Duration"
              value={`${tenant.agreementStartDate?.slice(0, 10) || "N/A"} to ${
                tenant.agreementEndDate?.slice(0, 10) || "N/A"
              }`}
            />
            <InfoItem
              icon={FiDollarSign}
              label="Monthly Rent"
              value={`₹${tenant.rent}`}
            />
            <InfoItem
              icon={FiCreditCard}
              label="Advance Amount"
              value={`₹${tenant.advance}`}
            />
          </InfoCard>

          <InfoCard icon={FiDroplet} title="Water Supply">
            <InfoItem label="Water Type" value={"N/A"} />
            <InfoItem label="Water Meter Number" value={"N/A"} />
            <InfoItem label="Water Charges" value={"N/A"} />
          </InfoCard>

          <InfoCard icon={FiZap} title="Power Supply">
            <InfoItem label="Power Type" value={"N/A"} />
            <InfoItem label="Electric Meter Number" value={"N/A"} />
            <InfoItem label="Fixed Power Charges" value={"N/A"} />
          </InfoCard>

          <InfoCard icon={FiShield} title="Documents & Verification">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">
                  Proof of Identity
                </p>
                <FileLink href={uploads.proofOfIdentity}>
                  View ID Proof
                </FileLink>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">
                  Proof of Address
                </p>
                <FileLink href={uploads.proofOfAddress}>
                  View Address Proof
                </FileLink>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">
                  Proof of Business
                </p>
                <FileLink href={uploads.proofOfBusiness}>
                  View Business Proof
                </FileLink>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">
                  Agreement Draft
                </p>
                <FileLink href={uploads.agreementDraft}>View Draft</FileLink>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">
                  Agreement Copy
                </p>
                <FileLink href={uploads.agreementCopy}>View Copy</FileLink>
              </div>
            </div>
          </InfoCard>
        </div>

        {/* Amenities (not in API, fallback to N/A) */}
        <div className="mt-6">
          <InfoCard
            icon={FiHome}
            title="Fixtures & Amenities"
            className="w-full"
          >
            <div className="text-slate-500 text-sm">N/A</div>
          </InfoCard>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg">
                <FiFileText className="w-5 h-5 text-[#1652A1]" />
                <span className="text-sm font-medium text-blue-800">
                  View Reports
                </span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg">
                <FiDollarSign className="w-5 h-5 text-[#1652A1]" />
                <span className="text-sm font-medium text-[#1652A1]">
                  Pay Rent
                </span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg">
                <FiSettings className="w-5 h-5 text-[#1652A1]" />
                <span className="text-sm font-medium text-[#1652A1]">
                  Maintenance
                </span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg">
                <FiPhone className="w-5 h-5 text-[#1652A1]" />
                <span className="text-sm font-medium text-[#1652A1]">
                  Contact Support
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* My Property */}
        <div className="mt-6">
          <InfoCard icon={FiHome} title="My Property" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
                <img
                  src={property1}
                  alt="Property"
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 space-y-1">
                  <h4 className="text-lg font-semibold text-slate-800">
                    Linked Property
                  </h4>
                  <p className="text-sm text-slate-600">
                    Unit ID: {tenant.unit || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </InfoCard>
        </div>

        {/* Modal */}
        {selectedProperty && (
          <PropertyDetails
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TenantHome;
