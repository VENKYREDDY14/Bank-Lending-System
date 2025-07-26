import express from 'express';
import { getOverview } from '../controllers/customerController.js';
import { createCustomer } from "../controllers/customerController.js";

const router = express.Router();
router.get('/customers/:customer_id/overview', getOverview);
router.post("/customers", createCustomer);


export default router;
