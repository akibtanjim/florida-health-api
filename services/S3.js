"use strict";

const AWS = require("aws-sdk");
const uuidV4 = require("uuid/v4");
const variables = require("../variables");

const s3 = new AWS.S3({
  endpoint:
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_S3_UPLOAD_URL
      : undefined,
  s3ForcePathStyle: true,
});

const uploadFile = async base64 => {
  const base64Data = new Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = base64.split(";")[0].split("/")[1];
  const uploadParams = {
    Bucket: variables.bucketName,
    Body: base64Data,
    Key: `${uuidV4()}.${type}`,
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
  };
  return s3
    .upload(uploadParams)
    .promise()
    .catch(error => {
      console.log(error);
      return {};
    });
};
module.exports = { uploadFile };
