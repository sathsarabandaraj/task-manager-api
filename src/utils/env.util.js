require('dotenv').config();

const config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
    JWT : process.env.JWT_SECRET,
};

module.exports = config;
