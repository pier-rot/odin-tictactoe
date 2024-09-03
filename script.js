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
    };

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
    };

    const isDiagonalFilledWithValue = (value) => {
        let diag1 = [];
        let diag2 = [];

        for(let i = 0; i < boardSize; i++) {
            diag1.push(board[i][i]);
            diag2.push(board[i][boardSize - 1 - i]);
        }

        if (diag1.every((val) => val.getValue() === value) || diag2.every((val) => val.getValue()===value)) {
            return true;
        }
        return false;
    };

    const isBoardFull = () => {
        for(let i = 0; i <boardSize; i++) {
            for(let j=0; j<boardSize; j++) {
                if (board[i][j].getValue() === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    return {
        getBoard,
        putPlayerAt,
        printBoard,
        isRowFilledWithValue,
        isColumnFilledWithValue,
        isDiagonalFilledWithValue,
        isBoardFull
    }
}

function GameController(...players) {
    const board = Gameboard();
    let isGameOver = false;
    let winner = null;
    if (players.length === 0) {
        players = [Player("Player", "x",1), Player("Player", "o", 2)];
    }
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

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().getUserName()}'s turn ...`)
    };


    const playRound = (row,column) => {
        if (!isGameOver) {
            console.log(`Putting ${getActivePlayer().getUserName()}'s token (${getActivePlayer().getToken()}) at (${(row + "," + column)}).`);
            board.putPlayerAt(getActivePlayer(), row, column);

            if (board.isColumnFilledWithValue(getActivePlayer().getID()) || board.isRowFilledWithValue(getActivePlayer().getID()) || board.isDiagonalFilledWithValue(getActivePlayer().getID())) {
                winner = getActivePlayer();
                isGameOver = true;
                console.log(`${winner.getUserName()} has won!!`)
            } else if (board.isBoardFull()) {
                console.log("The board is full and no one won!");
                isGameOver = true;
            } else {
                nextPlayerTurn();
                printNewRound();
            }
        } else {
            console.log("Game is over.");
        }

        
    }
    printNewRound();

    const getIsGameOver = () => isGameOver;
    const getWinner = () => winner;
    
    return {
        getActivePlayer,
        playRound,
        getPlayersNames,
        getBoard: board.getBoard,
        getIsGameOver,
        getWinner
    }
    
}

function ScreenController() {
    const game = GameController();
    const boardDiv = document.querySelector("div.board");
    const pTurn = document.querySelector("p.turn");
    const pResult = document.querySelector("p.result");
    const boardSize = game.getBoard().length;
    
    const updateScreen = () => {
        const activePlayer = game.getActivePlayer();

        pTurn.textContent = `${activePlayer.getUserName()}`;

        if (game.getIsGameOver()) {
            pResult.textContent = (!game.getWinner()) ? "Tie!" : `${game.getWinner().getUserName()} won!`;
        }
    };

    // Make all the divs in the board
    for(let i = 0; i < boardSize; i++) {
        for(let j = 0; j < boardSize; j++) {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.dataset.row = i;
            cellDiv.dataset.col = j;
            cellDiv.addEventListener("click", handleCellClick);
            cellDiv.innerText = ` `;
            boardDiv.appendChild(cellDiv);
        }
    }
    updateScreen();

    function handleCellClick(e) {
        const targetCell = e.currentTarget;
        const targetRow = targetCell.dataset.row;
        const targetCol = targetCell.dataset.col;
        console.log(`${targetRow +","+ targetCol} is my position.`);
        if (!game.getIsGameOver()) {
            targetCell.innerText = `${game.getActivePlayer().getToken()}`;
            game.playRound(Number(targetRow), Number(targetCol));
            updateScreen();
        }
    }
    
}