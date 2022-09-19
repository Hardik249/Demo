'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     // queryInterface.addColumn('tasks', 'status', { type: Sequelize.STRING });
     // queryInterface.addColumn('tasks', 'status', { type: Sequelize.STRING });

     // Project.belongsToMany(User, { through: UserProjects, uniqueKey: 'my_custom_unique' })
     // users.HasMany(tasks, {
     //  foreign_key: 'user_id'
     // });
     // tasks.BelongsTo(users)

     await queryInterface.createTable('assign_project', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      project_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'project_id'
        }
      },

      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
     })

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
