//singleton Class of the tick-tack-toe board
//This is a self invoking function, which means
//It runs emmediately when the script is loaded 
const Gameboard = (function(){
    let instance;
    let rows = 3;
    let columns = 3;
    let board =[];
    
    //This creates the actual gameboard
    //It's only called once
    //It's result is stored in the "instance" variable
    function createInstance(){
        let instance;
        let rows = 3;
        let columns = 3;
        let board =[];

        // creates a 2d array for the game board
        function createBoard(){
            for (let i = 0; i < rows; i++) {
                board[i] = [];
                for (let j = 0; j < columns; j++) {
                  board[i].push(cell());
                }
            }   
        }

        createBoard();
        return{createBoard, getBoard:()=>board};
        
    }

    function cell(){
        let value = 0;
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

const board = Gameboard.getBoard();

console.log("Gameboard:", board.getBoard());