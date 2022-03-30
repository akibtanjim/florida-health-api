const Router = require("koa-router");
const routers = new Router({
  prefix: "/api/v1",
});

const health = require("./controllers/health");
const version = require("./controllers/version");
const FacilityController = require("./controllers/Facility");
const facilitySearchRequestValidate = require("./middlewares/facilitySearchRequestValidate");
const facilityDetailsRequestValidate = require("./middlewares/facilityDetailsRequestValidate");

routers
  .get("/version", version.echo)
  .get("/health", health.check)
  .get("/facilities", FacilityController.list)
  .post(
    "/facilities/search",
    facilitySearchRequestValidate,
    FacilityController.search
  )
  .get(
    "/facilities/:slug",
    facilityDetailsRequestValidate,
    FacilityController.getFacility
  );

module.exports.routes = {
  routers,
};
