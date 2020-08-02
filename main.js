
/*----- constants -----*/
const WINNING_IDX = [
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    //diagnal
    [0, 4, 8],
    [2, 4, 6]
];
/*----- app's state (variables) -----*/
let board = [];

const player1 = {
    value: 1, 
    name: '', 
    sign: 'X'
};
const player2 = {
    value: -1, 
    name: '',
    sign: 'O'
};

let turn; 

let neededGridUpdate;

/*----- cached element references -----*/
const msgEl = document.getElementById('msg');
const replayEl = document.getElementById('replay');
const gridEl = document.querySelector('.' + neededGridUpdate); 

/*----- event listeners -----*/
document.querySelector('.grid').addEventListener('click', handleGridClick);

/*----- functions -----*/
function handleGridClick(e) {
    let gridClassName = e.target.className; 
    neededGridUpdate = gridClassName;
    console.log(neededGridUpdate);
    gridClassName = gridClassName.charAt(gridClassName.length-1);
    console.log(gridClassName);
    if (board[gridClassName-1] === null){
        board.splice(gridClassName-1, 0, turn);
    } else {
        return; 
    }
    console.log(board);
    turn *= -1;
    
    render(); 
}

function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1; 
}

function render(){
    //update grid
    /*const grids = document.querySelectorAll('div');
    for (let grid of grids) {
        if (turn = 1){
            grid.textContent = 'X';
            console.log(grid.textConent);
        }
    }
    */
    gridEl.textConent = 'X';    
        
    renderMessage(); 
    replayEl.style.visibility = isGameOver() ? 'visible' : 'hidden';
}

function isGameOver() {
    for (let i = 0; i < WINNING_IDX.length; i++) {
        if (Math.abs(board[WINNING_IDX[i][0]] + board[WINNING_IDX[i][1] + board[WINNING_IDX[i][2]]]) === 3) {
            return turn; //winner
        } else if (board[i] === null){
            return false; //in game
        } else {
            return 'Tied'; 
        }
    }
}

function renderMessage(){
    let result = isGameOver(); 
    if (result === turn) {
        msgEl.textContent = 'Player wins!';
    } else if (result === 'Tied') {
        msgEl.textContent = 'Tied!';
    } else {
        msgEl.textContent = 'Keep going!';
    }
    
}

init();