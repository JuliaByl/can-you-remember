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
    let pairs = [5,8,10,15];
    let matchedPairs = 0;
    let currentLevel = 1;   
    let maxLevel = 1;
    let theme;
    
    /*themes*/    
    function generateTheme() {
        let imgCounter = [];
        gameArea.empty();
        /*depending on level, change how many 2's are inside imgCounter,*/
        for (let j=1; j <= pairs[currentLevel-1]; j++) {
            imgCounter.push(2);
        }
        
        /*Level 1: generate 2 pairs of 5 different images*/
        for (let i=0; i < pairs[currentLevel-1]*2; i++) {
            imgRandom = Math.floor(Math.random() * pairs[currentLevel-1]) + 1;
            if(imgCounter[imgRandom-1] >= 1) {
                gameArea.append( 
                    `<div class="card-div ">
                    <img class ="card-img ${theme}" src="images/${theme}/${theme}-${imgRandom}.jpg"> 
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
        currentLevel = 1;
    
        if ($(this).html() == $(".cats").html()) {
            theme = "cats";
        } else if ($(this).html() == $(".plants").html()) {
            theme = "plants";
        } else if ($(this).html() == $(".covid").html()) {
            theme = "covid";
        }
        generateTheme();
        /*enable game-button only if a theme is chosen*/
        gameButton.click(function() {
            matchedPairs = 0;
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
        /*reshuffle and hide the cards*/
        generateTheme();
        startTimer();
    }
    
    /*during game per level*/
    function matchCard() {
        $("#img-1").attr("id", "");
        $("#img-2").attr("id", "");
        matchedPairs++;
        /*all cards are matched*/
        if(pairs[currentLevel-1] === matchedPairs) {
            levelClear();
        }
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
    
    function cardClick() {          /* <----- simplify me!*/
        $(".card-div").click(function() {
            let cardImg = $(this).children();
    
            if(cardImg.attr("style") === "display: none;") {
               if($("#img-1").length === 0) {
                    cardImg.show();  
                    $(this).attr("id", "img-1");
                 } else if ($("#img-2").length === 0) {
                    cardImg.show(); 
                    $(this).attr("id", "img-2");
                    checkCards();
                 }
            }
        })
    }
    
    function levelClear() {
            setTimeout(function() {
                alert("Congratulations! You cleared the level. Click on the right arrow to get to the next level.");    
            },500);
            stopTimer();
            incrementMaxLevel()
    }
    
    /*after a level is cleared*/
    function stopTimer() {}
    
    function incrementMaxLevel() {
        if(currentLevel === maxLevel) {
            maxLevel++;  
        }
    }
    
    /*TODO: put limits on levels, change arrow colors, fix start button when changing level*/    
    function nextLevel(){
        currentLevel++;
        $("#level").html(currentLevel);
        generateTheme();
    }     
    
    function previousLevel(){
        currentLevel--;
        $("#level").html(currentLevel);
        generateTheme();
    } 
    
    $(".fa-arrow-circle-right").click(function() {
        if(currentLevel < maxLevel) {
            nextLevel();
        } 
    })
    
    $(".fa-arrow-circle-left").click(function() {
        if(currentLevel > 1) {
            previousLevel();
        } 
    }) 
});
    