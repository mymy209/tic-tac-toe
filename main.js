
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
    name: '', 
    sign: 'O'
};
const player2 = {
    name: '',
    sign: 'X'
};

let turn; 


/*----- cached element references -----*/
const msgEl = document.getElementById('msg');
const replayEl = document.getElementById('replay');
let gridOnScreen = document.querySelectorAll('div');
//const turnEl = document.getElementById('turn'); 

/*----- event listeners -----*/
document.querySelector('.grid').addEventListener('click', handleGridClick);
replayEl.addEventListener('click', init);

/*----- functions -----*/
function handleGridClick(e) {
    if (isGameOver()) return; 
    let gridId = e.target.id; 
    gridId = gridId.charAt(gridId.length-1);
    if (board[gridId-1] === null){
        board[gridId-1] = turn;
    } else {
        return; 
    }
    render(e.target); 
}

function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1; 
    gridOnScreen.forEach(function(grids){
        grids.textContent = ''; 
    });
    msgEl.textContent = 'The battle of Os and Xs begins...'
    //turnEl.textConent = 'Turn';
    replayEl.style.visibility = 'hidden';
}

function render(element) {
    element.textContent = turn > 0 ? player1.sign : player2.sign;    
    renderMessage(); 
    turn *= -1;
    replayEl.style.visibility = isGameOver() ? 'visible' : 'hidden';
}

function isGameOver() {
    for (let i = 0; i < WINNING_IDX.length; i++) {
        if (Math.abs(board[WINNING_IDX[i][0]] + board[WINNING_IDX[i][1]] + board[WINNING_IDX[i][2]]) === 3) {
            return 'winner';
        } 
    }
    if (board.includes(null) === false) {
        return 'tied'
    } else {
        return false; 
    }
}


function renderMessage() {
    if (isGameOver() === 'winner') {
        msgEl.textContent = `Player ${turn === 1 ? 1 : 2} Wins!`;
    } else if (isGameOver() === 'tied') {
        msgEl.textContent = 'Tied!';
    } else {
        msgEl.textContent = 'Keep going!';
    }
}

init();