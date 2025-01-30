import React, { useEffect } from "react";
import {useTaskStore} from "../store/useTaskStore.js";

const Tasks = () => {
    const { tasks, fetchTasks, completeTask, allCompleted } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Daily Tasks</h2>
            {allCompleted ? (
                <p>🎉 All tasks for today are completed! Come back tomorrow for new tasks.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>
                            <span style={{ textDecoration: task.taskStatus ? "line-through" : "none" }}>
                                {task.task}
                            </span>
                            {!task.taskStatus && <button onClick={() => completeTask(task._id)}>Complete</button>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Tasks;
