const cron = require("node-cron");
const { Session } = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment-timezone");
const { logger } = require("./activityLog");

const deleteExpiredSessions = async () => {
  try {
    const now = moment().tz("Asia/Bangkok").toDate();

    const deletedSessions = await Session.destroy({
      where: {
        expiredAt: { [Op.lte]: now },
      },
    });

    if (deletedSessions > 0) {
      console.log(`Deleted ${deletedSessions} expired sessions at ${now}`);
      logger.info(`Deleted ${deletedSessions} expired sessions at ${now}`);
    } else {
      console.log(`No expired sessions found at ${now}`);
    }
  } catch (error) {
    console.error("Error deleting expired sessions:", error);
    logger.error("Error deleting expired sessions:", error);
  }
};

cron.schedule("0 0 * * *", deleteExpiredSessions, {
  timezone: "Asia/Bangkok",
});

module.exports = { deleteExpiredSessions };
