const express = require("express");
const app = express();
const port = 5050;
const cors = require("cors");
require("dotenv").config();

const feedRoutes = require("./routes/feed");
const auth = require("./routes/auth");
const storage = require("./database/db");
const db = storage.db;
const bucket = storage.storage;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/testDB", async (req, res) => {
  const result = await db.collection("user").get();
  res.send(result.docs.map((doc) => doc.data()));
});

app.use("/feed", feedRoutes);

app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
