import React, { useState, useEffect } from "react";
import api from "../Pages/utils/axios";
import { FaPaperPlane } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

const SendMessage = () => {
  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    body: "",
  });
  const [tenants, setTenants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, isAuthenticated } = useAuth0();
  const senderEmail = user?.email;

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const res = await api.get("/tenants");
        setTenants(res.data);
      } catch (err) {
        console.error("Failed to fetch tenants:", err);
        setError("Failed to load tenants");
      }
    };

    if (isAuthenticated) {
      fetchTenants();
      fetchMessages();
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages/user?email=${senderEmail}`);
      setMessages(res.data || []);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!senderEmail) return setError("User not logged in.");
    if (!formData.recipient) return setError("Please select a recipient.");
    if (!formData.subject.trim() || !formData.body.trim())
      return setError("Subject and message body are required.");

    try {
      const payload = {
        senderEmail,
        recipientEmail: formData.recipient,
        subject: formData.subject,
        body: formData.body,
      };
      await api.post("/messages", payload);
      setSuccess("Message sent successfully!");
      setFormData({ recipient: "", subject: "", body: "" });
      setError("");
      fetchMessages();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Failed to send message:", err.response?.data || err.message);
      setError(
        err.response?.data?.error || "Failed to send message. Please try again."
      );
    }
  };

  return (
    <div className="p-0 md:p-0">
      <h1 className="text-xl md:text-2xl font-semibold text-[#004C86] mb-4 md:mb-6 mt-6">
        Send New Message
      </h1>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm ">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">{success}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
          <select
            name="recipient"
            value={formData.recipient}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Select a tenant</option>
            {tenants.map((tenant) => (
              <option key={tenant._id} value={tenant.email}>
                {tenant.name} ({tenant.email})
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Enter message subject"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            rows={5}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
            placeholder="Write your message here..."
          />
        </div>

        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-[#004C86] text-white px-4 py-2 rounded-md hover:bg-[#005fa6] transition-colors text-sm"
          >
            <FaPaperPlane size={14} /> Send Message
          </button>
        </div>
      </div>

     {/* ✅ Previous Messages Section */}
<div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mt-8">
  <h2 className="text-lg font-semibold mb-4 text-[#004C86]">
    Previous Sent Messages
  </h2>
  {messages.length === 0 ? (
    <p className="text-sm text-gray-600">No messages sent yet.</p>
  ) : (
    <div className="space-y-4 max-h-[300px] overflow-y-auto">
      {messages.map((msg) => {
        const recipient = msg.recipients?.[0];
        const recipientDisplay = recipient
          ? `${recipient.name} (${recipient.email})`
          : "Unknown";
        return (
          <div
            key={msg._id}
            className="border border-gray-200 p-3 rounded-md shadow-sm text-sm"
          >
            <p className="font-semibold text-gray-800">To: {recipientDisplay}</p>
            <p className="font-medium text-[#004C86]">Subject: {msg.subject}</p>
            <p className="text-gray-700 mt-1">{msg.body}</p>
            <p className="text-gray-400 text-xs mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  )}
</div>

    </div>
  );
};

export default SendMessage;
