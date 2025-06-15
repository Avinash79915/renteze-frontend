import React, { useState } from "react";
import IssueForm from "./TenantComponents/IssueForm";
import QueryForm from "./TenantComponents/QueryForm";

const TenantCommunication = () => {
  const [activeTab, setActiveTab] = useState("issue");
  const [issues, setIssues] = useState([]);
  const [queries, setQueries] = useState([]);

  const [issueData, setIssueData] = useState({
    title: "",
    priority: "Medium",
    description: "",
  });

  const [queryData, setQueryData] = useState({
    subject: "",
    description: "",
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-[#1652A1] mb-4">Tenant Communication</h2>

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
    </div>
  );
};

export default TenantCommunication;
