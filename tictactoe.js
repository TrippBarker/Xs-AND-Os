// HTML ELEMENTS
const squares = document.querySelectorAll('button');


let xTurn = 0;
let marked = false;

// FUNCTIONS
function squareState(){
  let mark = "X"
  if (xTurn == true){
    if (marked == false){
      mark = "O"
    } 
  }
  return mark
}



function checkSquareState(){
  console.log(squareState());  
}

// EVENT LISTENERS
squares.forEach(button => button.addEventListener('click', checkSquareState));