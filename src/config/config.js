require('dotenv').config();


  module.exports = {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'paymant',
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'admin',
    database: 'paymant',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    username: 'postgres',
    password: 'admin',
    database: 'paymant',
    host: 'localhost',
    dialect: 'postgres'
  }
};


module.exports.twilioConfig = {
  accountSid: process.env.T_ACCOUNTS_ID,
  authToken: process.env.T_AUTHTOKEN,
  fromPhoneNumber:  process.env.PHONE,
};
