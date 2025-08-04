const { successResponse, errorResponse } = require("../utils/common");
const { UserService } = require("../services");
const { StatusCodes } = require("http-status-codes");

/**
 * POST: /SIGNUP
 * REQ.BODY:{EMAIL,PASSWORD}
 */
async function signup(req, res) {
  try {
    const user = await UserService.createUser({
      email: req.body.email,
      password: req.body.password,
    });
    const response= {
      ...successResponse,
      message: "User created successfully",
      data: { token: user },
    }
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    console.log(error);
    const response={
      ...errorResponse,
    message:"something went wrong while creating user",
    error:error,
    }
    return res
      .status(error.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(response);
  }
}

async function signin(req, res) {
  try {
    const user = await UserService.signin({
      email: req.body.email,
      password: req.body.password,
    });
    const response = {
      ...successResponse,
      message: "User signed in successfully",
      data: {token:user},
    };
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    console.log(error);
    const response={
      ...errorResponse,
    message:"something went wrong while signing in user",
    error:error,
    }
    return res
      .status(error.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(response);
  }
}
module.exports = {
  signup,
  signin,
};
