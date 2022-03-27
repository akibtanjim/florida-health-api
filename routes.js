const Router = require('koa-router');
const routers = new Router();

const health = require("./controllers/health");
const version = require('./controllers/version');
const FacilityController = require("./controllers/Facility")

routers
    .get('/version', version.echo)
    .get("/health", health.check)
    .get("/facilities", FacilityController.list);

module.exports.routes = {
    routers
};
