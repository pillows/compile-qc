const express = require('express')
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

app.post('/login', (req, res) => {
    
})





app.listen(port, () => console.log(`Listening on port ${port}!`))