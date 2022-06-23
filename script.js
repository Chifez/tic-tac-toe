const cellelements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("board");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const circle_class = "circle";
const x_class ="x";
const winningConbination = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,4,6],
  [2,5,8],
  [3,4,5],
  [6,7,8]
]


let circleTurn;

StartGame();
restartButton.addEventListener("click",StartGame);


function StartGame(){
circleTurn = false;
  setHoverBoard();
  cellelements.forEach(cell => {
    cell.classList.remove(circle_class);
    cell.classList.remove(x_class);
    cell.removeEventListener("click",handleclick);
    cell.addEventListener("click",handleclick,{once:true})
  })
  winningMessageElement.classList.remove("show");
}


  function handleclick(e){
const cell = e.target;
const currentClass = circleTurn ? circle_class : x_class;

//the following things are to be done here
//place the mark

placeMark(cell,currentClass);

//check for win
if (checkWin(currentClass)){
  endGame(false);
}
else if (isDraw()) {
  endGame(true);
}
else{
  swapTurns();
  setHoverBoard();
}
//check for draw
//if there's no win or draw then switch turns

    // console.log("clicked")
  }

function endGame(draw){
  if(draw){
    winningMessageTextElement.innerText = `draw!`;
  }else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw(){
  return [...cellelements].every(cell => {
    return cell.classList.contains(circle_class) || cell.classList.contains(x_class);
  })
}
  function placeMark(cell,currentClass){
  cell.classList.add(currentClass)
  }

  function swapTurns(){
    circleTurn = !circleTurn;
  }
function setHoverBoard(){
  board.classList.remove(x_class);
  board.classList.remove(circle_class);
  if(circleTurn){
    board.classList.add(circle_class);
  }else{
    board.classList.add(x_class);
  }
}
function checkWin(currentClass) {
  return winningConbination.some(combination =>{
    return combination.every(index =>{
      return cellelements[index].classList.contains(currentClass);
    })
  })
}
