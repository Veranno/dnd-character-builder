require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');

const app = express();

// —— Middlewares ——————————————————————————————————————————————
app.use(morgan('dev'));             // Logging HTTP requests
app.use(express.json());            // Parse JSON bodies

// —— Database Connection ——————————————————————————————————————
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// —— Routes ————————————————————————————————————————————————————
app.get('/', (_req, res) => {
  res.send('Welcome to the D&D Character Builder API');
});
app.use('/api/auth', authRoutes);

// —— Start Server —————————————————————————————————————————————
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
