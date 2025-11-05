import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title } = req.body;
  const newTask = await Task.create({ title });
  res.json(newTask);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: "Task deleted" });
};
