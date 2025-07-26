import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LedgerView = () => {
  const [loanId, setLoanId] = useState("");
  const [ledger, setLedger] = useState(null);

  const fetchLedger = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/loans/${loanId}/ledger`
      );
      toast.success("Ledger fetched successfully");
      setLedger(res.data);
    } catch {
      toast.error("Loan not found");
      setLedger(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-[#2584C6]">Loan Ledger</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          placeholder="Enter Loan ID"
          className="flex-1 text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2584C6] transition"
        />
        <button
          onClick={fetchLedger}
          className="bg-[#2584C6] text-white text-sm px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-[#1e6fa6] focus:ring-2 focus:ring-offset-1 focus:ring-[#2584C6] transition"
        >
          Fetch
        </button>
      </div>

      {ledger && (
        <div className="mt-6 space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#2584C6] mb-2">
              Loan Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <p><strong>Loan ID:</strong> {ledger.loan_id}</p>
              <p><strong>Customer ID:</strong> {ledger.customer_id}</p>
              <p><strong>Principal:</strong> {ledger.principal}</p>
              <p><strong>Total Amount:</strong> {ledger.total_amount}</p>
              <p><strong>Monthly EMI:</strong> {parseFloat(ledger.monthly_emi).toFixed(2)}</p>
              <p><strong>Amount Paid:</strong> {ledger.amount_paid}</p>
              <p><strong>Balance Amount:</strong> {ledger.balance_amount}</p>
              <p><strong>EMIs Left:</strong> {ledger.emis_left}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow">
            <h4 className="text-md font-semibold text-[#2584C6] mb-3">
              Transactions
            </h4>
            {ledger.transactions && ledger.transactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200">
                  <thead className="bg-[#2584C6] text-white">
                    <tr>
                      <th className="px-3 py-2 text-left">Transaction ID</th>
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-left">Amount</th>
                      <th className="px-3 py-2 text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledger.transactions.map((txn) => (
                      <tr key={txn.transaction_id} className="border-b border-gray-200">
                        <td className="px-3 py-2">{txn.transaction_id}</td>
                        <td className="px-3 py-2">
                          {new Date(txn.date).toLocaleString()}
                        </td>
                        <td className="px-3 py-2">{txn.amount}</td>
                        <td className="px-3 py-2">{txn.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No transactions found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LedgerView;
