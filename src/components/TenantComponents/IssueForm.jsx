import React from "react";

const priorityColors = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

const IssueForm = ({ issueData, setIssueData, issues, setIssues }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setIssues([...issues, { ...issueData, status: "Pending" }]);
    setIssueData({ title: "", priority: "Medium", description: "" });
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h3 className="text-xl font-semibold text-[#1652A1] mb-4">Raise an Issue</h3>
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
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
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

      {/* Table */}
      <h4 className="text-lg font-semibold mt-6 mb-2">Previous Issues</h4>
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
          {issues.map((issue, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{issue.title}</td>
              <td className="p-2">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${priorityColors[issue.priority]}`}></span>
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
          {issues.length === 0 && (
            <tr>
              <td className="p-2 text-gray-500" colSpan="4">No issues found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IssueForm;
