const moongoose = require("moongoose")
const Schema = moongoose.Schema;

const taskSchema = new Schema({
    name: String,
    completed: Boolean
});

const task = moongoose.model('task', taskSchema);

module.exports = task;