$(document).ready(function () {
    interactiveStyling();
})

/*variables*/
let gameButton = $(".game-button");
let gameArea = $(".game-area");
const pairs = [5, 8, 10, 15];
let matchedPairs = 0;
let currentLevel = 1;
let maxLevel = 1;
let catsMaxLevel = 1;
let plantsMaxLevel = 1;
let covidMaxLevel = 1;
let theme = "cats";
let nextArrow = $(".fa-arrow-alt-circle-right");
let prevArrow = $(".fa-arrow-alt-circle-left");
let timerStart = false;
let startDate;
let timer = $("#timer");
let date;
let time, min, sec, mili;
let bestTimeHtml = $("#best-time");
let bestTimeCats = [Infinity, Infinity, Infinity, Infinity];
let bestTimePlants = [Infinity, Infinity, Infinity, Infinity];
let bestTimeCovid = [Infinity, Infinity, Infinity, Infinity];


function enableDarkMode() {
    if($(".dark-mode-btn").prop("checked")) {
        $("body").addClass("dark-mode");
    } else {
        $("body").removeClass("dark-mode");    
    }
}

/*themes*/
function changeColumns() {
    switch (currentLevel) {
        case 1:
            gameArea.attr("class", "row row-cols-md-5 row-cols-5 game-area half-width");  
            break;
        case 2:
            gameArea.attr("class", "row row-cols-md-8 row-cols-4 game-area");  
            break;
        case 3:
            gameArea.attr("class", "row row-cols-md-10 row-cols-5 game-area"); 
            break;
        case 4:
            gameArea.attr("class", "row row-cols-md-10 row-cols-6 game-area");
            break;
        default:
            break;
    }
}

function generateTheme() {
    let imgCounter = [];
    time = Infinity;
    gameArea.empty();
    changeColumns();
    stopTimer();
    resetTimer();
    updateBestTime();
    /*depending on level, change how many 2's are inside imgCounter,*/
    for (let j = 1; j <= pairs[currentLevel - 1]; j++) {
        imgCounter.push(2);
    }
    /*generate 2 pairs of 5 different images*/
    for (let i = 0; i < pairs[currentLevel - 1] * 2; i++) {
        imgRandom = Math.floor(Math.random() * pairs[currentLevel - 1]) + 1;
        if (imgCounter[imgRandom - 1] >= 1) {
            gameArea.append(
                `<div class="card-div col">
                    <img class ="card-img ${theme}" src="images/${theme}/${theme}-${imgRandom}.jpg"> 
                    </div>`
            );
            /*limit the amount of the same image to 2*/
            imgCounter[imgRandom - 1] -= 1;
        } else {
            i--;
        }
    }
    $("img").toggleClass("hidden");
}

/*start game functions*/
function convertTime(record) {
    if (record === undefined) {
        mili = time;
    } else {
        mili = record;
    }
    sec = mili / 1000;
    min = parseInt(sec / 60);
    mili = mili % 1000;
    sec = parseInt(sec % 60);

    if (mili < 10) {
        mili = "00" + mili;
    } else if (mili < 100) {
        mili = "0" + mili;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (min < 10) {
        min = "0" + min;
    }
    return `${min} : ${sec} : ${mili}`;

}

function updateTimer() {
    if (timerStart) {
        date = new Date();
        time = date - startDate;

        timer.html(convertTime());
        setTimeout(function () {
            updateTimer()
        }, 1);
    }
}

function startTimer() {
    timerStart = true;
    startDate = new Date();
    updateTimer();
}

function startClick() {
    gameButton.attr("id", "restart-button").children().text("Restart Game");
    startTimer();
}

function restartClick() {
    /*reshuffle and hide the cards*/
    generateTheme();
    startTimer();
}

function generateStartButton() {
    gameButton.attr("id", "start-button").children().text("Start Game");
}

/*during game per level*/
function matchCard() {
    $("#img-1").attr("id", "");
    $("#img-2").attr("id", "");
    matchedPairs++;
    /*all cards are matched*/
    if (pairs[currentLevel - 1] === matchedPairs) {
        levelClear();
    }
}

function hideCards() {
    let img1 = $("#img-1");
    let img2 = $("#img-2");
    img1.addClass("hidden");
    img2.addClass("hidden");
    img1.attr("id", "");
    img2.attr("id", "");
}

function checkCards() {
    let img1 = $("#img-1").attr("src");
    let img2 = $("#img-2").attr("src");

    if (img1 === img2) {
        /*cards match*/
        matchCard();
    } else {
        /*cards don't match*/
        setTimeout(function () {
            hideCards()
        }, 1000);
    }
}

function levelClear() {
    if (currentLevel === 4) {
        setTimeout(function () {
            alert("You cleared all the levels. Congratulations!");
        }, 500);
        nextArrow.removeClass("far").addClass("fas").css("color", "#dc3545");
    } else {
        nextArrow.removeClass("far").addClass("fas").css("color", "#28a745");
    }
    stopTimer();
    incrementMaxLevel();
}

/*after a level is cleared*/
/*shows the highscore for each theme and each level*/
function updateBestTime() {
    if (theme === "cats") {
        if (bestTimeCats[currentLevel - 1] > time) {
            bestTimeCats[currentLevel - 1] = time;
        }
        if (bestTimeCats[currentLevel - 1] === Infinity) {
            bestTimeHtml.html(convertTime(0));
        } else {
            bestTimeHtml.html(convertTime(bestTimeCats[currentLevel - 1]));
        }
    } else if (theme === "plants") {
        if (bestTimePlants[currentLevel - 1] > time) {
            bestTimePlants[currentLevel - 1] = time;
        }
        if (bestTimePlants[currentLevel - 1] === Infinity) {
            bestTimeHtml.html(convertTime(0));
        } else {
            bestTimeHtml.html(convertTime(bestTimePlants[currentLevel - 1]));
        }
    } else {
        if (bestTimeCovid[currentLevel - 1] > time) {
            bestTimeCovid[currentLevel - 1] = time;
        }
        if (bestTimeCovid[currentLevel - 1] === Infinity) {
            bestTimeHtml.html(convertTime(0));
        } else {
            bestTimeHtml.html(convertTime(bestTimeCovid[currentLevel - 1]));
        }
    }
    time = Infinity;
}

function resetTimer() {
    timer.html("00:00:00");
}

function stopTimer() {
    timerStart = false;
    updateBestTime();
}

function incrementMaxLevel() {
    if (currentLevel === maxLevel) {
        maxLevel++;
    }
}

function colorArrows() {
    if (currentLevel === 1) {
        prevArrow.removeClass("fas").addClass("far").css("color", "");
    } else {
        prevArrow.removeClass("far").addClass("fas").css("color", "#28a745");
    }
    if (currentLevel === maxLevel) {
        nextArrow.removeClass("fas").addClass("far").css("color", "");
    } else {
        nextArrow.removeClass("far").addClass("fas").css("color", "#28a745");
    }
}

function getMaxLevel() {
    if (theme === "cats") {
        maxLevel = catsMaxLevel;
    } else if (theme === "plants") {
        maxLevel = plantsMaxLevel;
    } else if (theme === "covid") {
        maxLevel = covidMaxLevel;
    }
}

function updateMaxLevel() {
    if (theme === "cats" && maxLevel > catsMaxLevel) {
        catsMaxLevel = maxLevel;
    } else if (theme === "plants" && maxLevel > plantsMaxLevel) {
        plantsMaxLevel = maxLevel;
    } else if (theme === "covid" && maxLevel > covidMaxLevel) {
        covidMaxLevel = maxLevel;
    }
}

function nextLevel() {
    if (currentLevel === 4) {
        alert("No more levels, you're simply too skilled for this game. Why don't you try out any of the other themes or try to beat your highscore on previous levels?");
    } else {
        currentLevel++;
        $("#level").html(currentLevel);
        generateTheme();
        colorArrows();
        generateStartButton();
        if (currentLevel === 4 && maxLevel > 4) {
            nextArrow.removeClass("far").addClass("fas").css("color", "#dc3545");
        }
    }
}
/*TODO: clean up code and stop game from starting over when changing theme*/
function previousLevel() {
    currentLevel--;
    $("#level").html(currentLevel);
    generateTheme();
    colorArrows();
    generateStartButton();
}

function openGameRules() {
    $(".game-area").html(`
        <div class="col-12" >
            <h2>Game Rules</h2>
        </div>
        <div class = "col-md-6 col-sm-12">
            <ol class="text-left"> 
                <li>To start off the game, you will first need to pick a theme.</li>
                <li>After a theme is chosen you can click the "Start Game" button and the game will start.</li>
                <li>In the bottom of the game area there is a stopwatch that will start running once you start the game, and stop when you clear it.</li>
                <li>The "Best Time" - section will update every time you beat your highscore on every level, and in each theme. How fast can you clear the cards?</li>
                <li>When in the game, you will want to match two of the same image, and once everything is matched, you can go to the next level.</li>
                <li>You can find arrows right under the game area, and they will light up in green if you can navigate to the next or previous level.</li>
                <li>Each time you go to a new level you will need to click the "Start Game" - button.</li>
                <li>Once level 4 is cleared, you can go explore a new theme, or go back to previos levels and beat you highscore!.</li>
                <li>If you want to start over completely, just click "Reset". Please note: reset means you clear all levels across all teams!</li>
                <li>If your eyes hurt from all the cute cats (or just the brighter screen), switch to dark mode.</li>
            </ol>
        </div>
    `);
}

/*event listeners*/
/*cardClick should only work when the function is called after choosing a theme and clicking GameButton*/
function cardClick() {
    $(".card-img").click(function () {
        let cardImg = $(this);

        if (cardImg.hasClass("hidden")) {
            if ($("#img-1").length === 0) {
                cardImg.removeClass("hidden");
                cardImg.attr("id", "img-1");
            } else if ($("#img-2").length === 0) {
                cardImg.removeClass("hidden");
                cardImg.attr("id", "img-2");
                checkCards();
            }
        }
    })
}

/*choosing a theme*/
$(".themes").click(function () {
    generateStartButton();
    currentLevel = 1;
    $("#level").html(currentLevel);
    updateMaxLevel()
    /*reset arrows*/

    if ($(this).html() == $(".cats").html()) {
        theme = "cats";
    } else if ($(this).html() == $(".plants").html()) {
        theme = "plants";
    } else if ($(this).html() == $(".covid").html()) {
        theme = "covid";
    }

    getMaxLevel();
    colorArrows();
    generateTheme();
    /*enable game-button only if a theme is chosen*/
    gameButton.click(function () {
        matchedPairs = 0;
        if (gameButton.attr("id") === "start-button") {
            startClick();
            cardClick();
        } else {
            restartClick();
            cardClick();
        }
    })
});

/*navigating through levels*/
nextArrow.click(function () {
    if (maxLevel > currentLevel) {
        nextLevel();
    }
})

prevArrow.click(function () {
    if (currentLevel > 1) {
        previousLevel();
    }
})

/*reset all levels and highscores*/
$(".reset").click(function () {
    resetTimer();
    gameArea.html(`<div class="col-12">
    <h2>Welcome!</h2>
</div>
<div class="col-md-5 col-sm-12">
    <p>
        This game is a classic memory game, created as my second milestone project for Code Institute.
        In these times (aka. 2021 for anyone playing this game post-pandemic) many people struggle with many new issues.
        While I can't stop everything that is happening at the moment, I can at least try to provide some educational and heartwarming 
        content in the form of this game.
    </p>
</div>   
<div class="col-md-5 col-sm-12">
    <p>
        There are 3 different themes to choose from. I urge everyone to try the covid-theme, which 
        contains important instructional images on how to keep yourself and others safe, as well as some tips on how to keep sane when locked 
        up at home. The two last themes are cats and plants, (almost) everyone's two favourite things. 
        Enjoy!
    </p>
</div>
<div class="col-md-6 col-sm-12">
    <p>Take a moment to look through the instructions before playing:</p>
    <button class="btn btn-outline-light game-rules">Game Rules</button>
</div>`);
    maxLevel = 1;
    currentLevel = 1;
    catsMaxLevel = 1;
    plantsMaxLevel = 1;
    covidMaxLevel = 1;
    $("#level").html("1");
    bestTimeHtml.html("00:00:00");
    colorArrows();
})

$(".game-rules").click(function() {
    gameArea.empty();
    openGameRules();
})

/*enables/disables dark mode styling*/
$(".dark-mode-btn").click(function() {
    enableDarkMode();
})

/*interactive styling*/
function interactiveStyling() {
    if ($(window).width() <= 576) {
        $("header").append($(".hamburger-menu"));
        $("header").append($(".game-button"));
        $("header").append($(".timer"));
        $('.full-menu').remove();
        $('.fa-brain').remove();
    } else {
        $('.hamburger-menu')[0].remove();
    }
}