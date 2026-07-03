const { CustomerLead } = require("../../models");
const { Op } = require("sequelize");

exports.createCustomerLead = async (req, res) => {
  try {
    const { name, phone, pax, categoryName, productUrl, productTitle } = req.body;

    if (!name?.trim() || !phone?.trim() || !pax) {
      return res.status(400).send({
        status: "Failed",
        message: "Nama, no HP, dan jumlah pax wajib diisi",
      });
    }

    const paxNumber = parseInt(pax, 10);
    if (isNaN(paxNumber) || paxNumber < 1) {
      return res.status(400).send({
        status: "Failed",
        message: "Jumlah pax minimal 1",
      });
    }

    await CustomerLead.create({
      name: name.trim(),
      phone: phone.trim(),
      pax: paxNumber,
      categoryName: categoryName || "",
      productUrl: productUrl || "",
      productTitle: productTitle || "",
    });

    res.status(200).send({
      status: "Success",
      message: "Lead berhasil disimpan",
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getAllCustomerLeads = async (req, res) => {
  try {
    const { p, limit } = req.body;
    const skip = p * limit - limit;

    const result = await CustomerLead.findAndCountAll({
      attributes: { exclude: ["updatedAt"] },
      order: [["createdAt", "DESC"]],
      offset: skip,
      limit,
    });

    res.status(200).send({
      status: "Success",
      total: result.count,
      data: result.rows,
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.exportCustomerLeads = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).send({
        status: "Failed",
        message: "Tanggal mulai dan tanggal akhir wajib diisi",
      });
    }

    // Range inklusif: 00:00:00 tanggal mulai s/d 23:59:59 tanggal akhir
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    if (start > end) {
      return res.status(400).send({
        status: "Failed",
        message: "Tanggal mulai tidak boleh melebihi tanggal akhir",
      });
    }

    const result = await CustomerLead.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        createdAt: { [Op.between]: [start, end] },
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).send({
      status: "Success",
      total: result.length,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteCustomerLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await CustomerLead.findByPk(id);
    if (!lead) {
      return res.status(404).send({
        status: "Failed",
        message: "Data tidak ditemukan",
      });
    }

    await lead.destroy();

    res.status(200).send({
      status: "Success",
      message: "Lead berhasil dihapus",
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};