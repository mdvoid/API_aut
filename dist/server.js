require('dotenv').config();
const app = require('./app');
const { initializeDatabase } = require('./utils/supabaseAdmin');

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Initialize database schema and tables
    await initializeDatabase();
    
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      console.log(`API Documentation available at http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();