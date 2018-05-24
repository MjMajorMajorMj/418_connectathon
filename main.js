$(document).ready(function() {
  addClickHandler();
  readyPageFunctions();
});

//Click handlers for each color
function readyPageFunctions() {
    $(".red").on("click", playerColor);
    $(".blue").on("click", playerColor);
    $(".gold").on("click", playerColor);
    $(".green").on("click", playerColor);
}

var playerSwitch = 1;
var playerOneColor = null;
var playerTwoColor = null;

//Function to assign color class to players
function playerColor() {
    if (playerSwitch === 1) {
        if (playerOneColor === null) {
            playerOneColor = $(this).attr("class");
        }
    } else if (playerSwitch === 0) {
        if (playerTwoColor === null) {
            playerTwoColor = $(this).attr("class");
        }
    }
    $(this).addClass("gray");
    $(this).off("click");
    playerSwitch = 1 - playerSwitch;
    if (toggleAICount === 1) { //if AI mode is on, runs function that allows AI to randomly choose color
        aiModeOn();
    };
    $('.title').text("Player Two: Choose Your Color");
    if (playerOneColor != null && playerTwoColor != null) {
        $('.choose-color-page').hide();
        $('.game_area').show();
        $('.gameTitle').text("Player One's Turn");
        $('.gameHeader').css("background-color", playerOneColor);
    }
}

var gameArray = [[null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null],
[null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null]];
var columnNumber = null;

function addClickHandler() {
$(".col0").on('click', function(){
    columnNumber = 0;
    addToGridArray();
});

$(".col1").on('click', function(){
    columnNumber = 1;
    addToGridArray();
});

$(".col2").on('click', function(){
    columnNumber = 2;
    addToGridArray();
});

$(".col3").on('click', function(){
    columnNumber = 3;
    addToGridArray();
});

$(".col4").on('click', function(){
    columnNumber = 4;
    addToGridArray();
});

$(".col5").on('click', function(){
    columnNumber = 5;
    addToGridArray();
});

$(".col6").on('click', function(){
    columnNumber = 6;
    addToGridArray();
});

$(".reset").on('click', function() {
    resetGame();
});

$(".toggleAI").on('click', function() {
    toggleAI();
});
}

var toggleAICount = 0;
function toggleAI() { //toggles whether AI should be on/off
    toggleAICount = 1 - toggleAICount;
    $('.title').text("AI Mode On. Player: choose your color.");
    if (toggleAICount === 0 ) {
        $('.title').text("Player One: Choose Your Color");
    }
};

function aiModeOn() { // Allows AI to pick random color after player one chooses color
    var colorArray = ['red', 'blue', 'gold', 'green'];
    if (playerOneColor != null) {
        for (var colorCount = 0; colorCount < colorArray.length; colorCount++) {
            if (playerOneColor === colorArray[colorCount]) {
                colorArray.splice(colorCount, 1); //removes player one color from colorArray so AI doesn't pick undefined color
            }
        }
        var randomColorNum = Math.floor((Math.random() * colorArray.length ));
        playerTwoColor = colorArray[randomColorNum];
    }
    playerSwitch = 1 - playerSwitch;
}

function aiGridSelect() { //function that allows AI to randomly select a column
    var randomColumnNum = Math.floor((Math.random() * 6 ));
    columnNumber = randomColumnNum;
    $('.gameTitle').text("Alien Intelligence Turn");
    $('.gameHeader').css("background-color", playerTwoColor);
    setTimeout(addToGridArray, 2000);
}

function addToGridArray() {
    for (var rowCount = gameArray.length-1; rowCount >= 0; rowCount--) {
        if (gameArray[rowCount][columnNumber] === null) {
            if (playerSwitch === 0) {
                gameArray[rowCount][columnNumber] = 0;
                break;
            } else if (playerSwitch === 1) {
                gameArray[rowCount][columnNumber] = 1;
                break;
            }
        }
    }
    console.log(gameArray);
    playerSwitch = 1 - playerSwitch;
    checkPowerUpCondition();
    if (playerSwitch === 0) {
        $('.gameTitle').text("Player Two's Turn");
        $('.gameHeader').css("background-color", playerTwoColor);
    } else {
        $('.gameTitle').text("Player One's Turn");
        $('.gameHeader').css("background-color", playerOneColor);
    }
    addColorToGrid();
    checkWinCondition();
    if (toggleAICount === 1 && playerSwitch === 0) { //if AI mode is on, runs function that has AI "choose" a column
        aiGridSelect();
    }
}

function addColorToGrid() {
    for (var rowCount = gameArray.length-1; rowCount >= 0; rowCount--) {
        for (var columnCount = 0; columnCount < gameArray[rowCount].length; columnCount++) {
            if (gameArray[rowCount][columnCount] === 1) {
                var selector = ".row" + rowCount + " .col" + columnCount;
                $(selector).css('background-color', playerOneColor);
            } else if (gameArray[rowCount][columnCount] === 0) {
                var selector = ".row" + rowCount + " .col" + columnCount;
                $(selector).css('background-color', playerTwoColor);
            }
        }
    }
}

function checkPowerUpCondition() {
    checkFirstPowerUp();
}


var firstPowerUpTrigger = 0; //trigger that gives only one player the first powerup once
function checkFirstPowerUp() { //checks to see if player makes 3 x 3 cross
    if (firstPowerUpTrigger === 0) {
        for (var rowCount = gameArray.length-2; rowCount >=0; rowCount--) {
            for (var columnCount=1; columnCount < gameArray[rowCount].length-1; columnCount++) {
                if (gameArray[rowCount][columnCount] != null && gameArray[rowCount][columnCount] === gameArray[rowCount+1][columnCount] && gameArray[rowCount][columnCount] === gameArray[rowCount-1][columnCount] && gameArray[rowCount][columnCount] === gameArray[rowCount][columnCount+1] && gameArray[rowCount][columnCount] === gameArray[rowCount][columnCount-1]){
                    playerSwitch = 1 - playerSwitch;
                    firstPowerUpTrigger = 1;
                }
            }
        }
    }
}

function checkWinCondition() {
    checkHorizontalWin(gameArray);
    checkVerticalWin(gameArray);
    checkDiagonalWin(gameArray);
    secondPowerUp(gameArray);
}

function checkHorizontalWin(someArray){
    for(var checkRow = someArray.length-1; checkRow >= 0; checkRow--){
        for(var checkInnerRow = 0; checkInnerRow < someArray[checkRow].length; checkInnerRow++){
            if(someArray[checkRow][checkInnerRow] != null && someArray[checkRow][checkInnerRow] === someArray[checkRow][checkInnerRow + 1] && someArray[checkRow][checkInnerRow + 1] === someArray[checkRow][checkInnerRow + 2] && someArray[checkRow][checkInnerRow + 2] === someArray[checkRow][checkInnerRow + 3]){
                modalWin();
            }
        }
    }
}
function checkVerticalWin(someArray){
    for(var checkRow = someArray.length-1; checkRow >= 4; checkRow--){
        for(var checkInnerRow = 0; checkInnerRow < someArray[checkRow].length; checkInnerRow++){
            if(someArray[checkRow][checkInnerRow] != null && someArray[checkRow][checkInnerRow] === someArray[checkRow-1][checkInnerRow] && someArray[checkRow-1][checkInnerRow] === someArray[checkRow-2][checkInnerRow] && someArray[checkRow-2][checkInnerRow] === someArray[checkRow-3][checkInnerRow]){
                modalWin();
            }
        }
    }
}
function checkDiagonalWin(someArray){
   
    for(var checkRow = someArray.length-1; checkRow >= 4; checkRow--){
        for(var checkInnerRowUpRight = 0; checkInnerRowUpRight < 4; checkInnerRowUpRight++){
            if(someArray[checkRow][checkInnerRowUpRight] !== null && someArray[checkRow][checkInnerRowUpRight] === someArray[checkRow-1][checkInnerRowUpRight+1] && someArray[checkRow-1][checkInnerRowUpRight+1] === someArray[checkRow-2][checkInnerRowUpRight+2] && someArray[checkRow-2][checkInnerRowUpRight+2] === someArray[checkRow-3][checkInnerRowUpRight+3]){
                modalWin();
            }
        }
        for(var checkInnerRowUpLeft = someArray[checkRow].length-1; checkInnerRowUpLeft >=0; checkInnerRowUpLeft--){
            if(someArray[checkRow][checkInnerRowUpLeft] !== null && someArray[checkRow][checkInnerRowUpLeft] === someArray[checkRow-1][checkInnerRowUpLeft-1] && someArray[checkRow-1][checkInnerRowUpLeft-1] === someArray[checkRow-2][checkInnerRowUpLeft-2] && someArray[checkRow-2][checkInnerRowUpLeft-2] === someArray[checkRow-3][checkInnerRowUpLeft-3]){
                modalWin();
            }
        }
    }
}

//Modal display, hide, and exit functions
function modalWin() {
    if (playerSwitch === 0) {
        $(".modal-shadow").removeClass("hidden-modal");
        $(".modal-text").text("Player One Wins!!!");
    } else if (playerSwitch === 1) {
        $(".modal-shadow").removeClass("hidden-modal");
        if (toggleAICount === 0) {
            $(".modal-text").text("Player Two Wins!!!");
        } else if (toggleAICount === 1) {
            $(".modal-text").text("The Aliens Win!!!");
        }   
    }
}

function resetGame() { //function that resets the game, including player colors and game grid
    playerSwitch = 1;
    playerOneColor = null;
    playerTwoColor = null;
    firstPowerUpTrigger = 0
    toggleAICount = 0;
    $('.col').css('background-color', 'white');
    for (var rowCount = 0; rowCount < gameArray.length; rowCount++) {
        for (var colCount = 0; colCount < gameArray[rowCount].length; colCount++) {
            if (gameArray[rowCount][colCount] != null) {
                gameArray[rowCount][colCount] = null;
            }
        }
    }
    $('.red, .blue, .gold, .green').off('click').removeClass("gray");
    readyPageFunctions();
    $(".modal-shadow").addClass("hidden-modal");
    $('.choose-color-page').show();
    $('.game_area').hide();
    $('.title').text("Player One: Choose Your Color");
}

function secondPowerUp(someArray){
    for(var checkRow = someArray.length-1; checkRow >= 2; checkRow--){
        for(var checkX = 0; checkX <= 4; checkX++){
            if(someArray[checkRow][checkX] !== null && someArray[checkRow][checkX] === someArray[checkRow-1][checkX+1] && someArray[checkRow-1][checkX+1] === someArray[checkRow-2][checkX+2] && someArray[checkRow-2][checkX+2] === someArray[checkRow-2][checkX] && someArray[checkRow-2][checkX] === someArray[checkRow][checkX+2]){
             console.log('Bang')
            }
        }
    }
}
