import React from "react";

const QueryForm = ({ queryData, setQueryData, queries, setQueries }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setQueries([...queries, { ...queryData, status: "Pending" }]);
    setQueryData({ subject: "", description: "" });
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h3 className="text-xl font-semibold text-[#1652A1] mb-4">Raise a Query</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Subject"
          value={queryData.subject}
          onChange={(e) => setQueryData({ ...queryData, subject: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Query Description"
          value={queryData.description}
          onChange={(e) => setQueryData({ ...queryData, description: e.target.value })}
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
      <h4 className="text-lg font-semibold mt-6 mb-2">Previous Queries</h4>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Subject</th>
            <th className="p-2">Description</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{query.subject}</td>
              <td className="p-2">{query.description}</td>
              <td className="p-2">
                <span className="px-2 py-1 rounded text-white text-sm bg-yellow-500">
                  {query.status}
                </span>
              </td>
            </tr>
          ))}
          {queries.length === 0 && (
            <tr>
              <td className="p-2 text-gray-500" colSpan="3">No queries found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QueryForm;
