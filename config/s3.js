const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
// const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config();

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION
// });

// const s3 = new AWS.S3();

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.S3_BUCKET_NAME,
//     acl: 'public-read',
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + file.originalname);
//     }
//   })
// });


// Configure AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Configure multer to use S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    // acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    }
  }),
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});

const deleteS3Object = async (key) => {
  const deleteParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key
  };

  try {
    await s3.send(new DeleteObjectCommand(deleteParams));
    console.log(`Successfully deleted ${key} from ${process.env.S3_BUCKET_NAME}`);
  } catch (error) {
    console.error(`Error deleting ${key} from ${process.env.S3_BUCKET_NAME}:`, error);
  }
};


module.exports = { upload, deleteS3Object };