const router = require("express").Router();
const {
  createTodo,
  getTodoById,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controller/todosController");
const verify = require("../middleware/verifyAuth");
const { todoCheck } = require("../middleware/validator");

router.use(verify);

router.get("/", getTodo);

router.get("/:id", getTodoById);

router.post("/", todoCheck, createTodo);

router.patch("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
