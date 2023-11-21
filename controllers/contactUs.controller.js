const { ContactUs } = require("../models");
const { createContactUsSchema } = require("./validation/contactUs.validation");
const { Op } = require("sequelize");
const multer = require("multer");
// create contact us
exports.createContactUs = async (request, response) => {
  try {
    const jsonToObjData =
      typeof request.body.json === "string"
        ? JSON.parse(request.body.json)
        : " ";
    
    const { error } = createContactUsSchema.validate(jsonToObjData);
    if (error) {
      return response
        .status(200)
        .json({ ack: 0, msg: error.details[0].message });
    }
    const createContact = await ContactUs.create(jsonToObjData);
    response.status(200).json({
      ack: 1,
      msg: "successfully created contactUs",
      data: createContact,
    });
  } catch (error) {
    console.error(error);
    response.status(200).json({ ack: 0, msg: error.message || "Server Error" });
  }
};

// get contactUs
exports.contactUsList = async (request, response) => {
  try {
    const { elements, page, searchParam = "" } = request.query;
    const limit = parseInt(elements);
    const offset = parseInt(limit * (page - 1));

    const { rows, count } = await ContactUs.findAndCountAll({
      where: { fullName: { [Op.like]: `%${searchParam}%` } },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    response.status(200).json({
      ack: 1,
      data: rows,
      totalElements: count,
      totalPage: Math.ceil(count / limit),
      page: parseInt(page),
      elementsPerPage: limit,
    });
  } catch (error) {
    console.log("error", error);
    response.status(500).json({ ack: 0, msg: error.message || "Server error" });
  }
};

// delete contact Us
exports.deleteContactUs = async (request, response) => {
  try {
    const id = request.params.id;
    console.log("id", id);
    const contactUsData = await ContactUs.findByPk(id);
    if (contactUsData) {
      const deletedData = await ContactUs.destroy({
        where: { id: contactUsData.id },
      });
      response
        .status(200)
        .json({ ack: 1, msg: "Successfully deleted data", data: deletedData });
    } else {
      response.status(200).json({ ack: 0, msg: "No Contact Details Found" });
    }
  } catch (error) {
    console.log("error", error);
    response.status(500).json({ ack: 0, msg: error.message || "Server error" });
  }
};
