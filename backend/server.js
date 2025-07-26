import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import loanRoutes from './routes/loanRoutes.js';
import customerRoutes from './routes/customerRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', loanRoutes);
app.use('/api/v1', customerRoutes);

const PORT = process.env.PORT || 5000;
(async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection to Neon successful!");
      await sequelize.sync();
      console.log("Tables synced");
  
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (err) {
      console.error("Unable to connect:", err);
    }
  })();
  
