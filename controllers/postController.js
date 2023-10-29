const storage = require("../database/db");
const db = storage.db;
// ============================= GET ALL POST ====================================

const getALLpost = async (req, res) => {
  // get all post
  const postsQuery = await db.collection("post").get();
  const posts = postsQuery.docs.map((post) => {
    const postId = post.id;
    return { id: postId };
  });
  console.log("hi");
  // No content
  if (!posts) return res.status(204).json({ message: "No post found" });
  res.json(posts);
};

// ============================ CREATE POST ====================================

const createNewPost = async (req, res) => {
  // if no URL
  if (!req?.body?.videoURL) {
    return res.status(400).json({ message: "No video link found" });
  }
  const { videoURL, like, caption, comment } = req.body;

  try {
    // post new data
    const result = db.collection("post").add({
      videoURL: videoURL,
      like: like,
      caption: caption,
      comment: comment,
    });
    res.status(201).json({ massege: "create new post sucessful" });
  } catch (err) {
    console.error(err);
  }
};

// ======================= UPDATE POST ====================================

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
  try {
    await db.collection("post").doc(postDoc.id).update(updateData);
  } catch (err) {
    console.error(err);
  }

  res.json({ message: "Post updated successfully" });
};

// ======================== DELETE POST ===================================

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
    return res.status(400).json({ message: `Post ID ${id} not found` });

  try {
    await db.collection("post").doc(postDoc.id).delete();
    res.json({ massege: `Post ID ${id} has been deleted` });
  } catch (err) {
    console.error(err);
  }
};

// =================== GET POST =============================

const getPost = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "post ID require" });

  const { id } = req.body;

  const queryID = await db.collection("post").get();
  const postDoc = queryID.docs.find((pos) => pos.id === id);

  if (!postDoc)
    return res.status(400).json({ message: `post ID ${id} not found` });

  res.json(postDoc.data());
};
// ============================ ADD COMMENT ======================================

const addComment = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ messgae: "post ID require" });

  const { id, username, content } = req.body;

  if (!username || !content)
    return res
      .status(400)
      .json({ message: "Username and Content are require" });

  const query = await db.collection("post").get();
  const post = query.docs.find((pos) => pos.id === id);

  if (!post)
    return res.status(400).json({ message: `Post ID ${id} not found` });

  // Old Json
  let OldComments_String = post.data().comment || [];
  const OldComments_Json = JSON.parse(OldComments_String);

  // New comment Array
  const NewComment_Json = { username: username, content: content };

  // Push the new comment to the existing array.
  OldComments_Json.push(NewComment_Json);

  // Update ทำเป็น string
  const UpdateComment_String = JSON.stringify(OldComments_Json);
  // PUT

  try {
    await db
      .collection("post")
      .doc(post.id)
      .update({ comment: UpdateComment_String });
    res.json({ message: "Add comment successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

module.exports = {
  getALLpost,
  createNewPost,
  updatePost,
  deletePost,
  getPost,
  addComment,
};
