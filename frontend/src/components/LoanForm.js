import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LoanForm = () => {
  const [data, setData] = useState({
    customer_id: "",
    loan_amount: "",
    loan_period_years: "",
    interest_rate_yearly: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/loans`,
        data
      );
      toast.success(`Loan Created! ID: ${res.data.loan_id}`);
      setData({
        customer_id: "",
        loan_amount: "",
        loan_period_years: "",
        interest_rate_yearly: "",
      });
    } catch {
      toast.error("Error creating loan");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-20">
      <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 transition-transform transform hover:scale-[1.01]">
        <h2 className="text-xl font-semibold mb-5 text-gray-800">
          Create Loan
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            "customer_id",
            "loan_amount",
            "loan_period_years",
            "interest_rate_yearly",
          ].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 text-sm font-medium mb-1 capitalize">
                {field.replace(/_/g, " ")}
              </label>
              <input
                type="text"
                name={field}
                value={data[field]}
                onChange={handleChange}
                required
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2584C6] focus:border-transparent transition"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-[#2584C6] text-white text-sm py-2.5 rounded-lg font-medium shadow-md hover:bg-[#1e6fa6] focus:ring-2 focus:ring-offset-1 focus:ring-[#2584C6] transition"
          >
            Create Loan
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
