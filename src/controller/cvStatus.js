const { CVStatus } = require("../../models");

exports.getCVStatuses = async (req, res) => {
  try {
    await CVStatus.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
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
