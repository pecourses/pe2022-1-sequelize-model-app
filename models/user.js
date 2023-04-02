'use strict';
const { Model } = require('sequelize');
const { hashSync } = require('bcrypt');
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
      // 123456 -> dfg45fdg45454g5dg54s5df4gs54f5154vojeifdif
      // User.create({passwordHash:'123456'})
      // ->
      // validarots,setters
      // ->
      // INSERT INTO users(password_hash)
      // VALUES ('dfg45fdg45454g5dg54s5df4gs54f5154vojeifdif')
      passwordHash: {
        allowNull: false,
        type: DataTypes.STRING,
        set (value) {
          this.setDataValue('passwordHash', hashSync(value, 10));
        },
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
