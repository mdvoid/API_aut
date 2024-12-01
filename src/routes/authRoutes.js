const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { formatSuccess, formatError } = require('../utils/responseFormatter');

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(formatError('Email and password are required'));
    }

    const result = await authService.signUp(email, password);
    res.status(201).json(formatSuccess(result));
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(formatError('Email and password are required'));
    }

    const { token, user } = await authService.signIn(email, password);
    res.json(formatSuccess({ token, user }));
  } catch (error) {
    res.status(401).json(formatError(error.message));
  }
});

router.post('/logout', async (req, res) => {
  try {
    await authService.signOut();
    res.json(formatSuccess({ message: 'Logged out successfully' }));
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
});

module.exports = router;