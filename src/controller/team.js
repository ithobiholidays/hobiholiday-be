const { Team } = require("../../models");
const { delImg } = require("../middleware/deleteImage");

exports.getAllTeams = async (req, res) => {
  try {
    const { p, limit } = req.body;
    let skip = p * limit - limit;

    await Team.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["order", "ASC"]],
      offset: skip,
      limit,
    }).then((result) => {
      const data = result.rows.map((item) => {
        const imageHost = process.env.HOST_URL + "/uploads/team/";

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

exports.getTeams = async (req, res) => {
  try {
    await Team.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["order", "ASC"]],
    }).then((result) => {
      const data = result.rows.map((item) => {
        const imageHost = process.env.HOST_URL + "/uploads/team/";

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

exports.getTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Team.findOne({
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
            imageHost: process.env.HOST_URL + "/uploads/team/",
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

exports.createTeam = async (req, res) => {
  try {
    const { name, position, order, description } = req.body;
    const picture = req.file.filename;

    await Team.findOne({ where: { name } }).then((result) => {
      result &&
        res.status(400).send({
          status: "Failed",
          message: "Team already exist",
        });

      !result &&
        Team.create({ name, position, order, description, picture }).then(
          () => {
            res.status(200).send({
              status: "Success",
              message: "Success create team",
            });
          }
        );
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { id, name, position, order, description } = req.body;
    const picture = req?.file?.filename || null;

    const isTeamExist = await Team.findOne({ where: { id } });

    if (!isTeamExist) {
      return res
        .status(404)
        .send({ status: "Failed", message: "Team not found." });
    }

    if (picture) {
      delImg("team/" + isTeamExist.picture);
    }

    await Team.update(
      {
        name,
        position,
        order,
        description,
        ...(picture && { picture }),
      },
      { where: { id } }
    );

    res.status(200).send({
      status: "Success",
      message: "Successfully updated team.",
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const isTeamExist = await Team.findOne({ where: { id } });

    if (!isTeamExist) {
      return res
        .status(404)
        .send({ status: "Failed", message: "Team not found." });
    }

    delImg("team/" + isTeamExist.picture);

    await Team.destroy({ where: { id } }).then(() => {
      res.status(200).send({
        status: "Success",
        message: "Successfully delete team.",
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};
