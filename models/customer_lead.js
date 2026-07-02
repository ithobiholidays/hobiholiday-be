const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config");

const CustomerLead = db.define(
  "customer_leads",  // ← nama tabel di PostgreSQL
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    pax: { type: DataTypes.INTEGER, allowNull: false },
    categoryName: { type: DataTypes.STRING },
    productUrl: { type: DataTypes.STRING },
    productTitle: { type: DataTypes.STRING },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = { CustomerLead };
