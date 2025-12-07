const cron = require("node-cron");
const { Blogs } = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment-timezone");
const { logger } = require("./activityLog");

const publishScheduledPosts = async () => {
  try {
    const now = moment().tz("Asia/Bangkok").toDate();

    const scheduledPosts = await Blogs.findAll({
      where: {
        status: "scheduled",
        publishedAt: { [Op.lte]: now },
      },
    });

    if (scheduledPosts.length > 0) {
      await Blogs.update(
        { status: "published" },
        {
          where: {
            id: scheduledPosts.map((post) => post.id),
          },
        }
      );

      console.log(
        `Published ${scheduledPosts.length} scheduled posts at ${now}`
      );
      logger.info(
        `Published ${scheduledPosts.length} scheduled posts at ${now}`
      );
    }
  } catch (error) {
    console.error("Error publishing scheduled posts:", error);
    logger.error("Error publishing scheduled posts:", error);
  }
};

cron.schedule("* * * * *", publishScheduledPosts);

module.exports = { publishScheduledPosts };
