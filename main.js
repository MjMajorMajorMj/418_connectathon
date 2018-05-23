$(document).ready(addClickHandler);

var gameArray = [[null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null],
[null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null]];
var columnNumber = null;
var playerSwitch = 1;

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
}

function addColorToGrid() {
    for (var rowCount = 0; rowCount < gameArray.length; rowCount++) {
        for (var columnCount = 0; columnCount < gameArray[rowCount].length; columnCount++) {
            if (gameArray[rowCount][columnCount] === 1) {
                 $('.row:eq(rowCount) > .col:eq(columnCount)').css('color', 'red');
            } else if (gameArray[rowCount][columnCount] === 0) {
                $('.row:eq(rowCount) > .col:eq(columnCount)').css('color', 'blue');
            }
        }
    }
}