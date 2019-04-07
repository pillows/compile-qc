const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.listen(port, () => console.log(`Listening on port ${port}!`))

app.set('view engine', 'pug')
app.use(express.static('static'))

//username: group, teacher or student
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
        curr_user = users[req.body.username]
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
    curr_user = users[req.body.username]

    res.redirect('dashboard')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {user: curr_user})
})

app.get('/code', (req, res) => {

    // var headers = {
    // 'content-type': 'application/json'
    // };
    //
    // var dataString = '{"code":"console.log(2312)", "lang":"javascript", "stdin":""}';
    //     console.log('data between options')
    // var options = {
    //     url: 'http://206.189.202.164:8000/compile/',
    //     method: 'POST',
    //     headers: headers,
    //     body: dataString
    // };
    //
    // function callback(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(JSON.parse(body).output);
    //         res.render('code',{data: JSON.parse(body).output})
    //     }
    // }
    //
    // request(options, callback);
    res.render('code')
})

app.post('/code', (req, res) => {
    console.log(1);
    // var headers = {
    // 'content-type': 'application/json'
    // };
    //
    // var dataString = '{"code":"console.log(2312)", "lang":"javascript", "stdin":""}';
    //     console.log('data between options')
    // var options = {
    //     url: 'http://206.189.202.164:8000/compile/',
    //     method: 'POST',
    //     headers: headers,
    //     body: dataString
    // };
    //
    // function callback(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(JSON.parse(body).output);
    //         res.render('code',{data: JSON.parse(body).output})
    //     }
    // }
    //
    // request(options, callback);
})
