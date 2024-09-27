import express from 'express';
import 'dotenv/config';
import mysql from 'mysql2/promise';

const PORT = process.env.PORT || 5000;
const app = express();

const pool = mysql.createPool({
    host: ***REMOVED***,
    user: ***REMOVED***,
    password: ***REMOVED***,
    database: ***REMOVED***
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
        let [result] = await pool.query(`SELECT * FROM tasks WHERE TaskID = ${id}`)
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
    }
    
}

getAllTasks();
getTask(1);

app.get('/', (req, res) => {
    res.send('Hello from the GET server');
})

//get all tasks
app.get('/api/tasks', (req, res) => {
    res.send('Hello from api/tasks');
})

//mark a task complete
app.patch('/api/tasks/[0-9]', (req, res) => {
    res.send('Hello from patch')
})

//delete a complete
app.delete('/api/tasks/[0-9]', (req, res) => {
    res.send('Hello from delete task')
})

app.post('api/tasks', (req, res) => {
    res.send('Hello from post task')
})
    


app.listen(PORT, () => {
    console.log(`Server starting from port: ${PORT}`);
})