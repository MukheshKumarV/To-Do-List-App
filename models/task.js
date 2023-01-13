//this is a mongo DB schema creation js file
//loading mongoose to create a schema
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName :{
        type: String
    },
    taskCategory :{
        type: String
    },
    taskDate :{
        type: String,
    }
});

//assgining a variable to the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;