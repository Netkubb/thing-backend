const storage = require("../database/db");
const db = storage.db;
const getUserProfile = async (req, res) => {
  if (!req.header("Authorization"))
    return res.status(401).json({ message: "No req header" });

  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token" });

  const query = await db.collection("user").get();
  const foundUser = query.docs.find((user) => user.data().token === token);

  if (!foundUser) return res.status(400).json({ message: "No cookie" });

  const SendInfo = {
    username: foundUser.data().username,
    bulb: foundUser.data().bulb,
  };

  res.json(SendInfo);
};

module.exports = { getUserProfile };
