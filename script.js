function Cell() {
    let value = 0;
    const getValue = () => value;
    const setTokenFromPlayer = (player) => {value = player.getID();}

    return {
        getValue,
        setTokenFromPlayer
    }
}

function Player(name, token, ID) {

    const getToken = () => {token;}
    const getID = () => {ID;}
    return {
        name,
        getToken,
        getID
    }


}

function Gameboard() {

}