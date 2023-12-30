import dotenv from 'dotenv';
dotenv.config();

export const development = {
  username: 'postgres',
  password: 'admin',
  database: 'payment', // Corrected typo from 'paymant' to 'payment'
  host: 'localhost',
  dialect: 'postgres',
};

export const testing = {
  username: 'postgres',
  password: 'admin',
  database: 'payment', // Corrected typo from 'paymant' to 'payment'
  host: 'localhost',
  dialect: 'postgres',
};

export const production = {
  username: 'postgres',
  password: 'admin',
  database: 'payment', // Corrected typo from 'paymant' to 'payment'
  host: 'localhost',
  dialect: 'postgres',
};

export const twilioConfig = {
  accountSid: process.env.T_ACCOUNTS_ID,
  authToken: process.env.T_AUTHTOKEN,
  fromPhoneNumber: process.env.PHONE,
};
