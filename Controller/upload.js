import ImageKit from 'imagekit';
import dotenv from 'dotenv';
import upload from '../Middleware/Upload.js';
import multer from 'multer';

dotenv.config();


const imagekit = new ImageKit({
    publicKey: process.env.IMK_API_KEY,
    privateKey: process.env.IMK_PRIVATE_KEY,
    urlEndpoint: process.env.IMK_URL_ENDPOINT
});


export const uploadImageToImageKIt = async (req, res) => {

    upload.single('image')(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File size exceeds 2MB limit' });
            } else if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: err.message });
            } else {
                return res.status(400).json({ error: err.message });
            }
        } else if (!req.file) {
            return res.status(400).json({ error: 'No file selected' });
        } else {
            const buffer = req.file.buffer;
            const uploadOptions = {
                file: buffer,
                fileName: req.file.originalname,
                folder: 'laqshyapost',
                useUniqueFileName: true
            };

            imagekit.upload(uploadOptions, function (error, result) {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Failed to upload image' });
                } else {
                    console.log(result);
                    const imageUrl = result.url;
                    const key = result.fileId;
                    res.status(200).json({ imageUrl, key });
                }
            });
        }
    });
};



export const deleteImageFromImkit = async (req, res) => {
    const imageId = req.params.id;

    // Call the delete API method with the image ID
    imagekit.deleteFile(imageId, (error, result) => {
        if (error) {
            console.error(error);
            res.status(400).json({ msg: 'Failed to delete image' });
        } else {
            console.log(result);
            res.status(200).json({ msg: 'Image deleted successfully' });
        }
    });

}