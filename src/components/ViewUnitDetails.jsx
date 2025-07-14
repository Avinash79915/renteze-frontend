import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "../Pages/utils/axios";
import { useAuth0 } from "@auth0/auth0-react";

const ViewUnitModal = ({ isOpen, onClose, unit }) => {
  const [unitDetail, setUnitDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { user } = useAuth0();
  const email = user?.email;

  useEffect(() => {
    const fetchUnitDetails = async () => {
      if (!unit?._id || !email) return;

      setLoading(true);
      setErrorMsg("");
      try {
        const response = await api.get(`/unit/${unit._id}`, {
          params: { testEmail: email },
        });
        setUnitDetail(response.data.data?.unit || null);
      } catch (error) {
        console.error("Error fetching unit detail:", error);
        setUnitDetail(null);
        setErrorMsg(
          error?.response?.data?.message || "Failed to load unit details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchUnitDetails();
  }, [isOpen, unit?._id, email]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg max-w-xl w-full mx-4 z-50">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#1652A1]">Unit Details</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto text-gray-800 text-sm space-y-3">
          {loading ? (
            <p className="text-center text-gray-500">Loading unit details...</p>
          ) : errorMsg ? (
            <p className="text-center text-red-500">{errorMsg}</p>
          ) : unitDetail ? (
            <>
              <p><strong>Unit Number:</strong> {unitDetail.roomId || "N/A"}</p>
              <p><strong>Display ID:</strong> {unitDetail.displayID || "N/A"}</p>
              <p><strong>Floor:</strong> {unitDetail.floor ?? "N/A"}</p>
              <p><strong>Rent:</strong> ₹{unitDetail.rentCost ?? 0}</p>
              <p><strong>Maintenance Cost:</strong> ₹{unitDetail.maintenanceCost ?? 0}</p>
              <p><strong>Room Area:</strong> {unitDetail.roomArea || "N/A"} sq ft</p>
              <p><strong>BESCOM Number:</strong> {unitDetail.bescomNumber || "N/A"}</p>
              <p><strong>Status:</strong> {unitDetail.isOccupied ? "Occupied" : "Vacant"}</p>
              <p><strong>Water Meter Number:</strong> {unitDetail.waterMeterNo || "N/A"}</p>
              <p><strong>Electric Meter Number:</strong> {unitDetail.electricMeterNo || "N/A"}</p>
              <p><strong>Water Connection Type:</strong> {unitDetail.waterConnectionType || "N/A"}</p>
              <p><strong>Toilet Type:</strong> {unitDetail.toiletType || "N/A"}</p>
              <p><strong>Amenities:</strong> {unitDetail.amenities || "N/A"}</p>
              <p><strong>Unit History:</strong> {unitDetail.unitHistory || "N/A"}</p>
            </>
          ) : (
            <p className="text-center text-gray-500">No unit data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUnitModal;
