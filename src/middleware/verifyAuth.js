const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const verifyAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization && authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Null Token" });

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user_id = await User.findById(_id).select("_id");
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid Token" });
  }
};

module.exports = verifyAuth;
