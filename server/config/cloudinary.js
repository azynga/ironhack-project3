require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config();

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        folder: 'sellie-item-images',
    },
});

module.exports = multer({ storage });
