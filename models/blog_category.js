const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config");

const BlogsBridge = db.define(
  "blogs_categories",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    blogId: {
      type: DataTypes.STRING,
      references: {
        model: "blogs",
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.STRING,
      references: {
        model: "category_blogs",
        key: "id",
      },
    },
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
  { freezeTableName: true, timestamps: false }
);

module.exports = { BlogsBridge };
