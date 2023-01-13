//index.js is the main file of the to do list
//loading express
const express = require('express');
//path of the file stored locally is obatined
const path = require('path');
//a port is stored in a variable
const port = 8000
//express is assigned to a constant variable
const app = express();

//loading the database javascript file 
const db = require('./config/mongoose');
//loading the database schema javascript file 
const Task = require('./models/task');

//seting the view engines and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//encoding is used to parse the information submitted in the form
//req is used to access the information passed in ejs form
app.use(express.urlencoded());
app.use(express.static('assets'));

//the home route '/' get 
//the call back function finds all the stored tasks in the database , and return err if any other wise pass them to the ejs home file 
app.get("/", function(req, res){

    //task is the collection name in the database
    //find is a inbuilt function
    Task.find({}, function(err, tasks){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Task List",
            task_list: tasks
        });
    })
});

//the '/create-task' route
//the call back function creates a new task in the database with information provided in the form
app.post("/create-task", function(req,res){
    //task is the collection name in the data base
    // create is a inbuilt function
    Task.create({
        taskName: req.body.name,
        taskCategory: req.body.category,
        taskDate : req.body.date
    }, function(err, newTask){
        if(err){console.log('Error in creating a Task!'); return ;}
            console.log("Created The new Task");
            return res.redirect('back');
    })
})

//the 'delete-contact' route 
//call back function deletes all the tasks with have checkbox clicked by the user 
app.post('/delete-contact', function(req, res){
    let k = req.body.checkbox;
    for (let i = 0; i < k.length; i++) {
    //task is a collection in the database
    Task.findOneAndDelete(k[i], function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
    })
}
return res.redirect('back');
});


//seting our app to listen in th designated port aand console logging the status
app.listen(port, function(err)
{
    if(err)
    {
        console.log(err);
    }
    console.log("Sucess app is up and running on Port :", port);
});