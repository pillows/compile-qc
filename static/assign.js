$(document).ready(() => {
    $('.team img').click(evt => {
        console.log('ck');
        const team = $(evt.target).attr('value')
        $(`div.${team}-roster`).prepend(createStudentRow)
    })

    $('.form-submit').click(() => {
        const roster = [
            {
                team: 'A',
                students: ['Saif', 'Matt']
            },
            {
                team: 'B',
                students: ['Jack', 'Shelly']
            },
            {
                team: 'C',
                students: ['Connie', 'Michelle']
            },
            {
                team: 'D',
                students: ['Such', 'Will']
            }
        ]
        fetch('/assign-group', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(roster)
        })
    })
})

function createStudentRow () {
    const row = $(`
        <div>
            <input placeholder="Student username"class='form-input'> </input> <img src='garbage.png'>
        </div>
    `)

    row.find('img').click(function(){
        row.remove()
    })
    return row
}