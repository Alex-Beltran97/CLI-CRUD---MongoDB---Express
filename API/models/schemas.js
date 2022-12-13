const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  _id: String,
  name: String,
  completedAt: Date || null
});

const Todo = mongoose.model("tasks",taskSchema);

module.exports = { Todo, mongoose };
