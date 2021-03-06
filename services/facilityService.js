"use strict";

const { Op } = require("@sequelize/core");
const facilityModel = require("../models").facility;
const { scrapeData } = require("../helpers/scraper");
const { getFaciltySearchConditions } = require("../helpers/utils");
const { uploadFile } = require("./S3");

const getFacilities = async () => {
  return facilityModel.findAll();
};

const searchFacilities = async ({
  name,
  state,
  city,
  providerType,
  storeData = false,
  images = [],
}) => {
  let response = [];
  const condtitions = getFaciltySearchConditions(name, state, city);
  if (!storeData) {
    response = await facilityModel.findAll({
      where: {
        [Op.or]: condtitions,
      },
      order: [["id", "DESC"]],
    });
  }

  if (response?.length === 0) {
    response = await scrapeData({
      name,
      state,
      city,
      providerType,
    }).catch(error => console.log(error));
    if (storeData && response?.length) {
      const uploadedImages = await Promise.all(
        images.map(async image => {
          const s3Response = await uploadFile(image)
            .then(({ ETag, Location, Key, Bucket }) => {
              return ETag || Location || Key || Bucket
                ? {
                    location: Location,
                    key: Key,
                  }
                : {};
            })
            .catch(e => []);
          return s3Response;
        })
      );
      response = response.map(item => ({
        ...item,
        images: uploadedImages.filter(element => {
          return Object.keys(element).length > 0;
        }),
      }));
      facilityModel
        .bullkInsertInChunk(response)
        .catch(error => console.log(error));
    }
  }
  return response;
};

const getFacilityBySlug = async slug => {
  return facilityModel.findOne({ where: { slug } }).then(response => {
    if (!response) {
      throw Object.assign({}, new Error(), {
        status: 404,
        title: "Not found",
        message: "Resource not found",
      });
    }
    return response;
  });
};

module.exports = {
  getFacilities,
  searchFacilities,
  getFacilityBySlug,
};
