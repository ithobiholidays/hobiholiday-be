const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config");

const Blogs = db.define(
  "blogs",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING },
    keyword: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT },
    author: { type: DataTypes.STRING, defaultValue: "Admin" },
    picture: { type: DataTypes.STRING },
    publishedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
    status: {
      type: DataTypes.ENUM("draft", "scheduled", "published"),
      defaultValue: "published",
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
  { freezeTableName: true, timestamps: true }
);

module.exports = { Blogs };
