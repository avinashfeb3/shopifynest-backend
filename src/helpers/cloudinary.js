import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const uploadImageToCloudinary = async (filePath) => {
try {   
  const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath); // delete the file after uploading
    return response;
  } catch (error) {
    return null;
  }
};

// delete image from cloudinary
const deleteImageFromCloudinary = async(public_id) => {
  try{
    const response = await cloudinary.uploader.destroy(public_id);
    return response;
  } catch(error){
    return null;
  }
}
export { uploadImageToCloudinary, deleteImageFromCloudinary };