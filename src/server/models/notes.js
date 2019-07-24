import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const Notes = mongoose.model('Notes', notesSchema);

export default Notes;
