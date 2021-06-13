$(document).ready(function() {

if ($(window).width() <= 772) {
    $('.hamburger-menu').append($('.game-button'));
    $('#big-menu').remove();
} else {
    $('.hamburger-menu')[0].remove(); 
}

/*variables*/
let gameButton = $(".game-button");
let gameArea = $(".game-area");
let imgCounter = [];
let pairs = [5,8,10,15];
let currentLevel = 1;   /*TODO*/
let maxLevel = 1;

/*themes*/    
function catsTheme() {
    gameArea.empty();

    /*depending on level, change how many 2's are inside imgCounter,*/
    for (let j=1; j <= pairs; j++) {
        imgCounter.push(2);
    }
    
    /*Level 1: generate 2 pairs of 5 different images*/
    for (let i=1; i < 11; i++) {
        imgRandom = Math.floor(Math.random() * 5) + 1;
        if(imgCounter[imgRandom-1] >= 1) {
            gameArea.append( 
                `<div class="card-div">
                <img class ="card-img cat" src="images/cats/cats-${imgRandom}.jpg"> 
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
    gameArea.empty();

    /*depending on level, change how many 2's are inside imgCounter,*/
    for (let j=1; j <= pairs; j++) {
        imgCounter.push(2);
    }
    
    /*Level 1: generate 2 pairs of 5 different images*/
    for (let i=1; i < 11; i++) {
        imgRandom = Math.floor(Math.random() * 5) + 1;
        if(imgCounter[imgRandom-1] >= 1) {
            gameArea.append( 
                `<div class="card-div ">
                <img class ="card-img plants" src="images/plants/plants-${imgRandom}.jpg"> 
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
    gameArea.empty();

    /*depending on level, change how many 2's are inside imgCounter,*/
    for (let j=1; j <= pairs; j++) {
        imgCounter.push(2);
    }
    
    /*Level 1: generate 2 pairs of 5 different images*/
    for (let i=1; i < 11; i++) {
        imgRandom = Math.floor(Math.random() * 5) + 1;
        if(imgCounter[imgRandom-1] >= 1) {
            gameArea.append( 
                `<div class="card-div">
                <img class ="card-img covid" src="images/covid/covid-${imgRandom}.jpg"> 
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

$(".themes").click(function() {
    gameButton.attr("id", "start-button").children().text("Start Game");

    if ($(this).html() == $(".cat").html()) {
        catsTheme();
    } else if ($(this).html() == $(".plants").html()) {
        plantsTheme();
    } else if ($(this).html() == $(".covid").html()) {
        covidTheme();
    }
    /*enable game-button only if a theme is chosen*/
    gameButton.click(function() {
        if(gameButton.attr("id") === "start-button") {
            startGame();
            cardClick();
        } else {
            restartGame();
            cardClick();
        }
    })
}); 

/*start game functions*/
function startTimer() {

}

function startGame() {
    gameButton.attr("id", "restart-button").children().text("Restart Game");
    startTimer();
}

function restartGame() {
    let imgClass = $(".card-img").attr("class");
    /*reshuffle and hide the cards*/
    if (imgClass === "card-img cat") {
        catsTheme();
    } else if (imgClass === "card-img plants") {
        plantsTheme();
    } else {
        covidTheme();
    }

    startTimer();
}

/*during game per level*/
function matchCard() {
    $("#img-1").attr("id", "");
    $("#img-2").attr("id", "");
}

function hideCards() {
    $("#img-1").children("img").hide();
    $("#img-2").children("img").hide();
    $("#img-1").attr("id", "");
    $("#img-2").attr("id", ""); 
}

function checkCards() {
    let img1 = $("#img-1").children().attr("src");
    let img2 = $("#img-2").children().attr("src");
    
    if(img1 === img2) {
        /*cards match*/
        matchCard();
    } else {
        /*cards don't match*/
        setTimeout(function() {
            hideCards() },1000);
    }
}

function cardClick() {
    $(".card-div").click(function() {
        let cardImg = $(this).children();

        if(cardImg.attr("style") === "display: none;") {
           if($("#img-1").length) {
                cardImg.show();  
                $(this).attr("id", "img-2");
                checkCards();
             } else {
                cardImg.show(); 
                $(this).attr("id", "img-1");
             }
        }
    })
}

function levelClear() {}

function stopTimer() {}

/*after a level is cleared*/

function nextLevel() {}

/*after all levels are cleared*/

});
