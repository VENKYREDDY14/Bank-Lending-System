import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import Customer from './customerModel.js';

const Loan = sequelize.define('Loan', {
  loan_id: { type: DataTypes.STRING, primaryKey: true },
  principal_amount: DataTypes.DECIMAL,
  total_amount: DataTypes.DECIMAL,
  interest_rate: DataTypes.DECIMAL,
  loan_period_years: DataTypes.INTEGER,
  monthly_emi: DataTypes.DECIMAL,
  status: DataTypes.STRING
}, { timestamps: true });

Customer.hasMany(Loan, { foreignKey: 'customer_id' });
Loan.belongsTo(Customer, { foreignKey: 'customer_id' });

export default Loan;
