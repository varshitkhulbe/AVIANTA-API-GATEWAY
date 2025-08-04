const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/common");
const appError = require("../utils/error/app-error");
function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    errorResponse.message = "something went wrong while authenticating user";
    errorResponse.error = new appError(
      " Email not found in the incoming request or the format is incorrect",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  if (!req.body.password) {
    errorResponse.message = "something went wrong while authenticating user";
    errorResponse.error = new appError(
      " Password not found in the incoming request or the format is incorrect",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
}
module.exports = {
  validateAuthRequest,
};
