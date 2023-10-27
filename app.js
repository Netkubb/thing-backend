const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

const feedRoutes = require("./routes/feed");
const auth = require("./routes/auth");
const register = require("./routes/register");
const db = require("./database/db");

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

app.use("/register", register);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
