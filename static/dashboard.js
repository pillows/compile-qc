$(document).ready(() => {
    console.log('dashboard linked js');
    const scoreBars = $('.score')
    setTimeout(() => {
        scoreBars.css('transform', 'translateY(0)')
        scoreBars.css('opacity', '1')
        populateLeaderboard()
    }, 1000)
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