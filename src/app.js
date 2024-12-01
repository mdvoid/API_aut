const express = require('express');
const setupSwagger = require('./swagger');
const personRoutes = require('./routes/personRoutes');
const authRoutes = require('./routes/authRoutes');
const apiLimiter = require('./middleware/rateLimiter');

const app = express();

app.use(express.json());

// Apply rate limiting
app.use(apiLimiter);

// Add Swagger
setupSwagger(app);

// Authentication routes
app.use('/auth', authRoutes);

// Protected API routes
app.use('/api', personRoutes);

module.exports = app;
