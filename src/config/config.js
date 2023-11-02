require('dotenv').config();

module.exports.development = {
  url: process.env.DATABASE_URL_DEV,
  dialect: 'postgres',
  logging: false
};

module.exports.testing = {
  
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "admin",
    DB: "crud_api",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
  dialect: 'postgres',
  logging: false
};

module.exports.production = {
  url: process.env.DATABASE_URL_DEV,
  dialect: 'postgresql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  },
};

module.exports.twilioConfig = {
  accountSid: process.env.T_ACCOUNTS_ID,
  authToken: process.env.T_AUTHTOKEN,
  fromPhoneNumber:  process.env.PHONE,
};
