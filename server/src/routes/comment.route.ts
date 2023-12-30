import { Router } from 'express';
import { addComment } from '../controllers/comment.controller';

const router = Router();

router.route('/:feedbackId/add').post(addComment);

export default router;
