import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
  versionKey: false,
});

export const CommentModel = model('Comment', CommentSchema);
