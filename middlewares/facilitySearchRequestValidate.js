const Validator = require("validatorjs");
const errorResponseHandler = require("../helpers/errorHandler");
const { rules, messages } = require("../helpers/validation");
Validator.registerImplicit(
  "isArray",
  value => {
    if (value === undefined) return true;
    if (!Array.isArray(value)) {
      return false;
    }
    return true;
  },
  "The :attribute must be array"
);

Validator.registerImplicit(
  "isBase64",
  value => {
    return typeof value !== "object" && value.startsWith("data:image/");
  },
  "The image must be of base64"
);

const facilitySearchRequestValidate = async (ctx, next) => {
  try {
    const {
      name,
      state,
      city,
      providerType = "ALL",
      storeData = false,
      images,
    } = ctx.request.body;
    if (
      String(providerType).toLowerCase() === "all" &&
      !name &&
      !city &&
      !state
    ) {
      throw Object.assign({}, new Error(), {
        status: 400,
        data: {
          errors: {
            name: ["The name/city field is required for provider type all"],
            city: ["The city/name field is required for provider type all"],
          },
        },
        message: "Invalid Parameter(s): name/city",
      });
    }
    const validation = await new Validator(
      { name, state, city, providerType, storeData, images },
      rules.search,
      messages.search
    );
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

module.exports = facilitySearchRequestValidate;
