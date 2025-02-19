import Gameboard from './gameboard.js';

const GameController = function(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    // Responsible for controlling the flow and state of the game
    // as well as checking if somebody has won the game

    // Ensure `getBoard()` is called correctly:
    const board = Gameboard.getBoard();
    //console.log("Gameboard:", board.printBoard());

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
        updateStatus(`${getActivePlayer().name}'s turn`);
    };

    const resultScreen = (rowIndex, colIndex) => {
        
    };

    const playRound = (rowIndex,colIndex) =>{
        if (board.isGameOver()) return; 

        console.log(`${getActivePlayer().name}'s choice`);
        
        const moveSuccessful = board.makeMove(rowIndex, colIndex, getActivePlayer().token);

        

        if(moveSuccessful){
            const result = checkWin();
            
            if(result === 1 || result ===2){
                console.log(`Player ${result ===1 ? players[0].name : players[1].name} wins!`)
                updateStatus(`${getActivePlayer().name} WINS!!`);
                board.setGameOver(true);
                return;
            }else if(result === 'draw' ){
                console.log("Draw!!");
                updateStatus(`DRAW`);
                board.setGameOver(true);
                return;
            }

            switchPlayerTurn();
        }else{
            console.log('Try again!!!')
            updateStatus(`Invalid try Again`);
        }

         // Ensure no result exists before proceeding to next round
        if (!board.isGameOver()) {
            printNewRound();
        }


    };

    const checkWin = () => {
        const board = Gameboard.getBoard().getBoard();
        const winningConditions = [
            //rows
            [board[0][0],board[0][1],board[0][2]],
            [board[1][0],board[1][1],board[1][2]],
            [board[2][0],board[2][1],board[2][2]],
            //columns
            [board[0][0],board[1][0],board[2][0]],
            [board[0][1],board[1][1],board[2][1]],
            [board[0][2],board[1][2],board[2][2]],
            //diagonals
            [board[0][0],board[1][1],board[2][2]],
            [board[2][0],board[1][1],board[0][2]],
        ];

        for (let condition of winningConditions){
            
            if(condition[0].getValue() !==0 && 
            condition[0].getValue() === condition[1].getValue() && 
            condition[1].getValue() === condition[2].getValue()){
                return condition[0].getValue();
            }

        }

        if(board.flat().every(cell => cell.getValue() !==0)){
            return "draw"; //convert the 2d array into a 1d array
                            //then checks if every cell has a token
                            //if every cell has a player token return draw

        }

        return null; // if theres no verdict
    };

   


    const updateStatus = (message) => {
        document.querySelector('.status').innerHTML = `<h1>${message}</h1>`;
    }
    
   const setupGame = () =>{
    document.querySelectorAll('.cell').forEach(cell =>{
        cell.addEventListener('click',()=>{
            const row = parseInt(cell.getAttribute('data-row'));
            const col = parseInt(cell.getAttribute('data-col'));
            playRound(row,col);
   
        });
    });

    printNewRound();

   };

   // Reset button functionality
   //bug: it doesnt reset right sometimes
   document.getElementById('reset').addEventListener('click', () => {
        board.getBoard();
        board.createBoard(); // Reset the gameboard

        board.setGameOver(false);

        document.querySelectorAll('.cell').forEach((cell) => {
            cell.textContent = '';
            cell.removeAttribute('data-token'); 
        });
        updateStatus(`${getActivePlayer().name}'s turn`); 

        activePlayer = players[0]

        setupGame();
        console.log(board.getBoard())
    });

    return{
        setupGame,
        getActivePlayer,
    };

}

export default GameController;