const express = require('express')
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const {serverConfig,Logger} =require('./config')
const apiRoutes = require('./routes')
const app = express();

// const limiter=rateLimit({
//     windowMs: 2 * 60 * 1000,
//     max: 3,

// })


app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.use(limiter)
app.use('/flightsService',createProxyMiddleware({target:serverConfig.FLIGHT_SERVICE,changeOrigin:true}));
app.use('/bookingService',createProxyMiddleware({target:serverConfig.BOOKING_SERVICE,changeOrigin:true}));
app.use('/api',apiRoutes)
app.listen(serverConfig.PORT,()=>{
    console.log(`sucessfully started the server at port: ${serverConfig.PORT}`)
    Logger.info("successfully started the server",{})
})