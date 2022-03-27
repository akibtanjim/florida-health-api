"use strict";

exports.check = ctx => {
    const data = {
        status: "ok"
    };

    ctx.response.ok(data, "ok");
};
