"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      apiKey: {
        type: Sequelize.TEXT,
      },
      subscriptionDate: {
        type: Sequelize.DATE,
      },
      subscriptionType: {
        type: Sequelize.STRING,
      },
      paymentStatus: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
      },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: "Products", key: "id" },
      },
      limit: {
        type: Sequelize.JSONB,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
