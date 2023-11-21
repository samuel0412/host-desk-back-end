const { Meta } = require("../models");
const {
  metaCreateSchema,
  metaUpdateSchema,
} = require("./validation/meta.validation");
const { Op } = require("sequelize");

// create Meta
exports.createMeta = async (request, response) => {
  try {
    const { error } = metaCreateSchema.validate(request.body);
    if (error) {
      response.status(200).json({ ack: 0, msg: error.details[0].message });
    } else {
      const createMeta = await Meta.create({ ...request.body });
      response
        .status(200)
        .json({ ack: 1, msg: "Successfully Created", data: createMeta });
    }
  } catch (error) {
    response.status(500).json({ ack: 0, msg: error.message || "Server error" });
  }
};

// list
exports.getMetaList = async (request, response) => {
  try {
    const { elements, page, searchParam = "" } = request.query;

    const limit = parseInt(elements);
    const offset = parseInt(limit * (page - 1));

    const { rows, count } = await Meta.findAndCountAll({
      where: { title: { [Op.like]: `%${searchParam}%` } },
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

//edit Meta
exports.editMeta = async (request, response) => {
  const cmsId = request.params.id;
  try {
    const { error } = metaUpdateSchema.validate(request.body);
    if (error) {
      return response
        .status(200)
        .json({ ack: 0, msg: error.details[0].message });
    } else {
      const metaData = await Meta.findByPk(cmsId);
      if (!metaData) {
        response.status(200).json({ ack: 0, msg: "No Meta Data" });
      } else {
        const updateMeta = await Meta.update(
          { ...request.body },
          { where: { id: metaData.id } }
        );
        response
          .status(200)
          .json({ ack: 1, msg: "Successfully update Meta", data: updateMeta });
      }
    }
  } catch (error) {
    console.log("error", error);
    response.status(500).json({ ack: 0, msg: error.message || "Server error" });
  }
};

// delete Meta
exports.deleteMeta = async (request, response) => {
  try {
    const id = request.params.id;

    const metaData = await Meta.findByPk(id);
    if (metaData) {
      const deletedData = await Meta.destroy({
        where: { id: metaData.id },
      });
      response
        .status(200)
        .json({ ack: 1, msg: "Successfully deleted data", data: deletedData });
    } else {
      response.status(200).json({ ack: 0, msg: "No Meta Details Found" });
    }
  } catch (error) {
    console.log("error", error);
    response.status(500).json({ ack: 0, msg: error.message || "Server error" });
  }
};
