import dotenv from 'dotenv';

dotenv.config();



const S3_BUCKET_URL = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/`;





export const uploadImage = async (req, res) => {
    try {
        // Save the S3 URL to MongoDB
        const image = S3_BUCKET_URL + req.file.key;

        res.status(200).json({ url: image });
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to upload image' });
      }
}