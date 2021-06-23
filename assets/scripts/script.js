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
    const pairs = [5,8,10,15];
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
        /*generate 2 pairs of 5 different images*/
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
    
    /*start game functions*/
    function startTimer() {
    
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
    
    function levelClear() {
            if(currentLevel === 4) {
                setTimeout(function() {
                    alert("You cleared all the levels. Congratulations!");    
                },500);
                $(".fa-arrow-alt-circle-right").removeClass("far").addClass("fas").css("color", "#dc3545");
            } else {
                $(".fa-arrow-alt-circle-right").removeClass("far").addClass("fas").css("color", "#28a745");
            }
            stopTimer();
            incrementMaxLevel();
    }
    
    /*after a level is cleared*/
    function stopTimer() {}
    
    function incrementMaxLevel() {
        if(currentLevel === maxLevel) {
            maxLevel++;  
        }
    }
    
    /*TODO: change arrow colors*/    
    function nextLevel(){
        if(currentLevel === 4) {
            alert("No more levels, you're simply too skilled for this game. Why don't you try out any of the other themes or try to beat your highscore on previous levels?");
        } else {
            currentLevel++;
        $("#level").html(currentLevel);
        generateTheme();
        generateStartButton();
        }
    }     
    
    function previousLevel(){
        currentLevel--;
        $("#level").html(currentLevel);
        generateTheme();
        generateStartButton();
    } 
    
     /*event listeners*/
     /*cardClick should only work when the function is called after choosing a theme and clicking GameButton*/
     function cardClick() {          
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
    
     /*choosing a theme*/
     $(".themes").click(function() {
        generateStartButton();
        currentLevel = 1;
        maxLevel = 1;
        $("#level").html(currentLevel);
        /*reset arrows*/
        $(".fa-arrow-alt-circle-left").removeClass("fas").addClass("far").css("color", "#005B62");
        $(".fa-arrow-alt-circle-right").removeClass("fas").addClass("far").css("color", "#005B62");
    
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
                startClick();
                cardClick();
            } else {
                restartClick();
                cardClick();
            }
        })
    });

    /*navigating through levels*/
    $(".fa-arrow-alt-circle-right").click(function() {
        if(currentLevel < maxLevel) {
            if(currentLevel === 1) {
                $(".fa-arrow-alt-circle-left").removeClass("far").addClass("fas").css("color", "#28a745");
            }
            nextLevel();
            if(currentLevel === maxLevel) {
                $(".fa-arrow-alt-circle-right").removeClass("fas").addClass("far").css("color", "#005B62");
            } 
        } 
    })
    
    $(".fa-arrow-alt-circle-left").click(function() {
        if(currentLevel > 1) {
            previousLevel();
            $(".fa-arrow-alt-circle-right").removeClass("far").addClass("fas").css("color", "#28a745"); 

            if(currentLevel === 1) {
                $(".fa-arrow-alt-circle-left").removeClass("fas").addClass("far").css("color", "#005B62");
            }
        } 
    }) 
});
    