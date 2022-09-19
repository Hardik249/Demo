'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    queryInterface.addColumn('tasks', 'project_id',  {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'project_id'
        }
    })

    queryInterface.addColumn('tasks', 'user_id',  {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id'
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
