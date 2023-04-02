'use strict';
const { Model } = require('sequelize');
const { GENDERS } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: { is: /^[A-Z][a-z]+$/, len: [2, 64] },
      },
      lastName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: { is: /^[A-Z][a-z]+$/, len: [2, 64] },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      passwordHash: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: { isDate: true, isBefore: new Date().toISOString() },
      },
      gender: {
        type: DataTypes.STRING,
        validate: { isIn: [GENDERS] },
      },
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  );
  return User;
};
