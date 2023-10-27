const db = require("../database/db");

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
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID are require" });
  }
  // req.body
  const { id, caption, like } = req.body;

  // GET DATA BY ID
  const queryID = await db.collection("post").get();
  const postDoc = queryID.docs.find((post) => post.id === id); // คืนค่าตัวแรกที่เจอ id === _id

  // If the post doesn't exist in the DB
  if (!postDoc) {
    return res.status(400).json({ message: `Video ID ${id} not found` });
  }

  // UPDATE
  const updateData = {};

  if (req.body?.caption) {
    updateData.caption = caption;
  }

  if (req.body?.like) {
    updateData.like = like;
  }

  // ref ไปที่ post ที่มี id === postDoc.id
  await db.collection("post").doc(postDoc.id).update(updateData);

  res.json({ message: "Post updated successfully" });
};

// =======================================================================

const deletePost = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ messgae: "post ID require" });

  // id ใช้ลบ
  const { id } = req.body;
  //console.log(id);

  // Find post.id === _id
  const queryID = await db.collection("post").get();
  const postDoc = queryID.docs.find((pos) => pos.id === id);

  if (!postDoc)
    return res.status(400).json({ message: `Video ID ${id} not found` });

  await db.collection("post").doc(postDoc.id).delete();
  res.json({ massege: `Video ID ${id} has been deleted` });
};

// =======================================================================

const addComment = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ messgae: "post ID require" });
};

module.exports = { getALLpost, createNewPost, updatePost, deletePost };
