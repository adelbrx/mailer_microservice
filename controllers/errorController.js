const sendErrorProd = (error, response) => {
  response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

module.exports = (error, _, response, __) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  // RETURN THE ERROR RESPONSE
  sendErrorProd(error, response);
};
