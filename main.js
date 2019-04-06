const express = require('express')
const request = require('request');
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(express.static('static'))


app.get('/', (req, res) => {
    res.render('home')
})



app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/code', (req, res) => {

    var headers = {
    'content-type': 'application/json'
    };

    var dataString = '{"code":"console.log(2312)", "lang":"javascript", "stdin":""}';
        console.log('data between options')
    var options = {
        url: 'http://206.189.202.164:8000/compile/',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body).output);
            res.render('code',{data: JSON.parse(body).output})
        }
    }

    request(options, callback);



})

app.post('/login', (req, res) => {

})

app.get('/create-account', (req, res) => {
    res.render('create-account')
})





app.listen(port, () => console.log(`Listening on port ${port}!`))
