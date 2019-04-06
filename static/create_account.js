$(document).ready(() => {
    console.log('linked');
    const background = $('.hero')
    console.log($('.choices'));
    $('.choices').click( evt => {
        const clickedBtn = $(evt.target)
        const id = $(clickedBtn).attr('value')
        console.log('clicked', clickedBtn, id);
        $('button.focus').removeClass('focus')
        clickedBtn.addClass('focus')

        if (id === 'teacher') {
            background.css('background-image', 'url("c.jpeg")')
        } else if (id === 'student') {
            background.css('background-image', 'url("d.jpeg")')
        } else {
            console.log(error);
        }
    })
})