const cloudinary = require("cloudinary").v2; // Import the cloudinary package
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "profile_photos", // Optional: You can specify a folder where the uploaded images will be stored
    });

    // File uploaded successfully
    fs.unlinkSync(localFilePath); // Remove the locally saved temporary file
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Remove the locally saved temporary file if upload failed
    console.error("Error uploading image to Cloudinary:", error.message);
    return null;
  }
};

module.exports = { uploadOnCloudinary }; // Export the function
