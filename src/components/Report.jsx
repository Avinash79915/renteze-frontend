import React, { useState } from "react";
import TenantReport from "../components/TenantReport";
import PaymentReport from "../components/PaymentReport";

const tenantData = [
  {
    name: "Avinash k",
    shop: "1135",
    property: "Birds 1",
    start: "22/01/2023",
    end: "22/01/2024",
    status: "Closing Soon",
  },
  // ... (rest of tenantData remains unchanged)
  {
    name: "Atul",
    shop: "134",
    property: "Skyline Plaza",
    start: "20/06/2023",
    end: "20/06/2024",
    status: "Available",
  },
];

const initialPaymentData = [
  {
    id: 1,
    tenantName: "Aviansh",
    amount: "₹25,000",
    invoiceMonth: "January 2024",
    invoiceType: "Rent",
    status: "Paid",
    paidOn: "15/01/2024",
    paymentMethod: "Bank Transfer",
  },
  // ... (rest of initialPaymentData remains unchanged)
  {
    id: 8,
    tenantName: "Tushar",
    amount: "₹26,000",
    invoiceMonth: "February 2024",
    invoiceType: "Rent",
    status: "Unpaid",
    paidOn: "-",
    paymentMethod: "-",
  },
];

const statusColors = {
  Occupied: "bg-green-500",
  Available: "bg-red-500",
  "Closing Soon": "bg-orange-500",
  "Concerns Pending": "bg-purple-500",
};

const paymentStatusColors = {
  Paid: "bg-green-500 text-white",
  Unpaid: "bg-red-500 text-white",
};

const Reports = () => {
  const [activeReport, setActiveReport] = useState("payment");

  return (
    <div className="p-2 md:p-6">
      <h1 className="text-2xl mb-5 text-[#1652A1]">Reports</h1>
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setActiveReport("payment")}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ease-in-out ${
            activeReport === "payment"
              ? "bg-[#1652A1] text-white"
              : "bg-gray-200 text-[#1652A1]"
          }`}
        >
          Payment Report
        </button>
        <button
          onClick={() => setActiveReport("tenant")}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ease-in-out ${
            activeReport === "tenant"
              ? "bg-[#1652A1] text-white"
              : "bg-gray-200 text-[#1652A1]"
          }`}
        >
          Tenant Report
        </button>
      </div>

      {activeReport === "tenant" ? (
        <TenantReport tenantData={tenantData} statusColors={statusColors} />
      ) : (
        <PaymentReport
          initialPaymentData={initialPaymentData}
          paymentStatusColors={paymentStatusColors}
        />
      )}
    </div>
  );
};

export default Reports;
