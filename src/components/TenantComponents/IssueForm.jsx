import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const priorityColors = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};
import api from "../../Pages/utils/axios";

const IssueForm = ({ issueData, setIssueData, issues, setIssues }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isFetching, setIsFetching] = useState(false);
  const email = user?.email;

   useEffect(() => {
    const fetchIssues = async () => {
      setIsFetching(true);
      try {
        const res = await api.get(`/tenant/issues?tenantEmail=${email}`);
        console.log("Fetched issues:", res.data.issues);
        setIssues(Array.isArray(res.data.issues) ? res.data.issues : []);
      } catch (err) {
        console.error("❌ Error fetching issues:", err);
      } finally {
        setIsFetching(false);
      }
    };

    if (isAuthenticated && email) fetchIssues();
  }, [isAuthenticated, email, setIssues]);


  // ✅ Raise new issue
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...issueData, tenantEmail: email };
    console.log("Submitting issue:", payload);
    try {
      const res = await api.post("/tenant/raise-issue", payload);
      setIssues((prev) => [...prev, res.data.issue]);
      setIssueData({ title: "", priority: "Medium", description: "" });
    } catch (err) {
      console.error("❌ Error raising issue:", err);
      alert("Failed to raise issue.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h3 className="text-xl font-semibold text-[#1652A1] mb-4">Raise an Issue</h3>

      {!isAuthenticated && !isLoading && (
        <p className="text-red-500">Please log in to raise and view issues.</p>
      )}

      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Issue Title"
            value={issueData.title}
            onChange={(e) => setIssueData({ ...issueData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <div>
            <label className="block font-medium mb-1">Priority:</label>
            <select
              value={issueData.priority}
              onChange={(e) => setIssueData({ ...issueData, priority: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <textarea
            placeholder="Issue Description"
            value={issueData.description}
            onChange={(e) => setIssueData({ ...issueData, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
          <button
            type="submit"
            className="bg-[#1652A1] text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      )}

      {isAuthenticated && (
        <>
          <h4 className="text-lg font-semibold mt-6 mb-2">Previous Issues</h4>
          {isFetching ? (
            <p>Loading issues...</p>
          ) : issues.length === 0 ? (
            <p>No issues found.</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Title</th>
                  <th className="p-2">Priority</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr key={issue._id} className="border-t">
                    <td className="p-2">{issue.title}</td>
                    <td className="p-2">
                      <span
                        className={`inline-block w-3 h-3 rounded-full mr-2 ${
                          priorityColors[issue.priority.toLowerCase()]
                        }`}
                      ></span>
                      {issue.priority}
                    </td>
                    <td className="p-2">{issue.description}</td>
                    <td className="p-2">
                      <span className="px-2 py-1 rounded text-white text-sm bg-yellow-500">
                        {issue.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default IssueForm;