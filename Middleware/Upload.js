import {S3} from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import {v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

// Configure AWS SDK
const s3 = new S3({
  region: 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRETE_KEY,
});

// Configure S3 bucket parameters
const S3_BUCKET = process.env.AWS_BUCKET_NAME;


// Configure Multer to upload files to S3
const upload = multer({
  storage: multerS3({
    s3,
    bucket: S3_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const extension = file.originalname.split('.').pop();
      const filename = `${uuidv4()}.${extension}`;
      cb(null, filename);
    },
  }),
});

export default upload;
