"use strict";

const pkginfo = require("../package.json");

/**
 * @swagger
 * /:
 *  get:
 *    description: Returns API information
 *    responses:
 *      200:
 *        description: Hello API
 */
exports.echo = ctx => {
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    author: pkginfo.author
  };

  ctx.response.ok(data, "Hello, API!");
};
