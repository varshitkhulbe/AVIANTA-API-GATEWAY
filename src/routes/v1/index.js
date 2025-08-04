const express = require ('express')
const router = express.Router()
const {infoController} = require('../../controller')
const userRouter=require("./user-routes")
router.get('/info',infoController.info);
router.use("/user",userRouter)
module.exports=router
