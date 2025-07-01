import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiChevronDown, FiChevronUp, FiFilter } from "react-icons/fi";
import api from "../Pages/utils/axios"; 
import SendMessage from "./SendMessage";
const Communication = () => {
  const [openId, setOpenId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState({});
  const [showReplyForm, setShowReplyForm] = useState({});
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await api.get(  `/dashboard?testEmail=${email}`);
        const apiData = res.data;

        const transformedIssues = (apiData.issues || []).map((issue, idx) => ({
          id: issue._id,
          tenantName: "N/A", 
          property: "N/A", 
          date: new Date(issue.createdAt).toISOString().split("T")[0],
          subject: issue.title,
          message: issue.description,
          priority: issue.priority || "Low",
          status: issue.status || "Pending",
        }));

        setMessages(transformedIssues);
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      }
    };

    fetchIssues();
  }, []);

  const toggleOpen = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
    setShowReplyForm((prev) => ({ ...prev, [id]: false }));
  };

  const toggleReplyForm = (id, e) => {
  e.stopPropagation();

  setOpenId((prev) => (prev === id ? prev : id));

  setShowReplyForm((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
};

  const handleReplyChange = (id, value) => {
    setReplies((prev) => ({ ...prev, [id]: value }));
  };

  const handleStatusChange = (id, newStatus, e) => {
    e.stopPropagation();
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: newStatus } : msg))
    );
  };

  const handleReplySubmit = (id) => {
    if (!replies[id]?.trim()) {
      alert("Please enter a reply message.");
      return;
    }

    console.log(`Reply sent for message ${id}:`, replies[id]);
    alert(
      `Reply sent to ${messages.find((m) => m.id === id)?.tenantName}:\n\n${
        replies[id]
      }`
    );
    setReplies((prev) => ({ ...prev, [id]: "" }));
    setShowReplyForm((prev) => ({ ...prev, [id]: false }));
  };

  const filteredMessages = messages.filter((msg) => {
    const priorityMatch =
      priorityFilter === "All" || msg.priority === priorityFilter;
    const statusMatch = statusFilter === "All" || msg.status === statusFilter;
    return priorityMatch && statusMatch;
  });

  const priorityColors = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
    All: "bg-gray-500",
  };

  const statusColors = {
    Pending: "bg-orange-500",
    "In Progress": "bg-blue-500",
    Resolved: "bg-green-500",
    All: "bg-gray-500",
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      High: "bg-red-100 text-red-700 border-red-200",
      Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Low: "bg-green-100 text-green-700 border-green-200",
    };
    return colors[priority] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getStatusBadge = (status) => {
    const colors = {
      Pending: "bg-orange-100 text-orange-700 border-orange-200",
      "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
      Resolved: "bg-green-100 text-green-700 border-green-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="p-1 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-10">
        <h1 className="text-xl md:text-2xl font-semibold text-[#004C86]">
          Admin Communication Dashboard
        </h1>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full">
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-600 w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm font-medium text-gray-700">
              Filters:
            </span>
          </div>

          {/* Priority Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <span className="text-xs md:text-sm text-gray-600">Priority:</span>
            <div className="flex flex-wrap gap-1 md:gap-1">
              {["All", "High", "Medium", "Low"].map((priority) => (
                <button
                  key={priority}
                  onClick={() => setPriorityFilter(priority)}
                  className={`flex items-center gap-1 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-xs font-medium transition-all ${
                    priorityFilter === priority
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${priorityColors[priority]}`}
                  ></div>
                  {priority}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <span className="text-xs md:text-sm text-gray-600">Status:</span>
            <div className="flex flex-wrap gap-1 md:gap-1">
              {["All", "Pending", "In Progress", "Resolved"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`flex items-center gap-1 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-xs font-medium transition-all ${
                    statusFilter === status
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${priorityColors[status]}`}
                  ></div>
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredMessages.length} of {messages.length} messages
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm ">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-xs md:text-sm hidden md:table">
            <thead className="bg-[#F6F6F6] ">
              <tr>
                <th className="text-left px-2 py-2 md:px-4 md:py-3 font-medium text-gray-700">
                  S.No
                </th>
                <th className="text-left px-2 py-2 md:px-4 md:py-3 font-medium text-gray-700">
                  Tenant
                </th>
                <th className="text-left px-2 py-2 md:px-4 md:py-3 font-medium text-gray-700">
                  Property
                </th>
                <th className="text-left px-2 py-2 md:px-4 md:py-3 font-medium text-gray-700">
                  Date
                </th>
                <th className="text-left px-2 py-2 md:px-4 md:py-3 font-medium text-gray-700">
                  Subject
                </th>
                <th className="text-left px-2 py-2 md:px-4 md:py-3 font-medium text-gray-700">
                  Priority
                </th>
                <th className="text-left px-2 py-2 md:px-4 md:py-3 font-medium text-gray-700">
                  Status
                </th>
                <th className="text-left px-2 py-2 md:px-4 md:py-3 font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((msg, index) => (
                <React.Fragment key={msg.id}>
                  <tr
                    onClick={() => toggleOpen(msg.id)}
                    className="cursor-pointer hover:bg-[#F0F9FF]  transition-colors"
                  >
                    <td className="px-2 py-2 md:px-4 md:py-3">{index + 1}</td>
                    <td className="px-2 py-2 md:px-4 md:py-3 font-medium text-gray-900">
                      {msg.tenantName}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-gray-700">
                      {msg.property}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-gray-600">
                      {msg.date}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-gray-800">
                      {msg.subject}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <span
                        className={`px-1 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium border ${getPriorityBadge(
                          msg.priority
                        )}`}
                      >
                        {msg.priority}
                      </span>
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <select
                        value={msg.status}
                        onChange={(e) =>
                          handleStatusChange(msg.id, e.target.value, e)
                        }
                        className={`text-xs px-1 py-0.5 md:px-2 md:py-1 rounded-full font-medium border cursor-pointer ${getStatusBadge(
                          msg.status
                        )}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <div className="flex items-center gap-1 md:gap-2">
                        <button
                          onClick={(e) => toggleReplyForm(msg.id, e)}
                          className="flex items-center gap-0.5 md:gap-1 px-1 py-0.5 md:px-2 md:py-1 text-xs bg-[#004C86] text-white rounded hover:bg-[#005fa6] transition-colors"
                        >
                          Reply
                        </button>
                        {openId === msg.id ? (
                          <FiChevronUp className="text-gray-400" size={14} />
                        ) : (
                          <FiChevronDown className="text-gray-400" size={14} />
                        )}
                      </div>
                    </td>
                  </tr>

                  {openId === msg.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="8" className="px-3 py-3 md:px-6 md:py-4">
                        <div className="bg-white p-3 md:p-4 rounded-lg border">
                          <div className="mb-3 md:mb-4">
                            <h4 className="font-medium text-gray-900 text-sm md:text-base mb-2">
                              Message Details:
                            </h4>
                            <p className="text-gray-700 bg-gray-50 p-2 md:p-3 rounded border-l-4 border-blue-400 text-xs md:text-sm">
                              {msg.message}
                            </p>
                          </div>

                          {showReplyForm[msg.id] && (
                            <div className="mt-3 md:mt-4 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <h5 className="font-medium text-gray-900 text-sm md:text-base mb-2">
                                Reply to {msg.tenantName}:
                              </h5>
                              <textarea
                                value={replies[msg.id] || ""}
                                onChange={(e) =>
                                  handleReplyChange(msg.id, e.target.value)
                                }
                                rows={3}
                                className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-xs md:text-sm"
                                placeholder="Write your reply here..."
                              />
                              <div className="flex gap-2 mt-2 md:mt-3 flex-col sm:flex-row">
                                <button
                                  onClick={() => handleReplySubmit(msg.id)}
                                  className="bg-[#004C86] text-white px-3 py-1.5 md:px-4 md:py-2 rounded hover:bg-[#005fa6] transition-colors flex items-center gap-1 md:gap-2 text-xs md:text-sm"
                                >
                                  Send Reply
                                </button>
                                <button
                                  onClick={(e) => toggleReplyForm(msg.id, e)}
                                  className="bg-gray-300 text-gray-700 px-3 py-1.5 md:px-4 md:py-2 rounded hover:bg-gray-400 transition-colors text-xs md:text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

              {filteredMessages.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-2 py-6 md:px-4 md:py-8 text-center text-gray-500 text-xs md:text-sm"
                  >
                    No messages found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Mobile Card Layout */}
          <div className="md:hidden divide-y divide-gray-200">
            {filteredMessages.map((msg, index) => (
              <div key={msg.id} className="p-3 bg-white">
                <div
                  onClick={() => toggleOpen(msg.id)}
                  className="cursor-pointer hover:bg-[#F0F9FF] transition-colors"
                >
                  <div className="flex flex-col gap-2 text-md">
                    <div>
                      <span className="font-medium text-gray-700">S.No:</span>{" "}
                      {index + 1}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Tenant:</span>{" "}
                      <span className="font-medium text-gray-900">
                        {msg.tenantName}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Property:
                      </span>{" "}
                      {msg.property}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Date:</span>{" "}
                      {msg.date}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Subject:
                      </span>{" "}
                      {msg.subject}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Priority:
                      </span>{" "}
                      <span
                        className={`px-1 py-0.5 rounded-full text-xs font-medium border ${getPriorityBadge(
                          msg.priority
                        )}`}
                      >
                        {msg.priority}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>{" "}
                      <select
                        value={msg.status}
                        onChange={(e) =>
                          handleStatusChange(msg.id, e.target.value, e)
                        }
                        className={`text-xs px-1 py-0.5 rounded-full font-medium border cursor-pointer ${getStatusBadge(
                          msg.status
                        )}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => toggleReplyForm(msg.id, e)}
                        className="flex items-center gap-0.5 px-1 py-0.5 text-md bg-[#004C86] text-white rounded hover:bg-[#005fa6] transition-colors"
                      >
                        Reply
                      </button>
                      {openId === msg.id ? (
                        <FiChevronUp className="text-gray-400" size={14} />
                      ) : (
                        <FiChevronDown className="text-gray-400" size={14} />
                      )}
                    </div>
                  </div>
                </div>

                {openId === msg.id && (
                  <div className="mt-2 p-0 bg-gray-50 rounded-md">
                    <div className="bg-white p-3 rounded-lg border">
                      <div className="mb-3">
                        <h4 className="font-medium text-gray-900 text-md mb-2">
                          Message Details:
                        </h4>
                        <p className="text-gray-700 bg-gray-50 p-2 rounded border-l-4 border-blue-400 text-xs">
                          {msg.message}
                        </p>
                      </div>

                      {showReplyForm[msg.id] && (
                        <div className="mt-3 p-2 bg-blue-50 rounded-lg ">
                          <h5 className="font-medium text-gray-900 text-xs mb-2">
                            Reply to {msg.tenantName}:
                          </h5>
                          <textarea
                            value={replies[msg.id] || ""}
                            onChange={(e) =>
                              handleReplyChange(msg.id, e.target.value)
                            }
                            rows={3}
                            className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-xs"
                            placeholder="Write your reply here..."
                          />
                          <div className="flex gap-2 mt-2 flex-col">
                            <button
                              onClick={() => handleReplySubmit(msg.id)}
                              className="bg-[#004C86] text-white px-3 py-1.5 rounded hover:bg-[#005fa6] transition-colors flex items-center gap-2 text-xs"
                            >
                              Send Reply
                            </button>
                            <button
                              onClick={(e) => toggleReplyForm(msg.id, e)}
                              className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-400 transition-colors text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredMessages.length === 0 && (
              <div className="p-3 text-center text-gray-500 text-xs">
                No messages found matching the selected filters.
              </div>
            )}
          </div>
        </div>
      </div>

      <SendMessage/>
    </div>
  );
};

export default Communication;
