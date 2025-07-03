import React, { useState, useEffect } from "react";
import IssueForm from "./TenantComponents/IssueForm";
import QueryForm from "./TenantComponents/QueryForm";
import api from "../Pages/utils/axios";
import { useAuth0 } from "@auth0/auth0-react"; 

const TenantCommunication = () => {
  const [activeTab, setActiveTab] = useState("issue");
  const [issues, setIssues] = useState([]);
  const [queries, setQueries] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const [issueData, setIssueData] = useState({
    title: "",
    priority: "Medium",
    description: "",
  });

  const [queryData, setQueryData] = useState({
    subject: "",
    description: "",
  });

  const { user, isAuthenticated, isLoading } = useAuth0(); 
  const userEmail = user?.email; 

  console.log("Logged-in user email (Auth0):", userEmail);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!userEmail) {
          setError("User not logged in. Please log in to see your messages.");
          return;
        }

        const res = await api.get(
          `/messages/user?email=${encodeURIComponent(userEmail)}`
        );
        setMessages(res.data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setError(err.response?.data?.error || "Failed to load messages.");
      }
    };

    fetchMessages();
  }, [userEmail]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-[#1652A1] mb-4">
        Tenant Communication
      </h2>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "issue"
              ? "bg-[#1652A1] text-white"
              : "bg-white text-[#1652A1] border border-[#1652A1]"
          }`}
          onClick={() => setActiveTab("issue")}
        >
          Raise an Issue
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "query"
              ? "bg-[#1652A1] text-white"
              : "bg-white text-[#1652A1] border border-[#1652A1]"
          }`}
          onClick={() => setActiveTab("query")}
        >
          Raise a Query
        </button>
      </div>

      {activeTab === "issue" ? (
        <IssueForm
          issueData={issueData}
          setIssueData={setIssueData}
          issues={issues}
          setIssues={setIssues}
        />
      ) : (
        <QueryForm
          queryData={queryData}
          setQueryData={setQueryData}
          queries={queries}
          setQueries={setQueries}
        />
      )}

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-[#1652A1] mb-4">
          Your Messages
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-[#1652A1] text-white">
              <tr>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg._id} className="border-b">
                    <td className="p-3">{msg.subject}</td>
                    <td className="p-3">{msg.body}</td>
                    <td className="p-3 capitalize">{msg.status}</td>
                    <td className="p-3">
                      {new Date(msg.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-3 text-center text-gray-500" colSpan="4">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantCommunication;
