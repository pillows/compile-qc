const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const request = require('request');
app.use(bodyParser.urlencoded())
app.listen(port, () => console.log(`Listening on port ${port}!`))

app.set('view engine', 'pug')
app.use(express.static('static'))
app.use(express.json());
//username: group
let users = {}
//group: people, points
let groups = {}
var curr_user = 'none'

app.get('/', (req, res) => {
    res.render('home', {user: curr_user})
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    if(!users[req.body.username]){
        res.redirect('/login')
    }else{
        curr_user = req.body.username
        res.redirect('/')
    }
})

app.get('/create-account', (req, res) => {
    res.render('create-account')
})

app.post('/create-account', (req, res) => {
    //temp group until assigned
    users[req.body.username] = null
    curr_user = req.body.username

    res.redirect('dashboard')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
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
