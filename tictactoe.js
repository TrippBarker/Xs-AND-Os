// HTML ELEMENTS
const squares = document.querySelectorAll('.square');
const message = document.querySelector('#winnerMessage');
const playButton = document.querySelector('#playButton');
const resetButton = document.querySelector('#resetButton');

// Variables

let xTurn;
let winner;
let selectedSquare;
let availableSquares = [];
let weightedAvailableSquares = [];
let boardTracker;
let currentState;
let boardStates = new Array();
let knownBoard = false;


// FUNCTIONS

function userSquareSelection(){
  selectedSquare = this.id;
  checkIfSquareEmpty();
  if (xTurn){
    randXMovement();
  }
}

function checkIfSquareEmpty(){
  if (boardTracker[selectedSquare] == "" && winner == ""){
    counter++;
    drawMove();
    availableSquares.splice(availableSquares.indexOf(selectedSquare), 1);
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
  document.getElementById(selectedSquare).style.backgroundImage = "url(./resources/"+mark+"s/"+mark+(Math.floor(Math.random() * 10) + 1)+".png)";
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

// Called to have X make a move
function randXMovement(){
  for (let board in boardStates){
    if (knownBoard){
      break;
    }
    for (let key in boardStates[board]){
      if (boardStates[board][key] != boardTracker[key]){
        if ((typeof (boardStates[board][key]) == 'number') && boardTracker[key] == ""){
          knownBoard = true;
        } else {
          knownBoard = false;
          break;
        }
      }
      if (key == "c3"){
        knownBoard = true;
        currentState = boardStates[board];
      }
    }
  }
  if (!knownBoard){
    recordNewBoardState();
  }
  console.log(currentState);
  fetchWeights();
  selectedSquare = weightedAvailableSquares[Math.floor(Math.random() * weightedAvailableSquares.length)];
  checkIfSquareEmpty();
  knownBoard = false;
}

function recordNewBoardState(){
  let boardCopy = {};
  for (let key in boardTracker){
    if (boardTracker[key] == ""){
      boardCopy[key] = 1;
    } else {
      boardCopy[key] = boardTracker[key];
    }
  }
  currentState = boardCopy;
  boardStates.push(boardCopy);
}

function toggleStartMenu(){
  document.getElementById("startMenu").classList.toggle("hidden");
  newGame();
}

function assignGridPos(square){
  square.style.gridArea = square.id;
}

function fetchWeights(){
  weightedAvailableSquares = [];
  console.log("---");
  console.log(weightedAvailableSquares);
  console.log("---");
  for (let key in currentState){
    if (typeof currentState[key] == 'number'){
      for (let i = 0; i < currentState[key]; i++){
        weightedAvailableSquares.push(key);
      }
    }
  }
  console.log(weightedAvailableSquares);
}

function newGame(){
  xTurn = true;
  winner = "";
  counter = 0;
  selectedSquare = "";
  availableSquares = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
  boardTracker = {a1: "", a2: "", a3: "", b1: "", b2: "", b3: "", c1: "", c2: "", c3: ""}
  squares.forEach(square => square.style.backgroundImage="none");
  message.textContent = "";
  randXMovement();
}

// EVENT LISTENERS
squares.forEach(square => assignGridPos(square));
squares.forEach(button => button.addEventListener('click', userSquareSelection));
playButton.addEventListener('click', toggleStartMenu);
resetButton.addEventListener('click', newGame);