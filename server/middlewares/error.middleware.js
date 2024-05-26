const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  const customError = {
    message: err.message || 'Internal server error',
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  return res
    .status(customError.status)
    .json({ success: false, message: customError.message });
};

module.exports = errorHandler;
