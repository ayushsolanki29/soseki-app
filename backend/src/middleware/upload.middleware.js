// src/middleware/upload.middleware.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');
const { upload: uploadConfig } = require('../config/app.config');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'soseki-app', // You can change the default folder here
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'pdf', 'txt', 'doc', 'docx'],
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (uploadConfig.allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: uploadConfig.maxFileSizeMb * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

module.exports = upload;