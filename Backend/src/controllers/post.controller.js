import { PostModel } from '../models/Post.js';
import { CommentModel } from '../models/Comment.js';

export const ctrlCreatePost = async (req, res) => {
  const userId = req.user._id;

  try {
    const { title,url,content } = req.body;

    const post = new PostModel({
      title,
      url,
      content,
      author: userId,
    });

    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Exportamos la función ctrlListAllPosts que lista todos los posts

export const ctrlListAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate('author', ['username', 'avatar'])
      .populate('comments', ['content','author', 'createdAt']);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Exportamos la función ctrlListPosts que lista los posts de un usuario
export const ctrlListPosts = async (req, res) => {
  const userId = req.user._id;

  try {
    const posts = await PostModel.find({ author: userId })
      .populate('author', ['username', 'avatar'])
      .populate('comments', ['content','author', 'createdAt']);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Exportamos la función ctrlGetPost que obtiene un post
export const ctrlGetPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({
      _id: postId,
    })
    .populate('author', ['username', 'avatar'])
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'username avatar'
      }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Exportamos la función ctrlUpdatePost que actualiza un post

export const ctrlUpdatePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.set(req.body);

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Exportamos la función ctrlDeletePost que elimina un post

export const ctrlDeletePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await CommentModel.deleteMany({ _id: { $in: post.comments } });

    await PostModel.findOneAndDelete({
      _id: postId,
      author: userId,
    });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Exportamos la función isAuthor que verifica si el usuario es el autor del post
export const isAuthor = async ({ postId, userId }) => {
  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
