const Validator = require("validatorjs");
const validate = async (data, rules, messages) => {
  const validation = new Validator(data, rules, messages);
  if (validation.fails()) {
    throw Object.assign({}, new Error(), {
      status: 400,
      data: { errors: validation.errors.all() },
      message: "Invalid Parameter(s)",
    });
  }
  return true;
};

module.exports = {
  validate,
};
