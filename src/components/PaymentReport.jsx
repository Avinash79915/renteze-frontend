import React, { useState } from "react";
import { FaEdit, FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";
import logo from "../assets/inv-logo.svg"; // Adjust path if needed

const PaymentReport = ({ initialPaymentData, paymentStatusColors }) => {
  const [paymentData, setPaymentData] = useState(initialPaymentData);
  const [paymentSearchTerm, setPaymentSearchTerm] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPaymentId, setCurrentPaymentId] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
    notes: "",
    date: new Date().toLocaleDateString("en-GB"),
  });

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

  const updatePaymentStatus = (
    id,
    newStatus,
    paymentMethod = "",
    paidOn = "",
    amount = "",
    notes = ""
  ) => {
    setPaymentData((prevData) =>
      prevData.map((payment) => {
        if (payment.id === id) {
          return {
            ...payment,
            status: newStatus,
            paidOn: newStatus === "Paid" ? paidOn : "-",
            paymentMethod: newStatus === "Paid" ? paymentMethod : "-",
            amount: newStatus === "Paid" ? amount : payment.amount,
            notes: newStatus === "Paid" ? notes : "-",
          };
        }
        return payment;
      })
    );
  };

  const handleStatusChange = (id, newStatus) => {
    const payment = paymentData.find((p) => p.id === id);
    if (payment.status === "Paid") {
      alert(
        "Sorry, payments marked as 'Paid' can only be edited via the Edit button."
      );
      return;
    }

    if (newStatus === "Paid") {
      setCurrentPaymentId(id);
      setFormData({
        amount: payment.amount,
        paymentMethod: "",
        notes: "",
        date: new Date().toLocaleDateString("en-GB"),
      });
      setShowModal(true);
    }
  };

  const handleFormSubmit = () => {
    updatePaymentStatus(
      currentPaymentId,
      "Paid",
      formData.paymentMethod,
      formData.date,
      formData.amount,
      formData.notes
    );
    setShowModal(false);
  };

  const generateInvoicePDF = (payment) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter",
    });

    // Title
    doc.setFontSize(20);
    doc.setTextColor(22, 82, 161); // #1652A1
    doc.text("Invoice", 0.5, 0.8);

    // Payment Details
    doc.setFontSize(14);
    doc.text("Payment Details", 0.5, 1.2);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const details = [
      `Tenant Name: ${payment.tenantName}`,
      `Invoice Month: ${payment.invoiceMonth}`,
      `Invoice Type: ${payment.invoiceType}`,
      `Amount: ${payment.amount}`,
      `Payment Date: ${payment.paidOn}`,
      `Payment Method: ${payment.paymentMethod}`,
      `Notes: ${payment.notes || "-"}`,
    ];

    details.forEach((line, index) => {
      doc.text(line, 0.5, 1.5 + index * 0.3);
    });

    // Footer
    doc.setLineWidth(0.01);
    doc.line(0.5, 3.8, 8.0, 3.8); // Horizontal line
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); // Gray
    doc.text(
      `Generated on: ${new Date().toLocaleDateString("en-GB")}`,
      0.5,
      4.0
    );
    doc.text("Thank you for your payment!", 0.5, 4.2);

    // Save the PDF
    doc.save(`Invoice_${payment.tenantName}_${payment.invoiceMonth}.pdf`);
  };

  return (
    <div>
      <h2 className="text-2xl mb-3 text-[#1652A1]">Payment Report</h2>

      {/* Payment Status Indicators */}
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

      {/* Payment Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by tenant name / Invoice Month"
          value={paymentSearchTerm}
          onChange={(e) => setPaymentSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Payment Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse text-sm md:text-md hidden md:table">
          <thead>
            <tr className="bg-gray-100 text-left text-[#1652A1]">
              <th className="p-2 md:p-3 border-b border-gray-200">
                Tenant Name
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">Amount</th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Invoice Month
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Invoice Type
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Payment Mode
              </th>{" "}
              {/* ✅ NEW COLUMN */}
              <th className="p-2 md:p-3 border-b border-gray-200">Status</th>
              <th className="p-2 md:p-3 border-b border-gray-200">Paid On</th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Payment Method
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">Actions</th>{" "}
              {/* ✅ Updated label */}
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="p-2 md:p-3">{payment.tenantName}</td>
                  <td className="p-2 md:p-3 font-semibold">{payment.amount}</td>
                  <td className="p-2 md:p-3">{payment.invoiceMonth}</td>
                  <td className="p-2 md:p-3">{payment.invoiceType}</td>
                  <td className="p-2 md:p-3">
                    {payment.paymentMode || "Full"}
                  </td>{" "}
                  {/* ✅ NEW CELL */}
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
                    {/* ✅ Removed the status select; only show edit & PDF buttons */}
                    <button
                      className="text-[#1652A1] hover:text-blue-700"
                      onClick={() => {
                        setCurrentPaymentId(payment.id);
                        setFormData({
                          amount: payment.amount,
                          paymentMethod: payment.paymentMethod,
                          notes: payment.notes || "",
                          date: payment.paidOn,
                        });
                        setShowModal(true);
                      }}
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
                  colSpan="9" // ✅ Updated colspan to match new column count
                  className="text-center py-3 md:py-4 text-gray-500 text-sm md:text-md"
                >
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4 text-[#1652A1]">
                {paymentData.find((p) => p.id === currentPaymentId)?.status ===
                "Paid"
                  ? "Edit Payment Info"
                  : "Mark as Paid"}
              </h3>

              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.date}
                  disabled
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Bank Transfer, UPI, Cash..."
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                />
              </div>

              {/* ✅ New Payment Mode Dropdown */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Payment Mode
                </label>
                <select
                  className="w-full p-2 border rounded text-sm"
                  value={formData.paymentMode || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMode: e.target.value })
                  }
                >
                  <option value="">Select payment mode</option>
                  <option value="Full">Full Payment</option>
                  <option value="Split">Split Payment</option>
                  <option value="Partial">Partial Payment</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Notes / Memo
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows="2"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 text-sm bg-gray-300 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
                  onClick={handleFormSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentReport;
