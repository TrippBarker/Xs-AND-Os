// HTML ELEMENTS
const squares = document.querySelectorAll('.square');
const message = document.querySelector('#winnerMessage');
const playButton = document.querySelector('#playButton');

// Variables

let xTurn = true;
let winner = "";
let counter = 0;
let selectedSquare = "";

let availableSquares = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];

let boardTracker = {a1: "", a2: "", a3: "", b1: "", b2: "", b3: "", c1: "", c2: "", c3: ""}


// FUNCTIONS

function userSquareSelection(){
  selectedSquare = this.id;
  console.log(selectedSquare);
  checkIfSquareEmpty();
  randXMovement();
}

function checkIfSquareEmpty(){
  if (boardTracker[selectedSquare] == "" && winner == ""){
    counter++;
    drawMove();
    availableSquares.splice(availableSquares.indexOf(selectedSquare), 1);
    console.log(availableSquares);
    if (counter == 9){
      winner = "TIE";
    }
    checkForWin();
  }
}

function drawMove(){
  let mark = "x";
  if (!xTurn){
    mark = "o";
    xTurn = true;
  } else {
    xTurn = false;
  }
  boardTracker[selectedSquare] = mark;
  document.getElementById(selectedSquare).classList.add("drawXO");
  document.getElementById(selectedSquare).style.backgroundImage = "url(/resources/"+mark+"s/"+mark+(Math.floor(Math.random() * 10) + 1)+".png)";
}

function checkForWin(){
  if (boardTracker["a2"] == boardTracker["a1"] && boardTracker["a3"] == boardTracker["a1"] && boardTracker["a1"] != ""){
    winner = boardTracker["a1"];
  } else if (boardTracker["b2"] == boardTracker["b1"] && boardTracker["b3"] == boardTracker["b1"] && boardTracker["b1"] != ""){
    winner = boardTracker["b1"];
  } else if (boardTracker["c2"] == boardTracker["c1"] && boardTracker["c3"] == boardTracker["c1"] && boardTracker["c1"] != ""){
    winner = boardTracker["c1"];
  } else if (boardTracker["c1"]== boardTracker["a1"] && boardTracker["b1"] == boardTracker["a1"] && boardTracker["a1"] != ""){
    winner = boardTracker["a1"];
  } else if (boardTracker["c2"] == boardTracker["a2"] && boardTracker["b2"] == boardTracker["a2"] && boardTracker["a2"] != ""){
    winner = boardTracker["a2"];
  } else if (boardTracker["c3"] == boardTracker["a3"] && boardTracker["b3"] == boardTracker["a3"] && boardTracker["a3"] != ""){
    winner = boardTracker["a3"];
  } else if (boardTracker["b2"] == boardTracker["a1"] && boardTracker["c3"] == boardTracker["a1"] && boardTracker["a1"] != ""){
    winner = boardTracker["a1"];
  } else if (boardTracker["b2"] == boardTracker["a3"] && boardTracker["c1"] == boardTracker["a3"] && boardTracker["a3"] != ""){
    winner = boardTracker["a3"];
  }
  if (winner != ""){
    message.textContent = "winner is " + winner;
  }
}

function randXMovement(){
  selectedSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)];
  checkIfSquareEmpty();
}

function toggleStartMenu(){
  document.getElementById("startMenu").classList.toggle("hidden");
}

function assignGridPos(square){
  square.style.gridArea = square.id;
}

// EVENT LISTENERS
squares.forEach(square => assignGridPos(square));
squares.forEach(button => button.addEventListener('click', userSquareSelection));
playButton.addEventListener('click', toggleStartMenu);
randXMovement();