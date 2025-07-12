import React from "react";
import {
  Eye,
  Trash2,
  MapPin,
  Home,
  Users,
  Building,
  IdCard,
} from "lucide-react";
import property1 from "../../assets/property-1.jpg";

const PropertyCard = ({
  property,
  setActiveProperty,
  handleDeleteProperty,
  setShowAddForm,
}) => {
  const totalUnits = property.units?.length || 0;

  // 🔥 Correct occupancy calculation: use isOccupied flag!
  const occupiedUnits =
    property.units?.filter((unit) => unit.isOccupied).length || 0;
  const vacantUnits = totalUnits - occupiedUnits;
  const occupancyRate =
    totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative overflow-hidden">
        <img
          src={property1}
          alt={property.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {property.propertyNo && (
          <div className="absolute top-3 left-3">
            {/* <div className="px-2 py-1 bg-black bg-opacity-60 text-white text-xs rounded-md">
              #{property.propertyNo}
            </div> */}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-[#1652A1] mb-1 line-clamp-1">
            {property.name}
          </h3>

          <div className="flex items-center text-gray-600 text-sm mb-1">
            <span className="font-medium mr-1">Display ID:</span>
            <span className="text-gray-700 truncate">{property.displayID}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.address}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mx-auto mb-1">
              <Home className="w-5 h-5 text-black" />
            </div>
            <p className="text-lg font-bold text-[#1652A1]">{totalUnits}</p>
            <p className="text-xs text-gray-600">Total Units</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mx-auto mb-1">
              <Users className="w-5 h-5 text-black" />
            </div>
            <p className="text-lg font-bold text-[#1652A1]">{occupiedUnits}</p>
            <p className="text-xs text-gray-600">Occupied</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mx-auto mb-1">
              <Building className="w-5 h-5 text-black" />
            </div>
            <p className="text-lg font-bold text-[#1652A1]">{vacantUnits}</p>
            <p className="text-xs text-gray-600">Vacant</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600">Occupancy Rate</span>
            <span className="text-xs font-semibold text-gray-900">
              {occupancyRate}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                occupancyRate >= 80
                  ? "bg-[#1652A1]"
                  : occupancyRate >= 50
                  ? "bg-[#1652A1]"
                  : "bg-[#1652A1]"
              }`}
              style={{ width: `${occupancyRate}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setActiveProperty(property);
              setShowAddForm(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1652A1] text-white text-sm rounded-lg hover:bg-[#134a8e] transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteProperty(property._id);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-600">
            <span>
              {vacantUnits > 0 ? (
                <span className="text-red-600 font-medium">
                  {vacantUnits} unit{vacantUnits !== 1 ? "s" : ""} available
                </span>
              ) : (
                <span className="text-green-600 font-medium">
                  Fully occupied
                </span>
              )}
            </span>
            <span>
              {totalUnits > 0 && (
                <span className="text-gray-500">{occupancyRate}% capacity</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
