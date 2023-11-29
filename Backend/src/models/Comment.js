import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    default: 'Unknown',
  },
  year: {
    type: Number,
    default: new Date(Date.now()).getFullYear(),
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
