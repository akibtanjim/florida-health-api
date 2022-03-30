const Validator = require("validatorjs");
const errorResponseHandler = require("../helpers/errorHandler");
const { rules, messages } = require("../helpers/validation");
const facilitySearchRequestValidate = async (ctx, next) => {
  try {
    const {
      name,
      state,
      city,
      providerType,
      storeData = false,
    } = ctx.request.body;
    const validation = new Validator(
      { name, state, city, providerType },
      rules.search,
      messages.search
    );
    if (validation.fails()) {
      throw Object.assign({}, new Error(), {
        status: 400,
        data: { errors: validation.errors.all() },
        message: "Invalid Parameter(s)",
      });
    }
    await next();
  } catch (error) {
    errorResponseHandler(ctx, error);
  }
};

module.exports = facilitySearchRequestValidate;
