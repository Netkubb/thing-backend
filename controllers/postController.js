const { query } = require("express");
const db = require("../database/db");
const { getDoc, doc } = require("firebase/firestore");

// =======================================================================

const getALLpost = async (req, res) => {
  // get all post
  const postsQuery = await db.collection("post").get();
  const posts = postsQuery.docs.map((post) => post.data());

  // No content
  if (!posts) return res.status(204).json({ message: "No post found" });
  res.json(posts);
};

// =======================================================================

const createNewPost = async (req, res) => {
  // if no URL
  if (!req?.body?.videoURL) {
    return res.status(400).json({ message: "No video link found" });
  }
  const { videoURL, like, caption } = req.body;

  try {
    // post new data
    const result = db.collection("post").add({
      videoURL: videoURL,
      like: like,
      caption: caption,
    });
    res.status(201).json({ massege: "create new post sucessful" });
  } catch (err) {
    console.error(err);
  }
};

// =======================================================================

const updatePost = async (req, res) => {
  // no ID
  if (!req?.body?._id) {
    return res.status(400).json({ message: "ID are require" });
  }
  // req.body
  const { _id, caption, like } = req.body;

  // GET DATA BY ID
  const queryID = await db.collection("post").get();
  const postDoc = queryID.docs.find((post) => post.id === _id); // Find post by ID(generated)

  // If the post doesn't exist in the DB
  if (!postDoc) {
    return res.status(400).json({ message: `Video ID ${_id} not found` });
  }

  // UPDATE
  const updateData = {};

  if (req.body?.caption) {
    updateData.caption = caption;
  }

  if (req.body?.like) {
    updateData.like = like;
  }

  // Update the post in the Firestore collection
  await db.collection("post").doc(postDoc.id).update(updateData);

  res.json({ message: "Post updated successfully" });
};

// =======================================================================

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

// =======================================================================

const addComment = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ messgae: "post ID require" });
};

module.exports = { getALLpost, createNewPost, updatePost };
