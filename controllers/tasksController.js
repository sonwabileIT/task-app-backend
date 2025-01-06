import {getAllTasks, getTask, postTask, deleteTaskByID, deleteAllTasks, updateTaskCompleteByID} from '../services/taskService.js'

export const getHelloMessageController = (req, res) => {
    res.send('Hello from the GET server');
}

export const getAllTasksController = async (req, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
}

export const postTaskController = async (req, res) => {
    const {taskname, taskdescription, isComplete} = req.body;
    const task = await postTask(taskname, taskdescription, isComplete);
    res.status(201).send(task);
}

export const deleteAllTasksController = async (req, res) => {
    const result = await deleteAllTasks();
    res.send(result);
}

export const getTaskByIdController = async (req, res) => {
    const task = await getTask(req.params.id);
    res.send(task)
}

export const updateTaskCompleteByIDController = async (req, res) => {
    const task = await updateTaskCompleteByID(req.params.id);
    res.send(task);
}

export const deleteTaskByIDController = async (req, res) => {
    const task = await deleteTaskByID(req.params.id);
    res.send(task);
}


