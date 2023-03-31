import { S3 } from '@aws-sdk/client-s3';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();


// Configure AWS SDK
const s3 = new S3({
  region: 'ap-south-1',
  credentials: defaultProvider({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  })
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
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/png', 'image/jpeg', 'video/mp4'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PNG, JPEG and MP4 files are allowed.'));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB file size limit
});

const uploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ msg: 'File size should not exceed 2MB' });
      } else if (err.message === 'Invalid file type. Only PNG, JPEG and MP4 files are allowed.') {
        return res.status(400).json({ msg: err.message });
      } else {
        return res.status(400).json({ msg: 'Failed to upload file' });
      }
    } else {
      next();
    }
  });
};

export default uploadMiddleware;
