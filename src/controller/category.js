const { Categories } = require("../../models");
const { Op, Sequelize } = require("sequelize");
const decode = require("decode-html");

exports.getAllCategories = async (req, res) => {
  try {
    const { p, limit } = req.body;
    let skip = p * limit - limit;
    const { q } = req.query;

    const whereCondition = q ? { name: { [Op.iLike]: `%${q}%` } } : {};

    const result = await Categories.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "product_categories"
              WHERE "product_categories"."categoryId" = "categories"."id"
            )`),
            "productCount",
          ],
        ],
      },
      where: whereCondition,
      order: [["order", "ASC"]],
      offset: skip,
      limit,
    });

    res.status(200).send({
      status: "Success",
      total: result.count,
      data: result.rows,
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

    await Categories.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "product_categories"
              WHERE "product_categories"."categoryId" = "categories"."id"
            )`),
            "productCount",
          ],
        ],
      },
      where: whereCondition,
      order: [["order", "ASC"]],
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

    const data = await Categories.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "product_categories"
              WHERE "product_categories"."categoryId" = "categories"."id"
            )`),
            "productCount",
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
    const { name, order } = req.body;

    await Categories.findOne({ where: { name } }).then((result) => {
      result &&
        res.status(400).send({
          status: "Failed",
          message: "Category already exist",
        });

      !result &&
        Categories.create({ name: decode(name), order }).then(() => {
          res.status(200).send({
            status: "Success",
            message: "Success create category",
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
    const { id, name, order } = req.body;

    await Categories.update(
      { name: decode(name), order },
      { where: { id } }
    ).then(() => {
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

    await Categories.destroy({ where: { id } }).then(() => {
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
