const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
  }
};

const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const splitUrl = url.split('/');
  const filename = splitUrl[splitUrl.length - 1];
  const folder = splitUrl[splitUrl.length - 2];
  if (folder && folder !== 'upload') {
     return `${folder}/${filename.split('.')[0]}`;
  }
  return filename.split('.')[0];
};

module.exports = {
  cloudinary,
  deleteFromCloudinary,
  getPublicIdFromUrl,
};
