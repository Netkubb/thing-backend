const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handlerLogin = async (res, req) => {
  const { username, pwd } = req.body;

  if (!req || !res)
    return res.status(401).message({ message: "need username and password" });

  const foundUser = req.body; // TODO find username match from DB
  if (!foundUser) return res.sendstatus(401);

  const match = await bcrypt.compare(pwd, foundUser.password); // match password
  if (match) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET, // ACCESS TOKEN
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET, // REFRESH TOKEN
      { expiresIn: "1d" }
    );

    res.cookie("jwt", refreshToken, {
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
