import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { development, production, testing } from '../config/config';

const environment = {
  development,
  production,
  testing
};
const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const config = environment[env];
// if (!config || !config.url) {
//   console.error('Configuration not found or missing "url" property.');
//   process.exit(1); // Exit the application with an error code.
// }

const db = {};
const sequelize = new Sequelize(config.url, config);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
