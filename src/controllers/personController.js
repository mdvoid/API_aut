const personService = require('../services/personService');
const { formatSuccess, formatError } = require('../utils/responseFormatter');

const createPerson = async (req, res, next) => {
  try {
    const { name, profession, bio, works, links } = req.body;
    const data = await personService.create({ name, profession, bio, works, links });
    res.status(201).json(formatSuccess(data[0], 'Person created successfully'));
  } catch (error) {
    next(error);
  }
};

const updatePerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await personService.update(id, req.body);
    
    if (!data.length) {
      return res.status(404).json(formatError('Person not found', 404));
    }
    
    res.status(200).json(formatSuccess(data[0], 'Person updated successfully'));
  } catch (error) {
    next(error);
  }
};

const getAllPersons = async (req, res, next) => {
  try {
    const data = await personService.getAll();
    res.status(200).json(formatSuccess(data));
  } catch (error) {
    next(error);
  }
};

const getPersonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await personService.getById(id);
    
    if (!data) {
      return res.status(404).json(formatError('Person not found', 404));
    }
    
    res.status(200).json(formatSuccess(data));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPerson,
  updatePerson,
  getAllPersons,
  getPersonById
};