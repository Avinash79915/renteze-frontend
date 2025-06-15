// src/components/PropertyList.jsx
import React from 'react';
import property1 from "../assets/property-1.jpg";

const properties = [
  { id: 1, name: 'Sunrise Apartments' ,address: '123 Main St, Cityville'},
  { id: 2, name: 'Palm Residency' },
  { id: 3, name: 'Sky Towers' },
  { id: 4, name: 'Ocean View' },
  { id: 5, name: 'Green Heights' },
  { id: 6, name: 'Lakefront Villa' },
  { id: 7, name: 'Mountain Edge' },
  { id: 8, name: 'City Lights' },
 
];

const PropertyList = () => {
  return (
    <div className="p-6 flex-1 realative overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6">Property Listings</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5    ">
        {properties.map((property) => (
          <div
            key={property.id}
            className="relative group overflow-hidden rounded shadow-lg cursor-pointer "
          >
            {/* Property Image */}
            <img
              src={property1}
              alt={property.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#009CDC] bg-opacity-80 translate-y-full group-hover:translate-y-0 transition-all duration-500 flex flex-col items-center justify-center p-4">
              <p className="text-white text-lg font-semibold">{property.name}</p>
              <p className="text-white text-lg font-semibold">{property.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
