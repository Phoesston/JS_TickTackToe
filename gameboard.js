import cell from './cell.js'

const Gameboard = (function(){
    //This creates the actual gameboard
    //It's only called once
    //It's result is stored in the "instance" variable
    let instance;
    let board =[];
    let gameOver = false;

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
            makeMove,
            isGameOver: () =>gameOver,
            setGameOver: (status) => { gameOver = status; }
       

            

            
        };
                
    }

    
   

    const makeMove = (rowIndex, colIndex,player)=>{
        //Bug: Seems like the if statement is always called
        if (gameOver) return false;

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
        if(gameOver) return;

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


export default Gameboard;

