'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  task.init({
    task_id: {
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
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
    deadline: DataTypes.DATE,
    status: DataTypes.STRING,
    project_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'projects',
      //   key: 'project_id'
      // }
      // validate: {
      //   // message: "Project id doesn't exist!"
      //    // msg: 'ERROR_INVALID_USERNAME'
      // }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    modelName: 'task',
    paranoid: true,
  });

  // const User = sequelize.define('users', {
  //       user_id: {
  //           type: DataTypes.INTEGER,
  //       }
  // });

  // const Project = sequelize.define('projects', {
  //     project_id: {
  //         type: DataTypes.INTEGER
  //     }
  // });

  // User.belongsTo(Project, { as: 'User', foreignKey : 'user_id'});
  // Project.hasMany(User, {as: 'Project', foreignKey: 'project_id'});
  // Author.hasMany(Project, { as: 'Author', foreignKey : 'authorId'});  

  return task;
};