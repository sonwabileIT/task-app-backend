import express from 'express';
import 'dotenv/config';

const PORT = process.env.PORT || 5000;
const app = express();

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
    


app.listen(PORT, () => {
    console.log(`Server starting from port: ${PORT}`);
})