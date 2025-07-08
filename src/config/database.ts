import mongoose from 'mongoose';
import { config } from './config';

export const connectDB = async () => {
    try {
        const url = config.mongoUri;

        if (!url) console.log('URL not defined!');

        await mongoose.connect(url);
        console.log('Connected to database!');
    } catch (error) {
        console.error('Error connecting to database.', error);
    }
};
