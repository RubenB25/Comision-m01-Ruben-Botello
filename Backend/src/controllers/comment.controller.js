import { CommentModel } from '../models/Comment.js';
import { PostModel } from '../models/Post.js';

export const ctrlCreateComment = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    const comment = new CommentModel({
      ...req.body,
      post: postId,
      author: userId,
    });

    await comment.save();

    await PostModel.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: comment._id } }
    );

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't create comment" });
  }
};

export const ctrlListComments = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    const comments = await CommentModel.find({ post: postId }, [
      '-__v',
    ]).populate('post', ['-comments', 'author', '-__v',])
    .populate('author',['-__v',"avatar"]);

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get comments" });
  }
};

export const ctrlGetCommentById = async (req, res) => {
  const { commentId, postId } = req.params;
  const userId = req.user._id;

  try {
    const comment = await CommentModel.findOne({
      _id: commentId,
      post: postId,
      author: userId,
    }).populate('post')
    .populate('author',['-__v',"avatar"]);

    if (!comment) return res.status(404).json({ error: "Comment doesn't exist" });

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get comment" });
  }
};

export const ctrlUpdateComment = async (req, res) => {
  const { commentId, postId } = req.params;
  const userId = req.user._id;

  try {
    const comment = await CommentModel.findOne({ _id: commentId });

    if (!comment) {
      return res.status(404).json({ error: "Comment doesn't exist" });
    }

    comment.set(req.body);

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Couldn't update comment" });
  }
};

export const ctrlDeleteComment = async (req, res) => {
  const { commentId, postId } = req.params;
  const userId = req.user._id;

  try {
    await CommentModel.findOneAndDelete({ _id: commentId, posts: postId });

    await PostModel.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: commentId } }
    );

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete comment" });
  }
};
