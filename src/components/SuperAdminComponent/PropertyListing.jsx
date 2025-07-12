import React, { useState, useEffect } from "react";
import { Plus, Search, Home, ArrowLeft } from "lucide-react";
import api from "../../Pages/utils/axios";
import PropertyCard from "./AdminPropertyCard";
import PropertyForm from "./PropertyForm";
import PropertyDetail from "./PropertyDetail";
import { useAuth0 } from "@auth0/auth0-react";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeProperty, setActiveProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [unitSearchTerm, setUnitSearchTerm] = useState(""); // 🔹 New
  const [loading, setLoading] = useState(true);
  const [showAddUnitForm, setShowAddUnitForm] = useState(false);

  const { user } = useAuth0();
  const email = user?.email;

  const reloadProperties = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/dashboard?testEmail=${email}&nocache=${Date.now()}`);
      const props = res.data.properties || [];

      const updatedProps = await Promise.all(
        props.map(async (property) => {
          try {
            const unitRes = await api.get(`/unit/property/${property._id}?testEmail=${email}`);
            return { ...property, units: unitRes.data.units || [] };
          } catch (error) {
            console.error(`Failed to fetch units for property ${property._id}`, error);
            return { ...property, units: [] };
          }
        })
      );

      setProperties(updatedProps);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadProperties();
  }, []);

  const filteredProperties = properties.filter(
    (property) =>
      property.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await api.delete(`/dashboard/${propertyId}`);
        setProperties((prev) => prev.filter((p) => p._id !== propertyId));
        if (activeProperty?._id === propertyId) setActiveProperty(null);
      } catch (error) {
        console.error("Failed to delete property:", error);
      }
    }
  };

  return (
    <div className="md:p-6 p-1 flex-1 relative overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
          Super Admin Property Listings
        </h2>

        {!activeProperty ? (
          <button
            onClick={() => {
              setShowAddForm(true);
              setActiveProperty(null);
              setShowAddUnitForm(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm md:text-md bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e]"
          >
            <Plus className="w-5 h-5" />
            Add Property
          </button>
        ) : (
          <button
            onClick={() => {
              setShowAddUnitForm(true);
              setShowAddForm(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm md:text-md bg-[#1652A1] text-white rounded-lg hover:bg-[#134a8e]"
          >
            <Plus className="w-5 h-5" />
            Add Unit
          </button>
        )}
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={
              activeProperty
                ? "Search units by unit number or floor..."
                : "Search properties by name or address..."
            }
            value={activeProperty ? unitSearchTerm : searchTerm}
            onChange={(e) =>
              activeProperty
                ? setUnitSearchTerm(e.target.value)
                : setSearchTerm(e.target.value)
            }
            className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1652A1] focus:border-transparent"
          />
        </div>
      </div>

      {/* Add Property Form */}
      {showAddForm && (
        <PropertyForm setShowAddForm={setShowAddForm} setProperties={setProperties} />
      )}

      {/* Property Detail */}
      {activeProperty ? (
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <button
              onClick={() => {
                setActiveProperty(null);
                setUnitSearchTerm(""); // reset unit search on back
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm md:text-base"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
              Property Details
            </h3>
          </div>
          <PropertyDetail
            property={activeProperty}
            showAddUnitForm={showAddUnitForm}
            setShowAddUnitForm={setShowAddUnitForm}
            reloadProperties={reloadProperties}
            unitSearchTerm={unitSearchTerm} // ✅ pass it
          />
        </div>
      ) : (
        // Property Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              <p className="text-lg">Loading properties...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              <Home className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No properties found.</p>
            </div>
          ) : (
            filteredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                setActiveProperty={setActiveProperty}
                handleDeleteProperty={handleDeleteProperty}
                setShowAddForm={setShowAddForm}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyListing;
