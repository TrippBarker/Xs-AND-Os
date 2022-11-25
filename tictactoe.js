// HTML ELEMENTS
const squares = document.querySelectorAll('button');

let lastRand = "";
let xTurn = true;
let marked = false;
let winner = "";

let boardTracker = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: ""
}


// FUNCTIONS


function squareState(key){
  
  let mark = "x";
  if (!xTurn){
    mark = "o";
    xTurn = true;
  } else {
    xTurn = false;
  }
  boardTracker[key.id] = mark;
  key.classList.add("drawXO");
  key.style.backgroundImage = "url(/resources/"+mark+"s/"+mark+Math.floor(Math.random() * 10)+".png)";
}

function canClick(){
  if (boardTracker[this.id] == ""){
    squareState(this);
  }
  checkForWin();
}

function checkSquareState(){
  console.log(this);  
}

function checkForWin(){
  if (boardTracker["a1"] && boardTracker["a2"] && boardTracker["a3"] == boardTracker["a1"]){
    winner = boardTracker["a1"];
  } else if (boardTracker["b1"] && boardTracker["b2"] && boardTracker["b3"] == boardTracker["b1"]){
    winner = boardTracker["b1"];
  } else if (boardTracker["c1"] && boardTracker["c2"] && boardTracker["c3"] == boardTracker["c1"]){
    winner = boardTracker["c1"];
  } else if (boardTracker["a1"] && boardTracker["c1"] && boardTracker["b1"] == boardTracker["a1"]){
    winner = boardTracker["a1"];
  } else if (boardTracker["a2"] && boardTracker["c2"] && boardTracker["b2"] == boardTracker["a2"]){
    winner = boardTracker["a2"];
  } else if (boardTracker["a3"] && boardTracker["c3"] && boardTracker["b3"] == boardTracker["a3"]){
    winner = boardTracker["a3"];
  } else if (boardTracker["a1"] && boardTracker["b2"] && boardTracker["c3"] == boardTracker["a1"]){
    winner = boardTracker["a1"];
  } else if (boardTracker["a3"] && boardTracker["b2"] && boardTracker["c1"] == boardTracker["a3"]){
    winner = boardTracker["a3"];
  }
  if (winner != ""){
    console.log(winner + " HAS WON");
  }
  
}

// EVENT LISTENERS
squares.forEach(button => button.addEventListener('click', canClick));