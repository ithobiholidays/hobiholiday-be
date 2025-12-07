const { CV, JobPosition, CVStatus } = require("../../models");
const { Op } = require("sequelize");
const { delImg } = require("../middleware/deleteImage");

exports.getAllCVs = async (req, res) => {
  try {
    const { p, limit } = req.body;
    let skip = p * limit - limit;

    await CV.findAndCountAll({
      attributes: {
        exclude: ["updatedAt"],
      },
      include: [
        {
          model: JobPosition,
          as: "position",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
      offset: skip,
      limit,
    }).then((result) => {
      const data = result.rows.map((item) => {
        const documentHost = process.env.HOST_URL + "/uploads/cv/";

        return {
          id: item.dataValues.id,
          document: item.dataValues.document,
          position: item.dataValues.position.name,
          status: item.dataValues.status,
          documentHost,
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

exports.getCVs = async (req, res) => {
  try {
    await CV.findAndCountAll({
      attributes: {
        exclude: ["updatedAt"],
      },
      include: [
        {
          model: JobPosition,
          as: "position",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    }).then((result) => {
      const data = result.rows.map((item) => {
        const documentHost = process.env.HOST_URL + "/uploads/cv/";

        return {
          id: item.dataValues.id,
          document: item.dataValues.document,
          position: item.dataValues.position.name,
          status: item.dataValues.status,
          documentHost,
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

exports.filterByPosition = async (req, res) => {
  try {
    const { positionId } = req.body;

    await CV.findAndCountAll({
      where: {
        positionId: {
          [Op.iLike]: `%${positionId}%`,
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: JobPosition,
          as: "position",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    }).then((result) => {
      const data = result.rows.map((item) => {
        const documentHost = process.env.HOST_URL + "/uploads/cv/";

        return {
          id: item.dataValues.id,
          document: item.dataValues.document,
          position: item.dataValues.position.name,
          status: item.dataValues.status,
          documentHost,
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

exports.filterByPositionWithPagination = async (req, res) => {
  try {
    const { p, limit } = req.body;
    let skip = p * limit - limit;

    const { positionId } = req.body;

    await CV.findAndCountAll({
      where: {
        positionId: {
          [Op.iLike]: `%${positionId}%`,
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: JobPosition,
          as: "position",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
      offset: skip,
      limit,
    }).then((result) => {
      const data = result.rows.map((item) => {
        const documentHost = process.env.HOST_URL + "/uploads/cv/";

        return {
          id: item.dataValues.id,
          document: item.dataValues.document,
          position: item.dataValues.position.name,
          status: item.dataValues.status,
          documentHost,
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

exports.filterByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    await CV.findAndCountAll({
      attributes: {
        exclude: ["updatedAt"],
      },
      include: [
        {
          model: JobPosition,
          as: "position",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
      ],
      where: { status },
      order: [["createdAt", "DESC"]],
    }).then((result) => {
      const data = result.rows.map((item) => {
        const documentHost = process.env.HOST_URL + "/uploads/cv/";

        return {
          id: item.dataValues.id,
          document: item.dataValues.document,
          position: item.dataValues.position.name,
          status: item.dataValues.status,
          documentHost,
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

exports.filterByStatusWithPagination = async (req, res) => {
  try {
    const { p, limit, status } = req.body;
    let skip = p * limit - limit;

    await CV.findAndCountAll({
      attributes: {
        exclude: ["updatedAt"],
      },
      include: [
        {
          model: JobPosition,
          as: "position",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
      ],
      where: { status },
      order: [["createdAt", "DESC"]],
      offset: skip,
      limit,
    }).then((result) => {
      const data = result.rows.map((item) => {
        const documentHost = process.env.HOST_URL + "/uploads/cv/";

        return {
          id: item.dataValues.id,
          document: item.dataValues.document,
          position: item.dataValues.position.name,
          status: item.dataValues.status,
          documentHost,
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

exports.createCV = async (req, res) => {
  try {
    const { positionId } = req.body;
    const document = req.file.filename;

    await CV.create({
      positionId,
      document,
      status: "Received",
    }).then(() => {
      res.status(200).send({
        status: "Success",
        message: "Success create CV",
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.updateCVStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    await CV.update({ status }, { where: { id } }).then(() => {
      res.status(200).send({
        status: "Success",
        message: "Success update CV status",
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteCV = async (req, res) => {
  try {
    const { id } = req.params;

    const isCVExist = await CV.findOne({ where: { id } });

    if (isCVExist) {
      delImg("cv/" + isCVExist.document);

      await CV.destroy({ where: { id } }).then(() => {
        res
          .status(200)
          .send({ status: "Success", message: "Success delete CV" });
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getCVstatuses = async (req, res) => {
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
