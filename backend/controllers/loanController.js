import { v4 as uuidv4 } from 'uuid';
import Loan from '../models/loanModel.js';
import Payment from '../models/paymentModel.js';
import Customer from "../models/customerModel.js";

// Create Loan
export const createLoan = async (req, res) => {
    console.log("hi")
  try {
    let { customer_id, loan_amount, loan_period_years, interest_rate_yearly } = req.body;

    // Convert to numbers (important to avoid string concatenation)
    loan_amount = parseFloat(loan_amount);
    loan_period_years = parseFloat(loan_period_years);
    interest_rate_yearly = parseFloat(interest_rate_yearly);

    // Input validation
    if (isNaN(loan_amount) || isNaN(loan_period_years) || isNaN(interest_rate_yearly)) {
      return res.status(400).json({ error: "Invalid numeric values in request body" });
    }

    // Ensure customer exists
    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res.status(400).json({ error: "Customer not found. Please create a customer first." });
    }

    // Calculate interest and EMI
    const interest = loan_amount * loan_period_years * (interest_rate_yearly / 100);
    const totalAmount = loan_amount + interest;
    const monthlyEMI = totalAmount / (loan_period_years * 12);

    // Generate UUID for loan_id
    const loan_id = uuidv4();

    const loan = await Loan.create({
      loan_id,
      customer_id,
      principal_amount: loan_amount,
      total_amount: totalAmount,
      interest_rate: interest_rate_yearly,
      loan_period_years,
      monthly_emi: monthlyEMI,
      status: "ACTIVE",
    });

    res.status(201).json(loan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create loan" });
  }
};

// Record Payment
export const recordPayment = async (req, res) => {
  try {
    const { loan_id } = req.params;
    const { amount, payment_type } = req.body;

    const loan = await Loan.findByPk(loan_id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    const payment_id = uuidv4();
    await Payment.create({ payment_id, loan_id, amount, payment_type });

    const payments = await Payment.findAll({ where: { loan_id } });
    const totalPaid = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const remaining = parseFloat(loan.total_amount) - totalPaid;

    let emisLeft = Math.ceil(remaining / loan.monthly_emi);
    if (remaining <= 0) {
      emisLeft = 0;
      loan.status = 'PAID_OFF';
      await loan.save();
    }

    res.status(200).json({
      payment_id,
      loan_id,
      message: "Payment recorded successfully.",
      remaining_balance: remaining,
      emis_left: emisLeft
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Loan Ledger
export const getLedger = async (req, res) => {
  try {
    const { loan_id } = req.params;
    const loan = await Loan.findByPk(loan_id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    const payments = await Payment.findAll({ where: { loan_id }, order: [['createdAt', 'ASC']] });
    const totalPaid = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const balance = parseFloat(loan.total_amount) - totalPaid;
    const emisLeft = Math.ceil(balance / loan.monthly_emi);

    res.json({
      loan_id: loan.loan_id,
      customer_id: loan.customer_id,
      principal: loan.principal_amount,
      total_amount: loan.total_amount,
      monthly_emi: loan.monthly_emi,
      amount_paid: totalPaid,
      balance_amount: balance,
      emis_left: emisLeft,
      transactions: payments.map(p => ({
        transaction_id: p.payment_id,
        date: p.createdAt,
        amount: p.amount,
        type: p.payment_type
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
