'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      }, 

      nm_name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      in_match: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      
      nm_path: {
        type: Sequelize.STRING,
        allowNull: false
      },

      cd_email: {
        type: Sequelize.STRING,
        allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
     });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
    
  }
};
