import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Overview = () => {
  const [customerId, setCustomerId] = useState("");
  const [overview, setOverview] = useState(null);

  const fetchOverview = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/customers/${customerId}/overview`
      );
      toast.success("Overview fetched successfully");
      setOverview(res.data);
    } catch {
      toast.error("Customer not found or no loans");
      setOverview(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-[#2584C6]">
        Customer Overview
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Enter Customer ID"
          className="flex-1 text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2584C6] transition"
        />
        <button
          onClick={fetchOverview}
          className="bg-[#2584C6] text-white text-sm px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-[#1e6fa6] focus:ring-2 focus:ring-offset-1 focus:ring-[#2584C6] transition"
        >
          Fetch
        </button>
      </div>

      {overview && (
        <div className="mt-6 space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#2584C6] mb-2">
              Customer Details
            </h3>
            <p className="text-sm text-gray-700">
              <strong>Customer ID:</strong> {overview.customer_id}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Total Loans:</strong> {overview.total_loans}
            </p>
          </div>

          {overview.loans.map((loan) => (
            <div
              key={loan.loan_id}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow"
            >
              <h4 className="text-md font-semibold text-[#2584C6] mb-2">
                Loan ID: {loan.loan_id}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                <p>
                  <strong>Principal:</strong> {loan.principal}
                </p>
                <p>
                  <strong>Total Amount:</strong> {loan.total_amount}
                </p>
                <p>
                  <strong>Total Interest:</strong> {loan.total_interest}
                </p>
                <p>
                  <strong>EMI Amount:</strong> {parseFloat(loan.emi_amount).toFixed(2)}
                </p>
                <p>
                  <strong>Amount Paid:</strong> {loan.amount_paid}
                </p>
                <p>
                  <strong>EMIs Left:</strong> {loan.emis_left}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Overview;
