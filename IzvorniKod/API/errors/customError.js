const httpStatus = require('http-status');

module.exports = class CustomError extends Error {
    status;

  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
  }
}
