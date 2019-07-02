import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const notes = await req.context.models.Notes.find();
  return res.send(notes);
});

router.get('/:noteId', async (req, res) => {
  const note = await req.context.models.Notes.findById(req.params.noteId);
  return res.send(note);
});

router.post('/', async (req, res) => {
  const note = await req.context.models.Notes.create({
    text: req.body.text,
  });

  return res.send(note);
});

router.put('/:noteId', async (req, res) => {
  const note = await req.context.models.Notes.findByIdAndUpdate(
    req.params.noteId,
    {
      text: req.body.text,
    },
    { useFindAndModify: false }
  );

  return res.send(note);
});

router.delete('/:noteId', async (req, res) => {
  const note = await req.context.models.Notes.findById(req.params.noteId);

  let result = null;
  if (note) {
    result = await note.remove();
  }

  return res.send(result);
});

export default router;
