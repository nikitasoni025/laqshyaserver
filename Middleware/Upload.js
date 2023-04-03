import multer from 'multer';


const upload = multer({
    limits: {
      fileSize: 2 * 1024 * 1024 // 2MB size limit
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
        cb(null, true); // Accept the file
      } else {
        cb(new Error('File type not supported. Only JPG, PNG and MP4 files are allowed.'), false); // Reject the file
      }
    }
  });


  export default upload;
  