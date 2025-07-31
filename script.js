document.addEventListener('DOMContentLoaded', () => {
            const board = document.getElementById('board');
            const cells = document.querySelectorAll('.cell');
            const status = document.querySelector('.status');
            const resetButton = document.getElementById('reset');
            
            let currentPlayer = 'X';
            let gameState = ['', '', '', '', '', '', '', '', ''];
            let gameActive = true;
            
            const winningConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            
            function handleCellClick(e) {
                const clickedCell = e.target;
                const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
                
                if (gameState[clickedCellIndex] !== '' || !gameActive) {
                    return;
                }
                
                gameState[clickedCellIndex] = currentPlayer;
                clickedCell.textContent = currentPlayer;
                clickedCell.classList.add(currentPlayer.toLowerCase());
                
                checkResult();
            }
            
            function checkResult() {
                let roundWon = false;
                
                for (let i = 0; i < winningConditions.length; i++) {
                    const [a, b, c] = winningConditions[i];
                    
                    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                        continue;
                    }
                    
                    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                        roundWon = true;
                        break;
                    }
                }
                
                if (roundWon) {
                    status.textContent = `Player ${currentPlayer} wins!`;
                    gameActive = false;
                    return;
                }
                
                if (!gameState.includes('')) {
                    status.textContent = "Game ended in a draw!";
                    gameActive = false;
                    return;
                }
                
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
            
            function resetGame() {
                currentPlayer = 'X';
                gameState = ['', '', '', '', '', '', '', '', ''];
                gameActive = true;
                status.textContent = `Player ${currentPlayer}'s turn`;
                
                cells.forEach(cell => {
                    cell.textContent = '';
                    cell.classList.remove('x', 'o');
                });
            }
            
            cells.forEach(cell => {
                cell.addEventListener('click', handleCellClick);
            });
            
            resetButton.addEventListener('click', resetGame);
        });
