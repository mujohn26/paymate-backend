import dotenv from 'dotenv';
dotenv.config();

export const development = {
  url: process.env.DATABASE_URL_DEV,
  dialect: 'postgres',
  logging: false,
};

export const testing = {
  url: process.env.DATABASE_URL_TEST,
  dialect: 'postgres',
  logging: false,
};

export const production = {
  url: process.env.DATABASE_URL,
  dialect: 'postgresql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

export const twilioConfig = {
  accountSid: 'AC8464a522deac978cb8792658c9014082',
  authToken: '8c742216783db917acd8e8d1ad26e60b',
  fromPhoneNumber: '+15042293358',
};
