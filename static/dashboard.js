$(document).ready(() => {
    console.log('dashboard linked js');
    const scoreBars = $('.score')
    setTimeout(() => {
        scoreBars.css('transform', 'translateY(0)')
        scoreBars.css('opacity', '1')
    }, 1000)
})