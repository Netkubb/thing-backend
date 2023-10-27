const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handlerRegister = async (req, res) => {
  const { username, pwd } = req.body;

  if (!username || !pwd)
    return res
      .status(401)
      .json({ message: "username and password are require" });

  const duplicate = req.body; // TODO find username from DB
  if (duplicate)
    return res
      .sendstatus(409)
      .json({ massgae: "Unlucky your username has been use" });

  try {
    const hashedPwd = bcrypt.hash(pwd, 10);
    // TODO create user in DB
    console.log(result);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handlerRegister };
