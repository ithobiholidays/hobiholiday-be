const { Op } = require("sequelize");
const { Blogs, BlogCategories, BlogsBridge } = require("../../models");
const sanitizeHtml = require("sanitize-html");
const { delImg } = require("../middleware/deleteImage");
const { parseStringToArray } = require("../middleware/parseStringToArray");

exports.getAllBlogs = async (req, res) => {
  try {
    const { p, limit } = req.body;
    const { q, search } = req.query;
    const skip = p * limit - limit;

    if (!q) {
      return res.status(400).send({
        status: "Failed",
        message: "Missing parameter",
      });
    }

    let whereClause = {};
    if (q === "p") {
      whereClause.status = "published";
    } else if (q === "all") {
      whereClause.status = { [Op.in]: ["published", "scheduled"] };
    }

    if (search) {
      whereClause.title = { [Op.iLike]: `%${search}%` };
    }

    const result = await Blogs.findAndCountAll({
      distinct: true,
      attributes: { exclude: ["updatedAt"] },
      order: [["createdAt", "DESC"]],
      offset: skip,
      limit,
      include: [
        {
          model: BlogCategories,
          through: BlogsBridge,
          as: "categories",
          attributes: ["name"],
        },
      ],
      where: whereClause,
    });

    const imageHost = process.env.HOST_URL + "/uploads/blogs/";

    const data = result.rows.map((item) => {
      const { createdAt, ...filteredData } = item.dataValues;
      return {
        ...filteredData,
        imageHost,
        categories: item.categories.map((category) => category.name),
      };
    });

    res.status(200).send({
      status: "Success",
      total: result.count,
      data,
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const { q, search } = req.query;

    if (!q) {
      return res.status(400).send({
        status: "Failed",
        message: "Missing parameter",
      });
    }

    let whereClause = {};
    if (q === "p") {
      whereClause.status = "published";
    } else if (q === "all") {
      whereClause.status = { [Op.in]: ["published", "scheduled"] };
    }

    if (search) {
      whereClause.title = { [Op.iLike]: `%${search}%` };
    }

    await Blogs.findAndCountAll({
      distinct: true,
      attributes: {
        exclude: ["updatedAt"],
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: BlogCategories,
          through: BlogsBridge,
          as: "categories",
          attributes: ["name"],
        },
      ],
      where: whereClause,
    }).then((result) => {
      const data = result.rows.map((item) => {
        const imageHost = process.env.HOST_URL + "/uploads/blogs/";
        const { createdAt, ...filteredData } = item.dataValues;

        return {
          ...filteredData,
          imageHost,
          categories: item.categories.map((category) => category.name),
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

exports.filteredBlogs = async (req, res) => {
  try {
    const { categoryIds } = req.body;
    const { q } = req.query;

    if (!q) {
      return res.status(400).send({
        status: "Failed",
        message: "Missing parameter",
      });
    }

    let whereClause = {};
    if (q === "p") {
      whereClause.status = "published";
    } else if (q === "all") {
      whereClause.status = { [Op.in]: ["published", "scheduled"] };
    }

    if (
      !categoryIds ||
      !Array.isArray(categoryIds) ||
      categoryIds.length === 0
    ) {
      return res.status(400).send({
        status: "Failed",
        message: "categoryIds must be a non-empty array",
      });
    }

    await Blogs.findAndCountAll({
      distinct: true,
      attributes: {
        exclude: ["updatedAt"],
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: BlogCategories,
          through: BlogsBridge,
          as: "categories",
          attributes: ["name"],
          where: { id: { [Op.in]: categoryIds } },
        },
      ],
      where: whereClause,
    }).then((result) => {
      const data = result.rows.map((item) => {
        const imageHost = process.env.HOST_URL + "/uploads/blogs/";
        const { createdAt, ...filteredData } = item.dataValues;

        return {
          ...filteredData,
          imageHost,
          categories: item.categories.map((category) => category.name),
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

exports.filteredBlogsWithPagination = async (req, res) => {
  try {
    const { categoryIds, p, limit } = req.body;
    const { q } = req.query;
    let skip = p * limit - limit;

    if (!q) {
      return res.status(400).send({
        status: "Failed",
        message: "Missing parameter",
      });
    }

    if (
      !categoryIds ||
      !Array.isArray(categoryIds) ||
      categoryIds.length === 0
    ) {
      return res.status(400).send({
        status: "Failed",
        message: "categoryIds must be a non-empty array",
      });
    }

    await Blogs.findAndCountAll({
      distinct: true,
      attributes: {
        exclude: ["updatedAt"],
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: BlogCategories,
          through: BlogsBridge,
          as: "categories",
          attributes: ["name"],
          where: { id: { [Op.in]: categoryIds } },
        },
      ],
      offset: skip,
      limit,
      where: { status: "published" },
    }).then((result) => {
      const data = result.rows.map((item) => {
        const imageHost = process.env.HOST_URL + "/uploads/blogs/";
        const { createdAt, ...filteredData } = item.dataValues;

        return {
          ...filteredData,
          imageHost,
          categories: item.categories.map((category) => category.name),
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

exports.getBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    const data = await Blogs.findOne({
      where: { slug },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: BlogCategories,
          through: BlogsBridge,
          as: "categories",
          attributes: ["name"],
        },
      ],
    });

    const mappedData = {
      ...data.dataValues,
      imageHost: process.env.HOST_URL + "/uploads/blogs/",
      categories: data.dataValues.categories.map((category) => category.name),
    };

    res.status(200).send({
      status: "Success",
      data: mappedData,
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.filterByTitle = async (req, res) => {
  try {
    const { name } = req.body;

    await Blogs.findAndCountAll({
      where: {
        title: {
          [Op.iLike]: `%${name}%`,
        },
        status: "published",
      },
      attributes: {
        exclude: ["updatedAt"],
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: BlogCategories,
          through: BlogsBridge,
          as: "categories",
          attributes: ["name"],
        },
      ],
    }).then((result) => {
      const data = result.rows.map((item) => {
        const imageHost = process.env.HOST_URL + "/uploads/blogs/";
        const { createdAt, ...filteredData } = item.dataValues;

        return {
          ...filteredData,
          imageHost,
          categories: item.categories.map((category) => category.name),
        };
      });

      res.status(200).send({
        status: "Success",
        total: data.length,
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

exports.createBlogs = async (req, res) => {
  try {
    const {
      title,
      content,
      keyword,
      slug,
      description,
      publishedAt,
      status,
      author,
      categoryIds,
    } = req.body;
    const picture = req.file.filename;

    const transformed = slugify(slug);

    const blog = await Blogs.create({
      title,
      keyword,
      publishedAt,
      slug: transformed,
      description,
      author,
      content: sanitizeHtml(content),
      picture,
      status: status === "" ? "published" : status,
    });

    if (categoryIds) {
      const categories = await BlogCategories.findAll({
        where: {
          id: parseStringToArray(categoryIds),
        },
      });

      await blog.addCategories(categories).then(() => {
        res.status(200).send({
          status: "Success",
          message: "Success create new product",
        });
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.editBlog = async (req, res) => {
  try {
    const {
      id,
      title,
      content,
      keyword,
      slug,
      description,
      publishedAt,
      status,
      author,
      categoryIds,
    } = req.body;
    const picture = req?.file?.filename || null;

    const parsedCategoryIds = parseStringToArray(categoryIds);

    const isBlogExist = await Blogs.findOne({
      where: { id },
      include: {
        model: BlogCategories,
        through: BlogsBridge,
        as: "categories",
        attributes: ["id"],
      },
    });

    if (!isBlogExist) {
      return res.status(404).send({
        status: "Failed",
        message: "Blog not found",
      });
    }

    if (picture && isBlogExist.picture) {
      delImg("blogs/" + isBlogExist.picture);
    }

    const transformed = slugify(slug);

    await Blogs.update(
      {
        title,
        content,
        keyword,
        slug: transformed,
        description,
        publishedAt,
        status,
        author,
        picture,
      },
      { where: { id } }
    );

    if (parsedCategoryIds && Array.isArray(parsedCategoryIds)) {
      const existingCategoryIds = isBlogExist.categories.map((c) => c.id);

      const categoriesToRemove = existingCategoryIds.filter(
        (catId) => !parsedCategoryIds.includes(catId)
      );

      const categoriesToAdd = parsedCategoryIds.filter(
        (catId) => !existingCategoryIds.includes(catId)
      );

      if (categoriesToRemove.length > 0) {
        await BlogsBridge.destroy({
          where: {
            blogId: id,
            categoryId: { [Op.in]: categoriesToRemove },
          },
        });
      }

      if (categoriesToAdd.length > 0) {
        const newBlogCategories = categoriesToAdd.map((catId) => ({
          blogId: id,
          categoryId: catId,
        }));

        await BlogsBridge.bulkCreate(newBlogCategories);
      }
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully updated blog",
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const isBlogExist = await Blogs.findOne({ where: { id } });

    if (isBlogExist) {
      delImg("blogs/" + isBlogExist.picture);

      await Blogs.destroy({ where: { id } }).then(() => {
        res
          .status(200)
          .send({ status: "Success", message: "Success delete blog" });
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.slugValidation = async (req, res) => {
  try {
    const { slug } = req.body;

    const transformed = slugify(slug);

    const isSlugExist = await Blogs.findOne({ where: { slug: transformed } });

    if (isSlugExist) {
      return res.status(400).send({
        status: "Failed",
        message: "Slug already exist.",
      });
    } else {
      return res.status(200).send({
        status: "Success",
        message: "You can use this slug.",
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove characters that are not letters, numbers, spaces, or hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}
