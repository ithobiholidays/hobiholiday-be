const { CustomerLead } = require("../../models");

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