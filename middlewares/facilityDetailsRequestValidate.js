const Validator = require("validatorjs");
const errorResponseHandler = require("../helpers/errorHandler");
const { rules } = require("../helpers/validation");

const facilityDetailsRequestValidate = async (ctx, next) => {
  try {
    const { slug } = ctx.params;
    const validation = await new Validator({ slug }, rules.details);
    if (validation.fails()) {
      throw Object.assign({}, new Error(), {
        status: 400,
        data: { errors: validation.errors.all() },
        message: `Invalid Parameter(s): ${Object.keys(validation.errors.all())
          .map(item => item)
          .join(",")}`,
      });
    }
    await next();
  } catch (error) {
    errorResponseHandler(ctx, error);
  }
};

module.exports = facilityDetailsRequestValidate;
