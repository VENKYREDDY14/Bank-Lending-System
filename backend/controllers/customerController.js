import Loan from '../models/loanModel.js';
import Customer from '../models/customerModel.js';
import Payment from '../models/paymentModel.js';

export const getOverview = async (req, res) => {
    try {
      const { customer_id } = req.params;
  
      // Ensure customer exists
      const customer = await Customer.findByPk(customer_id);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      const loans = await Loan.findAll({ where: { customer_id } });
      if (!loans.length) {
        return res.status(404).json({ message: "No loans found for this customer" });
      }
  
      const overview = await Promise.all(
        loans.map(async (loan) => {
          // Fetch all payments for this loan
          const payments = await Payment.findAll({ where: { loan_id: loan.loan_id } });
          const amount_paid = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
  
          const total_interest = parseFloat(loan.total_amount) - parseFloat(loan.principal_amount);
          const remaining = parseFloat(loan.total_amount) - amount_paid;
          const emis_left = remaining > 0 ? Math.ceil(remaining / loan.monthly_emi) : 0;
  
          return {
            loan_id: loan.loan_id,
            principal: loan.principal_amount,
            total_amount: loan.total_amount,
            total_interest,
            emi_amount: loan.monthly_emi,
            amount_paid,
            emis_left
          };
        })
      );
  
      res.json({
        customer_id,
        total_loans: overview.length,
        loans: overview
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
export const createCustomer = async (req, res) => {
    try {
      const { customer_id, name } = req.body;
      const customer = await Customer.create({
        customer_id,
        name,
        created_at: new Date()
      });
      res.status(201).json(customer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create customer" });
    }
  };