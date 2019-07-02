import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// Routes
app.use('/notes', routes.notes);
app.use('/book', routes.book);

connectDb().then(() => {
  app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}!`));
});
