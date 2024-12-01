const express = require('express');
const authenticateToken = require('../middleware/auth');
const { validatePerson } = require('../middleware/validators/personValidator');
const { 
  getAllPersons, 
  getPersonById, 
  createPerson, 
  updatePerson 
} = require('../controllers/personController');

const router = express.Router();

router.get('/persons', authenticateToken, getAllPersons);
router.get('/person/:id', authenticateToken, getPersonById);
router.post('/person', authenticateToken, validatePerson, createPerson);
router.put('/person/:id', authenticateToken, validatePerson, updatePerson);

module.exports = router;