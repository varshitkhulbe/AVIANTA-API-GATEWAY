
const express = require('express')
const {serverConfig,Logger} =require('./config')
const app = express();
const apiRoutes = require('./routes')
app.use('/api',apiRoutes)
app.listen(serverConfig.PORT,()=>{
    console.log(`sucessfully started the server at port: ${serverConfig.PORT}`)
    Logger.info("successfully started the server",{})
})