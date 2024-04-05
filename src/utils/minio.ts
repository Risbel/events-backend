var Minio = require("minio");
import fs from "fs";
import config from "../config";

var minioClient = new Minio.Client({
  endPoint: config.minio.endpoint,
  accessKey: config.minio.accessKeyId,
  secretKey: config.minio.secretAccessKey,
  useSSL: true,
});

export const uploadImage = async (file: any) => {
  var metaData = {
    "Content-Type": `${file?.mimetype}`,
    "Content-Language": "en",
  };

  new Promise(async (resolve, reject) => {
    minioClient.fPutObject(
      `${config.minio.bucketName}`,
      `${file?.originalname}`,
      file?.path,
      metaData,
      function (err: any, objInfo: any) {
        if (err) reject(err);
        else resolve(objInfo);
      }
    );
  });

  const minioEndpoint = config.minio.endpoint;
  const bucketName = config.minio.bucketName;
  const objectName = file?.originalname;
  const fileUrl = `${minioEndpoint}/${bucketName}/${objectName}`;

  if (file && file.path) {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err);
      } else {
        console.log("Uploaded file deleted successfully");
      }
    });
  }

  return fileUrl;
};

export const uploadMultipleImages = async (files: any) => {
  try {
    const uploads = files.map(async (base: any) => await uploadImage(base));
    const results = await Promise.all(uploads);
    return results;
  } catch (error) {
    throw error;
  }
};
