<<<<<<< Updated upstream
import express, { json } from 'express';
import indexRoute from "./src/routes/index";
import { urlencoded, json as _json } from 'body-parser';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';

// Database
import { sequelize } from './src/models/index';

// Test DB
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.error('Error: ' + err);
  });

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(_json());
app.use('/api', indexRoute);
app.use('/api-docs', serve, setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Welcome to paymate application!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
=======
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig.js';
const PORT = process.env.PORT || 5000;

// Database
import  db from './src/models/index.js';
import UserRouter from './src/routes/userRouter.js';

const DBconnection = async () =>{
  console.log('Checking database connection...');
  try {
    await db.sequelize.authenticate();
    console.log('Database connection successfuly');
  } catch (error) {
    console.log('Database connection failed!');
    process.exit(1)
  }
}
(async () =>{
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  DBconnection()
})
const app = express();
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', UserRouter);
app.use('/api-docs', serve, setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Welcome to paymate application!');
});


>>>>>>> Stashed changes
