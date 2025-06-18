import React, { useState } from "react";
import {
  FiDownload,
  FiCalendar,
  FiCreditCard,
  FiFileText,
  FiFilter,
  FiSearch,
} from "react-icons/fi";

const demoPayments = [
  {
    id: 1,
    date: "2025-01-05",
    description: "Rent January",
    amount: "₹25,000",
    mode: "UPI",
    transactionId: "TXN123456",
    receiptUrl: "/receipts/rent-jan.pdf",
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-01-10",
    description: "Maintenance",
    amount: "₹1,500",
    mode: "Bank Transfer",
    transactionId: "TXN654321",
    receiptUrl: "/receipts/maintenance-jan.pdf",
    status: "Completed",
  },
  {
    id: 3,
    date: "2025-01-15",
    description: "Utility Bills",
    amount: "₹3,200",
    mode: "Credit Card",
    transactionId: "TXN789012",
    receiptUrl: "/receipts/utility-jan.pdf",
    status: "Completed",
  },
  {
    id: 4,
    date: "2025-01-20",
    description: "Parking Fee",
    amount: "₹800",
    mode: "UPI",
    transactionId: "TXN345678",
    receiptUrl: "/receipts/parking-jan.pdf",
    status: "Pending",
  },
];

const TenantReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("All");

  const filteredPayments = demoPayments.filter((payment) => {
    const matchesSearch =
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterMode === "All" || payment.mode === filterMode;
    return matchesSearch && matchesFilter;
  });

  const totalAmount = demoPayments.reduce((sum, payment) => {
    return sum + parseInt(payment.amount.replace(/[₹,]/g, ""));
  }, 0);

  const getStatusBadge = (status) => {
    if (status === "Completed") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Pending
      </span>
    );
  };

  const getPaymentModeIcon = (mode) => {
    switch (mode) {
      case "UPI":
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
      case "Bank Transfer":
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case "Credit Card":
        return <div className="w-2 h-2 bg-purple-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className=" mx-auto p-1">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Payment Reports
          </h1>
          <p className="text-slate-600">
            Track and manage your payment history
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiCreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">
                  Total Payments
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  ₹{totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FiFileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {demoPayments.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FiCalendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">This Month</p>
                <p className="text-2xl font-bold text-slate-900">Jan 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <FiFilter className="text-slate-400 w-5 h-5" />
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="All">All Payment Methods</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800">
              Payment History
            </h3>
          </div>

          <div className="overflow-x-auto">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-xs md:text-sm hidden md:table">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-2 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-2 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-2 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-2 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-2 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-2 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredPayments.map((payment, index) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap">
                        <div>
                          <div className="text-xs md:text-sm font-medium text-slate-900">
                            {payment.description}
                          </div>
                          <div className="text-xs text-slate-500">
                            {payment.transactionId}
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap">
                        <div className="text-xs md:text-sm text-slate-900">
                          {new Date(payment.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap">
                        <div className="text-xs md:text-sm font-semibold text-slate-900">
                          {payment.amount}
                        </div>
                      </td>
                      <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 md:gap-2">
                          {getPaymentModeIcon(payment.mode)}
                          <span className="text-xs md:text-sm text-slate-700">
                            {payment.mode}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap">
                        <button className="inline-flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                          <FiDownload className="w-3 h-3 md:w-4 md:h-4" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Card Layout */}
              <div className="md:hidden divide-y divide-slate-200">
                {filteredPayments.map((payment, index) => (
                  <div key={payment.id} className="p-3 bg-white">
                    <div className="flex flex-col gap-2 text-md">
                      <div>
                        <span className="font-medium text-slate-500">
                          Transaction:
                        </span>
                        <div className="text-md font-medium text-slate-900 mt-1">
                          {payment.description}
                        </div>
                        <div className="text-md text-slate-500">
                          {payment.transactionId}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-slate-500">
                          Date:
                        </span>{" "}
                        {new Date(payment.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div>
                        <span className="font-medium text-slate-500">
                          Amount:
                        </span>{" "}
                        <span className="font-semibold text-slate-900">
                          {payment.amount}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-500">
                          Payment Method:
                        </span>
                        <div className="flex items-center gap-1 mt-1">
                          {getPaymentModeIcon(payment.mode)}
                          <span className="text-xs text-slate-700">
                            {payment.mode}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-slate-500">
                          Status:
                        </span>{" "}
                        {getStatusBadge(payment.status)}
                      </div>
                      <div>
                        <span className="font-medium text-slate-500">
                          Receipt:
                        </span>
                        <button className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors mt-1">
                          <FiDownload className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <FiFileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No payments found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantReport;
