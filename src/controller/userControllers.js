const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = ({ _id }) => {
  return jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw Error("Incorrect Email");

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw Error("Password incorrect");

    const token = createToken(user._id);
    res.status(200).json({ status: "ok", email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) throw Error("Email already exist!");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash });
    const token = createToken(user._id);
    res.status(200).json({ status: "ok", email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({}, { password: 0 });
  res.status(200).json(users);
};
module.exports = { loginUser, signupUser, getUsers };
