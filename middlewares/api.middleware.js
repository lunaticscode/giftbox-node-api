/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {import("express").NextFunction} next
 */
const apiMiddleware = (req, res, next) => {
  return next();
};

module.exports = apiMiddleware;
