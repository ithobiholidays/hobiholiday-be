const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config");

const Testimony = db.define(
  "testimonies",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING },
    link: { type: DataTypes.STRING },
    order: { type: DataTypes.INTEGER },
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

module.exports = { Testimony };
