import express, { json } from 'express';
import 'dotenv/config';
import mysql from 'mysql2/promise';
import cors from 'cors'

const PORT = process.env.MYSQLPORT;
const app = express();

app.use(express.json())
app.use(cors())

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
})

async function getAllTasks(){
    try{
        let [result] = await pool.execute('SELECT * FROM tasks');
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
    }
}

async function getTask(id){
    try{
        let [result] = await pool.execute(`SELECT * FROM tasks WHERE id = ?`, [id])
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
    }
}

async function postTask(taskName, taskDescription, isComplete){
    try{
        let [result] = await pool.execute(`INSERT INTO tasks (taskname, taskdescription, isComplete) 
            VALUES (?, ?, ?)`,
            [taskName,
            taskDescription,
            isComplete
            ]
         );

        console.log(result)
    }catch(err){
        console.log(err)
    }
}

async function deleteTaskByID(id){
    try{
        let [result] = await pool.execute(`DELETE FROM tasks WHERE id = ?`, [id]);
        console.log(result)
    }catch(err){
        console.log(err)
    }
}

async function deleteAllTasks(){
    try{
        let result = await pool.execute(`DELETE FROM tasks`);
        console.log(result)
    }catch(err){
        console.log(err)
    }
}

async function updateTaskCompleteByID(id){
    try{
        let [result] = await pool.execute(`
            UPDATE tasks 
            SET isComplete = true 
            WHERE id = ?`, [id]);
        console.log(result)
    }catch(err){
        console.log(err)
    }
}

app.get('/', (req, res) => {
    res.send('Hello from the GET server');
})

//get all tasks
app.get('/api/tasks', async (req, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
})

//get a task
app.get('/api/tasks/:id', async (req, res) => {
    const task = await getTask(req.params.id);
    res.send(task)
})

//mark a task complete
app.patch('/api/tasks/:id', async (req, res) => {
    const task = await updateTaskCompleteByID(req.params.id);
    res.send(task);
})

//delete all tasks
app.delete('/api/tasks', async (req, res) => {
    const result = await deleteAllTasks();
    res.send(result);
})

//delete a complete
app.delete('/api/tasks/:id', async (req, res) => {
    const task = await deleteTaskByID(req.params.id);
    res.send(task);
})

//post a task
app.post('/api/tasks', async (req, res) => {
    const {taskname, taskdescription, isComplete} = req.body;
    const task = await postTask(taskname, taskdescription, isComplete);
    res.status(201).send(task);
})
    
app.listen(PORT, () => {
    console.log(`Server starting from port: ${PORT}`);
})