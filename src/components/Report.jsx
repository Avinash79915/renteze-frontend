import React, { useState, useEffect } from "react";
import TenantReport from "../components/TenantReport";
import PaymentReport from "../components/PaymentReport";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../../src/Pages/utils/axios";

const statusColors = {
  Occupied: "bg-green-500",
  Available: "bg-red-500",
  "Closing Soon": "bg-orange-500",
  "Concerns Pending": "bg-purple-500",
};

const paymentStatusColors = {
  Paid: "bg-green-500 text-white",
  Unpaid: "bg-red-500 text-white",
  Partial: "bg-yellow-500 text-white",
};

const Reports = () => {
  const [activeReport, setActiveReport] = useState("payment");
  const [tenantData, setTenantData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/tenants/owner-by-email?email=${user.email}`
        );
        const tenants = response.data.tenants || [];

        // Tenant Report
        const transformedTenants = tenants.map((tenant) => ({
          name: tenant.name,
          shop: tenant.unit?.roomId || "N/A",
          property: tenant.unit?.propertyId?.name || "Unknown Property",
          start: new Date(tenant.agreementStartDate).toLocaleDateString(
            "en-GB"
          ),
          end: new Date(tenant.agreementEndDate).toLocaleDateString("en-GB"),
          status: "Occupied",
        }));
        setTenantData(transformedTenants);

        // Payment Report
        const transformedPayments = tenants.flatMap((tenant) =>
          (tenant.paymentHistory || []).map((payment, index) => ({
            id: `${tenant._id}-${index}`,
            tenantId: tenant._id,
            tenantName: tenant.name,
            amount: payment.amount,
            invoiceMonth: payment.invoiceMonth,
            invoiceType: payment.invoiceType,
            status: payment.status,
            paidOn: payment.paidOn
              ? new Date(payment.paidOn).toLocaleDateString("en-GB")
              : "-",
            paymentMethod: payment.paymentMethod || "-",
            paymentMode: payment.paymentMode || "Full",
            notes: payment.notes || "-",

            // ✅ ADD THESE FIELDS
            rent: tenant.rent,
            ownerEmail: tenant.ownerEmail,
            paymentHistory: tenant.paymentHistory,
          }))
        );

        setPaymentData(transformedPayments);
      } catch (err) {
        console.error("Error fetching report data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!isLoading && isAuthenticated && user?.email) {
      fetchData();
    }
  }, [isLoading, isAuthenticated, user?.email]);

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

      {loading ? (
        <div className="text-center text-[#1652A1] font-semibold">
          Loading reports...
        </div>
      ) : activeReport === "tenant" ? (
        <TenantReport tenantData={tenantData} statusColors={statusColors} />
      ) : (
        <PaymentReport
          initialPaymentData={paymentData}
          paymentStatusColors={paymentStatusColors}
        />
      )}
    </div>
  );
};

export default Reports;
