import React, { useState } from "react";

const tenantData = [
  {
    name: "John Doe",
    shop: "1135",
    property: "Birds 1",
    start: "22/01/2023",
    end: "22/01/2024",
    status: "Closing Soon",
  },
  {
    name: "Anita Sharma",
    shop: "101",
    property: "Sunrise Tower",
    start: "01/02/2024",
    end: "01/02/2025",
    status: "Occupied",
  },
  {
    name: "Vikram Singh",
    shop: "203",
    property: "Sky Plaza",
    start: "15/06/2023",
    end: "14/06/2024",
    status: "Available",
  },
  {
    name: "Sara Khan",
    shop: "402",
    property: "Palm Residency",
    start: "10/03/2024",
    end: "10/03/2025",
    status: "Occupied",
  },
  {
    name: "Ravi Patel",
    shop: "309",
    property: "Hill View",
    start: "25/07/2023",
    end: "25/07/2024",
    status: "Concerns Pending",
  },
  {
    name: "Sneha Roy",
    shop: "112",
    property: "Sunset Mall",
    start: "01/09/2023",
    end: "01/09/2024",
    status: "Available",
  },
  {
    name: "Manoj Yadav",
    shop: "507",
    property: "Birds Nest",
    start: "12/12/2023",
    end: "12/12/2024",
    status: "Closing Soon",
  },
  {
    name: "Divya Mehra",
    shop: "218",
    property: "Vista Complex",
    start: "05/04/2023",
    end: "05/04/2024",
    status: "Concerns Pending",
  },
  {
    name: "Ramesh Kumar",
    shop: "302",
    property: "Lake Side",
    start: "18/05/2023",
    end: "18/05/2024",
    status: "Occupied",
  },
  {
    name: "Priya Nair",
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
    tenantName: "John Doe",
    amount: "₹25,000",
    invoiceMonth: "January 2024",
    invoiceType: "Rent",
    status: "Paid",
    paidOn: "15/01/2024",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 2,
    tenantName: "Anita Sharma",
    amount: "₹30,000",
    invoiceMonth: "February 2024",
    invoiceType: "Rent",
    status: "Unpaid",
    paidOn: "-",
    paymentMethod: "-",
  },
  {
    id: 3,
    tenantName: "Vikram Singh",
    amount: "₹15,000",
    invoiceMonth: "January 2024",
    invoiceType: "Maintenance",
    status: "Paid",
    paidOn: "10/01/2024",
    paymentMethod: "Cash",
  },
  {
    id: 4,
    tenantName: "Sara Khan",
    amount: "₹28,000",
    invoiceMonth: "February 2024",
    invoiceType: "Rent",
    status: "Unpaid",
    paidOn: "-",
    paymentMethod: "-",
  },
  {
    id: 5,
    tenantName: "Ravi Patel",
    amount: "₹22,000",
    invoiceMonth: "January 2024",
    invoiceType: "Rent",
    status: "Paid",
    paidOn: "05/01/2024",
    paymentMethod: "UPI",
  },
  {
    id: 6,
    tenantName: "Sneha Roy",
    amount: "₹35,000",
    invoiceMonth: "February 2024",
    invoiceType: "Rent",
    status: "Unpaid",
    paidOn: "-",
    paymentMethod: "-",
  },
  {
    id: 7,
    tenantName: "Manoj Yadav",
    amount: "₹12,000",
    invoiceMonth: "January 2024",
    invoiceType: "Utilities",
    status: "Paid",
    paidOn: "20/01/2024",
    paymentMethod: "Cheque",
  },
  {
    id: 8,
    tenantName: "Divya Mehra",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentData, setPaymentData] = useState(initialPaymentData);
  const [paymentSearchTerm, setPaymentSearchTerm] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");

  const filteredTenants = tenantData.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.shop.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "" || tenant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredPayments = paymentData.filter((payment) => {
    const matchesSearch =
      payment.tenantName
        .toLowerCase()
        .includes(paymentSearchTerm.toLowerCase()) ||
      payment.shop.toLowerCase().includes(paymentSearchTerm.toLowerCase()) ||
      payment.invoiceMonth
        .toLowerCase()
        .includes(paymentSearchTerm.toLowerCase());

    const matchesStatus =
      paymentStatusFilter === "" || payment.status === paymentStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const updatePaymentStatus = (id, newStatus, paymentMethod = "") => {
    setPaymentData((prevData) =>
      prevData.map((payment) => {
        if (payment.id === id) {
          const currentDate = new Date().toLocaleDateString("en-GB");
          return {
            ...payment,
            status: newStatus,
            paidOn: newStatus === "Paid" ? currentDate : "-",
            paymentMethod: newStatus === "Paid" ? paymentMethod : "-",
          };
        }
        return payment;
      })
    );
  };

  const handleStatusChange = (id, newStatus) => {
    if (newStatus === "Paid") {
      const paymentMethod = prompt(
        "Enter payment method (Bank Transfer, Cash, UPI, Cheque):"
      );
      if (paymentMethod) {
        updatePaymentStatus(id, newStatus, paymentMethod);
      }
    } else {
      updatePaymentStatus(id, newStatus);
    }
  };

  return (
    <div className="p-2 md:p-6">
      <h1 className="text-2xl mb-5 text-[#1652A1]">Reports</h1>

      {/* Status Indicators */}
      <div className="flex gap-2 md:gap-3 mb-5 flex-wrap">
  {Object.entries(statusColors).map(([label, color]) => (
    <div
      key={label}
      onClick={() => setStatusFilter(statusFilter === label ? "" : label)}
      className={`flex items-center gap-2 rounded-full cursor-pointer bg-[#F6F6F6] p-2 md:p-3 w-full sm:w-1/2 md:w-60 hover:bg-white hover:shadow transition ${
        statusFilter === label ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <span
        className={`w-8 h-8 md:w-10 md:h-10 rounded-full shrink-0 mt-1 ${color}`}
      ></span>
      <span className="break-words flex-1 text-sm md:text-base">{label}</span>
    </div>
  ))}
</div>

      {/* Tenant Report Section */}
      <h2 className="text-2xl mb-3 text-[#1652A1]">Tenant Report</h2>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by tenant name / Shop No"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tenant Table */}
      <div className="overflow-x-auto mb-8 w-full">
        <table className="w-full border-collapse text-sm md:text-md hidden md:table">
          <thead>
            <tr className="bg-gray-100 text-left text-[#1652A1]">
              <th className="p-2 md:p-3 border-b border-gray-200">
                Tenant Name
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">Shop No.</th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Building/Property
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Tenancy Start
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Tenancy End
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.length > 0 ? (
              filteredTenants.map((tenant, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 md:p-3">{tenant.name}</td>
                  <td className="p-2 md:p-3">{tenant.shop}</td>
                  <td className="p-2 md:p-3">{tenant.property}</td>
                  <td className="p-2 md:p-3">{tenant.start}</td>
                  <td className="p-2 md:p-3">{tenant.end}</td>
                  <td className="p-2 md:p-3">
                    <span
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-full inline-block ${
                        statusColors[tenant.status]
                      }`}
                    ></span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-3 md:py-4 text-gray-500 text-sm md:text-md"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile Card Layout */}
        <div className="md:hidden divide-y-5 divide-gray-200">
          {filteredTenants.length > 0 ? (
            filteredTenants.map((tenant, index) => (
              <div key={index} className="p-1 bg-white">
                <div className="flex flex-col gap-2 text-md">
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Tenant Name:
                    </span>{" "}
                    {tenant.name}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Shop No.:
                    </span>{" "}
                    {tenant.shop}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Building/Property:
                    </span>{" "}
                    {tenant.property}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Tenancy Start:
                    </span>{" "}
                    {tenant.start}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Tenancy End:
                    </span>{" "}
                    {tenant.end}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">Status:</span>{" "}
                    <span
                      className={`w-3 h-3 rounded-full inline-block ${
                        statusColors[tenant.status]
                      }`}
                    ></span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500 text-sm">
              No records found.
            </div>
          )}
        </div>
      </div>

      {/* Payment Report Section */}
      <h2 className="text-2xl mb-3 text-[#1652A1]">Payment Report</h2>

      {/* Payment Status Indicators */}
      <div className="flex gap-3 mb-5 flex-wrap">
        {Object.entries(paymentStatusColors).map(([label, color]) => (
          <div
            key={label}
            onClick={() =>
              setPaymentStatusFilter(paymentStatusFilter === label ? "" : label)
            }
            className={`flex items-center gap-2 rounded-full cursor-pointer bg-[#F6F6F6] p-3 w-40 hover:bg-white hover:shadow transition ${
              paymentStatusFilter === label ? "ring-2 ring-blue-400" : ""
            }`}
          >
            <span
              className={`w-8 h-8 rounded-full shrink-0 ${color.split(" ")[0]}`}
            ></span>
            <span className="break-words flex-1">{label}</span>
          </div>
        ))}
      </div>

      {/* Payment Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by tenant name / Shop No / Invoice Month"
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
              <th className="p-2 md:p-3 border-b border-gray-200">Status</th>
              <th className="p-2 md:p-3 border-b border-gray-200">Paid On</th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Payment Method
              </th>
              <th className="p-2 md:p-3 border-b border-gray-200">
                Update Status
              </th>
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
                    <span
                      className={`px-1 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-semibold ${
                        paymentStatusColors[payment.status]
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-2 md:p-3">{payment.paidOn}</td>
                  <td className="p-2 md:p-3">{payment.paymentMethod}</td>
                  <td className="p-2 md:p-3">
                    <select
                      value={payment.status}
                      onChange={(e) =>
                        handleStatusChange(payment.id, e.target.value)
                      }
                      className="p-1 md:p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
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

        {/* Mobile Card Layout */}
        <div className="md:hidden divide-y divide-gray-200">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <div key={payment.id} className="p-1 bg-white">
                <div className="flex flex-col gap-2 text-md">
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Tenant Name:
                    </span>{" "}
                    {payment.tenantName}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">Amount:</span>{" "}
                    <span className="font-semibold">{payment.amount}</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Invoice Month:
                    </span>{" "}
                    {payment.invoiceMonth}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Invoice Type:
                    </span>{" "}
                    {payment.invoiceType}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">Status:</span>{" "}
                    <span
                      className={`px-1 py-0.5 rounded-full text-xs font-semibold ${
                        paymentStatusColors[payment.status]
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">Paid On:</span>{" "}
                    {payment.paidOn}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Payment Method:
                    </span>{" "}
                    {payment.paymentMethod}
                  </div>
                  <div>
                    <span className="font-medium text-[#1652A1]">
                      Update Status:
                    </span>
                    <select
                      value={payment.status}
                      onChange={(e) =>
                        handleStatusChange(payment.id, e.target.value)
                      }
                      className="p-1 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mt-1"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500 text-sm">
              No payment records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
