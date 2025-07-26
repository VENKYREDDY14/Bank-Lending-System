import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoanForm from "./components/LoanForm";
import PaymentForm from "./components/PaymentForm";
import LedgerView from "./components/LedgerView";
import Overview from "./components/Overview";
import CreateCustomer from "./components/CreateCustomer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <Router>
    <ToastContainer />
    <Navbar />
    <div className="p-4 font-roboto">
      <Routes>
        <Route path="/" element={<LoanForm />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/ledger" element={<LedgerView />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/create-customer" element={<CreateCustomer />} />
      </Routes>
    </div>
  </Router>
);

export default App;
