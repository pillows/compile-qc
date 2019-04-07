$(document).ready(() => {
    console.log('linked');
    const background = $('.hero')
    const defaultVal = 'teacher'
    $('#form-role').val(defaultVal)
    console.log('etted');

    $('.choices').click( evt => {
        const clickedBtn = $(evt.target)
        const id = $(clickedBtn).attr('value')
        console.log('clicked', clickedBtn, id);
        $('button.focus').removeClass('focus')
        clickedBtn.addClass('focus')

        $('#form-role').val(id)

        if (id === 'teacher') {
            console.log('changing to c');
            background.css('background-image', 'url("c.jpeg")')
        } else if (id === 'student') {
            console.log('changing to d');
            background.css('background-image', 'url("d.jpeg")')
        } else {
            console.log(error);
        }
    })
})