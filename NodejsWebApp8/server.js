var express = require('express');
var app = express();
const body = require('body-parser'); 
const morgan = require('morgan');
const middlewares = [
    body.urlencoded()
];
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(body.urlencoded ( {
    extended:false
}))
app.use(express.static(__dirname + '/public'));
app.use(express.static('Images')); // to link the image file to the app
app.use(express.static('css'));

let db = []; // create the task array 
// Name , due date and description variable 
var Name = ""; 
var Due = "";
var Desc = "";

// defaults to html
app.get('/', function (req, res) {
    res.render('index.html'); // render used to dispaly the index page
});

//Takes you to the new task page
app.get('/newtask', function (req, res) {
    res.render('newtask.html'); // displays the page

    Name = req.query.taskname; //read and store inputs according to the variabless
    Due = req.query.taskdue;
    Desc = req.query.taskdesc;

    // push the extracted values to the array 
    db.push({
        TaskName: Name,
        TaskDue: Due,
        TaskDesc: Desc
    });

    console.log(db.length); // display the database aaray length
});

app.get('/listtasks', function (req, res) {
    res.render('listtasks.html', { tasksDb: db });//  current instance of db is pushed to the html page so that the task of looping and listing can be performed. 
});

app.listen(8080);