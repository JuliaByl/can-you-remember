$(document).ready(function() {

if ($(window).width() <= 772) {
    $('.hamburger-menu').append($('.game-button'));
    $('#big-menu').remove();
} else {
    $('.hamburger-menu')[0].remove(); 
}

/*start game-button*/
let gameButton = $(".game-button");

/*themes*/    
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
            $("img").hide();
            /*limit the amount of the same image to 2*/
            imgCounter[imgRandom-1]-=1; 
        } else {
            i--;
        }
    }                          
}

function plantsTheme() {
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
                `<div class="card-div ">
                <img class ="card-img" src="../../images/plants/plants-${imgRandom}.jpg"> 
                </div>`
            );
            $("img").hide();
            /*limit the amount of the same image to 2*/
            imgCounter[imgRandom-1]-=1; 
        } else {
            i--;
        }
    }  
}

function covidTheme() {
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
                <img class ="card-img" src="../../images/covid/covid-${imgRandom}.jpg"> 
                </div>`
            );
            $("img").hide();
            /*limit the amount of the same image to 2*/
            imgCounter[imgRandom-1]-=1; 
        } else {
            i--;
        }
    }  
}

$(".themes").click (function() {
    gameButton.attr("id", "start-button").children().text("Start Game");

    if ($(this).html() == $(".cat").html()) {
        catsTheme();
    } else if ($(this).html() == $(".plants").html()) {
        plantsTheme();
    } else if ($(this).html() == $(".covid").html()) {
        covidTheme();
    }
}); 

/*start game functions*/
function startGame() {
    gameButton.attr("id", "restart-button").children().text("Restart Game");
    startTimer();
}

function restartGame() {
    startTimer();
}

gameButton.click(function() {
    if(gameButton.attr("id") === "start-game") {
        startGame();
    } else {
        restartGame();
    }
})

/*during game per level*/
function flipCard() {}

function hideCard() {}

function matchCard() {}

function levelClear() {}

function startTimer() {}

function stopTimer() {}

/*after a level is cleared*/

function nextLevel() {}

/*after all levels are cleared*/

});
