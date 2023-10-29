const express = require("express");
const router = express.Router();
const feedControl = require("../controllers/postController");
const verifyJWT = require("../middlewares/verifyJWT");
const multer = require("multer");
const uploadControl = require("../controllers/uploadController");

router
  .route("/")
  .get(feedControl.getALLpost)
  .post(verifyJWT, feedControl.createNewPost)
  .put(verifyJWT, feedControl.updatePost)
  .delete(verifyJWT, feedControl.deletePost);

router.route("/post").get(feedControl.getPost);

// ช่วย upfile
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload",
  upload.single("file"), // 1 ไฟล์ field file
  uploadControl.uploadFileController
);

router.put("/addComment", feedControl.addComment);

module.exports = router;
