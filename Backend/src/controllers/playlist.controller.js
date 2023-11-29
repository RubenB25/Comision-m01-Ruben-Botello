import { PostModel } from '../models/Post.js';
import { CommentModel } from '../models/Comment.js';

export const ctrlCreatePlaylist = async (req, res) => {
  const userId = req.user._id;

  try {
    const { title } = req.body;

    const playlist = new PostModel({
      title,
      author: userId,
    });

    await playlist.save();

    return res.status(201).json(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlListPlaylist = async (req, res) => {
  const userId = req.user._id;

  try {
    const playlists = await PostModel.find({ author: userId })
      .populate('author', ['username', 'avatar'])
      .populate('comments', ['name', 'artist', 'year']);

    return res.status(200).json(playlists);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlGetPlaylist = async (req, res) => {
  const userId = req.user._id;
  const { playlistId } = req.params;

  try {
    const playlist = await PostModel.findOne({
      _id: playlistId,
      author: userId,
    })
      .populate('author', ['username', 'avatar'])
      .populate('comments', ['name', 'artist', 'year']);

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    return res.status(200).json(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlUpdatePlaylist = async (req, res) => {
  const userId = req.user._id;
  const { playlistId } = req.params;

  try {
    const playlist = await PostModel.findOne({
      _id: playlistId,
      author: userId,
    });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    playlist.set(req.body);

    await playlist.save();

    return res.status(200).json(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlDeletePlaylist = async (req, res) => {
  const userId = req.user._id;
  const { playlistId } = req.params;

  try {
    const playlist = await PostModel.findOne({
      _id: playlistId,
      author: userId,
    });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    await CommentModel.deleteMany({ _id: { $in: playlist.comments } });

    await PostModel.findOneAndDelete({
      _id: playlistId,
      author: userId,
    });

    return res.status(200).json(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const isAuthor = async ({ playlistId, userId }) => {
  try {
    const playlist = await PostModel.findOne({
      _id: playlistId,
      author: userId,
    });

    if (!playlist) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
