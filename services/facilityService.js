"use strict";

const { Op } = require("@sequelize/core");
const facilityModel = require("../models").facility;
const { scrapeData } = require("../helpers/scraper");
const { getFaciltySearchConditions } = require("../helpers/utils");

const getFacilities = async () => {
  return facilityModel.findAll();
};

const searchFacilities = async ({
  name,
  state,
  city,
  providerType,
  storeData = false,
}) => {
  let response = [];
  const condtitions = getFaciltySearchConditions(name, state, city);
  if (!storeData) {
    response = await facilityModel.findAll({
      where: {
        [Op.or]: condtitions,
      },
    });
  }

  if (response?.length === 0) {
    response = await scrapeData({
      name,
      state,
      city,
      providerType,
    }).catch(error => console.log(error));
    if (storeData) {
      facilityModel
        .bullkInsertInChunk(response)
        .catch(error => console.log(error));
    }
  }
  return response;
};

module.exports = {
  getFacilities,
  searchFacilities,
};
