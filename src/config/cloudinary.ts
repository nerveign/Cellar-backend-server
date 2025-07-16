import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryStorage = async (filename: any) => {
    return await cloudinary.uploader.upload(filename, {
        eager_async: true,
        resource_type: 'auto',
        folder: 'user-profile-image',
    });
};

export const cloudinaryDestroy = async (publicId: string) => {
    return await cloudinary.uploader.destroy(publicId);
};
