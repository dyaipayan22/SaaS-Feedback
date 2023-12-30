import { Router } from 'express';
import {
  addFeedback,
  deleteFeedback,
  fetchAllFeedbacks,
  fetchFeedback,
  updateFeedback,
  upvoteFeedback,
} from '../controllers/feedback.controller';

const router = Router();

router.route('/').get(fetchAllFeedbacks);
router.route('/add').post(addFeedback);
router.route('/:feedbackId').get(fetchFeedback);
router.route('/:feedbackId/update').put(updateFeedback);
router.route('/:feedbackId/upvote').put(upvoteFeedback);
router.route('/:feedbackId/delete').delete(deleteFeedback);

export default router;
