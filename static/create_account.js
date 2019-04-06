$(document).ready(() => {
    const background = $('body')
    $('.choices').on('click', evt => {
        const clickedBtn = $(evt.target)
        const id = $(clickedBtn).attr('value')
        $('button.focus').removeClass('focus')
        clickedBtn.addClass('focus')

        if (id === 'teacher') {
            background.css('background-image', 'url("c.jpeg")')
        } else if (id === 'student') {
            background.css('background-image', 'url("d.jpeg")')
        }
    })


})