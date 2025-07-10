const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: "dgkxk1rtq",
  api_key: 461671539327494,
  api_secret: "mO5xQfx5mwJwjaemB2uN_GzEpY8",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'yatri',
    allowed_formats: ['jpg', 'jpeg', 'png'], 
    public_id: (req, file) => file.originalname.split('.')[0],
  }
});

module.exports = {
  cloudinary,
  storage 
};
