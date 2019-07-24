import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
