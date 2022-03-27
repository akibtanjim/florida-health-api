'use strict';
const facilityModel = require("../models").facility;
const errorResponseHandler = require("../helpers/errorHandler");

const FacilityController = {
    list: async(ctx) => {
        try {
            const response = await facilityModel.findAll();
            ctx
                .response
                .ok(response, "Faclities Fetched Successfully !");
        } catch (error) {
            console.log(error)
            errorResponseHandler(ctx, error);
        }
    }
}

module.exports = FacilityController;