$(document).ready(() => {
    $('.team button').click(evt => {
        const team = $(evt.target).attr('value')
        $(`div.${team}`).prepend(add)
    })
    $('.form-submit').click(() => {
        console.log('click submit form');
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
            body: JSON.stringify(roster)
        })
    })
})

function createStudentRow () {
    return $(`

    `)
}