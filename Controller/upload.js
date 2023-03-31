import { S3,DeleteObjectCommand  } from '@aws-sdk/client-s3';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import dotenv from 'dotenv';
dotenv.config();



const S3_BUCKET_URL = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/`;
const s3 = new S3({
  region: 'ap-south-1',
  credentials: defaultProvider({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  })
});





export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Please Upload The Image" });
    }

    // Save the S3 URL to MongoDB
    const image = S3_BUCKET_URL + req.file.key;

    res.status(200).json({ url: image, key: req.file.key });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Failed to upload image' });
  }
}

export const deleteImageFromAws = async (req, res) => {
  try {
    const key = req.params.id;

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });

    await s3.send(command);

    res.status(200).json({ msg: `Successfully deleted image with key ${key}` });
  } catch (err) {
    console.error(err);
    res.status(400).send({ msg: 'Failed to delete image' });
  }


}