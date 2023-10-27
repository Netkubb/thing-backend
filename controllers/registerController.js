const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/db");
const { collection } = require("firebase-admin/firestore");

const handlerRegister = async (req, res) => {
  const { username, password } = req.body;
  console.log(password);
  console.log(password);

  if (!username && !password)
    return res
      .status(401)
      .json({ message: "username and password are require" });

  const query = await db.collection("user").get();
  const queryduplicate = query.docs.map((doc) => doc.data().username);

  const duplicate = queryduplicate.find((user) => user === username);

  //console.log(duplicate);
  if (duplicate !== undefined) {
    return res.sendStatus(409);
  }

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPwd = await bcrypt.hash(password, saltRounds);

    //console.log(hashedPwd);

    const result = await db.collection("user").add({
      username: username,
      password: JSON.stringify(hashedPwd),
    }); // --------------------
    //console.log(result);
    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handlerRegister };
