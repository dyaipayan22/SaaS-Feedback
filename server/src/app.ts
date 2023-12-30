import express from 'express';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json());

import feedbackRouter from './routes/feedback.route';
import commentRouter from './routes/comment.route';

app.use('/feedback', feedbackRouter);
app.use('/comment', commentRouter);

export default app;
