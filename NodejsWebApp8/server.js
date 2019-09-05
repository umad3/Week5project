var express = require('express');
var app = express();
const body = require('body-parser');
const morgan = require('morgan');
const middlewares = [
    body.urlencoded()
];
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

let db = [];
var Name = "";
var Due = "";
var Desc = "";

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/newtask', function (req, res) {
    res.render('newtask.html');
    Name = req.query.taskname;
    Due = req.query.taskdue;
    Desc = req.query.taskdesc;

    db.push({
        TaskName: Name,
        TaskDue: Due,
        TaskDesc: Desc
    });

    console.log(db.length);
});

app.get('/listtasks', function (req, res) {
    res.render('listtasks.html', { tasksDb: db });
});

app.listen(8080);