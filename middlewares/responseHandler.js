"use strict";

/**
 * HTTP Status codes
 */
const statusCodes = {
  CONTINUE: 100,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIME_OUT: 504,
};

function responseHandler() {
  return async (ctx, next) => {
    ctx.response.statusCodes = statusCodes;
    ctx.statusCodes = ctx.response.statusCodes;

    ctx.response.success = (data = null, message = null) => {
      ctx.status = ctx.status < 400 ? ctx.status : statusCodes.OK;
      ctx.body = { status: "success", data, message };
    };

    ctx.response.fail = (data = null, errors = null, message = null) => {
      ctx.status =
        ctx.status >= 400 && ctx.status < 500
          ? ctx.status
          : statusCodes.BAD_REQUEST;
      ctx.body = { status: "fail", data, errors, message };
    };

    ctx.response.error = (data = null, errors = null, message) => {
      ctx.status =
        ctx.status < 500 ? statusCodes.INTERNAL_SERVER_ERROR : ctx.status;
      ctx.body = { status: "fail", data, errors, message };
    };

    ctx.response.ok = (data, message) => {
      ctx.status = statusCodes.OK;
      ctx.response.success(data, message);
    };

    ctx.response.created = (data, message) => {
      ctx.status = statusCodes.CREATED;
      ctx.response.success(data, message);
    };

    ctx.response.accepted = (data, message) => {
      ctx.status = statusCodes.ACCEPTED;
      ctx.response.success(data, message);
    };

    ctx.response.noContent = (data, message) => {
      ctx.status = statusCodes.NO_CONTENT;
      ctx.response.success(data, message);
    };

    ctx.response.badRequest = (data, errors, message) => {
      ctx.status = statusCodes.BAD_REQUEST;
      ctx.response.fail(data, errors, message);
    };

    ctx.response.unauthorized = (data, errors, message) => {
      ctx.status = statusCodes.UNAUTHORIZED;
      ctx.response.fail(data, errors, message);
    };

    ctx.response.forbidden = (data, errors, message) => {
      ctx.status = statusCodes.FORBIDDEN;
      ctx.response.fail(data, errors, message);
    };

    ctx.response.notFound = (data, errors, message) => {
      ctx.status = statusCodes.NOT_FOUND;
      ctx.response.fail(data, errors, message);
    };

    ctx.response.internalServerError = (data, errors, message) => {
      ctx.status = statusCodes.INTERNAL_SERVER_ERROR;
      ctx.response.error(data, errors, message);
    };

    ctx.response.notImplemented = (data, errors, message) => {
      ctx.status = statusCodes.NOT_IMPLEMENTED;
      ctx.response.error(data, errors, message);
    };
    ctx.response.serviceUnavailable = (data, errors, message) => {
      ctx.status = statusCodes.SERVICE_UNAVAILABLE;
      ctx.response.error(data, errors, message);
    };
    await next();
  };
}

module.exports = responseHandler;
