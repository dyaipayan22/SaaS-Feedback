import Feedback from '../models/feedback.model';
import { ApiResponse } from '../utils/api.response';
import { ApiError } from '../utils/api.error';
import { asyncHandler } from '../utils/asyncHandler';

const addComment = asyncHandler(async (req, res) => {
  const { feedbackId } = req.params;
  const { content, user } = req.body;

  const feedback = await Feedback.findById(feedbackId);

  if (!feedback) {
    throw new ApiError(404, 'Feedback does not exist');
  }

  res
    .status(200)
    .json(new ApiResponse(200, feedback, 'Comment added successfully'));
});

const replyComment = asyncHandler(async (req, res) => {});

export { addComment };
