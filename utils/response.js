/**
 *
 * @param {string} message
 * @param {{[key: string]: any}} data
 * @returns
 */
const successResponse = (message = "", data = {}) => {
  return {
    ...data,
    isError: false,
    message,
  };
};

/**
 *
 * @param {string} message
 * @param {{[key: string]: any}} data
 * @returns
 */
const failResponse = (message = "", data = {}) => {
  return {
    ...data,
    isError: true,
    message,
  };
};

module.exports = {
  successResponse,
  failResponse,
};
