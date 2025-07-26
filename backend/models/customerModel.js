import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: DataTypes.STRING
}, { timestamps: true });

export default Customer;
