const mongoose = require("mongoose");
const Todo = require("../model/todosModel");

const createTodo = async (req, res) => {
  try {
    const { title, body } = req.body;
    const { _id: user_id } = req.user_id;

    const todo = await Todo.create({ title, user_id, body });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTodo = async (req, res) => {
  const { _id: user_id } = req.user_id;
  const todo = await Todo.find({ user_id }).sort({ createdDate: -1 });
  res.status(200).json(todo);
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("Invalid ID");
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("Invalid todo ID");
    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { returnDocument: "after" }
    );
    if (!todo) throw Error("todo not found");
    res.status(200).json({ msg: "Data updated", data: todo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("Invalid todo ID");
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) throw Error("todo not found");
    res.status(200).json({ msg: "Data deleted", data: todo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTodo,
  getTodoById,
  getTodo,
  updateTodo,
  deleteTodo,
};
