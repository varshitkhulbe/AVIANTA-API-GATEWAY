const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
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
module.exports={
    createUser
}