const { DataTypes } = require('sequelize');

const User = {
  schema: {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  name: 'User',
};

module.exports = User;
