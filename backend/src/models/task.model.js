import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true },
  task: {
    type: String,
    required: true },

  taskStatus: { 
    type: Boolean, 
    default: false },

  dateAssigned: { 
    type: Date, 
    default: 
    Date.now },
    
  updatedAt: { 
    type: Date, 
    default: null },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
