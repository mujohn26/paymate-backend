import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { development, production, testing } from '../config/config';

const environment = {
  development,
  production,
  testing
};
const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development'; // Provide a default value if NODE_ENV is not set
const config = environment[env];



const db = {};
const sequelize = new Sequelize(config, config);

readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
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
