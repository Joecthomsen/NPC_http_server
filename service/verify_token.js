const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_KEY = "MegaSecretKeyAccessTokenKey";

exports.verifyToken = function (req, res, next) {
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
    const decoded = jwt.verify(token, ACCESS_TOKEN_KEY);
    req.headers["manufactoringID"] = decoded.manufactoringID;
  } catch (e) {
    //return res.redirect("/http://65.108.92.248/"); //implement redirect to refresh token
    return res.status(401).json({ Error: "Invalid Token" });
  }
  next();
};
