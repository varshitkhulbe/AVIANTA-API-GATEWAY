const path = require('path')
const dotenv= require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
console.log('PORT from .env:', process.env.PORT);

module.exports={
    PORT:process.env.PORT
}