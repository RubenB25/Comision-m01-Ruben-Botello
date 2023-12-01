import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  posts: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
}, {
  timestamps: true,
  versionKey: false,
});

export const CommentModel = model('Comment', CommentSchema);
