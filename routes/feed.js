const express = require("express");
const router = express.Router();
const feedControl = require("../controllers/postController");

router.route("/").get(feedControl.getALLpost).post(feedControl.createNewPost);

module.exports = router;
