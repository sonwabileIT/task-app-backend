import express, { json } from 'express';
import 'dotenv/config';
import mysql from 'mysql2/promise';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json())

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
        let [result] = await pool.query(`SELECT * FROM tasks WHERE TaskID = ?`, [id])
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
    }
    
}


async function postTask(taskName, taskDescription){
    try{
        let [result] = await pool.query(`INSERT INTO tasks (TaskName, TaskDescription) 
            VALUES (?, ?)`,
            [taskName,
            taskDescription
            ]
         );

        console.log(result)
    }catch(err){
        console.log(err)
    }
}

async function deleteTaskByID(id){
    try{
        let [result] = await pool.query(`DELETE FROM tasks WHERE TaskID = ?`, [id]);
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
            WHERE TaskID = ?`, [id]);
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

app.get('/', (req, res) => {
    res.send('Hello from the GET server');
})

//get all tasks
app.get('/api/tasks', async (req, res) => {
    const tasks = await getAllTasks();
    // res.send('Hello from api/tasks');
    res.send(tasks);
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

//post a task
app.post('/api/tasks', async (req, res) => {
    
    const {taskName, taskDescription} = req.body;
    const task = await postTask(taskName, taskDescription);
    res.send(task);
})
    


app.listen(PORT, () => {
    console.log(`Server starting from port: ${PORT}`);
})