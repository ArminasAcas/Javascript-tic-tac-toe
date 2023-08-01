document.addEventListener("DOMContentLoaded", function(){
    let cells = document.querySelectorAll("[data-cell]");
    let gamestatus = document.querySelector(".game__status");
    let playerOneScore = document.querySelector("[data-playerOneScore]");
    let playerTwoScore = document.querySelector("[data-playerTwoScore]");
    let onePlayerButton = document.querySelector("[data-onePlayerButton]");
    let twoPlayersButton = document.querySelector("[data-twoPlayersButton]");
    let playerTwoName = document.querySelector("[data-playerTwoName]");
    if (!cells || !gamestatus || !playerOneScore || !playerTwoScore || !onePlayerButton || !twoPlayersButton || !playerTwoName) return;

    let game = new Game(cells,gamestatus,playerOneScore, playerTwoScore, playerTwoName);

    if (!game) return;
    
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            let row = game.calculateRow(index);
            let column = game.calculateColumn(index,row);
            game.cellClicked(row,column);
        });
    });

    onePlayerButton.addEventListener("click", () => {
        game.setOnePlayerMode();
    });

    twoPlayersButton.addEventListener("click", () => {
        game.setTwoPlayerMode();
    });
})