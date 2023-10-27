//MOCK post

const { GCProfiler } = require("v8");

const getALLpost = async (req, res) => {
  const post = []; // TODO Get all emplyee
  // No content
  if (!post) return res.status(204).json({ message: "No post found" });
  res.json(post);
};

const createNewPost = async (req, res) => {
  if (!req?.body?.videoURL) {
    return res.status(400).json({ message: "No video link found" });
  }

  try {
    // TODO create video ใน DB
    const result = [];
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updatePost = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID are require" });
  }

  const post = []; // TODO find video in DB
  if (!post)
    return res
      .status(400)
      .json({ message: `Video ID ${req.body.id} not found` });

  // UPDATE
  if (req.body?.caption) post.caption = req.body.caption;
  if (req.body?.like) post.caption = req.body.like;
  const result = []; // TODO save post to DB
  res.json(result);
};

const deletePost = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ messgae: "post ID require" });
  const post = []; // TODO find video in DB
  if (!post)
    return res
      .status(400)
      .json({ message: `Video ID ${req.body.id} not found` });

  const result = []; // ลบ video
  res.json(result);
};

const addComment = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ messgae: "post ID require" });
};
