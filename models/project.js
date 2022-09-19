'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project.init({
    project_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    planningHours: DataTypes.INTEGER,
    actualHours: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    EndDate: DataTypes.DATE,
    deadline: DataTypes.DATE,
    status: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project',
    paranoid: true,
  });
  return project;
};