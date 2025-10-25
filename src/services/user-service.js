const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const {RoleRepository}= require("../repositories");
const {Auth,enums}=require('../utils/common')
const userrepository = new UserRepository();
const rolerepository= new RoleRepository();
const  appError = require("../utils/error/app-error");
const { add } = require("winston");

async function createUser(data) {
  try {
    const user = await userrepository.create(data);
    console.log(user);
    const role= await  rolerepository.getRoleByName(enums.USER_ROLES_ENUMS.CUSTOMER);
    console.log(role);
    user.addRole(role);
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

async function isAuthenticated(token)
{
try {
  if(!token)
  {
    throw new appError('Missing JWT token',StatusCodes.BAD_REQUEST);
  }
  const response=Auth.verifyToken(token);
  const user= await userrepository.get(response.id)
  if(!user)
  {
    throw new appError('User not found for the given JWT token',StatusCodes.NOT_FOUND);
  }
  return user.id;
} catch (error) {
  if(error instanceof appError)
  {
    throw error;
  }
  if(error.name=="JsonWebTokenError")
  {
    throw new appError('Invalid JWT token',StatusCodes.BAD_REQUEST);
  }
  console.log(error);
  throw error;
}
}

async function addRoleToUser(data)
{
  try{
  const user= await userrepository.get(data.id);
  if(!user)
  {
    throw new appError("User not found",StatusCodes.NOT_FOUND);
  }
  const role=await rolerepository.getRoleByName(data.role);
  if(!role)
  {
    throw new appError("Role not found",StatusCodes.NOT_FOUND);
  }
  await user.addRole(role);
  console.log("role added",user);
  return user;
}
catch(error)
{
  if(error instanceof appError)
    {
      throw error;
    }
    console.log(error);
    throw new appError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR);
}
}

async function isAdmin(id)
{
  try{
    const user= await userrepository.get(id);
    if(!user)
    {
      throw new appError("User not found",StatusCodes.NOT_FOUND);
    }
    const adminRole=await rolerepository.getRoleByName(enums.USER_ROLES_ENUMS.ADMIN);
    if(!adminRole)
    {
      throw new appError("Role not found",StatusCodes.NOT_FOUND); 
    }
    return user.hasRole(adminRole);
  }
  catch(error)
  {
    if(error instanceof appError)
    {
      throw error;
    }
    console.log(error);
    throw new appError("Something went wrong",StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
module.exports={
    createUser,
    signin,
    isAuthenticated,
    addRoleToUser,
    isAdmin
}