import { v2 as cloudinary } from "cloudinary";

// ! cloudenary cofigaration

export const cloudenaryConnection = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });
};