'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('modes', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      qt_user: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      nm_mode: {
        type: Sequelize.STRING,
        allowNull: false
      },

      created: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('modes');
    
  }
};
