const express = require('express');
const app = express();
const PORT = 5000;

const DB = [
    {
        id : 1,
        color : "red",
        text : "text1"
    },
    {
        id : 2,
        color : "yellow",
        text : "text1"
    },
    {
        id : 3,
        color : "blue",
        text : "text1"
    },
    {
        id : 4,
        color : "green",
        text : "text1"
    }
];

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/tabs', (req,res) => {
    res.json(DB)
});

app.get('/tabs/:id',(req,res) => {
    const id = req.params.id;
    const tab = DB.find(tab => tab.id == id);
    if (!tab) {
        return res.status(404).json({ message: "Tab not found" });
    }
    res.json(tab)
});

app.patch('/tabs/:id',(req,res) => {
    const id = req.params.id; 
    const { color, text } = req.body; 
    const item = DB.find(item => item.id === id);
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }
    if (color) item.color = color;
    if (text) item.text = text;
    res.status(201).json(item);
});

app.post('/tabs' , (req,res) => {
    const tab = {
        id: DB.length + 1,
        color: req.body.color,
        text: req.body.text
    };
    DB.push(tab);
    res.json(tab);
});

app.delete('/tabs/:id', (req,res) => {
    const id = req.params.id;
    const index = DB.findIndex(tab => tab.id == id);
    if(index != -1){
        DB.splice(index,1);
        res.status(204).send();
    }
    else{
        res.status(404).send({error: 'Tab not found'});
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
