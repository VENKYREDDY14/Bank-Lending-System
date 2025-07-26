import express from 'express';
import { createLoan, recordPayment, getLedger } from '../controllers/loanController.js';

const router = express.Router();

router.post('/loans', createLoan);
router.post('/loans/:loan_id/payments', recordPayment);
router.get('/loans/:loan_id/ledger', getLedger);

export default router;
