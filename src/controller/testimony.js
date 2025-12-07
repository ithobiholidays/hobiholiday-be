const { Testimony } = require("../../models");
const { Op } = require("sequelize");

exports.getAllTestimonies = async (req, res) => {
  try {
    const { p, limit } = req.body;
    let skip = p * limit - limit;
    const { q } = req.query;
    const whereCondition = q ? { title: { [Op.iLike]: `%${q}%` } } : {};

    await Testimony.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: whereCondition,
      order: [["order", "ASC"]],
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

exports.getTestimonies = async (req, res) => {
  try {
    const { q } = req.query;
    const whereCondition = q ? { title: { [Op.iLike]: `%${q}%` } } : {};

    await Testimony.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
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

exports.getTestimony = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Testimony.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data
      ? res.status(200).send({
          status: "Success",
          data,
        })
      : res.status(404).send({
          status: "Failed",
          message: "testimony not found",
        });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.createTestimony = async (req, res) => {
  try {
    const { title, link, order } = req.body;

    await Testimony.create({ title, link, order }).then(() => {
      res.status(200).send({
        status: "Success",
        message: "Success create testimony",
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.updateTestimony = async (req, res) => {
  try {
    const { id, title, link, order } = req.body;

    await Testimony.update({ title, link, order }, { where: { id } }).then(
      () => {
        res.status(200).send({
          status: "Success",
          message: "Success update testimony.",
        });
      }
    );
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteTestimony = async (req, res) => {
  try {
    const { id } = req.params;

    await Testimony.destroy({ where: { id } }).then(() => {
      res.status(200).send({
        status: "Success",
        message: "Successfully delete testimony.",
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};
