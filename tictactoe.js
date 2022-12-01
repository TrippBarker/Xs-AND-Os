// HTML ELEMENTS
const squares = document.querySelectorAll('.square');
const message = document.querySelector('#winnerMessage');
const playButton = document.querySelector('#playButton');
const resetButton = document.querySelector('#resetButton');
const turboButts = document.querySelectorAll('.turboButt');

// Variables

let xTurn;
let winner;
let selectedSquare;
let xSelectedSquare;
let availableSquares = [];
let weightedAvailableSquares = [];
let boardTracker;
let currentState;
let boardStates = [{a1: 0, a2: 1, a3: 1, b1: 0, b2: 1, b3: 0, c1: 0, c2: 0, c3: 0}];
let boardSequence = {};
let knownBoard = false;
let xScore = 0;
let oScore = 0;
let tieScore = 0;
let turboCounter = 0;
let randWeight = 0;
let totalWeight = 0;
let weightedSquares = {};

// FUNCTIONS

function userSquareSelection(){
  selectedSquare = this.id;
  checkIfSquareEmpty(selectedSquare);
  if (xTurn){
    randXMovement();
  }
}

function checkIfSquareEmpty(choosenSquare){
  if (boardTracker[choosenSquare] == "" && winner == ""){
    counter++;
    drawMove(choosenSquare);
    availableSquares.splice(availableSquares.indexOf(choosenSquare), 1);
    if (counter == 9){
      winner = "TIE";
    }
    checkForWin();
  }
}

function drawMove(choosenSquare){
  let mark = "x";
  if (!xTurn){
    mark = "o";
    xTurn = true;
  } else {
    xTurn = false;
  }
  boardTracker[choosenSquare] = mark;
  document.getElementById(choosenSquare).classList.add("drawXO");
  document.getElementById(choosenSquare).style.backgroundImage = "url(./resources/"+mark+"s/"+mark+(Math.floor(Math.random() * 10) + 1)+".png)";
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
    if (winner == "o"){
      document.getElementById("oScore").textContent = ("O Score: " + ++oScore);
      rewardX(-1);
      if (currentState[xSelectedSquare] == -1){
        console.log(currentState);
        alert("ALERT");
      }
    } else if (winner == "x"){
      document.getElementById("xScore").textContent = ("X Score: " + ++xScore);
      rewardX(10);
    } else {
      document.getElementById("TIEScore").textContent = ("TIES: " + ++tieScore);
      rewardX(1);
    }
    if (turboCounter > 0){
      turboCounter--;
      newGame();
    }
  }
}

function rewardX(reward){
  let reserveFirst = false;
  for (let board in boardSequence){
    if (reward < 0 && !reserveFirst){
      reserveFirst = true;
    } else {
      boardSequence[board][board] += reward;
    }
  }
}

function exportCSV(){
  let csvCont = "data:text/csv;charset=utf-8,";
  csvCont += "a1,a2,a3,b1,b2,b3,c1,c2,c3\n";
  for (let board in boardStates){
    for (let key in boardStates[board]){
      csvCont += boardStates[board][key] + ",";
    }
    csvCont += "\n";
  }
  let encodedUri = encodeURI(csvCont);
  window.open(encodedUri);
}

function importTrainedData(){
  let importedCSV = 2;
  console.log(importedCSV);
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
  fetchWeights();
  //xSelectedSquare = weightedAvailableSquares[Math.floor(Math.random() * weightedAvailableSquares.length)];
  xSelectedSquare = fecthWeightedSquare();
  boardSequence[xSelectedSquare] = currentState;
  checkIfSquareEmpty(xSelectedSquare);
  knownBoard = false;
  if (turboCounter > 0){
    turboTrainDumb();
  }
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

function fecthWeightedSquare(){
  totalWeight = 0;
  weightedSquares = [];
  for (let key in currentState){
    if (typeof currentState[key] == 'number'){
      totalWeight += currentState[key];
      weightedSquares[key] = totalWeight;
    }
  }
  randWeight = Math.floor(Math.random() * totalWeight + 1);
  for (let weightedSquare in weightedSquares){
    if (randWeight <= weightedSquares[weightedSquare]){
      return weightedSquare;
    }
  }
}


function fetchWeights(){
  weightedAvailableSquares = [];
  for (let key in currentState){
    if (typeof currentState[key] == 'number'){
      for (let i = 0; i < currentState[key]; i++){
        weightedAvailableSquares.push(key);
      }
    }
  }
}

function turboTrainDumb(){
  selectedSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)];
  //selectedSquare = fecthWeightedSquare();
  checkIfSquareEmpty(selectedSquare);
  if (xTurn){
    randXMovement();
  }
}

function newGame(){
  xTurn = true;
  winner = "";
  counter = 0;
  selectedSquare = "";
  boardSequence = {};
  availableSquares = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
  boardTracker = {a1: "", a2: "", a3: "", b1: "", b2: "", b3: "", c1: "", c2: "", c3: ""}
  squares.forEach(square => square.style.backgroundImage="none");
  message.textContent = "";
  randXMovement();
}

function startTurbo(){
  turboCounter = this.textContent;
  newGame();
}

// EVENT LISTENERS
squares.forEach(square => assignGridPos(square));
squares.forEach(button => button.addEventListener('click', userSquareSelection));
playButton.addEventListener('click', toggleStartMenu);
resetButton.addEventListener('click', newGame);
turboButts.forEach(butt => butt.addEventListener('click', startTurbo));