import mongoose from 'mongoose';

import Notes from './notes';
import Book from './book';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = { Notes, Book };

export { connectDb };

export default models;
