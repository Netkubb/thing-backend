const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/db");

const handlerLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).json({ message: "need username and password" });

  const query = await db.collection("user").get();

  const foundUser = query.docs.find(
    (user) => user.data().username === username
  );
  //console.log(foundUser.id);

  if (!foundUser)
    return res.status(404).json({ message: "Incorrect username" });

  const match = await bcrypt.compare(password, foundUser.data().password);

  console.log(match);
  // match password
  if (match) {
    const accessToken = jwt.sign(
      {
        username: username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    // เก็บ token

    const userToken = {};
    userToken.token = accessToken;

    try {
      await db.collection("user").doc(foundUser.id).update(userToken);
    } catch (err) {
      console.error(err);
    }

    //

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000 * 3,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handlerLogin };
