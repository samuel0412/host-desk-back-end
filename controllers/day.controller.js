const { Days } = require("../models");

// all
exports.getAllDays = async (request, response) => {
  try {
    const data = await Days.findAll({ attributes: ["id", "name"] });
    response.status(200).json({
      ack: 1,
      data: data,
    });
  } catch (error) {
    console.log("error", error);
    response.status(500).json({ ack: 0, msg: error.message || "Server error" });
  }
};
