import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    const {userId} = req.user;

    const tasks = await Task.find({userId,taskStatus: false}).limit(3);

    if(tasks.length < 3){
        const allTasks = await Task.find();
        const existingTasks = tasks.map((task) => task.task);

        const newTask = allTasks.map(t=>t.task).filter(task=>!existingTasks.includes(task)).slice(0.3 - tasks.length).map(task => ({userId,task,taskStatus: false}));

        if (newTask.length > 0) {
            const savedTasks = await Task.insertMany(newTask);
            tasks = [...tasks, ...savedTasks];
        }
    }

    return res.status(200).json(tasks);
} 

export const updateTask = async (req, res) => {
    const {taskId} = req.params;
    const {userId} = req.user;

    const updatedTask = await Task.findByIdAndUpdate(taskId,{taskStatus:true, updatedAt: Date.now()},{new: true});

    const remainingTasks = await Task.find({userId,taskStatus: false});

    if (remainingTasks.length < 3){
        const allTasks = await Task.find();
        const existingTasks = await Task.find({userId});
        const existingTaskNames = existingTasks.map((task) => task.task);

        const newTaskName = allTasks.map(t=>t.task).find(task => !existingTaskNames.includes(task));

        if (newTaskName) {
            const newTask = new Task({userId,task: newTaskName,taskStatus: false});
            await newTask.save();
        }
    }

    return res.status(200).json(updatedTask);
}

export const history = async (req, res) => {
    const {userId} = req.user;

    const history = await Task.find({userId,taskStatus: true}).sort({updatedAt: -1});

    return res.status(200).json(history);
}