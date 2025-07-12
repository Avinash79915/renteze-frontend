import React, { useEffect, useState } from "react";
import {
  Trash2,
  CreditCard,
  Home,
  Settings,
  Calendar,
  RotateCcw,
} from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../Pages/utils/axios";
import { toast } from "react-toastify";

const History = () => {
  const { user } = useAuth0();
  const [deletedItems, setDeletedItems] = useState([]);
  const [showDeleted, setShowDeleted] = useState(true); // Default to deleted view

  useEffect(() => {
    if (!user?.email) return;

    const fetchDeleted = async () => {
      try {
        // Use logged-in email OR fallback to "system" for test
        const res = await api.get(`/recycle-bin?email=${user.email || "system"}`);
        const items = res.data.items || [];

        // Log what we received
        console.log("🧹 Deleted items:", items);

        setDeletedItems(items);
      } catch (err) {
        console.error("Failed to fetch deleted items:", err);
        toast.error("Could not load deleted items.");
      }
    };

    fetchDeleted();
  }, [user]);

  const restoreItem = async (id) => {
    try {
      await api.post(`/recycle-bin/restore/${id}`);
      setDeletedItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Item restored successfully!");
    } catch (err) {
      console.error("Failed to restore item:", err);
      toast.error("Restore failed.");
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "payment":
        return <CreditCard className="text-[#1652A1]" size={20} />;
      case "property":
        return <Home className="text-[#1652A1]" size={20} />;
      case "admin":
        return <Settings className="text-[#1652A1]" size={20} />;
      default:
        return <Calendar className="text-[#1652A1]" size={20} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Activity History
        </h1>
        <p className="text-gray-600">Manage your soft-deleted items</p>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setShowDeleted(false)}
          className={`px-4 py-2 rounded-md font-medium ${
            !showDeleted
              ? "bg-[#1652A1] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setShowDeleted(true)}
          className={`px-4 py-2 rounded-md font-medium ${
            showDeleted
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Deleted ({deletedItems.length})
        </button>
      </div>

      {showDeleted ? (
        deletedItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Trash2 className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No Deleted Items
            </h3>
            <p className="text-gray-600">Nothing in your recycle bin.</p>
          </div>
        ) : (
          deletedItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-sm border border-red-200 p-4 mb-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg opacity-60">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600 mb-1">
                      {item.title || "Untitled"}
                    </h3>
                    <p className="text-gray-500 text-sm mb-1">
                      {item.description || "No description"}
                    </p>
                    <div className="text-sm text-gray-400">
                      Deleted: {formatDate(item.deletedAt || item.date)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => restoreItem(item._id)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Restore"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>
          ))
        )
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
          No active content. Switch to Deleted tab.
        </div>
      )}
    </div>
  );
};

export default History;
