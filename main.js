const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.listen(port, () => console.log(`Listening on port ${port}!`))

app.set('view engine', 'pug')
app.use(express.static('static'))

//username: group
let users = {}
//group: people, points
let groups = {}

app.get('/', (req, res) => {
    res.render('home')
}) 

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/create-account', (req, res) => {
    res.render('create-account')
})

app.post('/create-account', (req, res, next) => {
    //temp group until assigned
    users[req.body.username] = null
})



