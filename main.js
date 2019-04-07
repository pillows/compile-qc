const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const request = require('request');
const cookieParser = require('cookie-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.listen(port, () => console.log(`Listening on port ${port}!`))

app.set('view engine', 'pug')
app.use(express.static('static'))
app.use(express.json());
//username: group

const questions = [
    {
        description: "You have 3 cups of lemonade left. There are a number of people in line and you can only sell to 3 consecutive people in a row. Given an array of people, where each element represents how much they are willing to pay, what is the maximum amount of money you can make?",
        name: "Lemonade Stand"
    }
]

//username: group, teacher or student
let users = {}
//group: teacher, students, points, assignment
let groups = {}
var curr_user = 'none'

app.get('/', (req, res) => {
    if(Object.values(req.cookies).length > 0 && users[req.cookies.username]){
        res.redirect('/dashboard')
    }else{
        res.render('home')
    }
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

app.post('/logout', (req, res) => {
    res.clearCookie
    res.redirect('/')
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
    if(Object.values(req.cookies).length == 0 || users[req.cookies.username] == null){
        res.redirect('/')
    }else{
        console.log(questions)
        res.render('dashboard', {user: users[req.cookies.username], scores: [45, 35, 65, 90], questions:questions})
    }

})

app.get('/assign-group', (req, res) => {
    res.render('assign-group')
})

//only teacher
app.post('/assign-group', (req, res) => {
    let user = users[req.cookies.username]
    if(user.role == 'teacher'){
        groups[req.body.username] = {
            teacher: req.body.username,
            teams: req.body,
            points: 0
        }

        group[req.body.username].teams.forEach(x => {
            // users[x].group = group[req.body.username].group
            // create new student object for each

            //teams object
            x.teams.forEach(team => {
                //students array
                team.students.forEach(student => {
                    users[student] = {username: student, role: 'student', group: team, assignments: []}
                })
            })
        });

    }else{
        res.redirect('/dashboard')
    }
})

app.post('/assign-task', (req, res) => {

})

app.get('/code', (req, res) => {
    res.render('code', {questions:questions[0]})
})

app.post('/code', (req, res) => {


    let headerCode = "function getAnswer(customers){"

    let tailCode = `
}


function checkTestCases(){
var test_cases =[
{array: [1,2,3], answer: 6},
{array:[4,5,2,6,1,7,3,7,2,3], answer: 17},
{array:[8, 4, 3, 13, 9, 7, 10, 2, 14, 5], answer: 29}

]


for(var i of test_cases){
if(getAnswer(i.array) != i.answer){
    console.log("wrong [" + i.array + "]");
}
else{
    console.log("correct ["  + i.array + "]");
}
}

}

checkTestCases();
    `;

    let completeCode = headerCode + req.body.code + tailCode;
    console.log(completeCode);
    var headers = {
    'content-type': 'application/json'
    };

    req.body.code = completeCode;
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

            console.log("body " + JSON.parse(body).output);
            //let hits = JSON.parse(body).output.match(new RegExp("\\b" + myName +"\\b", "g"));
            let hits = (JSON.parse(body).output.match(/correct/g) || []).length;
            console.log("trues " + hits);

            let output = {
                stdout: body,
                cases: 3,
                successes: hits
            }
            //console.log(JSON.stringify({data: JSON.parse(body).output}));

            res.json(output)
            return 0;
        }
    }

    request(options, callback);

    console.log(1);
})
