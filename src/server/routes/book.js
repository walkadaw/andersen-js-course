import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const notes = await req.context.models.Book.find();
  return res.send(notes);
});

router.get('/:noteId', async (req, res) => {
  const note = await req.context.models.Book.findById(req.params.noteId);
  return res.send(note);
});

router.post('/', async (req, res) => {
  const note = await req.context.models.Book.create({
    text: req.body.text,
  });

  return res.send(note);
});

router.put('/:noteId', async (req, res) => {
  const note = await req.context.models.Book.findByIdAndUpdate(
    req.params.noteId,
    {
      text: req.body.text,
    },
    { useFindAndModify: false }
  );

  return res.send(note);
});

router.delete('/:noteId', async (req, res) => {
  const note = await req.context.models.Book.findById(req.params.noteId);

  let result = null;
  if (note) {
    result = await note.remove();
  }

  return res.send(result);
});

export default router;
