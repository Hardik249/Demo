'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assignProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  assignProject.init({
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    paranoid: false,
    sequelize,
    modelName: 'assignProject',
  });
  return assignProject;
};