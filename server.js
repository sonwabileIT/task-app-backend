import express, { json } from 'express';
import 'dotenv/config';
import mysql from 'mysql2/promise';
import cors from 'cors'

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json())
app.use(cors())

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

async function getAllTasks(){
    try{
        let [result] = await pool.query('SELECT * FROM tasks');
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
    }
    
    // return result;
}

async function getTask(id){
    try{
        let [result] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [id])
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
    }
    
}


async function postTask(taskName, taskDescription, isComplete){
    try{
        let [result] = await pool.query(`INSERT INTO tasks (taskname, taskdescription, isComplete) 
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
        let [result] = await pool.query(`DELETE FROM tasks WHERE id = ?`, [id]);
        console.log(result)
    }catch(err){
        console.log(err)
    }
}

async function deleteAllTasks(){
    try{
        let result = await pool.query(`DELETE FROM tasks`);
        console.log(result)
    }catch(err){
        console.log(err)
    }
}

async function updateTaskCompleteByID(id){
    try{
        let [result] = await pool.query(`
            UPDATE tasks 
            SET isComplete = true 
            WHERE id = ?`, [id]);
        console.log(result)
    }catch(err){
        console.log(err)
    }
}


// deleteTaskByID(2);
// updateTaskCompleteByID(4);
// postTask("Buy groceries","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." )
// getAllTasks();
// getTask(1);
// deleteAllTasks();

app.get('/', (req, res) => {
    res.send('Hello from the GET server');
})

//get all tasks
app.get('/api/tasks', async (req, res) => {
    const tasks = await getAllTasks();
    // res.send('Hello from api/tasks');
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
    // res.send('Hello from patch');
    res.send(task);
})

//delete a complete
app.delete('/api/tasks/:id', async (req, res) => {
    const task = await deleteTaskByID(req.params.id);
    // res.send('Hello from delete task');
    res.send(task);
})

//delete all tasks
app.delete('/api/tasks', async (req, res) => {
    const result = await deleteAllTasks();
    res.send(result);
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