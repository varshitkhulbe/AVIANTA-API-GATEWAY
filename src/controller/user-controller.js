const { successResponse, errorResponse } = require("../utils/common");
const { UserService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { add } = require("winston");

/**
 * POST: /SIGNUP
 * REQ.BODY:{EMAIL,PASSWORD}
 */
async function signup(req, res) {
  console.log("req body", req.body);
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

async function addRoleToUser(req, res) {
  console.log("req body", req.body);
  try {
    const user = await UserService.addRoleToUser({
      role: req.body.role,
      id: req.body.id,
    });
    const response= {
      ...successResponse,
      message: "Role added to user successfully",
      data: { user },
    }
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    console.log(error);
    const response={
      ...errorResponse,
    message:"something went wrong while adding role to user",
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
  addRoleToUser
};
