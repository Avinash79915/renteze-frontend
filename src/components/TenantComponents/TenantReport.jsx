import React from "react";
import { FiDownload } from "react-icons/fi"; 

const demoPayments = [
  {
    id: 1,
    date: "2025-01-05",
    description: "Rent January",
    amount: "₹25,000",
    mode: "UPI",
    transactionId: "TXN123456",
    receiptUrl: "/receipts/rent-jan.pdf", 
  },
  {
    id: 2,
    date: "2025-01-10",
    description: "Maintenance",
    amount: "₹1,500",
    mode: "Bank Transfer",
    transactionId: "TXN654321",
    receiptUrl: "/receipts/maintenance-jan.pdf",
  },
];

const TenantReport = () => {
  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <h2 className="text-2xl font-bold text-[#1652A1] mb-4">Reports</h2>
      <h3 className="text-lg font-semibold text-[#1652A1] mb-2">
        Payment History
      </h3>

      <div className="overflow-auto  shadow bg-white">
        <table className="min-w-full table-auto text-sm text-left ">
          <thead className="bg-[#F6F6F6] text-[#004C86] font-light">
            <tr>
              <th className="px-4 py-2">S/No</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Mode of Payment</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Receipt</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {demoPayments.map((payment, index) => (
              <tr
                key={payment.id}
                className=" hover:bg-gray-50"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{payment.date}</td>
                <td className="px-4 py-2">{payment.description}</td>
                <td className="px-4 py-2">{payment.amount}</td>
                <td className="px-4 py-2">{payment.mode}</td>
                <td className="px-4 py-2">{payment.transactionId}</td>
                <td className="px-4 py-2">
                  <a
                    href={payment.receiptUrl}
                    download
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <FiDownload />
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantReport;
