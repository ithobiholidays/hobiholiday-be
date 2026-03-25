const { Products, Categories, ProductCategories } = require('../../models');
const { Op, literal } = require('sequelize');
const { delImg, cloneImg } = require('../middleware/deleteImage');
const { parseStringToArray } = require('../middleware/parseStringToArray');

exports.getAllProducts = async (req, res) => {
  try {
    const { p, limit } = req.body;
    const { s, search } = req.query;
    const skip = p * limit - limit;

    if (!s) {
      return res.status(400).send({
        status: 'Failed',
        message: 'Missing parameter',
      });
    }

    let whereClause = {};
    if (s === '1') {
      whereClause.isActive = true;
    } else if (s === 'all') {
      whereClause.isActive = { [Op.in]: [true, false] };
    }

    if (search) {
      whereClause.title = { [Op.iLike]: `%${search}%` };
    }

    await Products.findAndCountAll({
      distinct: true,
      attributes: {
        exclude: ['updatedAt'],
      },
      order: [['isSoldOut', 'ASC'], literal('"startDate" ASC NULLS LAST')],
      offset: skip,
      limit,
      include: [
        {
          model: Categories,
          through: ProductCategories,
          as: 'categories',
          attributes: ['name'],
          required: true,
        },
      ],
      where: whereClause,
    }).then((result) => {
      const data = result.rows.map((item) => {
        const bannerHost = process.env.HOST_URL + '/uploads/banner/';
        const iteneraryHost = process.env.HOST_URL + '/uploads/itenerary/';
        const { createdAt, ...filteredData } = item.dataValues;

        return {
          ...filteredData,
          bannerHost,
          iteneraryHost,
          categories: item.categories.map((category) => category.name),
        };
      });

      res.status(200).send({
        status: 'Success',
        total: result.count,
        data,
      });
    });
  } catch (error) {
    res.status(400).send({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { s, search } = req.query;

    if (!s) {
      return res.status(400).send({
        status: 'Failed',
        message: 'Missing parameter',
      });
    }

    let whereClause = {};
    if (s === '1') {
      whereClause.isActive = true;
    } else if (s === 'all') {
      whereClause.isActive = { [Op.in]: [true, false] };
    }

    if (search) {
      whereClause.title = { [Op.iLike]: `%${search}%` };
    }

    await Products.findAndCountAll({
      distinct: true,
      attributes: {
        exclude: ['updatedAt'],
      },
      order: [['isSoldOut', 'ASC'], literal('"startDate" ASC NULLS LAST')],
      include: [
        {
          model: Categories,
          through: ProductCategories,
          as: 'categories',
          attributes: ['name'],
        },
      ],
      where: whereClause,
    }).then((result) => {
      const data = result.rows.map((item) => {
        const bannerHost = process.env.HOST_URL + '/uploads/banner/';
        const iteneraryHost = process.env.HOST_URL + '/uploads/itenerary/';
        const { createdAt, ...filteredData } = item.dataValues;

        return {
          ...filteredData,
          bannerHost,
          iteneraryHost,
          categories: item.categories.map((category) => category.name),
        };
      });

      res.status(200).send({
        status: 'Success',
        total: data.length,
        data,
      });
    });
  } catch (error) {
    res.status(400).send({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.filteredProducts = async (req, res) => {
  try {
    const { categoryIds } = req.body;
    const { s } = req.query;

    if (!s) {
      return res.status(400).send({
        status: 'Failed',
        message: 'Missing parameter',
      });
    }

    let whereClause = {};
    if (s === '1') {
      whereClause.isActive = true;
    } else if (s === 'all') {
      whereClause.isActive = { [Op.in]: [true, false] };
    }

    if (
      !categoryIds ||
      !Array.isArray(categoryIds) ||
      categoryIds.length === 0
    ) {
      return res.status(400).send({
        status: 'Failed',
        message: 'categoryIds must be a non-empty array',
      });
    }

    await Products.findAndCountAll({
      distinct: true,
      attributes: {
        exclude: ['updatedAt'],
      },
      order: [['isSoldOut', 'ASC'], literal('"startDate" ASC NULLS LAST')],
      include: [
        {
          model: Categories,
          through: ProductCategories,
          as: 'categories',
          attributes: ['name'],
          where: { id: { [Op.in]: categoryIds } },
        },
      ],
      where: whereClause,
    }).then((result) => {
      const data = result.rows.map((item) => {
        const bannerHost = process.env.HOST_URL + '/uploads/banner/';
        const iteneraryHost = process.env.HOST_URL + '/uploads/itenerary/';
        const { createdAt, ...filteredData } = item.dataValues;

        return {
          ...filteredData,
          bannerHost,
          iteneraryHost,
          categories: item.categories.map((category) => category.name),
        };
      });

      res.status(200).send({
        status: 'Success',
        total: data.length,
        data,
      });
    });
  } catch (error) {
    res.status(400).send({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.filteredPaginationProducts = async (req, res) => {
  try {
    const { categoryIds, p, limit } = req.body;
    const { s } = req.query;
    const skip = p * limit - limit;

    if (!s) {
      return res.status(400).send({
        status: 'Failed',
        message: 'Missing parameter',
      });
    }

    let whereClause = {};
    if (s === '1') {
      whereClause.isActive = true;
    } else if (s === 'all') {
      whereClause.isActive = { [Op.in]: [true, false] };
    }

    if (
      !categoryIds ||
      !Array.isArray(categoryIds) ||
      categoryIds.length === 0
    ) {
      return res.status(400).send({
        status: 'Failed',
        message: 'categoryIds must be a non-empty array',
      });
    }

    await Products.findAndCountAll({
      distinct: true,
      attributes: {
        exclude: ['updatedAt'],
      },
      order: [['isSoldOut', 'ASC'], literal('"startDate" ASC NULLS LAST')],
      include: [
        {
          model: Categories,
          through: ProductCategories,
          as: 'categories',
          attributes: ['name'],
          where: { id: { [Op.in]: categoryIds } },
        },
      ],
      offset: skip,
      limit,
      where: whereClause,
    }).then((result) => {
      const data = result.rows.map((item) => {
        const bannerHost = process.env.HOST_URL + '/uploads/banner/';
        const iteneraryHost = process.env.HOST_URL + '/uploads/itenerary/';
        const { createdAt, ...filteredData } = item.dataValues;

        return {
          ...filteredData,
          bannerHost,
          iteneraryHost,
          categories: item.categories.map((category) => category.name),
        };
      });

      res.status(200).send({
        status: 'Success',
        total: result.count,
        data,
      });
    });
  } catch (error) {
    res.status(400).send({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Products.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Categories,
          through: ProductCategories,
          as: 'categories',
          attributes: ['name'],
        },
      ],
    });

    if (!data) {
      return res.status(404).send({
        status: 'Failed',
        message: 'Product not found',
      });
    }

    const bannerHost = process.env.HOST_URL + '/uploads/banner/';
    const iteneraryHost = process.env.HOST_URL + '/uploads/itenerary/';

    const mappedData = {
      ...data.dataValues,
      bannerHost,
      iteneraryHost,
      categories: data.dataValues.categories.map((category) => category.name),
    };

    data
      ? res.status(200).send({
          status: 'Success',
          data: mappedData,
        })
      : res.status(404).send({
          status: 'Failed',
          message: 'Product not found',
        });
  } catch (error) {
    res.status(400).send({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      theme,
      date,
      price,
      discPrice,
      detail,
      label,
      description,
      categoryIds,
      startDate,
      endDate,
    } = req.body;
    const banner = req.files.banner[0].filename;
    const itenerary = req.files.itenerary[0].filename;

    const product = await Products.create({
      title,
      price,
      discPrice,
      description,
      theme,
      date,
      banner,
      detail,
      label,
      itenerary,
      startDate: startDate || null,
      endDate: endDate || null,
      isActive: true,
      isSoldOut: false,
    });

    if (categoryIds) {
      const categories = await Categories.findAll({
        where: {
          id: parseStringToArray(categoryIds),
        },
      });
      await product.addCategories(categories).then(() => {
        res.status(200).send({
          status: 'Success',
          message: 'Success create new product',
        });
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const {
      id,
      title,
      theme,
      date,
      price,
      discPrice,
      detail,
      label,
      description,
      categoryIds,
      startDate,
      endDate,
    } = req.body;

    const banner = req?.files?.banner?.[0]?.filename || null;
    const itenerary = req?.files?.itenerary?.[0]?.filename || null;

    const parsedCategoryIds = parseStringToArray(categoryIds);

    const isProductExist = await Products.findOne({
      where: { id },
      include: {
        model: Categories,
        through: ProductCategories,
        as: 'categories',
        attributes: ['id'],
      },
    });

    if (!isProductExist) {
      return res.status(404).send({
        status: 'Failed',
        message: 'Product not found',
      });
    }

    if (banner) delImg('banner/' + isProductExist.banner);
    if (itenerary) delImg('itenerary/' + isProductExist.itenerary);

    await Products.update(
      {
        title,
        theme,
        date,
        price,
        discPrice,
        detail,
        label,
        description,
        banner: banner || isProductExist.banner,
        itenerary: itenerary || isProductExist.itenerary,
        startDate: startDate || isProductExist.startDate,
        endDate: endDate || isProductExist.endDate,
      },
      { where: { id } }
    );

    if (parsedCategoryIds && Array.isArray(parsedCategoryIds)) {
      const existingCategoryIds = isProductExist.categories.map((c) => c.id);

      const categoriesToRemove = existingCategoryIds.filter(
        (catId) => !parsedCategoryIds.includes(catId)
      );

      const categoriesToAdd = parsedCategoryIds.filter(
        (catId) => !existingCategoryIds.includes(catId)
      );

      if (categoriesToRemove.length > 0) {
        await ProductCategories.destroy({
          where: {
            productId: id,
            categoryId: { [Op.in]: categoriesToRemove },
          },
        });
      }

      if (categoriesToAdd.length > 0) {
        const newProductCategories = categoriesToAdd.map((catId) => ({
          productId: id,
          categoryId: catId,
        }));

        await ProductCategories.bulkCreate(newProductCategories);
      }
    }

    res.status(200).send({
      status: 'Success',
      message: 'Successfully updated product',
    });
  } catch (error) {
    res.status(400).send({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const isProductExist = await Products.findOne({ where: { id } });

    if (isProductExist) {
      delImg('banner/' + isProductExist.banner);
      delImg('itenerary/' + isProductExist.itenerary);

      await Products.destroy({ where: { id } }).then(() => {
        res.status(200).send({
          status: 'Success',
          message: 'Success delete product',
        });
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.updateProductStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    await Products.update({ isActive: status }, { where: { id } }).then(() => {
      res.status(200).send({
        status: 'Success',
        message: 'Success change Product status',
      });
    });
  } catch (error) {
    res.status(400).send({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.updateProductSoldStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    await Products.update({ isSoldOut: status }, { where: { id } }).then(() => {
      res.status(200).send({
        status: 'Success',
        message: 'Success change Product status',
      });
    });
  } catch (error) {
    res.status(400).send({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.cloneProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const isExist = await Products.findOne({ where: { id } });

    if (!isExist) {
      return res.status(404).send({
        status: 'Failed',
        message: 'Product not found',
      });
    }

    const newBanner = await cloneImg('banner/' + isExist.banner);
    const newItenerary = await cloneImg('itenerary/' + isExist.itenerary);

    const product = await Products.create({
      title: isExist.title,
      price: isExist.price,
      discPrice: isExist.discPrice,
      description: isExist.description,
      theme: isExist.theme,
      date: isExist.date,
      banner: newBanner,
      detail: isExist.detail,
      label: isExist.label,
      itenerary: newItenerary,
      startDate: isExist.startDate,
      endDate: isExist.endDate,
      isActive: true,
      isSoldOut: false,
    });

    const existingProductCategories = await ProductCategories.findAll({
      where: { productId: id },
      attributes: ['categoryId'],
    });

    if (existingProductCategories.length > 0) {
      const categoryIds = existingProductCategories.map((c) => c.categoryId);

      const categories = await Categories.findAll({
        where: { id: categoryIds },
      });

      await product.addCategories(categories);
    }

    res.status(201).send({
      status: 'Success',
      message: 'Product successfully cloned',
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      status: 'Failed',
      message: error.message,
    });
  }
};
