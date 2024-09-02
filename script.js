document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;

    const winConditions = [
        [0, 1, 3],
        [3, 4, 6],
        [6, 7, 3],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(e) {
        const index = e.target.dataset.index;

        if (board[index] !== '' || !isGameActive) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWin()) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
        } else if (board.every(cell => cell !== '')) {
            statusText.textContent = 'Draw!';
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        return winConditions.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }

    function restartGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => (cell.textContent = ''));
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    statusText.textContent = `Player ${currentPlayer}'s turn`;
});
