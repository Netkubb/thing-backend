const { storage, db } = require("../database/db");
const bucketName = "thinc-humungousaur.appspot.com";
const bucket = storage.bucket(bucketName);

const uploadFileController = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const file = req.file;
  const filename = file.originalname;
  const fileBuffer = file.buffer;

  const fileUpload = bucket.file(filename);

  // destination to storage
  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype, // ex pdf
    },
  });

  stream.on("error", (err) => {
    return res.status(500).send("File upload error: " + err);
  });

  stream.on("finish", async () => {
    const url = await storage.bucket(bucketName).file(filename).getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    return res
      .status(200)
      .send({ message: "File uploaded successfully.", url: url[0] });
  });

  stream.end(fileBuffer);
};

module.exports = { uploadFileController };
