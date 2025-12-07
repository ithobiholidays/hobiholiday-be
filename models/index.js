const { Users } = require("./user");
const { Categories } = require("./category");
const { Products } = require("./product");
const { ProductCategories } = require("./product_category");
const { Blogs } = require("./blog");
const { BlogCategories } = require("./cat");
const { BlogsBridge } = require("./blog_category");
const { CV } = require("./cv");
const { JobPosition } = require("./jobPosition");
const { CVStatus } = require("./cvStatus");
const { Testimony } = require("./testimony");
const { Team } = require("./team");
const { Reward } = require("./reward");
const { Session } = require("./session");

CV.belongsTo(JobPosition, {
  foreignKey: "positionId",
  as: "position",
});

JobPosition.hasMany(CV, {
  foreignKey: "positionId",
  as: "cvs",
});

// product and category
Products.belongsToMany(Categories, {
  through: ProductCategories,
  as: "categories",
  foreignKey: "productId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

Categories.belongsToMany(Products, {
  through: ProductCategories,
  as: "products",
  foreignKey: "categoryId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// blog and category
Blogs.belongsToMany(BlogCategories, {
  through: BlogsBridge,
  as: "categories",
  foreignKey: "blogId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

BlogCategories.belongsToMany(Blogs, {
  through: BlogsBridge,
  as: "blogs",
  foreignKey: "categoryId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

module.exports = {
  Users,
  Categories,
  Products,
  ProductCategories,
  Blogs,
  BlogCategories,
  BlogsBridge,
  CV,
  JobPosition,
  CVStatus,
  Testimony,
  Team,
  Reward,
  Session,
};
