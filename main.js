const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const request = require('request');
const cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.listen(port, () => console.log(`Listening on port ${port}!`))

app.set('view engine', 'pug')
app.use(express.static('static'))
app.use(express.json());
//username: group

const questions = [
    "You have 3 cups of lemonade left. There are a number of people in line and you can only sell to 3 consecutive people in a row. Given an array of people, where each element represents how much they are willing to pay, what is the maximum amount of money you can make?",
    ""
]

//username: group, teacher or student
let users = {}
//group: teacher, students, points, assignment
let groups = {}
var curr_user = {
    username: "default",
    role: "teacher"
}

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    if(!users[req.body.username]){
        res.redirect('/login')
    }else{
        res.cookie('role', users[req.body.username].role, {
            secure: false,
            overwrite: true,
        })

        res.cookie('username', users[req.body.username].username, {
            secure: false,
            overwrite: true
        })
        res.redirect('/')
    }
})

app.get('/create-account', (req, res) => {
    res.render('create-account')
})

app.post('/create-account', (req, res) => {
    //temp group until assigned
    users[req.body.username] = {
        username: req.body.username,
        role: req.body.role
    }
    res.cookie('role', req.body.role, {
        secure: false,
        overwrite: true,
    })

    res.cookie('username', req.body.username, {
        secure: false,
        overwrite: true
    })

    res.redirect('dashboard')
})

app.get('/dashboard', (req, res) => {
    console.log("name: ", req.cookies)
    res.render('dashboard', {user: users[req.cookies.username]})
})

//only teacher
app.post('/assign-group', (req, res) => {
    let user = users[req.cookies.username]
    if(user.role == 'teacher'){
        group[req.body.username] = {
            teacher: req.body.username,
            students: [],
            points: 0
        }

        group[req.body.username].students.forEach(x => {
            users[x].group = group[req.body.username].group
        });

    }else{
        res.redirect('/dashboard')
    }
})

app.post('/assign-task', (req, res) => {

})

app.get('/code', (req, res) => {

    res.render('code')
})

app.post('/code', (req, res) => {

    var headers = {
    'content-type': 'application/json'
    };

    console.log(req.body);
    var dataString = JSON.stringify(req.body);

    var options = {
        url: 'http://qc.mwong.io:8000/compile/',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("test " + JSON.parse(body).output);
            //console.log(JSON.stringify({data: JSON.parse(body).output}));
            res.json(body)
            return 0;
        }
    }

    request(options, callback);

    console.log(1);
})
