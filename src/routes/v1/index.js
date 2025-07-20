const express = require ('express')
const router = express.Router()
const {infoController} = require('../../controller')
router.get('/info',infoController.info);
module.exports=router
