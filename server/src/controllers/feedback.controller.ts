/**
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a SASS feedback request
 */

import Feedback from '../models/feedback.model';
import { ApiResponse } from '../utils/api.response';
import { ApiError } from '../utils/api.error';
import { asyncHandler } from '../utils/asyncHandler';

const addFeedback = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;

  if ([title, category, description].some((field) => field?.trim === '')) {
    throw new ApiError(400, 'All fields are required');
  }

  const feedback = await Feedback.create({
    title,
    category,
    description,
  });

  await feedback.save();

  const createdFeedback = await Feedback.findById(feedback._id);

  if (!createdFeedback) {
    throw new ApiError(500, 'Something went wrong while creating feedback');
  }

  res
    .status(201)
    .json(
      new ApiResponse(200, createdFeedback, 'Feedback created successfully')
    );
});

const fetchAllFeedbacks = asyncHandler(async (req, res) => {
  const { sortBy, category } = req.query;

  let query: Record<string, any> = {};
  let sortOption: Record<string, any> = {};

  if (category && category !== 'All') {
    query.category = category;
  }
  if (sortBy === 'mostUpvotes') {
    sortOption = { upvotes: -1 };
  } else if (sortBy === 'leastUpvotes') {
    sortOption = { upvotes: 1 };
  } else if (sortBy === 'mostComments') {
    sortOption = { comments: -1 };
  } else if (sortBy === 'leastComments') {
    sortOption = { comments: 1 };
  } else {
    sortOption = {};
  }

  const feedbacks = await Feedback.find(query).sort(sortOption);

  if (!feedbacks) {
    throw new ApiError(500, 'Something went wrong while fetching feedbacks');
  }

  res
    .status(200)
    .json(new ApiResponse(200, feedbacks, 'Feedbacks fetched successfully'));
});

const fetchFeedback = asyncHandler(async (req, res) => {
  const { feedbackId } = req.params;

  const feedback = await Feedback.findById(feedbackId);

  if (!feedback) {
    throw new ApiError(404, 'Feedback does not exist');
  }

  res
    .status(200)
    .json(new ApiResponse(200, feedback, 'Feedback fetched successfully'));
});

const updateFeedback = asyncHandler(async (req, res) => {
  const { feedbackId } = req.params;
  const { title, category, description, status } = req.body;

  const feedback = await Feedback.findById(feedbackId);

  if (!feedback) {
    throw new ApiError(404, 'Feedback does not exist');
  }

  if (title && title !== feedback.title) {
    feedback.title = title;
  }

  if (category && category !== feedback.category) {
    feedback.category = category;
  }

  if (description && description !== feedback.description) {
    feedback.description = description;
  }

  if (status && status !== feedback.status) {
    feedback.status = status;
  }

  await feedback.save();
  res
    .status(200)
    .json(new ApiResponse(200, feedback, 'Feedback fetched successfully'));
});

const deleteFeedback = asyncHandler(async (req, res) => {
  const { feedbackId } = req.params;

  const feedback = await Feedback.findById(feedbackId);

  if (!feedback) {
    throw new ApiError(404, 'Feedbacks does not exist');
  }

  await feedback.deleteOne();
  res
    .status(200)
    .json(new ApiResponse(200, null, 'Feedback deleted successfully'));
});

const upvoteFeedback = asyncHandler(async (req, res) => {
  const { feedbackId } = req.params;

  const feedback = await Feedback.findById(feedbackId);

  if (!feedback) {
    throw new ApiError(404, 'Feedbacks does not exist');
  }

  feedback.upvotes = feedback.upvotes + 1;
  await feedback.save();

  res
    .status(200)
    .json(new ApiResponse(200, feedback, 'Feedback upvoted successfully'));
});

export {
  addFeedback,
  deleteFeedback,
  fetchAllFeedbacks,
  fetchFeedback,
  updateFeedback,
  upvoteFeedback,
};
