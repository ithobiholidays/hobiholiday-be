const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config");

const Session = db.define(
  "sessions",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userId: { type: DataTypes.STRING },
    token: { type: DataTypes.TEXT },
    expiredAt: { type: DataTypes.DATE },
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

const expiredSession = 1 * 24 * 60 * 60 * 1000; // d:h:m:s:ms

Session.beforeCreate((session) => {
  session.expiredAt = new Date(Date.now() + expiredSession);
});

module.exports = { Session };
