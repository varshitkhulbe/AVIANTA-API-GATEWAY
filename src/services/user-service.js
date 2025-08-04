const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const {Auth}=require('../utils/common')
const userrepository = new UserRepository();
const  appError = require("../utils/error/app-error");

async function createUser(data) {
  try {
    const user = await userrepository.create(data);
    return user;
  } catch (error) {
    console.error("UserService createUser internal error:", error); 
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
      explanation.push(err.message);
      });
        console.log("Explanation is :",explanation)
        throw new appError(explanation,StatusCodes.BAD_REQUEST)
    }
    throw new appError("cannot create a new user object",StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

async function signin(data)
{
  try {
    const  user= await userrepository.getUserByEmail(data.email);
    if(!user)
    {
      throw new appError("User not found for given email",StatusCodes.NOT_FOUND);
    }
    const passwordMatch=Auth.checkPassword(data.password,user.password);
    if(!passwordMatch)
    {
      throw new appError("Invalid password",StatusCodes.BAD_REQUEST);
    }
    const jwt=Auth.createToken({id:user.id,email:user.email})
    return jwt;
  } catch (error) {
    if(error instanceof appError)
    {
      throw error;
    }
    console.log(error);
    throw new appError("Something went wrong while signing in user",StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
module.exports={
    createUser,
    signin
}