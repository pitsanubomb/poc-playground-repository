const { Model } = require('sequelize');
const fs = require('fs');
const path = require('path');
const DB = require('../../config/db');

const basename = path.basename(__filename);
const sequelize = new DB('sqlite::memory:');

class InjectModel extends Model {}

function injectModel(model) {
  const { schema, name } = model;
  return InjectModel.init(schema, {
    sequelize,
    modelName: name,
  });
}

const models = {};
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const modelClass = require(path.join(__dirname, file));
    models[modelClass.name] = injectModel(modelClass);
  });

module.exports = models;
