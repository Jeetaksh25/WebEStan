import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const getTasks = async (req,res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("completedTasks");

        const tasks = await Task.find({_id:{$nin:user.completedTasks}}).limit(3);

        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const completeTask = async (req,res) => {
    try {
        const userId = req.user._id;
        const taskId = req.params.taskId;

        if (!taskId) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const user_update = await User.findByIdAndUpdate(userId,{$push:{completedTasks:taskId}});

        user_update.completedTasks.push(taskId);
        await user_update.save();

        res.status(200).json({ message: "Task completed successfully" });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addTask = async (req,res) => {
    try {
        const {title,task} = req.body;
        const userId = req.user._id;

        if (!title || !task) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTask = new Task({title,task,userId});
        await newTask.save();

        res.status(201).json({ message: "Task added successfully", task: newTask });

    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}