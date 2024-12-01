const formatSuccess = (data, message = 'Success') => ({
  success: true,
  message,
  data
});

const formatError = (message = 'An error occurred', statusCode = 500) => ({
  success: false,
  message,
  statusCode
});

module.exports = {
  formatSuccess,
  formatError
};