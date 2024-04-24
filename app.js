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


app.get('/', (req, res) =>
{
    res.json({message:'Hello World!'})
})

app.post('/add', jsonParser, async (req, res) =>
{
    const { name } = req.body;
    const newTask = new Task({
        name: name
    });

    newTask.save()
        .then((post) => res.status(200).send('New task saved:', post))
        .catch((error) => res.status(500).send('Error saving blog post:', error))
})

app.get("/get", async (req, res) =>
{
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving blog posts' });
    }
})


app.listen(port, () =>
{
    console.log(`Example app listening on port ${port}`)
})




