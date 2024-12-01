const validatePerson = (req, res, next) => {
  const { name, profession } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: 'Valid name is required' });
  }

  if (!profession || typeof profession !== 'string' || profession.trim().length === 0) {
    return res.status(400).json({ message: 'Valid profession is required' });
  }

  next();
};

module.exports = {
  validatePerson
};