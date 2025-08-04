const path = require('path')
const dotenv= require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
console.log('PORT from .env:', process.env.PORT);

module.exports={
    PORT:process.env.PORT,
    SALT_ROUNDS:process.env.SALT_ROUNDS,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRY:process.env.JWT_EXPIRY
}