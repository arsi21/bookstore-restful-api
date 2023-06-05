const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Set up the storage engine for Multer
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../uploads/'),
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

// Define the file filter function
const fileFilter = function (req, file, cb) {
  // Check if the file type is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only image files are allowed.'), false); // Reject the file
  }
};

// Initialize Multer with the storage engine and file filter
const fileUpload = multer({ storage, fileFilter });

module.exports = fileUpload;
