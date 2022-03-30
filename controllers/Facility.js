"use strict";
const errorResponseHandler = require("../helpers/errorHandler");
const {
  getFacilities,
  searchFacilities,
} = require("../services/facilityService");
const variables = require("../variables");

const FacilityController = {
  list: async ctx => {
    try {
      const response = await getFacilities();
      ctx.response.ok(response, "Faclities Fetched Successfully !");
    } catch (error) {
      errorResponseHandler(ctx, error);
    }
  },

  search: async ctx => {
    try {
      const {
        name,
        state,
        city,
        providerType,
        storeData = false,
      } = ctx.request.body;
      const mappedState = state
        ? variables.stateMapper[state.toLowerCase()]
        : undefined;
      const response = await searchFacilities({
        name,
        state: mappedState,
        city,
        providerType,
        storeData,
      });
      ctx.response.ok(response, "Faclities Searched Successfully!");
    } catch (error) {
      errorResponseHandler(ctx, error);
    }
  },
};

module.exports = FacilityController;
