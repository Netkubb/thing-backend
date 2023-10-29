const express = require("express");
const router = express.Router();
const feedControl = require("../controllers/postController");
const verifyJWT = require("../middlewares/verifyJWT");

router
  .route("/")
  .get(feedControl.getALLpost)
  .post(verifyJWT, feedControl.createNewPost)
  .put(verifyJWT, feedControl.updatePost)
  .delete(verifyJWT, feedControl.deletePost);

router.route("/post").get(feedControl.getPost);

router.put("/addComment", verifyJWT, feedControl.addComment);

module.exports = router;
