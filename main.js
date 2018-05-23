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
    if (playerOneColor != null && playerTwoColor != null) {
        $('.choose-color-page').hide();
        $('.game_area').show();
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
    addColorToGrid();
    checkWinCondition();
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

function checkWinCondition() {
    checkHorizontalWin(gameArray);
    checkVerticalWin(gameArray);
    checkDiagonalWin(gameArray);
    //checkDiagonalWinDown(gameArray);
}

function checkHorizontalWin(someArray){
    for(var checkRow = someArray.length-1; checkRow >= 0; checkRow--){
        for(var checkInnerRow = 0; checkInnerRow < someArray[checkRow].length; checkInnerRow++){
            if(someArray[checkRow][checkInnerRow] != null && someArray[checkRow][checkInnerRow] === someArray[checkRow][checkInnerRow + 1] && someArray[checkRow][checkInnerRow + 1] === someArray[checkRow][checkInnerRow + 2] && someArray[checkRow][checkInnerRow + 2] === someArray[checkRow][checkInnerRow + 3]){
                console.log('horizontal win')
            }
        }
    }
}

function checkVerticalWin(someArray){
    for(var checkRow = someArray.length-1; checkRow >= 4; checkRow--){
        for(var checkInnerRow = 0; checkInnerRow < someArray[checkRow].length; checkInnerRow++){
            if(someArray[checkRow][checkInnerRow] != null && someArray[checkRow][checkInnerRow] === someArray[checkRow-1][checkInnerRow] && someArray[checkRow-1][checkInnerRow] === someArray[checkRow-2][checkInnerRow] && someArray[checkRow-2][checkInnerRow] === someArray[checkRow-3][checkInnerRow]){
                console.log('vertical win')
            }
        }
        
    }
}

function checkDiagonalWin(someArray){
   
    for(var checkRow = someArray.length-1; checkRow >= 4; checkRow--){
        for(var checkInnerRowUpRight = 0; checkInnerRowUpRight < 4; checkInnerRowUpRight++){
            if(someArray[checkRow][checkInnerRowUpRight] !== null && someArray[checkRow][checkInnerRowUpRight] === someArray[checkRow-1][checkInnerRowUpRight+1] && someArray[checkRow-1][checkInnerRowUpRight+1] === someArray[checkRow-2][checkInnerRowUpRight+2] && someArray[checkRow-2][checkInnerRowUpRight+2] === someArray[checkRow-3][checkInnerRowUpRight+3]){
                console.log('diagonal up win')
            }
        }
        for(var checkInnerRowUpLeft = someArray[checkRow].length-1; checkInnerRowUpLeft >=0; checkInnerRowUpLeft--){
            if(someArray[checkRow][checkInnerRowUpLeft] !== null && someArray[checkRow][checkInnerRowUpLeft] === someArray[checkRow-1][checkInnerRowUpLeft-1] && someArray[checkRow-1][checkInnerRowUpLeft-1] === someArray[checkRow-2][checkInnerRowUpLeft-2] && someArray[checkRow-2][checkInnerRowUpLeft-2] === someArray[checkRow-3][checkInnerRowUpLeft-3]){
                console.log('diagonal down win')
            }
        }
    }
}