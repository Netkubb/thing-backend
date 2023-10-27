const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/db");

const handlerLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).message({ message: "need username and password" });

  const query = await db.collection("user").get();
  const queryFound = query.docs.map((doc) => doc.data().username);
  const foundUser = queryFound.filter((user) => user === username);

  if (foundUser !== undefined) return res.sendStatus(401);

  const match = await bcrypt.compare(password, foundUser.password); // match password
  if (match) {
    const accessToken = jwt.sign(
      {
        username: username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handlerLogin };
