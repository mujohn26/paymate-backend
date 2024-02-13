require('dotenv').config();

module.exports.development = {
  url: process.env.DATABASE_URL_DEV,
  dialect: 'postgres',
  logging: false
};

module.exports.testing = {
  url: process.env.DATABASE_URL_TEST,
  dialect: 'postgres',
  logging: false
};

module.exports.production = {
  url: process.env.DATABASE_URL,
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
  accountSid: 'AC8464a522deac978cb8792658c9014082',
  // 'AC8927a228ce66da38723a99bcbc563165',
  authToken: '8c742216783db917acd8e8d1ad26e60b',
  // '0c6dad5b8a6ed8500358b851e48053c0',
  fromPhoneNumber: '+15042293358'
  // '+17472988654',

};
