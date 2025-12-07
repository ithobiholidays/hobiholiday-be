const { Sequelize } = require("sequelize");
const {
  BlogCategories,
  Blogs,
  Categories,
  Products,
  Testimony,
  CV,
  JobPosition,
} = require("../../models");

exports.dashboardView = async (req, res) => {
  try {
    let p,
      limit,
      skip,
      BlogCategoriesTotal,
      PublishedBlogsTotal,
      ScheduledBlogsTotal,
      ProductCategoriesTotal,
      ProductsActiveTotal,
      ProductsInactiveTotal,
      TestimonyTotal,
      JobsAppliedTotal;
    p = 1;
    limit = 1;
    skip = p * limit - limit;

    await BlogCategories.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "id"],
        include: [
          [
            Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "blogs_categories"
            WHERE "blogs_categories"."categoryId" = "category_blogs"."id"
          )`),
            "blogsCount",
          ],
        ],
      },

      order: [["createdAt", "ASC"]],
    }).then((result) => {
      BlogCategoriesTotal = result.rows;
    });

    await Blogs.findAndCountAll({
      attributes: { exclude: ["updatedAt"] },
      order: [["createdAt", "DESC"]],
      offset: skip,
      limit,
      where: { status: "published" },
    }).then((result) => {
      PublishedBlogsTotal = result.count;
    });

    await Blogs.findAndCountAll({
      attributes: { exclude: ["updatedAt"] },
      order: [["createdAt", "DESC"]],
      offset: skip,
      limit,
      where: { status: "scheduled" },
    }).then((result) => {
      ScheduledBlogsTotal = result.count;
    });

    await Categories.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "id"],
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
      order: [["createdAt", "ASC"]],
    }).then((result) => {
      ProductCategoriesTotal = result.rows;
    });

    await Products.findAndCountAll({
      attributes: {
        exclude: ["updatedAt"],
      },
      order: [["createdAt", "DESC"]],
      where: { isActive: true },
      offset: skip,
      limit,
    }).then((result) => {
      ProductsActiveTotal = result.count;
    });

    await Products.findAndCountAll({
      attributes: {
        exclude: ["updatedAt"],
      },
      order: [["createdAt", "DESC"]],
      where: { isActive: false },
      offset: skip,
      limit,
    }).then((result) => {
      ProductsInactiveTotal = result.count;
    });

    await Testimony.findAndCountAll({
      attributes: {
        exclude: ["updatedAt"],
      },
      order: [["createdAt", "DESC"]],
      offset: skip,
      limit,
    }).then((result) => {
      TestimonyTotal = result.count;
    });

    const statusCounts = await CV.findAll({
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      group: ["status"],
    });

    const counts = { Received: 0, Approved: 0, Rejected: 0 };
    statusCounts.forEach((item) => {
      counts[item.dataValues.status] = parseInt(item.dataValues.count);
    });

    const groupedCVs = await JobPosition.findAll({
      attributes: [
        ["name", "name"],
        [Sequelize.fn("COUNT", Sequelize.col("cvs.id")), "count"],
      ],
      include: [
        {
          model: CV,
          as: "cvs",
          attributes: [],
          required: false,
        },
      ],
      group: ["job_positions.id", "job_positions.name"],
      order: [[Sequelize.literal("count"), "DESC"]],
      raw: true,
    });

    const formattedJob = groupedCVs.map((cv) => ({
      name: cv.name,
      count: parseInt(cv.count),
    }));
    JobsAppliedTotal = formattedJob;
    const newBlog = BlogCategoriesTotal.map((cat) => ({
      name: cat.dataValues.name,
      count: parseInt(cat.dataValues.blogsCount),
    }));

    const newProd = ProductCategoriesTotal.map((cat) => ({
      name: cat.dataValues.name,
      count: parseInt(cat.dataValues.productCount),
    }));

    res.status(200).send({
      status: "Success",
      data: {
        blogCategories: newBlog,
        blogs: {
          published: PublishedBlogsTotal,
          scheduled: ScheduledBlogsTotal,
        },
        productCategories: newProd,
        products: {
          active: ProductsActiveTotal,
          inactive: ProductsInactiveTotal,
        },
        testimony: TestimonyTotal,
        cv: counts,
        job: JobsAppliedTotal,
      },
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};
