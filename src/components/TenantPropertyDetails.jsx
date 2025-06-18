// src/components/PropertyDetails.jsx
import React from "react";
import property1 from "../assets/property-1.jpg";
const TenantPropertyDetails = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className="mt-6 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-slate-800">
          {property.name} - Full Details
        </h3>
        <button
          onClick={onClose}
          className="text-sm text-red-500 hover:underline"
        >
          Close
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src={property1}
          alt={property.name}
          className="rounded-lg w-full h-64 object-cover"
        />
        <div className="space-y-2">
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Area:</strong> {property.area}</p>
          <p><strong>Floor:</strong> {property.floor}</p>
          <p><strong>Type:</strong> {property.type}</p>
          <p><strong>Furnished:</strong> {property.furnished}</p>
          <p><strong>Parking:</strong> {property.parking}</p>
          <p><strong>Rent:</strong> {property.rent}</p>
          <p><strong>Maintenance:</strong> {property.maintenance}</p>
        </div>
      </div>
    </div>
  );
};

export default TenantPropertyDetails;
