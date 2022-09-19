'use strict';

const bcrypt = require("bcrypt");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     queryInterface.addColumn('users', 'password',  {
        allowNull: false,
        type: Sequelize.STRING
      })

     queryInterface.addColumn('users', 'status',  {
        allowNull: false,
        type: Sequelize.BOOLEAN
      })

     queryInterface.addColumn('users', 'token',  {
        allowNull: false,
        type: Sequelize.STRING
      })

     queryInterface.addColumn('users', 'varifiedit',  {
        allowNull: false,
        type: Sequelize.STRING
      })

     {
      freezeTableName: true,
      instanceMethods: {
          generateHash(password) {
              return bcrypt.hash(password, bcrypt.genSaltSync(8));
          },
          validPassword(password) {
              return bcrypt.compare(password, this.password);
          }
      }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
