require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/products', productRoutes);
app.use('/sales', salesRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Smart Stack IMS API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
