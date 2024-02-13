import express from 'express';
import indexRoute from "./src/routes/index";
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';

// Database
import db from './src/models/index';

// Test DB
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.error('Error: ' + err);
  });

const app = express();
// app.use(cors());
// app.use(cors({origin: true, credentials: true}));
const corsOption = {
  origin: ['http://localhost:8080'],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', indexRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Welcome to paymate application!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});