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
  const metaData = {
    "Content-Type": `${file?.mimetype}`,
    "Content-Language": "en",
  };

  // Returning the Promise here or using await
  return new Promise(async (resolve, reject) => {
    minioClient.fPutObject(
      config.minio.bucketName,
      file?.originalname,
      file?.path,
      metaData,
      function (err: any, objInfo: any) {
        if (err) reject(err);
        else resolve(objInfo);
      }
    );
  }).then(() => {
    const minioEndpoint = config.minio.endpoint;
    const bucketName = config.minio.bucketName;
    const objectName = file?.originalname;
    const fileUrl = `${minioEndpoint}/${bucketName}/${objectName}`;

    // Return fileUrl after deleting the file
    return new Promise((resolve, reject) => {
      if (file && file.path) {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error("Error deleting uploaded file:", err);
            reject(err); // Reject if there's an error
          } else {
            console.log("Uploaded file deleted successfully");
            resolve(fileUrl); // Resolve with fileUrl
          }
        });
      } else {
        resolve(fileUrl); // Resolve with fileUrl if there's no file.path
      }
    });
  });
};

export const uploadMultipleImages = async (files: any) => {
  try {
    const uploads = files.map((base: any) => uploadImage(base));
    const results = await Promise.all(uploads);

    return results;
  } catch (error) {
    throw error;
  }
};
