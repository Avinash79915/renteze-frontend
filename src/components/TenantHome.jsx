import React from "react";
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
  FiSettings
} from "react-icons/fi";

// Demo tenant data - replace with your actual prop
const tenant = {
  firstName: "Aviansh",
  lastName: "Kushwaha",
  age: 32,
  guardianName: ".....",
  address: "123 MG Road, Bengaluru, Karnataka 560001",
  businessNature: "Software Engineer",
  email: "Avi@email.com",
  primaryPhone: "+91 79797979797",
  secondaryPhone: "+91 9797979",
  contractType: "Residential Lease",
  leaseDuration: "11 Months",
  rentAmount: "₹25,000",
  advanceAmount: "₹50,000",
  waterType: "Individual",
  waterMeter: "WM123456",
  waterCharges: "₹500",
  powerType: "Individual",
  powerMeter: "EM789012",
  powerFixed: "₹800",
  amenities: "AC, WiFi, Parking, Security, Gym",
  idProofType: "Aadhaar Card",
  idProofFile: "aadhaar.pdf",
  gstNo: "29ABCDE1234F1Z5",
  gstFile: "gst-certificate.pdf"
};

const properties = [
  {
    id: 1,
    name: "Sunrise Apartments",
    location: "Bengaluru, Karnataka",
    image: property1,
    area: "1200 sqft",
    floor: "2nd Floor",
    type: "2 BHK",
    rent: "₹25,000",
    maintenance: "₹1,200",
    furnished: "Semi-furnished",
    parking: "Available",
  },
];


const TenantHome = () => {
  const InfoCard = ({ icon: Icon, title, children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InfoItem = ({ label, value, icon: Icon }) => (
    <div className="flex items-start gap-3 py-2">
      {Icon && <Icon className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <p className="text-sm text-slate-900 mt-1 break-words">{value}</p>
      </div>
    </div>
  );

  const FileLink = ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
    >
      {children}
      <FiExternalLink className="w-4 h-4" />
    </a>
  );
const [selectedProperty, setSelectedProperty] = React.useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {tenant.firstName[0]}{tenant.lastName[0]}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Welcome, {tenant.firstName} {tenant.lastName}
                </h1>
                <p className="text-slate-600">Tenant Dashboard</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Personal Information */}
          <InfoCard icon={FiUser} title="Personal Information">
            <div className="space-y-1">
              <InfoItem label="Full Name" value={`${tenant.firstName} ${tenant.lastName}`} />
              <InfoItem label="Age" value={tenant.age} />
              <InfoItem label="Father/Husband's Name" value={tenant.guardianName} />
              <InfoItem label="Nature of Business" value={tenant.businessNature} />
            </div>
          </InfoCard>

          {/* Contact Information */}
          <InfoCard icon={FiPhone} title="Contact Information">
            <div className="space-y-1">
              <InfoItem 
                icon={FiMail} 
                label="Email Address" 
                value={tenant.email} 
              />
              <InfoItem 
                icon={FiPhone} 
                label="Primary Phone" 
                value={tenant.primaryPhone} 
              />
              <InfoItem 
                icon={FiPhone} 
                label="Secondary Phone" 
                value={tenant.secondaryPhone} 
              />
              <InfoItem 
                icon={FiMapPin} 
                label="Permanent Address" 
                value={tenant.address} 
              />
            </div>
          </InfoCard>

          {/* Contract Details */}
          <InfoCard icon={FiFileText} title="Contract Details">
            <div className="space-y-1">
              <InfoItem 
                icon={FiFileText} 
                label="Contract Type" 
                value={tenant.contractType} 
              />
              <InfoItem 
                icon={FiCalendar} 
                label="Lease Duration" 
                value={tenant.leaseDuration} 
              />
              <InfoItem 
                icon={FiDollarSign} 
                label="Monthly Rent" 
                value={tenant.rentAmount} 
              />
              <InfoItem 
                icon={FiCreditCard} 
                label="Advance Amount" 
                value={tenant.advanceAmount} 
              />
            </div>
          </InfoCard>

          {/* Utilities - Water */}
          <InfoCard icon={FiDroplet} title="Water Supply">
            <div className="space-y-1">
              <InfoItem label="Water Type" value={tenant.waterType} />
              {tenant.waterType === "Individual" && (
                <InfoItem label="Water Meter Number" value={tenant.waterMeter} />
              )}
              {tenant.waterType === "Common" && (
                <InfoItem label="Water Charges" value={tenant.waterCharges} />
              )}
            </div>
          </InfoCard>

          {/* Utilities - Power */}
          <InfoCard icon={FiZap} title="Power Supply">
            <div className="space-y-1">
              <InfoItem label="Power Type" value={tenant.powerType} />
              {tenant.powerType === "Individual" && (
                <InfoItem label="Electric Meter Number" value={tenant.powerMeter} />
              )}
              {tenant.powerType === "Common" && (
                <InfoItem label="Fixed Power Charges" value={tenant.powerFixed} />
              )}
            </div>
          </InfoCard>

          {/* Documents */}
          <InfoCard icon={FiShield} title="Documents & Verification">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">Identification Proof</p>
                <p className="text-sm text-slate-900 mb-2">{tenant.idProofType}</p>
                <FileLink href={`/${tenant.idProofFile}`}>
                  View ID Proof
                </FileLink>
              </div>
              
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">GST Information</p>
                <p className="text-sm text-slate-900 mb-2">{tenant.gstNo}</p>
                <FileLink href={`/${tenant.gstFile}`}>
                  View GST Certificate
                </FileLink>
              </div>
            </div>
          </InfoCard>

        </div>

        {/* Amenities Section */}
        <div className="mt-6">
          <InfoCard icon={FiHome} title="Fixtures & Amenities" className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {tenant.amenities.split(', ').map((amenity, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-800">{amenity}</span>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <FiFileText className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">View Reports</span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <FiDollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">Pay Rent</span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <FiSettings className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Maintenance</span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                <FiPhone className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Contact Support</span>
              </button>
            </div>
          </div>
        </div>
{/* My Property Section */}
<div className="mt-6">
  <InfoCard icon={FiHome} title="My Property" className="w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="border rounded-xl overflow-hidden bg-white shadow-sm">
          <img
            src={property.image}
            alt={property.name}
            className="h-48 w-full object-cover"
          />
          <div className="p-4 space-y-1">
            <h4 className="text-lg font-semibold text-slate-800">
              {property.name}
            </h4>
            <p className="text-sm text-slate-600">{property.location}</p>
            <p className="text-sm text-slate-600">Type: {property.type}</p>
            <p className="text-sm text-slate-600">Rent: {property.rent}</p>
            <button
              onClick={() => setSelectedProperty(property)}
              className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </InfoCard>
</div>

{/* Render Detailed View if Selected */}
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