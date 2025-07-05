import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const url = process.env.DATABASE_URL as string;

    if (!url) console.log('URL not defined!');

    await mongoose.connect(url);
    console.log('Connected to database!');
  } catch (error) {
    console.error('Error connecting to database.', error);
  }
};
