# API_aut
API authors



3.	Set Up File Structure:
o	Create the following structure: 
o	project/
o	├── src/
o	│   ├── routes/
o	│   │   └── personRoutes.js
o	│   ├── controllers/
o	│   │   └── personController.js
o	│   ├── db/
o	│   │   └── supabaseClient.js
o	│   ├── app.js
o	├── .env
o	├── package.json
o	├── README.md
4.	Set Up Environment Variables:
o	Add a .env file: 
o	SUPABASE_URL=<your-supabase-url>
o	SUPABASE_KEY=<your-supabase-key>
o	PORT=3000
________________________________________
Implemented Code
src/db/supabaseClient.js
Handles the connection to Supabase.
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_KEY in .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
________________________________________
src/app.js
Main application setup.
require('dotenv').config();
const express = require('express');
const personRoutes = require('./routes/personRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', personRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
________________________________________
src/routes/personRoutes.js
Defines routes for managing person data.
const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

// Routes
router.post('/person', personController.createPerson);
router.put('/person/:id', personController.updatePerson);
router.get('/persons', personController.getAllPersons);
router.get('/person/:id', personController.getPersonById);

module.exports = router;
________________________________________
src/controllers/personController.js
Placeholder for CRUD functionality.
const supabase = require('../db/supabaseClient');

// Create a new person
const createPerson = async (req, res) => {
  try {
    const { name, profession, bio, works, links } = req.body;

    const { data, error } = await supabase
      .from('person_data')
      .insert([{ name, profession, bio, works, links }]);

    if (error) throw error;

    res.status(201).json({ message: 'Person created', data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing person
const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('person_data')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Person updated', data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all persons
const getAllPersons = async (req, res) => {
  try {
    const { data, error } = await supabase.from('person_data').select('*');
    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get person by ID
const getPersonById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('person_data')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPerson,
  updatePerson,
  getAllPersons,
  getPersonById,
};
________________________________________
Next Steps
•	Phase 3: Database Design
If you want me to continue, let me know! I'll guide you in setting up the Supabase database or help refine and test the above implementation.
Phase 3: Database Design and Supabase Configuration
In this phase, we configure the Supabase database schema to store person data. The schema includes fields that align with the API structure, and we ensure the connection with the API is operational.
________________________________________
Step 1: Configure Supabase Project
1.	Log in to Supabase.
2.	Create a new project.
3.	Note down your SUPABASE_URL and SUPABASE_KEY for the .env file.
________________________________________
Step 2: Create Database Table
1.	Navigate to the Table Editor in your Supabase dashboard.
2.	Create a new table named person_data with the following schema:
Column Name	Data Type	Constraints
id	uuid	Primary Key, auto-generated
name	text	Not null
profession	text	Not null
bio	text	Nullable
works	jsonb	Nullable
links	jsonb	Nullable
created_at	timestamp	Default: now()
updated_at	timestamp	Nullable
________________________________________
Step 3: Test Database Integration
Once the table is set up, verify the API integration with the following steps:
1.	Start the Server:
o	Run the server with: 
o	node src/app.js
2.	Test the API Endpoints: Use Postman, Insomnia, or curl to test the endpoints.
________________________________________
Example Payloads and API Tests
1.	Create a Person:
o	Endpoint: POST /api/person
o	Payload: 
o	{
o	  "name": "Octavia Butler",
o	  "profession": "Author",
o	  "bio": "Science fiction writer and recipient of multiple Hugo awards.",
o	  "works": ["Kindred", "Parable of the Sower"],
o	  "links": {
o	    "website": "https://example.com",
o	    "twitter": "@octaviabutler"
o	  }
o	}
o	Response: 
o	{
o	  "message": "Person created",
o	  "data": {
o	    "id": "generated-uuid",
o	    "name": "Octavia Butler",
o	    "profession": "Author",
o	    "bio": "...",
o	    "works": ["Kindred", "Parable of the Sower"],
o	    "links": { "website": "...", "twitter": "..." },
o	    "created_at": "timestamp",
o	    "updated_at": null
o	  }
o	}
2.	Retrieve All Persons:
o	Endpoint: GET /api/persons
o	Response: 
o	[
o	  {
o	    "id": "uuid",
o	    "name": "Octavia Butler",
o	    "profession": "Author",
o	    "bio": "...",
o	    "works": [...],
o	    "links": {...},
o	    "created_at": "timestamp",
o	    "updated_at": "timestamp"
o	  }
o	]
3.	Update a Person:
o	Endpoint: PUT /api/person/:id
o	Payload: 
o	{
o	  "bio": "Updated bio for Octavia Butler."
o	}
o	Response: 
o	{
o	  "message": "Person updated",
o	  "data": {...updated details...}
o	}
4.	Retrieve Specific Person:
o	Endpoint: GET /api/person/:id
o	Response: 
o	{
o	  "id": "uuid",
o	  "name": "Octavia Butler",
o	  "profession": "Author",
o	  ...
o	}
