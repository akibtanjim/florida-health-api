"use strict";
const errorResponseHandler = require("../helpers/errorHandler");
const {
  getFacilities,
  searchFacilities,
  getFacilityBySlug,
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
        images = [],
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
        images,
      });
      ctx.response.ok(response, "Faclities Searched Successfully!");
    } catch (error) {
      errorResponseHandler(ctx, error);
    }
  },
  getFacility: async ctx => {
    try {
      const { slug } = ctx.params;
      const response = await getFacilityBySlug(slug);
      ctx.response.ok(response, "Facility Details Fetched Successfully!");
    } catch (error) {
      errorResponseHandler(ctx, error);
    }
  },
};

module.exports = FacilityController;
