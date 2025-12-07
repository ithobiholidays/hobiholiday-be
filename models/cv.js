const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config");

const CV = db.define(
  "cvs",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    positionId: { type: DataTypes.STRING },
    document: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM("Received", "Approved", "Rejected") },
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

module.exports = { CV };
