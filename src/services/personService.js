const supabase = require('../config/supabase');
const { executeQuery } = require('../utils/db');

class PersonService {
  async create(personData) {
    return executeQuery(
      supabase
        .from('person_data')
        .insert([personData])
        .select(),
      'Failed to create person'
    );
  }

  async update(id, updates) {
    return executeQuery(
      supabase
        .from('person_data')
        .update(updates)
        .eq('id', id)
        .select(),
      'Failed to update person'
    );
  }

  async getAll() {
    return executeQuery(
      supabase
        .from('person_data')
        .select('*'),
      'Failed to fetch persons'
    );
  }

  async getById(id) {
    return executeQuery(
      supabase
        .from('person_data')
        .select('*')
        .eq('id', id)
        .single(),
      'Failed to fetch person'
    );
  }
}

module.exports = new PersonService();