// / Connect Four

//  Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
//  column until a player gets four-in-a-row (horiz, vert, or diag) or until
//  board fills (tie)

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

//adds event listener to reset board button and refreshes the page
document.getElementById('reset').addEventListener('click', e => {
  window.location.reload();
})

// makeBoard: create in-JS board structure:
// board = array of rows, each row is array of cells  (board[y][x])

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    let yArray = [];
    yArray.push(null);
    board.push(yArray);
    for (let x = 0; x < WIDTH - 1; x++) {
      yArray.push(null);
    }
  }
}

// makeHtmlBoard: make HTML table and row of column tops.

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code
  // creates the top element where pieces are dropped in by the players
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // creates the table rows and cells of the board playspace
  for (let y = 0; y < HEIGHT; y++) {
    let row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

// findSpotForCol: given column x, return top empty y (null if filled)

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let y;
  let gameBoard = document.querySelector('#board').children;
  for(let i = HEIGHT; i > 0; i--){
    if(gameBoard[i].children[x].children.length === 0){
      y = i;
      console.log(y);
      return y - 1
    } else if(!(gameBoard[1].children[x].children.length === 0)){
      y = null;
      console.log(y);
      return y;
    }
  }
  ;
}

// placeInTable: update DOM to place piece into HTML table of board

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let newDiv = document.createElement("div");
  if (currPlayer === 1) {
    newDiv.className = "player1 piece";
  } else if (currPlayer === 2) {
    newDiv.className = "player2 piece";
  }
  cell = document.getElementById(`${y}-${x}`);
  cell.dataset.played = true;
  cell.append(newDiv);
}

//endGame: announce game end

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

// handleClick: handle click of column top to play piece

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);
  
  // check for win

  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  let fullBoard = false;
  const rowFilledCheck = [];
  for(let y of board){
    let val = y.every(el => el !== null);
    rowFilledCheck.push(val);
  }
  fullBoard = rowFilledCheck.every(val => val === true);
  if(fullBoard){
    endGame('Looks like a tie! Try again!');
  }
  

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
}

// checkForWin: check board cell-by-cell for "does a win start here?"

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );      
  }

  // TODO: read and understand this code. Add comments to help you.

  //loops over the rows
  for (let y = 0; y < HEIGHT; y++) {
    //loops over the columns in the rows
    for (let x = 0; x < WIDTH; x++) {
      //grabs all possible horizontal positions
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      //grabs all possible vertical positions
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      //grabs all possible diagonal right positions
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      //grabs all possible diagonal left positions
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      //checks to see if there is 4 consecutive current player positions
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
