const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let isGameOver = false;

// Initialize the board
function initializeBoard() {
    board.innerHTML = '';
    gameBoard = Array(9).fill(null);
    isGameOver = false;
    currentPlayer = 'X';
    status.textContent = "Player X's turn";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        board.appendChild(cell);
    }
}

// Handle cell clicks
function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;
    
    if (cell.classList.contains('cell') && !gameBoard[index] && !isGameOver) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWinner()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            isGameOver = true;
        } else if (gameBoard.every(cell => cell)) {
            status.textContent = "It's a draw!";
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Reset the game
function resetGame() {
    initializeBoard();
}

// Event listeners
board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

// Initialize the game
initializeBoard();
