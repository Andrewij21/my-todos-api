const router = require("express").Router();
const {
  loginUser,
  signupUser,
  getUsers,
} = require("../controller/userControllers");
const { signupCheck, loginCheck } = require("../middleware/validator");

router.post("/login", loginCheck, loginUser);
router.post("/signup", signupCheck, signupUser);
router.get("/", getUsers);

module.exports = router;
