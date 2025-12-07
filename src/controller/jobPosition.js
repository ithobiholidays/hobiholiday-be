const { JobPosition } = require("../../models");

exports.getAllJobPositions = async (req, res) => {
  try {
    const { p, limit } = req.body;
    let skip = p * limit - limit;

    await JobPosition.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
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

exports.getJobPositions = async (req, res) => {
  try {
    await JobPosition.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
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

exports.getJobPosition = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await JobPosition.findOne({
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
          message: "Job Position not found",
        });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.createJobPosition = async (req, res) => {
  try {
    const { name } = req.body;

    await JobPosition.findOne({ where: { name } }).then((result) => {
      result &&
        res.status(400).send({
          status: "Failed",
          message: "Job Position already exist",
        });

      !result &&
        JobPosition.create({ name }).then((response) => {
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

exports.updateJobPosition = async (req, res) => {
  try {
    const { id, name } = req.body;

    await JobPosition.update({ name }, { where: { id } }).then(() => {
      res.status(200).send({
        status: "Success",
        message: "Successfully update Job Position.",
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteJobPosition = async (req, res) => {
  try {
    const { id } = req.params;

    await JobPosition.destroy({ where: { id } }).then(() => {
      res.status(200).send({
        status: "Success",
        message: "Successfully delete Job Position.",
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};
