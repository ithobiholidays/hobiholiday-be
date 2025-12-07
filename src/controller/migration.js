const {
  Users,
  Categories,
  JobPosition,
  CVStatus,
  BlogCategories,
} = require("../../models");
const { Op } = require("sequelize");
const { Up, Down } = require("../../config/migrate");

exports.migrate = async (req, res) => {
  try {
    Up();

    res.status(200).send({
      status: "Success",
      message: "Database table migrate success",
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.dropTable = async (req, res) => {
  try {
    Down();

    res.status(200).send({
      status: "Success",
      message: "Database table drop successfully",
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.seeding = async (req, res) => {
  try {
    await Users.bulkCreate([
      {
        username: "admin",
        firstName: "Admin",
        lastName: "Hobiholidays",
        email: "admin@mail.com",
        password:
          "$2b$12$XK4rMRZcXY8OYkSUuv8BseSnjvf7X0mZP3zaFGoallTCn8u42DlFy", // #EDC2wsx1qaz
        isActive: true,
        role: "SYS",
      },
      {
        username: "zed378",
        firstName: "Super",
        lastName: "System",
        email: "root@mail.com",
        password:
          "$2b$12$e1ysT65hI0bzUhO5CgBwneK7xjp55Thre5cONKI.aWaPTcreiKHEe", // 123123
        isActive: true,
        role: "SYS",
      },
    ])
      .then(() => {
        Categories.bulkCreate([
          {
            name: "Korea",
            order: 1,
          },
          {
            name: "Jepang",
            order: 2,
          },
          {
            name: "Turki & Middle East",
            order: 3,
          },
          {
            name: "Eropa Barat & Timur",
            order: 4,
          },
          {
            name: "UK Scotland",
            order: 5,
          },
          {
            name: "USA & Canada",
            order: 6,
          },
          {
            name: "Scandinavia & Balkan",
            order: 7,
          },
          {
            name: "Russia & China",
            order: 8,
          },
          {
            name: "Afrika",
            order: 9,
          },
          {
            name: "Australia & New Zealand",
            order: 10,
          },
          {
            name: "Spain Portugal",
            order: 11,
          },
          {
            name: "Uzbekhistan dan 4tan",
            order: 12,
          },
          {
            name: "Other Asia",
            order: 13,
          },
          {
            name: "Other Europe",
            order: 14,
          },
          {
            name: "Premium Trip",
            order: 15,
          },
        ]);
      })
      .then(() => {
        JobPosition.bulkCreate([
          {
            name: "HR Specialist",
          },
          {
            name: "Finance",
          },
          {
            name: "Social Media Manager",
          },
          {
            name: "Tiktok Specialist",
          },
          {
            name: "Tour Consultant",
          },
          {
            name: "Tour Leader",
          },
          {
            name: "Visa Specialist",
          },
        ]);
      })
      .then(() => {
        CVStatus.bulkCreate([
          { id: "6c517abd-6939-493d-b254-869d6d16cbf9", name: "Received" },
          { id: "ff0c1988-53cc-4e52-8125-b3e582ed5640", name: "Rejected" },
          { id: "bb29f7bf-2988-48e8-a8df-bed080ccdeb4", name: "Approved" },
        ]);
      })
      .then(() => {
        BlogCategories.bulkCreate([
          { id: "30dd9328-c1ba-4600-bca6-daf87085ccda", name: "Tips" },
          { id: "fdec9b88-c681-4f25-aedb-f775db06d3b5", name: "Culinary" },
          { id: "d5c18235-6441-401c-a5d4-bcabcc3bb4a0", name: "Fashion" },
          { id: "0b870047-0c66-4a79-b07c-af9c0db1fb5c", name: "Travel" },
          { id: "1446a0d3-b7e5-4b18-9cf5-e7c37e1ee60c", name: "Flight" },
          { id: "fd515a80-5694-43b5-a068-840be7c50130", name: "Shopping" },
          { id: "e0c2b977-43b6-4607-8ef7-58b51fb54337", name: "Scenery" },
          { id: "a341415f-c471-4582-98e3-90a2ed92fed3", name: "History" },
          { id: "3caca4f9-e678-4036-8d8c-9732e54b90d7", name: "Culture" },
          { id: "f77da175-1efa-4a95-8f35-e94aea6298ac", name: "Heritage" },
        ]);
      })
      .finally(() =>
        res.status(200).send({
          status: "Success",
          message: "Seeding success",
        })
      );
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.unseeding = async (req, res) => {
  try {
    await Users.destroy({
      where: {
        email: {
          [Op.in]: ["root@mail.com", "admin@mail.com"],
        },
      },
    })
      .then(() => {
        Categories.destroy({
          where: {
            name: {
              [Op.in]: [
                "Korea",
                "Jepang",
                "Turki & Middle East",
                "UK Sctoland",
                "USA & Canada",
                "Scandinavia & Balkan",
                "Russia & China",
                "Afrika",
                "Australia & New Zealand",
                "Spain Portugal",
                "Uzbekhistan",
                "Other Asia",
                "Other Europe",
                "Premium Trip",
              ],
            },
          },
        });
      })
      .then(() => {
        JobPosition.destroy({
          where: {
            name: {
              [Op.in]: [
                "HR Specialist",
                "Finance",
                "Social Media Manager",
                "Tiktok Specialist",
                "Tour Consultant",
                "Tour Leader",
                "Visa Specialist",
              ],
            },
          },
        });
      })
      .then(() => {
        CVStatus.destroy({
          where: {
            name: {
              [Op.in]: ["Received", "Rejected", "Approved"],
            },
          },
        });
      })
      .then(() => {
        BlogCategories.destroy({
          where: {
            name: {
              [Op.in]: [
                "Tips",
                "Culinary",
                "Fashion",
                "Travel",
                "Flight",
                "Shopping",
                "Scenery",
                "History",
                "Culture",
                "Heritage",
              ],
            },
          },
        });
      })
      .finally(() => {
        res.status(200).send({
          status: "Success",
          message: "Unseeding success",
        });
      });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
};
