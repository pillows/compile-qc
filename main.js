const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(express.static('static'))

app.get('/', (req, res) => {
    res.render('home')
}) 



app.listen(port, () => console.log(`Listening on port ${port}!`))