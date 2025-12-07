const { Reward } = require("../../models");
const { delImg } = require("../middleware/deleteImage");

exports.getAllRewards = async (req, res) => {
  try {
    const { p, limit } = req.body;
    let skip = p * limit - limit;

    await Reward.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["order", "ASC"]],
      offset: skip,
      limit,
    }).then((result) => {
      const data = result.rows.map((item) => {
        const imageHost = process.env.HOST_URL + "/uploads/reward/";

        return {
          ...item.dataValues,
          imageHost,
        };
      });

      res.status(200).send({
        status: "Success",
        total: result.count,
        data,
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getRewards = async (req, res) => {
  try {
    await Reward.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["order", "ASC"]],
    }).then((result) => {
      const data = result.rows.map((item) => {
        const imageHost = process.env.HOST_URL + "/uploads/reward/";

        return {
          ...item.dataValues,
          imageHost,
        };
      });

      res.status(200).send({
        status: "Success",
        total: result.count,
        data,
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getReward = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Reward.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data
      ? res.status(200).send({
          status: "Success",
          data: {
            ...data.dataValues,
            imageHost: process.env.HOST_URL + "/uploads/reward/",
          },
        })
      : res.status(404).send({
          status: "Failed",
          message: "Team not found",
        });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.createReward = async (req, res) => {
  try {
    const { name, order, description } = req.body;
    const picture = req.file.filename;

    await Reward.findOne({ where: { name } }).then((result) => {
      result &&
        res.status(400).send({
          status: "Failed",
          message: "Team already exist",
        });

      !result &&
        Reward.create({ name, order, description, picture }).then(() => {
          res.status(200).send({
            status: "Success",
            message: "Success create team",
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

exports.updateReward = async (req, res) => {
  try {
    const { id, name, order, description } = req.body;
    const picture = req?.file?.filename || null;

    const isTeamExist = await Reward.findOne({ where: { id } });

    if (!isTeamExist) {
      return res
        .status(404)
        .send({ status: "Failed", message: "Team not found." });
    }

    if (picture) {
      delImg("team/" + isTeamExist.picture);
    }

    await Reward.update(
      {
        name,

        order,
        description,
        ...(picture && { picture }),
      },
      { where: { id } }
    );

    res.status(200).send({
      status: "Success",
      message: "Successfully updated Reward.",
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteReward = async (req, res) => {
  try {
    const { id } = req.params;

    const isTeamExist = await Reward.findOne({ where: { id } });

    if (!isTeamExist) {
      return res
        .status(404)
        .send({ status: "Failed", message: "Team not found." });
    }

    delImg("reward/" + isTeamExist.picture);

    await Reward.destroy({ where: { id } }).then(() => {
      res.status(200).send({
        status: "Success",
        message: "Successfully delete Reward.",
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};
