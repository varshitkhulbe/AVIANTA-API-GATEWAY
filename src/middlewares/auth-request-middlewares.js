const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/common");
const appError = require("../utils/error/app-error");
const userService = require("../services/user-service");
function validateAuthRequest(req, res, next) {
  console.log("request body", req.body);
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
async function checkAuth(req,res,next)
{
  try{
    const response= await userService.isAuthenticated(req.headers["x-access-token"]);
    if(response)
    {
      console.log("user authenticated",response);
      req.user=response.user||response;
      console.log("the user info is ",req.user);
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Authentication failed: user ID missing",
      });
    }
      next();
    }
  }
  catch(error)
  {
    return res
            .status(error.statusCode || 500)
            .json({
    success: false,
    message: error.message || "Something went wrong during authentication",
              })
}}
async function isAdmin(req,res,next)
{
  console.log("the req is ",req.user);
  //  if (!req.user) {
  //     return res.status(StatusCodes.UNAUTHORIZED).json({
  //       message: "You are not authorized to access this resource",
  //     });
  //   }
  const response= await userService.isAdmin(req.user);
  if(!response)
  {
    return res
              .status(StatusCodes.UNAUTHORIZED)
              .json({
                message:"You are not authorized to access this resource" });
  }
  next();
}
module.exports = {
  validateAuthRequest,
  checkAuth,
  isAdmin
};
