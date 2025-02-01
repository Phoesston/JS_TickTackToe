const Gameboard = (function(){
    //This creates the actual gameboard
    //It's only called once
    //It's result is stored in the "instance" variable
    let instance;
    let board =[];

    function createInstance(){
         //singleton Class of the tick-tack-toe board
        //This is a self invoking function, which means
        //It runs emmediately when the script is loaded 
        let rows = 3;
        let columns = 3;
        // creates a 2d array for the game board
        console.log('Creating Board Instance')
        
        function createBoard(){
            for (let i = 0; i < rows; i++) {
                board[i] = [];
                for (let j = 0; j < columns; j++) {
                    board[i].push(cell());
                }
            }   
        }
        
        createBoard();
        //exposes to the API
        return{
            createBoard, 
            getBoard:()=>board,
            printBoard,
            makeMove
            
        };
                
    }

    
    //Cell object
    function cell(){
        let value = 0;// 0 = empty, 1 = Player One, 2 = Player Two
        // Accept a player's token to change the value of the cell
        
        const addToken = (player) => {
            value = player;
        };
        
        // How we will retrieve the current value of this cell through closure
        const getValue = () => value;
        
        return {
            addToken,
            getValue
        };
    }

    const makeMove = (rowIndex, colIndex,player)=>{
        //Bug: Seems like the if statement is always called
        let chosenCell = board[rowIndex][colIndex];

            if (chosenCell.getValue() != 0) {
                console.log('Cell is already taken!!');
                return false;
            }
            chosenCell.addToken(player);
            updateCellUI(rowIndex, colIndex, player);
            return true;
            
    }
    
    //creates a separate 2d array that shows a players token
    //value
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };

    const updateCellUI = (row, col, player) =>{
        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cellElement.setAttribute("data-token", player); //sets the data token attruibute
        cellElement.textContent = player === 1 ? "X" : "O" //if player value is = 1 return X
    };
    
    //exposes the only public method for accessing the gameboard
    //It checks whether the instance is already created, it not
    // it calls createInstance() to create the gameboard
    return{
        getBoard: function(){
            if (!instance){
                instance = createInstance();
            }

            return instance;
        }
    }

})();

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
    };

    const playRound = (rowIndex,colIndex) =>{
        console.log(`${getActivePlayer().name}'s choice`);
        
        const moveSuccessful = board.makeMove(rowIndex, colIndex, getActivePlayer().token);

        if(moveSuccessful){
            switchPlayerTurn();
        }else{
            console.log('Try again!!!')
        }

        printNewRound();
    };
    
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

    return{
        setupGame,
        getActivePlayer
    };

}

const game = new GameController('Alice', 'Bob');
game.setupGame();

//const board = Gameboard.getBoard();

//console.log("Gameboard:", board.getBoard());
