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

function Gameboard() {
    let rows = 3;
    let columns = 3;
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

    return {
        getBoard,
        putPlayerAt,
        printBoard
    }
}

function GameController(...players) {
    const playerCount = players.length;
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
    
}