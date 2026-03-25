const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config');

const Products = db.define(
  'products',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING },
    theme: { type: DataTypes.STRING },
    date: { type: DataTypes.STRING },
    banner: { type: DataTypes.STRING },
    price: {
      type: DataTypes.INTEGER,
    },
    discPrice: { type: DataTypes.INTEGER },
    detail: { type: DataTypes.STRING },
    label: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    startDate: { type: DataTypes.DATEONLY, allowNull: true },
    endDate: { type: DataTypes.DATEONLY, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, default: true },
    isSoldOut: { type: DataTypes.BOOLEAN, default: false },
    itenerary: { type: DataTypes.STRING },
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

module.exports = { Products };
