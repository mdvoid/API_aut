const supabase = require('../config/supabase');

const executeQuery = async (query, errorMessage = 'Database operation failed') => {
  try {
    const { data, error } = await query;
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  } catch (error) {
    console.error(`Database error: ${error.message}`);
    throw new Error(errorMessage);
  }
};

module.exports = {
  executeQuery
};