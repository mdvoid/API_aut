const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('Missing Supabase credentials in environment variables');
}

// Create Supabase client with admin privileges
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const initializeDatabase = async () => {
  try {
    // Check if the table exists
    const { data: existingTable } = await supabaseAdmin
      .from('person_data')
      .select('id')
      .limit(1);

    if (!existingTable) {
      console.log('Initializing database schema...');
      // Read and execute SQL file content here if needed
    } else {
      console.log('Database schema already exists');
    }
  } catch (error) {
    console.error('Error initializing database:', error.message);
    throw error;
  }
};

module.exports = {
  supabaseAdmin,
  initializeDatabase
};