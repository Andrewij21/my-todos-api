const router = require("express").Router();
const todosRoutes = require("./todosRoutes");
const userRoutes = require("./userRoutes");

router.use("/api/todos", todosRoutes);
router.use("/api/users", userRoutes);

module.exports = router;
