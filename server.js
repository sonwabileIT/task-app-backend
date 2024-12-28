import express, { json } from 'express';
import 'dotenv/config';
// import mysql from 'mysql2/promise';
import cors from 'cors'
import tasksRoutes from './routes/tasksRoute.js'

const PORT = process.env.MYSQLPORT;
const app = express();

app.use(express.json())
app.use(cors())

app.use(tasksRoutes)
    
app.listen(PORT, () => {
    console.log(`Server starting from port: ${PORT}`);
})