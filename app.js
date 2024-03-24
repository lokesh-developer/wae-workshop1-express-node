const express = require('express')
const db = require('./db');
const app = express()
const port = 4000
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cors = require("cors")

var jsonParser = bodyParser.json()
app.use(bodyParser.json({ type: 'application/*+json' }))

// create application/x-www-form-urlencoded parser
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));

db();

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: { type: String, required: true },
    completed: { type: Boolean, required: false }
});

const Task = mongoose.model('Task', taskSchema);


app.get('/', (req, res) =>
{
    res.json({message:'Hello World!'})
})

app.post('/addTask', jsonParser, async (req, res) =>
{

    const { name } = req.body;
    console.log(req.body)
    try {
        const newTask = new Task({
            name: name
        });
    
        const t = await newTask.save()
        res.status(200).json({message: 'New task saved:', t})
    } catch (error) {
        res.status(500).json({message: 'Error saving task:', error})
    }
})

app.post("/completeTask", jsonParser, async (req, res) => {
    const {id} = req.body
    try {
        const findTask = await Task.findByIdAndUpdate(id, {
            completed: true
        })
        res.status(200).json({findTask})
    } catch (error) {
        res.status(500).json({message: "Error", error})
    }
})

app.get("/get", async (req, res) =>
{
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving task' });
    }
})

app.listen(port, () =>
{
    console.log(`Example app listening on port ${port}`)
})





