document.addEventListener("DOMContentLoaded", function(){
    let cells = document.querySelectorAll("[data-cell]");
    let gamestatus = document.querySelector(".game__status");
    let playerOneScore = document.querySelector("[data-playerOneScore]");
    let playerTwoScore = document.querySelector("[data-playerTwoScore]");
    if (!cells || !gamestatus || !playerOneScore || !playerTwoScore) return;

    let game = new Game(cells,gamestatus,playerOneScore, playerTwoScore);

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            let row = game.calculateRow(index);
            let column = game.calculateColumn(index,row);
            game.cellClicked(row,column);
        });
    });
})