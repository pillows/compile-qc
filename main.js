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
    },
    {
        description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.",
        name: "House Robber"
    },
    {
        description: "Given an array of non-negative integers, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position. Determine if you are able to reach the last index.",
        name: "Jump Game"
    },
    {
        description: "You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
        name: "Coin Change"
    },
    {
        description: "Given n balloons, indexed from 0 to n-1. Each balloon is painted with a number on it represented by array nums. You are asked to burst all the balloons. If the you burst balloon i you will get nums[left] * nums[i] * nums[right] coins. Here left and right are adjacent indices of i. After the burst, the left and right then becomes adjacent. Find the maximum coins you can collect by bursting the balloons wisely.",
        name: "Burst Balloons"
    }


]

//username: group, teacher or student
let users = {}
//group: teacher, students, points, assignment
let groups = {}

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
            points: 0,
            assignments: []
        }

        console.log(groups[req.body.username].teams)

        groups[req.body.username].teams.forEach(x => {
            // users[x].group = group[req.body.username].group
            
            x.students.forEach(student => {
                //create new student object for each
                users[student] = {username: student, role: 'student', group: x.team}
            })

        });
        console.log(users)


    }else{
        res.redirect('/dashboard')
    }
})

app.post('/assign-task', (req, res) => {
    groups[req.cookies.username].assignments.push(req.body.assignment)
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
