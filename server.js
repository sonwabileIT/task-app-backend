import express from 'express';

const PORT = 5000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from the GET server');
})
    


app.listen(PORT, () => {
    console.log(`Server starting from port: ${PORT}`);
})