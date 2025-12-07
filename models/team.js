const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config");

const Team = db.define(
  "teams",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    position: { type: DataTypes.STRING },
    order: { type: DataTypes.INTEGER },
    picture: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      onUpdate: Sequelize.NOW,
    },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = { Team };
