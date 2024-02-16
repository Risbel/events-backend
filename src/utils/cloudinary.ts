import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const opts: any = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

export const uploadImage = async (image: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.uploader.upload(image, opts);

      if (result && result.secure_url) {
        console.log(result);
        resolve({ image: result.secure_url, imageCloudId: result.public_id });
      } else {
        console.log(result);
        reject({ message: "No se pudo obtener la URL segura de la imagen" });
      }
    } catch (error) {
      reject({ message: error });
    }
  });
};

export const uploadMultipleImages = async (images: any) => {
  try {
    const uploads = images.map(async (base: any) => await uploadImage(base));
    const results = await Promise.all(uploads);
    return results;
  } catch (error) {
    throw error;
  }
};
