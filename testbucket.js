const { storage } = require("./database/db"); // Replace with the path to your module

// Define the name of the bucket you want to check
const bucketName = "thinc-humungousaur.appspot.com"; // Replace with the actual bucket name

// Reference the bucket
const bucket = storage.bucket(bucketName);

// List the files in the bucket
bucket
  .getFiles()
  .then((results) => {
    const files = results[0];
    if (files.length === 0) {
      console.log("The bucket is empty.");
    } else {
      console.log("Files in the bucket:");
      files.forEach((file) => {
        console.log(file.name);
      });
    }
  })
  .catch((error) => {
    console.error("Error listing files in the bucket:", error);
  });
