const express = require('express')
const db = require('./db');
const app = express()
const port = 4000
const mongoose = require("mongoose");

db();

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: String,
    completed: Boolean
});

const Task = mongoose.model('Task', taskSchema);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/add', async (req, res) => {
    const { name } = req.query;
    const newTask = new Task({
        name: name
    });

    newTask.save()
        .then((post) => res.status(200).send('New blog post saved:', post))
        .catch((error) => console.status(500).send('Error saving blog post:', error))
})



