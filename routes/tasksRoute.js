import express from 'express'
import { getHelloMessageController, getAllTasksController, getTaskByIdController, postTaskController, deleteAllTasksController, deleteTaskByIDController, updateTaskCompleteByIDController } from '../controllers/tasksController.js';


const router = express.Router();

router.get('/', getHelloMessageController);

//get all tasks
router.get('/api/tasks', getAllTasksController);

//post a task
router.post('/api/tasks', postTaskController);

//delete all tasks
router.delete('/api/tasks', deleteAllTasksController);

//get a task
router.get('/api/tasks/:id', getTaskByIdController);

//mark a task complete
router.patch('/api/tasks/:id', updateTaskCompleteByIDController);

//delete a complete
router.delete('/api/tasks/:id', deleteTaskByIDController);

export default router;