const { Users, Session } = require("../../models");
const { Op } = require("sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const { inputValidation } = require("../middleware/inputValidation");
const saltRounds = 12;

exports.login = async (req, res) => {
  try {
    const { user, password } = req.body;

    const { error } = await inputValidation.validate({ user, password });

    if (error) {
      return res.send({
        status: "Failed",
        message: error.details[0].message.includes("types")
          ? "username length must be at least 3 characters long or email must be valid email."
          : error.details[0].message,
      });
    }

    const isUserExist = await Users.findAll({
      where: {
        [Op.or]: [{ username: user }, { email: user }],
      },
      attributes: {
        exclude: ["updatedAt"],
      },
    });

    if (isUserExist.length === 0) {
      return res.status(400).send({
        status: "Failed",
        message: "You're not registered",
      });
    }

    if (isUserExist[0].dataValues.isActive === false) {
      return res.status(400).send({
        status: "Failed",
        message:
          "Activate your account before you login. Please, open your mailbox.",
      });
    }

    const token = jwt.sign(
      {
        id: isUserExist[0].dataValues.id,
        firstName: isUserExist[0].dataValues.firstName,
        lastName: isUserExist[0].dataValues.lastName,
        email: isUserExist[0].dataValues.email,
        role: isUserExist[0].dataValues.role,
      },
      secret,
      {
        expiresIn: 60 * 60 * 24 * 1, // s * m * h * d
      }
    );

    const data = {
      id: isUserExist[0].dataValues.id,
      firstName: isUserExist[0].dataValues.firstName,
      lastName: isUserExist[0].dataValues.lastName,
      email: isUserExist[0].dataValues.email,
      role: isUserExist[0].dataValues.role,
      username: isUserExist[0].dataValues.username,
      picture: isUserExist[0].dataValues.picture,
      isActive: isUserExist[0].dataValues.isActive,
      join: isUserExist[0].dataValues.createdAt,
    };

    isUserExist.length !== 0 &&
      isUserExist[0].dataValues.isActive == true &&
      bcrypt.compare(
        password,
        isUserExist[0].dataValues.password,
        async function (err, result) {
          (!result || err) &&
            res.status(400).send({
              status: "Failed",
              message: "Email or Username or Password incorrect",
            });

          result &&
            (await Session.create({
              token,
              userId: isUserExist[0].dataValues.id,
            }));

          result &&
            res.status(200).send({
              status: "Success",
              message: "Login Success",
              token,
              data,
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

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, username } = req.body;

    const { error } = inputValidation.validate({
      firstName,
      lastName,
      email,
      password,
      username,
    });

    if (error) {
      return res.send({
        status: "Failed",
        message: error.details[0].message,
      });
    }

    const isUserExist = await Users.findOne({
      where: {
        email,
      },
    });

    isUserExist &&
      res.status(400).send({
        status: "Failed",
        message: "You already registered",
      });

    !isUserExist &&
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hashed) => {
          Users.create({
            firstName,
            lastName,
            email,
            username,
            role: "ADMIN",
            isActive: true,
            password: hashed,
          })
            .then((result) => {
              result &&
                res.status(200).send({
                  status: "Success",
                  message: "Successfully register.",
                });
            })
            .catch((err) => {
              res.status(400).send({
                status: "Failed",
                message: err,
              });
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

exports.verify = async (req, res) => {
  try {
    const id = req?.user?.id;
    const existToken = req?.user?.token;

    if (!id) {
      return res.status(200).send({
        status: "Failed",
        message: "User ID is missing",
      });
    }

    const user = await Users.findOne({
      where: { id },
      attributes: { exclude: ["updatedAt", "password", "otp", "otpToken"] },
    });

    if (!user) {
      return res.status(200).send({
        status: "Failed",
        message:
          "You're not registered. Why are you using a token from nowhere?",
      });
    }

    const session = await Session.findOne({
      where: { token: existToken, userId: id },
    });

    if (!session) {
      return res.status(200).send({
        status: "Failed",
        message: "Your session was not found",
      });
    }

    if (isSessionExpired(session.expiredAt)) {
      await Session.destroy({ where: { token: existToken, userId: id } });
      return res.status(200).send({
        status: "Failed",
        message: "Your token has expired",
      });
    }

    return res.status(200).send({
      status: "Success",
      message: "Token verified successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const id = req?.user?.id;
    const token = req?.user?.token;

    await Session.destroy({ where: { userId: id, token } });

    return res.status(200).send({
      status: "Success",
      message: "Success Logout",
    });
  } catch (error) {
    return res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};

const isSessionExpired = (expiredAt) => {
  return new Date(expiredAt) <= new Date();
};
