const { storage } = require("../database/db");
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
      contentType: file.mimetype,
    },
  });

  stream.on("error", (err) => {
    return res.status(500).send("File upload error: " + err);
  });

  stream.on("finish", () => {
    return res.status(200).send("File uploaded successfully.");
  });

  stream.end(fileBuffer);
};

module.exports = { uploadFileController };
