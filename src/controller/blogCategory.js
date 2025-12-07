const { BlogCategories } = require("../../models");
const { Op, Sequelize } = require("sequelize");

exports.getAllCategories = async (req, res) => {
  try {
    const { p, limit } = req.body;
    let skip = p * limit - limit;
    const { q } = req.query;

    const whereCondition = q ? { name: { [Op.iLike]: `%${q}%` } } : {};

    await BlogCategories.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
        include: [
          [
            Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "blogs_categories"
            WHERE "blogs_categories"."categoryId" = "category_blogs"."id"
          )`),
            "blogsCount",
          ],
        ],
      },
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      offset: skip,
      limit,
    }).then((result) => {
      res.status(200).send({
        status: "Success",
        total: result.count,
        data: result.rows,
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const { q } = req.query;

    const whereCondition = q ? { name: { [Op.iLike]: `%${q}%` } } : {};
    await BlogCategories.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
        include: [
          [
            Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "blogs_categories"
            WHERE "blogs_categories"."categoryId" = "category_blogs"."id"
          )`),
            "blogsCount",
          ],
        ],
      },
      where: whereCondition,
      order: [["createdAt", "DESC"]],
    }).then((result) => {
      res.status(200).send({
        status: "Success",
        total: result.count,
        data: result.rows,
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await BlogCategories.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
        include: [
          [
            Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "blogs_categories"
            WHERE "blogs_categories"."categoryId" = "category_blogs"."id"
          )`),
            "blogsCount",
          ],
        ],
      },
    });

    data
      ? res.status(200).send({
          status: "Success",
          data,
        })
      : res.status(404).send({
          status: "Failed",
          message: "Category not found",
        });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    await BlogCategories.findOne({ where: { name } }).then((result) => {
      result &&
        res.status(400).send({
          status: "Failed",
          message: "Category already exist",
        });

      !result &&
        BlogCategories.create({ name }).then((response) => {
          res.status(200).send({
            status: "Success",
            data: response,
          });
        });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id, name } = req.body;

    await BlogCategories.update({ name }, { where: { id } }).then(() => {
      res.status(200).send({
        status: "Success",
        message: "Successfully update category.",
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await BlogCategories.destroy({ where: { id } }).then(() => {
      res.status(200).send({
        status: "Success",
        message: "Successfully delete category.",
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};
