import { pool } from "../dbConnection.js";

export async function getAllTasks(){
    try{
        let [result] = await pool.execute('SELECT * FROM tasks');
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
    }
}

export async function getTask(id){
    try{
        let [result] = await pool.execute(`SELECT * FROM tasks WHERE id = ?`, [id])
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
    }
}

export async function postTask(taskName, taskDescription, isComplete){
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

export async function deleteTaskByID(id){
    try{
        let [result] = await pool.execute(`DELETE FROM tasks WHERE id = ?`, [id]);
        console.log(result)
    }catch(err){
        console.log(err)
    }
}

export async function deleteAllTasks(){
    try{
        let result = await pool.execute(`DELETE FROM tasks`);
        console.log(result)
    }catch(err){
        console.log(err)
    }
}

export async function updateTaskCompleteByID(id){
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