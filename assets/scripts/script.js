$(document).ready(function() {

if ($(window).width() <= 772) {
    $('.hamburger-menu').append($('.start-button'));
    $('#big-menu').remove();
} else {
    $('.hamburger-menu')[0].remove(); 
}

/*before game starts*/
$(".themes").click (function() {
    if ($(this).html() == $(".cat").html()) {
        catsTheme();
    } else if ($(this).html() == $(".plants").html()) {
        plantsTheme();
    } else if ($(this).html() == $(".covid").html()) {
        covidTheme();
    } else if ($(this).html() == $(".mix").html()) {
        console.log("mix");
    }
});     

function catsTheme() {
    /*if ex. lvl 1, go through cats folder until specific amount, if lvl 2, other amount etc.*/
}

function plantsTheme() {}

function covidTheme() {}

function startGame() {}

function restartGame() {}

/*during game per level*/

function flipCard() {}

function hideCard() {}

function matchCard() {}

function levelClear() {}

function stopTimer() {}

/*after a level is cleared*/

function nextLevel() {}

/*after all levels are cleared*/

});
