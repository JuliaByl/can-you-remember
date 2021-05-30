if ($(window).width() <= 772) {
    $('.hamburger-menu').append($('.start-button'));
    $('#big-menu').remove();
} else {
    $('.hamburger-menu')[0].remove(); 
}