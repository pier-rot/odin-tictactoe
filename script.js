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

    const getToken = () => {token;}
    const getID = () => {ID;}
    const getUserName = () => {userName;};
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

    const getBoard = () => {board;};

    const putPlayerAt = (player, row, column) => {
        if (board[row][column] === 0) {
            board[row][column] = player.getID();
        } else {
            return;
        }
    };

    const printBoard = () => {
        console.log(getBoard());
    };

    return {
        getBoard,
        putPlayerAt,
        printBoard
    }
}