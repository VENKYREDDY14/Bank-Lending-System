import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import Loan from './loanModel.js';

const Payment = sequelize.define('Payment', {
  payment_id: { type: DataTypes.STRING, primaryKey: true },
  amount: DataTypes.DECIMAL,
  payment_type: DataTypes.STRING
}, { timestamps: true });

Loan.hasMany(Payment, { foreignKey: 'loan_id' });
Payment.belongsTo(Loan, { foreignKey: 'loan_id' });

export default Payment;
