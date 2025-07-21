import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";
import logo from "../assets/inv-logo.svg";
import api from "../Pages/utils/axios";

const PaymentReport = ({ initialPaymentData, paymentStatusColors }) => {
  const [paymentData, setPaymentData] = useState(initialPaymentData);
  const [paymentSearchTerm, setPaymentSearchTerm] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentTenantId, setCurrentTenantId] = useState(null);
  const [currentPaymentIndex, setCurrentPaymentIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPaymentId, setCurrentPaymentId] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
      paymentMethod: "",
      paymentMode: "",
      notes: "",
      date: new Date().toISOString().slice(0, 10),
      status: "Unpaid",
    },
  });

  const status = watch("status");

  const filteredPayments = paymentData.filter((payment) => {
    const matchesSearch =
      payment.tenantName
        .toLowerCase()
        .includes(paymentSearchTerm.toLowerCase()) ||
      payment.invoiceMonth
        .toLowerCase()
        .includes(paymentSearchTerm.toLowerCase());

    const matchesStatus =
      paymentStatusFilter === "" || payment.status === paymentStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const openEditModal = (payment, index) => {
    setCurrentTenantId(payment.tenantId);
    setCurrentPaymentIndex(index);

    setValue("amount", payment.amount);
    setValue("paymentMethod", payment.paymentMethod || "");
    setValue("paymentMode", payment.paymentMode || "Full");
    setValue("notes", payment.notes || "");
    setCurrentPaymentId(payment.id);

    const paidOnDate = payment.paidOn ? new Date(payment.paidOn) : new Date();
    const validDate = isNaN(paidOnDate.getTime()) ? new Date() : paidOnDate;
    setValue("date", validDate.toISOString().slice(0, 10));

    setValue("status", payment.status);

    setShowModal(true);
  };

  const tenantMap = paymentData.reduce((acc, payment) => {
    if (!acc[payment.tenantId]) {
      acc[payment.tenantId] = {
        tenantId: payment.tenantId,
        tenantName: payment.tenantName,
        rent: payment.rent,
        ownerEmail: payment.ownerEmail,
        paymentHistory: [],
      };
    }
    acc[payment.tenantId].paymentHistory.push(payment);
    return acc;
  }, {});

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (!currentTenantId) {
        alert("❌ Tenant ID not set!");
        setLoading(false);
        return;
      }

      const tenant = tenantMap[currentTenantId];

      if (!tenant?.paymentHistory) {
        alert("❌ Payment history not found!");
        setLoading(false);
        return;
      }

     const updatedPaymentHistory = tenant.paymentHistory.map((payment) => {
  if (payment.id === currentPaymentId) {
    const rent = Number(tenant.rent);
    const updatedAmount = Number(data.amount);

    return {
      ...payment,
      amount: updatedAmount,
      paidOn: data.date === "-" || !data.date ? null : data.date,
      paymentMethod: data.paymentMethod,
      paymentMode: data.paymentMode,
      notes: data.notes,
      status:
        updatedAmount >= rent
          ? "Paid"
          : updatedAmount > 0
          ? "Partial"
          : "Unpaid",
    };
  }
  return payment;
});


      const tenantMongoId = tenant._id || currentTenantId;

      const response = await api.put(
        `/tenants/${tenantMongoId}?testEmail=${tenant.ownerEmail}`,
        { paymentHistory: updatedPaymentHistory }
      );

      console.log("✅ Payment Updated:", response.data);

      const updatedPayments = updatedPaymentHistory.map((payment, idx) => ({
        ...payment,
        id: `${tenantMongoId}-${idx}`,
        tenantId: tenantMongoId,
        tenantName: tenant.tenantName,
        rent: tenant.rent,
        ownerEmail: tenant.ownerEmail,
      }));

      setPaymentData((prev) => [
        ...prev.filter((p) => p.tenantId !== tenantMongoId),
        ...updatedPayments,
      ]);

      alert("✅ Payment updated");
      setShowModal(false);
      reset();
    } catch (error) {
      console.error("❌ Error:", error);
      alert(error?.response?.data?.message || "Payment update failed");
    } finally {
      setLoading(false);
    }
  };

  const generateInvoicePDF = (payment) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter",
    });

    doc.setFontSize(20);
    doc.setTextColor(22, 82, 161);
    doc.text("Invoice", 0.5, 0.8);

    doc.setFontSize(14);
    doc.text("Payment Details", 0.5, 1.2);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const details = [
      `Tenant Name: ${payment.tenantName}`,
      `Invoice Month: ${payment.invoiceMonth}`,
      `Invoice Type: ${payment.invoiceType}`,
      `Monthly Rent: ${payment.rent}`,
      `Amount: ${payment.amount}`,
      `Payment Date: ${payment.paidOn}`,
      `Payment Method: ${payment.paymentMethod}`,
      `Notes: ${payment.notes || "-"}`,
    ];

    details.forEach((line, index) => {
      doc.text(line, 0.5, 1.5 + index * 0.3);
    });

    doc.setLineWidth(0.01);
    doc.line(0.5, 3.8, 8.0, 3.8);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString("en-GB")}`,
      0.5,
      4.0
    );
    doc.text("Thank you for your payment!", 0.5, 4.2);

    doc.save(`Invoice_${payment.tenantName}_${payment.invoiceMonth}.pdf`);
  };

  return (
    <div>
      <h2 className="text-2xl mb-3 text-[#1652A1]">Payment Report</h2>

      <div className="flex gap-3 mb-5 flex-wrap">
        {Object.entries(paymentStatusColors).map(([label, color]) => {
          const isActive = paymentStatusFilter === label;
          return (
            <div
              key={label}
              onClick={() => setPaymentStatusFilter(isActive ? "" : label)}
              className={`flex items-center gap-2 rounded-full cursor-pointer
                bg-gray-50 p-3 w-40
                shadow-md hover:shadow-none active:shadow-none
                transition-all duration-200 ease-in-out
                ${isActive ? "shadow-none bg-gray-200" : ""}`}
            >
              <span
                className={`w-8 h-8 rounded-full shrink-0 ${
                  color.split(" ")[0]
                }`}
              ></span>
              <span className="break-words flex-1 text-sm">{label}</span>
            </div>
          );
        })}
      </div>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by tenant name / Invoice Month"
          value={paymentSearchTerm}
          onChange={(e) => setPaymentSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse text-sm md:text-md hidden md:table">
          <thead>
            <tr className="bg-gray-100 text-left text-[#1652A1]">
              <th className="p-2 md:p-3 border-b border-gray-200">
                Tenant Name
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Monthly Rent
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">Amount</th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Invoice Month
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Invoice Type
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">Status</th>
              <th className="p-2 md:p-3 border-b border-gray-200">Paid On</th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Payment Method
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <tr key={payment.id} className="border-b">
                  <td className="p-2 md:p-3">{payment.tenantName}</td>
                  <td className="p-2 md:p-3 font-semibold">{payment.rent}</td>
                  <td className="p-2 md:p-3 font-semibold">{payment.amount}</td>
                  <td className="p-2 md:p-3">{payment.invoiceMonth}</td>
                  <td className="p-2 md:p-3">{payment.invoiceType}</td>
                  <td className="p-2 md:p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        paymentStatusColors[payment.status]
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-2 md:p-3">{payment.paidOn}</td>
                  <td className="p-2 md:p-3">{payment.paymentMethod}</td>
                  <td className="p-2 md:p-3 flex items-center gap-2">
                    <button
                      className="text-[#1652A1] hover:text-blue-700"
                      onClick={() => openEditModal(payment, index)}
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => generateInvoicePDF(payment)}
                    >
                      <FaFilePdf className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-3 md:py-4 text-gray-500 text-sm md:text-md"
                >
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-[#1652A1]">
              Update Payment
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className="w-full p-2 border rounded"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  {...register("amount", {
                    required: "Amount is required",
                    min: { value: 1, message: "Amount must be greater than 0" },
                    valueAsNumber: true,
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <input
                  type="text"
                  {...register("paymentMethod", {
                    required: "Payment Method is required",
                  })}
                  placeholder="Cash, UPI, Bank Transfer..."
                  className="w-full p-2 border rounded"
                />
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes / Memo
                </label>
                <textarea
                  {...register("notes")}
                  className="w-full p-2 border rounded"
                  rows="2"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm bg-gray-300 rounded"
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-sm bg-blue-600 text-white rounded ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentReport;
