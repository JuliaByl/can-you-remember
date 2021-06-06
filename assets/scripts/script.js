$(document).ready(function() {

if ($(window).width() <= 772) {
    $('.hamburger-menu').append($('.start-button'));
    $('#big-menu').remove();
} else {
    $('.hamburger-menu')[0].remove(); 
}

/*themes*/
$(".themes").click (function() {
    if ($(this).html() == $(".cat").html()) {
        catsTheme();
    } else if ($(this).html() == $(".plants").html()) {
        plantsTheme();
    } else if ($(this).html() == $(".covid").html()) {
        covidTheme();
    }
});     

function catsTheme() {
    let gameArea = $(".game-area");
    gameArea.empty();
    let imgCounter = [];
    let imgRandom;

    /*depending on level, change how many 2's are inside imgCounter,*/
    for (let j=1; j <= 5; j++) {
        imgCounter.push(2);
    }
    
    /*Level 1: generate 2 pairs of 5 different images*/
    for (let i=1; i < 11; i++) {
        imgRandom = Math.floor(Math.random() * 5) + 1;
        if(imgCounter[imgRandom-1] >= 1) {
            gameArea.append( 
                `<div class="card-div">
                <img class ="card-img" src="../../images/cats/cats-${imgRandom}.jpg"> 
                </div>`
            );
            /*limit the amount of the same image to 2*/
            imgCounter[imgRandom-1]-=1; 
        } else {
            i--;

        }
    }                          
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
