"use strict";
const facilityModel = require("../models").facility;
const errorResponseHandler = require("../helpers/errorHandler");
const { validate } = require("../helpers/validate");

const FacilityController = {
  list: async ctx => {
    try {
      const response = await facilityModel.findAll();
      ctx.response.ok(response, "Faclities Fetched Successfully !");
    } catch (error) {
      errorResponseHandler(ctx, error);
    }
  },

  search: async ctx => {
    try {
      const { name, state, city } = ctx.request.body;
      await validate(
        { name, state, city },
        {
          name: "required",
          state: "required_if:state,",
          city: "required_if:city,",
        }
      );
      const response = [];
      ctx.response.ok(response, "Faclities Searched Successfully!");
    } catch (error) {
      console.log(error);
      errorResponseHandler(ctx, error);
    }
  },
};

module.exports = FacilityController;
