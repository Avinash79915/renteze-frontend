import React from "react";
import property1 from "../assets/property-1.jpg";

const TenantHome = () => {
  const tenant = {
    firstName: "Avinash",
    lastName: "Kushwaha",
    age: 25,
    guardianName: "Mr. Rajesh Kushwaha",
    address: "Door No. 101, MG Road, Banda, Uttar Pradesh, India",
    businessNature: "Software Developer",
    primaryPhone: "+91-9876543210",
    secondaryPhone: "+91-9123456789",
    email: "avinash@example.com",
    contractType: "Lease",
    leaseDuration: "12 months",
    rentAmount: "₹25,000",
    advanceAmount: "₹50,000",
    waterType: "Common",
    waterCharges: "₹300/month",
    waterMeter: "",
    powerType: "Individual",
    powerFixed: "",
    powerMeter: "EM12345678",
    amenities: "Fan, Light, Air Conditioner, Geyser",
    idProofType: "Aadhar Card",
    idProofFile: "aadhar_card.pdf",
    gstNo: "29ABCDE1234F2Z5",
    gstFile: "gst_certificate.pdf",
  };
  const tenantProperty = {
    // ...existing fields
    property1: {
      name: "Sunrise Apartment",
      image: property1,
    },
    property2: {
      name: "Skyview Residency",
      image: property1,
    },
  };

  return (
    <>
      <div className="p-6 mx-auto bg-[#F3F3F3] rounded-lg ">
        <h2 className="text-2xl font-bold text-[#1652A1] mb-6">
          Welcome, {tenant.firstName} {tenant.lastName}
        </h2>

        <div className="space-y-6 text-gray-800">
          <div className="grid md:grid-cols-2 gap-4">
            <p>
              <strong className="text-[#1652A1]">First Name:</strong>{" "}
              {tenant.firstName}
            </p>
            <p>
              <strong className="text-[#1652A1]">Last Name:</strong>{" "}
              {tenant.lastName}
            </p>
            <p>
              <strong className="text-[#1652A1]">Age:</strong> {tenant.age}
            </p>
            <p>
              <strong className="text-[#1652A1]">
                Father / Husband’s Name:
              </strong>{" "}
              {tenant.guardianName}
            </p>
          </div>

          <div>
            <p>
              <strong className="text-[#1652A1]">Permanent Address:</strong>{" "}
              {tenant.address}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <p>
              <strong className="text-[#1652A1]">Nature of Business:</strong>{" "}
              {tenant.businessNature}
            </p>
            <p>
              <strong className="text-[#1652A1]">Email Address:</strong>{" "}
              {tenant.email}
            </p>
            <p>
              <strong className="text-[#1652A1]">Primary Phone:</strong>{" "}
              {tenant.primaryPhone}
            </p>
            <p>
              <strong className="text-[#1652A1]">Secondary Phone:</strong>{" "}
              {tenant.secondaryPhone}
            </p>
          </div>

          {/* Contract Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <p>
              <strong className="text-[#1652A1]">Type of Contract:</strong>{" "}
              {tenant.contractType}
            </p>
            <p>
              <strong className="text-[#1652A1]">Lease Duration:</strong>{" "}
              {tenant.leaseDuration}
            </p>
            <p>
              <strong className="text-[#1652A1]">Monthly Rent:</strong>{" "}
              {tenant.rentAmount}
            </p>
            <p>
              <strong className="text-[#1652A1]">Advance Amount:</strong>{" "}
              {tenant.advanceAmount}
            </p>
          </div>

          {/* Water Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <p>
              <strong className="text-[#1652A1]">Water Type:</strong>{" "}
              {tenant.waterType}
            </p>
            {tenant.waterType === "Individual" && (
              <p>
                <strong className="text-[#1652A1]">Water Meter Number:</strong>{" "}
                {tenant.waterMeter}
              </p>
            )}
            {tenant.waterType === "Common" && (
              <p>
                <strong className="text-[#1652A1]">Water Charges:</strong>{" "}
                {tenant.waterCharges}
              </p>
            )}
          </div>

          {/* Power Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <p>
              <strong className="text-[#1652A1]">Power Type:</strong>{" "}
              {tenant.powerType}
            </p>
            {tenant.powerType === "Common" && (
              <p>
                <strong className="text-[#1652A1]">Fixed Power Charges:</strong>{" "}
                {tenant.powerFixed}
              </p>
            )}
            {tenant.powerType === "Individual" && (
              <p>
                <strong className="text-[#1652A1]">
                  Electric Meter Number:
                </strong>{" "}
                {tenant.powerMeter}
              </p>
            )}
          </div>

          <div>
            <p>
              <strong className="text-[#1652A1]">
                Fixtures and Amenities:
              </strong>{" "}
              {tenant.amenities}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <p>
              <strong className="text-[#1652A1]">
                Identification Proof Type:
              </strong>{" "}
              {tenant.idProofType}
            </p>
            <p>
              <strong className="text-[#1652A1]">ID Proof File:</strong>{" "}
              <a
                href={`/${tenant.idProofFile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View File
              </a>
            </p>
            <p>
              <strong className="text-[#1652A1]">GST Number:</strong>{" "}
              {tenant.gstNo}
            </p>
            <p>
              <strong className="text-[#1652A1]">GST File:</strong>{" "}
              <a
                href={`/${tenant.gstFile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View File
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6  bg-[#F3F3F3] rounded-lg mt-14 max-w-3xl ">
        <h3 className="text-xl font-semibold text-[#1652A1] mb-4">
          Property Details
        </h3>
        <div className="flex flex-wrap gap-4 justify-start ">
          {[tenantProperty.property1, tenantProperty.property2].map(
            (property, index) => (
              <div
                key={index}
                className="relative group overflow-hidden shadow-md border border-gray-200 w-full max-w-[320px] h-[210px]"
              >
                <img
                  src={property.image || "/path-to-image.jpg"}
                  alt={property.name || "Property Image"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[black] bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-semibold text-center px-2">
                    {property.name}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default TenantHome;
