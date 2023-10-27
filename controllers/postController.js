const db = require("../database/db");
const { getDoc, doc } = require("firebase/firestore");

const getALLpost = async (req, res) => {
  // get all post
  const postsQuery = await db.collection("post").get();
  const posts = postsQuery.docs.map((post) => post.data());

  //console.log(postsQuery.query);
  /*const docRef = doc(db.collection(), "post", "SVOrnsxO02ExXctfMUnq");
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());*/

  // No content
  if (!posts) return res.status(204).json({ message: "No post found" });
  res.json(posts);
};

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

const updatePost = async (req, res) => {
  // no ID
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID are require" });
  }
  const { id, like, caption } = req.body;
  // GET DATA BY ID

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

module.exports = { getALLpost, createNewPost };
