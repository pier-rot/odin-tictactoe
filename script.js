function Cell() {
    let value = 0;
    const getValue = () => value;
    const setValueFromPlayer = (player) => {value = player.getID();}

    return {
        getValue,
        setValueFromPlayer
    }
}

function Player(name, token, ID) {
    const userName = name + ID;

    const getToken = () => token;
    const getID = () => ID;
    const getUserName = () => userName;
    return {
        getUserName,
        getToken,
        getID
    }


}

function Gameboard(boardSize = 3) {
    let rows = boardSize;
    let columns = boardSize;
    let board = [];

    for(let i = 0; i<rows; i++){
        board[i] = [];
        for(let j = 0; j<columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const putPlayerAt = (player, row, column) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].setValueFromPlayer(player);
        } else {
            return;
        }
    };

    const printBoard = () => {
        console.log(getBoard().map((row) => row.map((cell) => cell.getValue())));
    };

    const isRowFilledWithValue = (value) => {
        
        for(let i = 0; i < rows; i++) {
            if (board[i].every((val) => val.getValue() === value)) {
                return true;
            }
        }
        return false;
    }

    const isColumnFilledWithValue = (value) => {
        for(let j = 0; j<columns;j++) {
            col = [];
            for(let i = 0; i<rows;i++) {
                col.push(board[i][j]);
            }

            if (col.every((val) => val.getValue() === value)) {
                return true;
            }
        }
        return false;
    }

    return {
        getBoard,
        putPlayerAt,
        printBoard,
        isRowFilledWithValue,
        isColumnFilledWithValue,
        // isDiagonalFilledWithValue
    }
}

function GameController(...players) {
    const board = Gameboard();
    const playerCount = players.length;
    if (playerCount === 0) {
        players = [Player("Player", "x",1), Player("Player", "o", 2)];
    }
    const getPlayersNames = () => players.map((player) => player.getUserName());
    let activePlayerIndex = 0;
    let getActivePlayer = () => players[activePlayerIndex];

    const nextPlayerTurn = () => {
        if (activePlayerIndex === playerCount - 1) {
            activePlayerIndex = 0;
        } else {
            activePlayerIndex++;
        }
    };

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().getUserName()}'s turn ...`)
    };


    const playRound = (row,column) => {
        console.log(`Putting ${getActivePlayer().getUserName()}'s token (${getActivePlayer().getToken()}) at (${(row + "," + column)}).`);
        board.putPlayerAt(getActivePlayer(), row, column);
        nextPlayerTurn();
        printNewRound();
    }
    printNewRound();

    return {
        getActivePlayer,
        playRound,
        getPlayersNames,
    }
    
}