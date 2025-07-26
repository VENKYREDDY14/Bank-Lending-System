import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const [loanId, setLoanId] = useState("");
  const [form, setForm] = useState({ amount: "", payment_type: "EMI" });
  const [result, setResult] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/loans/${loanId}/payments`,
        form
      );
      toast.success("Payment recorded successfully");
      setResult(res.data);
      setLoanId("");
      setForm({ amount: "", payment_type: "EMI" });
    } catch {
      toast.error("Error recording payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-20">
      <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 transition-transform transform hover:scale-[1.01]">
        <h2 className="text-xl font-semibold mb-5 text-gray-800">
          Record Payment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Loan ID
            </label>
            <input
              type="text"
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
              required
              className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2584C6] focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2584C6] focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Payment Type
            </label>
            <select
              name="payment_type"
              value={form.payment_type}
              onChange={handleChange}
              className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2584C6] focus:border-transparent transition"
            >
              <option value="EMI">EMI</option>
              <option value="LUMP_SUM">LUMP_SUM</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-[#2584C6] text-white text-sm py-2.5 rounded-lg font-medium shadow-md hover:bg-[#1e6fa6] focus:ring-2 focus:ring-offset-1 focus:ring-[#2584C6] transition"
          >
            Submit
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow text-sm">
            <h3 className="text-[#2584C6] font-semibold text-md mb-2">
              Payment Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
              {result.payment_id && (
                <p><strong>Payment ID:</strong> {result.payment_id}</p>
              )}
              {result.loan_id && (
                <p><strong>Loan ID:</strong> {result.loan_id}</p>
              )}
              {result.remaining_balance !== undefined && (
                <p>
                  <strong>Remaining Balance:</strong>{" "}
                  {result.remaining_balance}
                </p>
              )}
              {result.emis_left !== undefined && (
                <p><strong>EMIs Left:</strong> {result.emis_left}</p>
              )}
            </div>
            {result.message && (
              <p className="mt-3 text-gray-600">{result.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
