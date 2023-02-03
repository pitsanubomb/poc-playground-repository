const { Model } = require('sequelize');
const fs = require('fs');
const path = require('path');
const Repository = require('../../config/repository');

const basename = path.basename(__filename);
const sequelize = new Repository('sqlite::memory:');

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
    /* eslint-disable-next-line global-require, import/no-dynamic-require */
    const modelClass = require(path.join(__dirname, file));
    models[modelClass.name] = injectModel(modelClass);
  });

module.exports = models;
