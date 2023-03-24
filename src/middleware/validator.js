const { default: validator } = require("validator");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const isEmptyFields = (data) => {
  let emptyFields = [];
  Object.entries(data).forEach((o) => {
    if (!o[1].trim()) emptyFields.push(o[0]);
  });
  return emptyFields;
};

const signupCheck = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkEmpty = isEmptyFields(req.body);

    // IS FIELDS EMPTY
    if (checkEmpty.length > 0) throw Error("Field can not empty!");

    // IS FIELDS VALID
    if (!validator.isEmail(email)) throw Error("Email not valid!");
    if (!validator.isStrongPassword(password))
      throw Error(
        "Password not strong enough! consider using uppercase,lowercase,symbol and number"
      );

    next();
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};

const loginCheck = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkEmpty = isEmptyFields(req.body);
    const checkValid = validator.isEmail(email);

    if (checkEmpty.length > 0) throw Error("Field can not empty!");

    if (!checkValid) throw Error("Email is Invalid");

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const todoCheck = (req, res, next) => {
  const { title, body } = req.body;
  const { _id: user_id } = req.user_id;

  let emptyFields = [];

  if (!user_id) throw Error("User id not found");
  if (!title.trim()) emptyFields.push("title");
  if (!body.trim()) emptyFields.push("body");
  if (emptyFields.length > 0)
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });

  next();
};

module.exports = { signupCheck, loginCheck, todoCheck };
