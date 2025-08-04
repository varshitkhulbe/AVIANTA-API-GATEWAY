const {successResponse,errorResponse}=require("../utils/common")
const {UserService}=require("../services")
const {StatusCodes}=require("http-status-codes")

/** 
 * POST: /SIGNUP
 * REQ.BODY:{EMAIL,PASSWORD}
*/
async function signup(req,res){
    try{
        const user=await UserService.createUser({
            email:req.body.email,
            password:req.body.password,
        });
        successResponse.data=user;
        return res.status(StatusCodes.CREATED).json(successResponse)
    }catch(error){
        console.log(error)
        errorResponse.message="something went wrong while creating user"
        errorResponse.error=error
        return res.status(error.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}

module.exports={
    signup
}
