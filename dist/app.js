const express = require('express');
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static');
const setupSwagger = require('./swagger');
const personRoutes = require('./routes/personRoutes');
const authRoutes = require('./routes/authRoutes');
const apiLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(apiLimiter);

// Serve static files
app.use(serveStatic(path.join(__dirname, '../public')));

// Add Swagger
setupSwagger(app);

// Routes
app.use('/auth', authRoutes);
app.use('/api', personRoutes);

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling
app.use(errorHandler);

module.exports = app;