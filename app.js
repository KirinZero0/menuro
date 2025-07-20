/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-11h-49m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const restaurantRoutes = require('./routes/restaurant');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});