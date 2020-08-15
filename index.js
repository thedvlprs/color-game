//variables
var numSquares = 6;
var colors = [];
var gameOver = false;
var pickedColor;
//query selectors
var squares = document.querySelectorAll('.square');
var colorDisplay = document.querySelector('#colorDisplay');
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var newButton = document.getElementById('new');
var modeButtons = document.querySelectorAll('.mode');

init();

function init() {
    setUpModeButtons();
    setUpSquares();
    reset();
}

function reset() {
    //generate new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color
    pickedColor = pickAColor();
    //change color display to match picked color
    colorDisplay.textContent = pickedColor;
    newButton.textContent = 'NEW COLORS';
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
    h1.style.backgroundColor = 'steelblue';
    if (gameOver) {
        //        newButton.textContent="PLAY AGAIN?";
        messageDisplay.textContent = '';
    } else {
        newButton.textContent = 'NEW COLORS';
    }
}

function setUpModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            if (this.textContent === 'Easy') {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset();
        });
    }
}
function setUpSquares() {
    for (var i = 0; i < squares.length; i++) {
        //Add initial colors to squares
        squares[i].style.backgroundColor = colors[i];
        //Add click listeners to squares
        squares[i].addEventListener('click', function () {
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to picked color

            if (clickedColor === pickedColor) {
                changeColors(pickedColor);
                messageDisplay.textContent = 'correct!';
                h1.style.backgroundColor = pickedColor;
                gameOver = true;
                newButton.textContent = 'PLAY AGAIN?';
            } else {
                this.style.backgroundColor = '#232323';
                messageDisplay.textContent = 'Try Again!';
            }
        });
    }
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickAColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}
function generateRandomColors(numOfColors) {
    //make an array
    var arr = [];
    //add numOfRandom colrs to array
    for (var i = 0; i < numOfColors; i++) {
        //get random color and push to array
        arr.push(randomColor());
    }
    //return array
    return arr;
}

function randomColor() {
    //pick a red color from 0 -255
    var red = Math.floor(Math.random() * 256);
    //pick a green color from 0 -255
    var green = Math.floor(Math.random() * 256);
    //pick a blue color from 0 -255
    var blue = Math.floor(Math.random() * 256);

    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

//Add event listener on button to genrate random colors and start a new game if game is over
newButton.addEventListener('click', function () {
    reset();
});
