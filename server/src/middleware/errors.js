const HttpError = require("../utils/HttpError");

const notFound = (req, res, next) => next(new HttpError(404, "Ruta no encontrada"));

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    error: status >= 500 ? "Error interno del servidor" : err.message,
  });
};

module.exports = { notFound, errorHandler };
