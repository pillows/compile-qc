$(document).ready(() => {
    console.log('dashboard linked js');
    const scoreBars = $('.score')
    setTimeout(() => {
        scoreBars.css('transform', 'translateY(0)')
        scoreBars.css('opacity', '1')
        populateLeaderboard()
    }, 1000)

    const settings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true
    }
    $('.carousel-container').slick(settings)

    console.log($('.assignment-card'));
    $('.assignment-card').each(function(index){
        console.log('called', $(this));
        $(this).addClass(`card${index}`)
        if (index === 0) {
            $(this).click(()=>{
                window.location.href='/code'
            })
        }
    })
})

function populateLeaderboard () {
    $('.score').each(function(index){
        console.log('append');
        const percent = $(this).attr('value')
        const title = ['A','B','C','D'][index]
        $(this).css('height', `${percent}%`)
        $(this).append(`
            <div>
                Team ${title} <br>
                ${percent} %
            </div>
        `)
    })
}