import { Schema, model, Types } from 'mongoose';

interface IFeedback {
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: IComment;
}

interface IComment {
  content: string;
  user: Types.ObjectId;
  replies: [
    {
      content: string;
      replyingTo: string;
      user: Types.ObjectId;
    }
  ];
}

const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
    maxLength: 250,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  replies: [
    {
      content: {
        type: String,
        required: true,
        maxLength: 250,
      },
      replyingTo: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
});

const feedbackSchema = new Schema<IFeedback>(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      default: 'Suggestion',
    },
    description: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Feedback = model<IFeedback>('Feedback', feedbackSchema);

export default Feedback;
