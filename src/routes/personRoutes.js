const express = require('express');
const authenticateToken = require('../middleware/auth');
const { getAllPersons, getPersonById, createPerson, updatePerson } = require('../controllers/personController');

const router = express.Router();

router.get('/persons', authenticateToken, getAllPersons);
router.get('/person/:id', authenticateToken, getPersonById);
router.post('/person', authenticateToken, createPerson);
router.put('/person/:id', authenticateToken, updatePerson);

module.exports = router;
