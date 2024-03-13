const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_KEY_USER =
  process.env.ACCESS_TOKEN_KEY || "MegaSecretKeyAccessTokenKeyUser"; //TODO Make .env file
const REFRESH_TOKEN_KEY_USER =
  process.env.REFRESH_TOKEN_KEY || "MegaSecretKeyRefreshTokenKeyUser"; //TODO Make .env file
const ACCESS_TOKEN_KEY_CONTROLLER =
  process.env.ACCESS_TOKEN_KEY_CONTROLLER ||
  "MegaSecretKeyAccessTokenKeyController"; //TODO Make .env file
const REFRESH_TOKEN_KEY_CONTROLLER =
  process.env.REFRESH_TOKEN_KEY_CONTROLLER ||
  "MegaSecretKeyRefreshTokenKeyController"; //TODO Make .env file

exports.verifyUserToken = function (req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["token"] ||
    req.headers.authorization;

  if (!token) {
    return res
      .status(403)
      .json({ Error: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_KEY_USER);
    req.headers["manufactoringID"] = decoded.manufactoringID;
  } catch (e) {
    //return res.redirect("/http://65.108.92.248/"); //implement redirect to refresh token
    return res.status(401).json({ Error: "Invalid Token" });
  }
  next();
};

exports.verifyControllerToken = function (req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["token"] ||
    req.headers.authorization;

  if (!token) {
    return res
      .status(403)
      .json({ Error: "A token is required for authentication" });
  }

  console.log(token);
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_KEY_CONTROLLER);
    console.log(decoded);
    req.headers["popID"] = decoded.popID;
  } catch (e) {
    console.log(e);
    //return res.redirect("/http://65.108.92.248/"); //implement redirect to refresh token
  }
  next();
};
